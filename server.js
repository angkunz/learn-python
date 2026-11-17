const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const db = require('./db.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// ── Security & Crypto Helpers ──
const JWT_SECRET = process.env.SESSION_SECRET || 'pylearn-classroom-secret-key-2026';

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function generateClassroomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ── Authentication Middleware ──
function authenticateTeacher(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบ' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Check teacher token session
    const stmt = db.prepare('SELECT id, name, email FROM teachers WHERE salt = ? OR id = ?');
    // For simplicity, we use token mapping or sign
    const sessionStmt = db.prepare('SELECT * FROM teachers WHERE id = ?');
    const parts = token.split(':');
    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token ไม่ถูกต้อง' });
    }
    const [teacherId, sign] = parts;
    const teacher = sessionStmt.get(teacherId);
    if (!teacher) {
      return res.status(401).json({ error: 'ไม่พบข้อมูลครูผู้สอน' });
    }
    const expectedSign = crypto.createHmac('sha256', JWT_SECRET).update(teacher.id + teacher.password_hash).digest('hex');
    if (sign !== expectedSign) {
      return res.status(401).json({ error: 'Session หมดอายุ กรุณาเข้าสู่ระบบใหม่' });
    }
    req.teacher = teacher;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'การยืนยันตัวตนล้มเหลว' });
  }
}

function createTeacherToken(teacher) {
  const sign = crypto.createHmac('sha256', JWT_SECRET).update(teacher.id + teacher.password_hash).digest('hex');
  return `${teacher.id}:${sign}`;
}

function authenticateStudent(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'กรุณาเข้าร่วมห้องเรียนก่อน' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const stmt = db.prepare(`
      SELECT s.*, c.name as classroom_name, c.code as classroom_code, c.gemini_api_key, c.gemini_model, c.teacher_id, t.name as teacher_name
      FROM students s
      JOIN classrooms c ON s.classroom_id = c.id
      JOIN teachers t ON c.teacher_id = t.id
      WHERE s.session_token = ?
    `);
    const student = stmt.get(token);
    if (!student) {
      return res.status(401).json({ error: 'Session นักเรียนไม่ถูกต้องหรือหมดอายุ' });
    }
    // Update last active
    db.prepare("UPDATE students SET last_active = datetime('now', 'localtime') WHERE id = ?").run(student.id);
    req.student = student;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการตรวจสอบ Session นักเรียน' });
  }
}

// ============================================================
// 1. TEACHER AUTH & PROFILE APIS
// ============================================================

app.post('/api/teacher/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร' });
  }

  try {
    const existing = db.prepare('SELECT id FROM teachers WHERE email = ?').get(email.toLowerCase().trim());
    if (existing) {
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่นหรือเข้าสู่ระบบ' });
    }

    const id = 'tch_' + crypto.randomBytes(8).toString('hex');
    const { hash, salt } = hashPassword(password);

    db.prepare(`
      INSERT INTO teachers (id, name, email, password_hash, salt)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, name.trim(), email.toLowerCase().trim(), hash, salt);

    const teacher = { id, name: name.trim(), email: email.toLowerCase().trim(), password_hash: hash };
    const token = createTeacherToken(teacher);

    res.json({
      success: true,
      token,
      teacher: { id: teacher.id, name: teacher.name, email: teacher.email }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลงทะเบียน' });
  }
});

app.post('/api/teacher/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'กรุณากรอกอีเมลและรหัสผ่าน' });
  }

  try {
    const teacher = db.prepare('SELECT * FROM teachers WHERE email = ?').get(email.toLowerCase().trim());
    if (!teacher || !verifyPassword(password, teacher.password_hash, teacher.salt)) {
      return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    const token = createTeacherToken(teacher);
    res.json({
      success: true,
      token,
      teacher: { id: teacher.id, name: teacher.name, email: teacher.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
  }
});

app.get('/api/teacher/me', authenticateTeacher, (req, res) => {
  const classrooms = db.prepare(`
    SELECT c.*, 
      (SELECT COUNT(*) FROM students WHERE classroom_id = c.id) as student_count
    FROM classrooms c 
    WHERE c.teacher_id = ?
    ORDER BY c.created_at DESC
  `).all(req.teacher.id);

  res.json({
    teacher: {
      id: req.teacher.id,
      name: req.teacher.name,
      email: req.teacher.email
    },
    classrooms: classrooms.map(c => ({
      ...c,
      hasApiKey: !!c.gemini_api_key,
      gemini_api_key: c.gemini_api_key ? (c.gemini_api_key.substring(0, 6) + '...' + c.gemini_api_key.slice(-4)) : null
    }))
  });
});

// Test Gemini API Key
app.post('/api/teacher/test-api-key', authenticateTeacher, async (req, res) => {
  const { apiKey, model = 'gemini-2.5-flash' } = req.body;
  if (!apiKey || apiKey.trim() === '') {
    return res.status(400).json({ error: 'กรุณากรอก API Key' });
  }

  const cleanKey = apiKey.trim().replace(/[^\w\-\.]/g, '');
  if (cleanKey.startsWith('AQ.')) {
    return res.status(400).json({ error: 'คีย์แบบ AQ. เป็นคีย์ Vertex AI/Google Cloud ไม่รองรับ กรุณาใช้คีย์ AI Studio ที่ขึ้นต้นด้วย AIza' });
  }

  try {
    const testUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`;
    const testRes = await fetch(testUrl);
    if (!testRes.ok && testRes.status !== 429) {
      return res.status(400).json({ error: 'API Key ไม่ถูกต้อง หรือไม่สามารถเชื่อมต่อ Gemini ได้' });
    }
    res.json({ success: true, message: 'API Key ถูกต้องและพร้อมใช้งาน!' });
  } catch (err) {
    res.status(500).json({ error: 'เชื่อมต่อ Google Gemini API ไม่สำเร็จ: ' + err.message });
  }
});

// ============================================================
// 2. CLASSROOM MANAGEMENT APIS (TEACHER)
// ============================================================

app.post('/api/teacher/classrooms', authenticateTeacher, (req, res) => {
  const { name, description = '', geminiApiKey = '', geminiModel = 'gemini-2.5-flash' } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'กรุณาระบุชื่อห้องเรียน' });
  }

  try {
    // Generate unique 6-char code
    let code = '';
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 10) {
      code = generateClassroomCode();
      const existing = db.prepare('SELECT id FROM classrooms WHERE code = ?').get(code);
      if (!existing) isUnique = true;
      attempts++;
    }

    const id = 'cls_' + crypto.randomBytes(8).toString('hex');
    const cleanKey = geminiApiKey.trim().replace(/[^\w\-\.]/g, '');

    db.prepare(`
      INSERT INTO classrooms (id, teacher_id, code, name, description, gemini_api_key, gemini_model)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, req.teacher.id, code, name.trim(), description.trim(), cleanKey || null, geminiModel);

    res.json({
      success: true,
      classroom: {
        id,
        code,
        name: name.trim(),
        description: description.trim(),
        hasApiKey: !!cleanKey,
        gemini_model: geminiModel,
        student_count: 0
      }
    });
  } catch (err) {
    console.error('Create classroom error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างห้องเรียน' });
  }
});

app.put('/api/teacher/classrooms/:id', authenticateTeacher, (req, res) => {
  const { id } = req.params;
  const { name, description, geminiApiKey, geminiModel } = req.body;

  try {
    const cls = db.prepare('SELECT * FROM classrooms WHERE id = ? AND teacher_id = ?').get(id, req.teacher.id);
    if (!cls) {
      return res.status(404).json({ error: 'ไม่พบห้องเรียนนี้' });
    }

    const updateName = name !== undefined ? name.trim() : cls.name;
    const updateDesc = description !== undefined ? description.trim() : cls.description;
    const updateModel = geminiModel || cls.gemini_model;
    
    let updateKey = cls.gemini_api_key;
    if (geminiApiKey !== undefined) {
      const cleanKey = geminiApiKey.trim().replace(/[^\w\-\.]/g, '');
      updateKey = cleanKey ? cleanKey : null;
    }

    db.prepare(`
      UPDATE classrooms 
      SET name = ?, description = ?, gemini_api_key = ?, gemini_model = ?
      WHERE id = ?
    `).run(updateName, updateDesc, updateKey, updateModel, id);

    res.json({
      success: true,
      classroom: {
        id,
        code: cls.code,
        name: updateName,
        description: updateDesc,
        hasApiKey: !!updateKey,
        gemini_model: updateModel
      }
    });
  } catch (err) {
    console.error('Update classroom error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแก้ไขห้องเรียน' });
  }
});

app.delete('/api/teacher/classrooms/:id', authenticateTeacher, (req, res) => {
  const { id } = req.params;
  try {
    const cls = db.prepare('SELECT * FROM classrooms WHERE id = ? AND teacher_id = ?').get(id, req.teacher.id);
    if (!cls) {
      return res.status(404).json({ error: 'ไม่พบห้องเรียนนี้' });
    }

    db.prepare('DELETE FROM classrooms WHERE id = ?').run(id);
    res.json({ success: true, message: 'ลบห้องเรียนเรียบร้อยแล้ว' });
  } catch (err) {
    console.error('Delete classroom error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบห้องเรียน' });
  }
});

// ============================================================
// 3. TEACHER DASHBOARD & ANALYTICS APIS
// ============================================================

// Overview & Analytics for a specific classroom
app.get('/api/teacher/classrooms/:id/overview', authenticateTeacher, (req, res) => {
  const { id } = req.params;
  try {
    const classroom = db.prepare('SELECT * FROM classrooms WHERE id = ? AND teacher_id = ?').get(id, req.teacher.id);
    if (!classroom) {
      return res.status(404).json({ error: 'ไม่พบห้องเรียนนี้' });
    }

    // 1. Students count & active
    const totalStudents = db.prepare('SELECT COUNT(*) as count FROM students WHERE classroom_id = ?').get(id).count;
    const activeStudentsToday = db.prepare(`
      SELECT COUNT(*) as count FROM students 
      WHERE classroom_id = ? AND date(last_active) >= date('now', '-1 day', 'localtime')
    `).get(id).count;

    // 2. Total exercises completed & total submissions
    const totalSubmissions = db.prepare('SELECT COUNT(*) as count FROM code_submissions WHERE classroom_id = ?').get(id).count;
    const totalPassed = db.prepare("SELECT COUNT(*) as count FROM code_submissions WHERE classroom_id = ? AND status = 'pass'").get(id).count;
    const totalAIQuestions = db.prepare('SELECT COUNT(*) as count FROM ai_interactions WHERE classroom_id = ?').get(id).count;

    // 3. Common Error Types (Top Focus Areas)
    const errorStats = db.prepare(`
      SELECT error_type, COUNT(*) as count
      FROM code_submissions
      WHERE classroom_id = ? AND status = 'fail' AND error_type IS NOT NULL AND error_type != ''
      GROUP BY error_type
      ORDER BY count DESC
      LIMIT 6
    `).all(id);

    // 4. Most Challenging Lessons / Exercises (Bottlenecks)
    const bottleneckLessons = db.prepare(`
      SELECT lesson_id, 
        COUNT(CASE WHEN status = 'fail' THEN 1 END) as fail_count,
        COUNT(*) as total_attempts
      FROM code_submissions
      WHERE classroom_id = ?
      GROUP BY lesson_id
      HAVING fail_count > 0
      ORDER BY fail_count DESC
      LIMIT 5
    `).all(id);

    // 5. Lesson Progress breakdown across classroom
    const lessonCompletionStats = db.prepare(`
      SELECT lesson_id, 
        SUM(completed) as completed_count,
        COUNT(*) as student_count
      FROM student_progress
      WHERE classroom_id = ?
      GROUP BY lesson_id
      ORDER BY completed_count DESC
    `).all(id);

    // Synthesize Teacher Focus Insights
    let pedagogicalInsights = [];
    if (errorStats.length > 0) {
      const topError = errorStats[0];
      if (topError.error_type === 'SyntaxError') {
        pedagogicalInsights.push('📌 ข้อผิดพลาดสูงสุดคือ SyntaxError: นักเรียนมักลืมใส่เครื่องหมายวงเล็บปิด หรือลืมโคลอน (:) หลังคำสั่ง if/def/for');
      } else if (topError.error_type === 'IndentationError') {
        pedagogicalInsights.push('📌 ข้อผิดพลาดสูงสุดคือ IndentationError: นักเรียนยังสับสนเรื่องการเยื้องบล็อกคำสั่ง (Indentation) ควรเน้นย้ำเรื่องการกด Tab หรือเคาะ 4 space');
      } else if (topError.error_type === 'NameError') {
        pedagogicalInsights.push('📌 ข้อผิดพลาดสูงสุดคือ NameError: นักเรียนเรียกใช้ตัวแปรหรือฟังก์ชันที่ยังไม่ได้ประกาศ หรือพิมพ์ตัวพิมพ์เล็ก-ใหญ่ผิด (Case-sensitive)');
      } else if (topError.error_type === 'TypeError') {
        pedagogicalInsights.push('📌 ข้อผิดพลาดสูงสุดคือ TypeError: นักเรียนนำข้อมูลต่างชนิดกันมาดำเนินการ เช่น นำ String มาบวกกับ Int โดยไม่ได้แปลงชนิด');
      }
    }
    if (totalStudents > 0 && totalAIQuestions > totalStudents * 3) {
      pedagogicalInsights.push('💡 นักเรียนในห้องมีการพึ่งพา AI ตรวจสอบโค้ดอย่างกระตือรือร้น แสดงถึงความตั้งใจแก้ปัญหาและทดลองค้นคว้าด้วยตนเอง');
    }

    res.json({
      classroom: {
        id: classroom.id,
        code: classroom.code,
        name: classroom.name,
        description: classroom.description,
        hasApiKey: !!classroom.gemini_api_key,
        gemini_model: classroom.gemini_model,
        created_at: classroom.created_at
      },
      stats: {
        totalStudents,
        activeStudentsToday,
        totalSubmissions,
        passRate: totalSubmissions > 0 ? Math.round((totalPassed / totalSubmissions) * 100) : 0,
        totalAIQuestions
      },
      commonErrors: errorStats,
      bottleneckLessons,
      lessonCompletionStats,
      insights: pedagogicalInsights
    });
  } catch (err) {
    console.error('Overview analytics error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลภาพรวมห้องเรียน' });
  }
});

// Classroom Students & Progress Matrix
app.get('/api/teacher/classrooms/:id/matrix', authenticateTeacher, (req, res) => {
  const { id } = req.params;
  try {
    const classroom = db.prepare('SELECT id, name FROM classrooms WHERE id = ? AND teacher_id = ?').get(id, req.teacher.id);
    if (!classroom) {
      return res.status(404).json({ error: 'ไม่พบห้องเรียนนี้' });
    }

    const students = db.prepare(`
      SELECT s.id, s.student_number, s.name, s.last_active, s.created_at,
        COALESCE(SUM(sp.xp), 0) as total_xp,
        COALESCE(SUM(sp.completed), 0) as completed_lessons_count,
        (SELECT COUNT(*) FROM code_submissions WHERE student_id = s.id) as total_submissions,
        (SELECT COUNT(*) FROM ai_interactions WHERE student_id = s.id) as ai_interactions_count
      FROM students s
      LEFT JOIN student_progress sp ON s.id = sp.student_id
      WHERE s.classroom_id = ?
      GROUP BY s.id
      ORDER BY 
        CASE WHEN s.student_number IS NOT NULL AND s.student_number != '' THEN CAST(s.student_number AS INTEGER) ELSE 999999 END ASC,
        s.name ASC
    `).all(id);

    // Get all progress rows for this classroom
    const progressRows = db.prepare(`
      SELECT student_id, lesson_id, completed, xp, attempts, updated_at
      FROM student_progress
      WHERE classroom_id = ?
    `).all(id);

    // Map progress by student_id -> { lesson_id: { completed, xp, attempts } }
    const progressMap = {};
    progressRows.forEach(row => {
      if (!progressMap[row.student_id]) progressMap[row.student_id] = {};
      progressMap[row.student_id][row.lesson_id] = {
        completed: row.completed === 1,
        xp: row.xp,
        attempts: row.attempts
      };
    });

    res.json({
      students: students.map(s => ({
        ...s,
        progress: progressMap[s.id] || {}
      }))
    });
  } catch (err) {
    console.error('Matrix error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงตารางความคืบหน้า' });
  }
});

// Individual Student Detailed Profile & Diagnostics
app.get('/api/teacher/classrooms/:id/students/:studentId', authenticateTeacher, (req, res) => {
  const { id, studentId } = req.params;
  try {
    const classroom = db.prepare('SELECT id, name FROM classrooms WHERE id = ? AND teacher_id = ?').get(id, req.teacher.id);
    if (!classroom) {
      return res.status(404).json({ error: 'ไม่พบห้องเรียนนี้' });
    }

    const student = db.prepare(`
      SELECT s.*,
        COALESCE(SUM(sp.xp), 0) as total_xp,
        COALESCE(SUM(sp.completed), 0) as completed_lessons_count
      FROM students s
      LEFT JOIN student_progress sp ON s.id = sp.student_id
      WHERE s.id = ? AND s.classroom_id = ?
      GROUP BY s.id
    `).get(studentId, id);

    if (!student) {
      return res.status(404).json({ error: 'ไม่พบข้อมูลนักเรียนนี้' });
    }

    // Detailed lesson progress
    const lessonProgress = db.prepare(`
      SELECT * FROM student_progress WHERE student_id = ? ORDER BY lesson_id ASC
    `).all(studentId);

    // Recent code submissions (with actual code written!)
    const recentSubmissions = db.prepare(`
      SELECT id, lesson_id, exercise_id, code, status, error_type, error_message, output, created_at
      FROM code_submissions
      WHERE student_id = ?
      ORDER BY created_at DESC
      LIMIT 20
    `).all(studentId);

    // Student error breakdown
    const studentErrors = db.prepare(`
      SELECT error_type, COUNT(*) as count
      FROM code_submissions
      WHERE student_id = ? AND status = 'fail' AND error_type IS NOT NULL AND error_type != ''
      GROUP BY error_type
      ORDER BY count DESC
    `).all(studentId);

    // AI queries asked by this student
    const aiQueries = db.prepare(`
      SELECT id, lesson_id, exercise_id, user_code, ai_feedback, error_detected, created_at
      FROM ai_interactions
      WHERE student_id = ?
      ORDER BY created_at DESC
      LIMIT 15
    `).all(studentId);

    // Calculate Learning Analytics Diagnosis
    const totalSubmissions = db.prepare('SELECT COUNT(*) as count FROM code_submissions WHERE student_id = ?').get(studentId).count;
    const totalPassed = db.prepare("SELECT COUNT(*) as count FROM code_submissions WHERE student_id = ? AND status = 'pass'").get(studentId).count;
    const failRate = totalSubmissions > 0 ? ((totalSubmissions - totalPassed) / totalSubmissions) : 0;

    let skillLevel = 'เริ่มต้น (Novice)';
    if (student.completed_lessons_count >= 12) skillLevel = 'ขั้นสูง (Advanced)';
    else if (student.completed_lessons_count >= 5) skillLevel = 'ระดับกลาง (Intermediate)';

    let diagnosis = {
      skillLevel,
      learningPace: totalSubmissions > 30 ? 'ขยันฝึกฝนต่อเนื่อง' : 'เรียนรู้ตามจังหวะปกติ',
      strengths: [],
      areasForGrowth: [],
      coachingTip: ''
    };

    if (student.completed_lessons_count > 0) {
      diagnosis.strengths.push(`ผ่านบทเรียนสำเร็จไปแล้ว ${student.completed_lessons_count} บท สะสม ${student.total_xp} XP`);
    }
    if (totalPassed > 0) {
      diagnosis.strengths.push(`เขียนโค้ดแก้โจทย์ผ่านรวม ${totalPassed} ครั้ง`);
    }

    if (studentErrors.length > 0) {
      const topError = studentErrors[0];
      diagnosis.areasForGrowth.push(`มักพบข้อผิดพลาดประเภท ${topError.error_type} (${topError.count} ครั้ง)`);
      if (topError.error_type.includes('Indent')) {
        diagnosis.coachingTip = 'แนะนำให้ครูตรวจทานเรื่องการเคาะวรรค/ย่อหน้าโค้ดของนักเรียน โดยให้สังเกตหลังเครื่องหมายโคลอน (:)';
      } else if (topError.error_type.includes('Syntax')) {
        diagnosis.coachingTip = 'แนะนำให้นักเรียนฝึกตรวจทานวงเล็บเปิด-ปิด และเครื่องหมายคำพูด (quotes) ให้ครบคู่ก่อนกดรัน';
      } else {
        diagnosis.coachingTip = 'กระตุ้นให้นักเรียนลองอ่านข้อความ Error Message บรรทัดล่างสุดเพื่อระบุตำแหน่งที่เกิดข้อผิดพลาด';
      }
    } else {
      diagnosis.areasForGrowth.push('ยังไม่พบข้อผิดพลาดเด่นชัด สามารถเพิ่มความท้าทายด้วยโจทย์ระดับยากขึ้นได้');
      diagnosis.coachingTip = 'นักเรียนมีพื้นฐานที่ดี สามารถแนะนำให้ลองโจทย์สร้างสรรค์ใน Playground เพิ่มเติม';
    }

    res.json({
      student: {
        id: student.id,
        student_number: student.student_number,
        name: student.name,
        created_at: student.created_at,
        last_active: student.last_active,
        total_xp: student.total_xp,
        completed_lessons_count: student.completed_lessons_count
      },
      diagnosis,
      lessonProgress,
      recentSubmissions,
      studentErrors,
      aiQueries
    });
  } catch (err) {
    console.error('Student detail error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลนักเรียนรายบุคคล' });
  }
});

// Export CSV
app.get('/api/teacher/classrooms/:id/export-csv', authenticateTeacher, (req, res) => {
  const { id } = req.params;
  try {
    const classroom = db.prepare('SELECT name, code FROM classrooms WHERE id = ? AND teacher_id = ?').get(id, req.teacher.id);
    if (!classroom) {
      return res.status(404).send('Not found');
    }

    const students = db.prepare(`
      SELECT s.student_number, s.name, 
        COALESCE(SUM(sp.xp), 0) as total_xp,
        COALESCE(SUM(sp.completed), 0) as completed_lessons,
        s.last_active, s.created_at
      FROM students s
      LEFT JOIN student_progress sp ON s.id = sp.student_id
      WHERE s.classroom_id = ?
      GROUP BY s.id
      ORDER BY 
        CASE WHEN s.student_number IS NOT NULL AND s.student_number != '' THEN CAST(s.student_number AS INTEGER) ELSE 999999 END ASC,
        s.name ASC
    `).all(id);

    // BOM for Thai UTF-8 in Excel
    let csv = '\uFEFFเลขที่,ชื่อ-นามสกุล,คะแนน XP,จำนวนบทเรียนที่ผ่าน,เข้าใช้งานล่าสุด,วันที่เข้าร่วม\n';
    students.forEach(s => {
      const num = s.student_number ? `"${s.student_number}"` : '""';
      const name = `"${s.name.replace(/"/g, '""')}"`;
      const xp = s.total_xp || 0;
      const completed = s.completed_lessons || 0;
      const lastActive = s.last_active || '-';
      const joined = s.created_at || '-';
      csv += `${num},${name},${xp},${completed},${lastActive},${joined}\n`;
    });

    const filename = `PyLearn_${classroom.code}_${new Date().toISOString().slice(0, 10)}.csv`;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (err) {
    console.error('Export CSV error:', err);
    res.status(500).send('Export failed');
  }
});

// ============================================================
// 4. STUDENT CLASSROOM & LEARNING SESSION APIS
// ============================================================

// Teacher reset student password
app.post('/api/teacher/classrooms/:id/students/:studentId/reset-password', authenticateTeacher, (req, res) => {
  const { id, studentId } = req.params;
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 4 ตัวอักษร' });
  }

  try {
    const cls = db.prepare('SELECT id FROM classrooms WHERE id = ? AND teacher_id = ?').get(id, req.teacher.id);
    if (!cls) return res.status(404).json({ error: 'ไม่พบห้องเรียนนี้' });

    const student = db.prepare('SELECT id FROM students WHERE id = ? AND classroom_id = ?').get(studentId, id);
    if (!student) return res.status(404).json({ error: 'ไม่พบนักเรียนนี้' });

    const { hash, salt } = hashPassword(newPassword);
    db.prepare('UPDATE students SET password_hash = ?, salt = ? WHERE id = ?').run(hash, salt, studentId);

    res.json({ success: true, message: 'รีเซ็ตรหัสผ่านให้นักเรียนเรียบร้อยแล้ว' });
  } catch (err) {
    console.error('Reset student password error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน' });
  }
});

// ============================================================
// 4. STUDENT CLASSROOM & ACCOUNT APIS
// ============================================================

// Register new student in classroom
app.post('/api/student/register', (req, res) => {
  const { code, studentNumber, name, password } = req.body;
  if (!code || !studentNumber || !name || !password) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบทุกช่อง (รหัสห้องเรียน, เลขประจำตัว, ชื่อ-นามสกุล, รหัสผ่าน)' });
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'รหัสผ่าน/PIN ต้องมีความยาวอย่างน้อย 4 ตัวอักษร' });
  }

  const cleanCode = code.trim().toUpperCase();
  const cleanNumber = studentNumber.trim();
  const trimmedName = name.trim();

  try {
    const classroom = db.prepare(`
      SELECT c.*, t.name as teacher_name 
      FROM classrooms c 
      JOIN teachers t ON c.teacher_id = t.id 
      WHERE c.code = ?
    `).get(cleanCode);

    if (!classroom) {
      return res.status(404).json({ error: 'ไม่พบรหัสห้องเรียนนี้ กรุณาตรวจสอบรหัสอีกครั้ง' });
    }

    // Check if student with this studentNumber already exists in classroom
    const existing = db.prepare('SELECT id FROM students WHERE classroom_id = ? AND student_number = ?').get(classroom.id, cleanNumber);
    if (existing) {
      return res.status(400).json({ error: `เลขประจำตัว "${cleanNumber}" ได้ลงทะเบียนในห้องเรียนนี้แล้ว กรุณาเลือกแท็บ 'เข้าสู่ระบบ' เพื่อลงชื่อเข้าใช้` });
    }

    const studentId = 'std_' + crypto.randomBytes(8).toString('hex');
    const token = generateToken();
    const { hash, salt } = hashPassword(password);

    db.prepare(`
      INSERT INTO students (id, classroom_id, student_number, name, password_hash, salt, session_token)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(studentId, classroom.id, cleanNumber, trimmedName, hash, salt, token);

    res.json({
      success: true,
      token,
      student: {
        id: studentId,
        name: trimmedName,
        studentNumber: cleanNumber
      },
      classroom: {
        id: classroom.id,
        code: classroom.code,
        name: classroom.name,
        description: classroom.description,
        teacherName: classroom.teacher_name,
        hasTeacherApiKey: !!classroom.gemini_api_key
      }
    });
  } catch (err) {
    console.error('Student register error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลงทะเบียนนักเรียน' });
  }
});

// Login existing student
app.post('/api/student/login', (req, res) => {
  const { code, studentNumber, password } = req.body;
  if (!code || !studentNumber || !password) {
    return res.status(400).json({ error: 'กรุณากรอกรหัสห้องเรียน เลขประจำตัว และรหัสผ่าน' });
  }

  const cleanCode = code.trim().toUpperCase();
  const cleanNumber = studentNumber.trim();

  try {
    const classroom = db.prepare(`
      SELECT c.*, t.name as teacher_name 
      FROM classrooms c 
      JOIN teachers t ON c.teacher_id = t.id 
      WHERE c.code = ?
    `).get(cleanCode);

    if (!classroom) {
      return res.status(404).json({ error: 'ไม่พบรหัสห้องเรียนนี้ กรุณาตรวจสอบรหัสอีกครั้ง' });
    }

    const student = db.prepare('SELECT * FROM students WHERE classroom_id = ? AND student_number = ?').get(classroom.id, cleanNumber);
    if (!student) {
      return res.status(404).json({ error: `ไม่พบเลขประจำตัว "${cleanNumber}" ในห้องเรียนนี้ กรุณาตรวจสอบเลขประจำตัว หรือสมัครสมาชิกใหม่` });
    }

    // Verify password if set
    if (student.password_hash && student.salt) {
      if (!verifyPassword(password, student.password_hash, student.salt)) {
        return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง หรือติดต่อครูเพื่อขอรีเซ็ตรหัสผ่าน' });
      }
    } else {
      // First time setting password for legacy student account
      const { hash, salt } = hashPassword(password);
      db.prepare('UPDATE students SET password_hash = ?, salt = ? WHERE id = ?').run(hash, salt, student.id);
    }

    // Generate fresh session token
    const token = generateToken();
    db.prepare("UPDATE students SET session_token = ?, last_active = datetime('now', 'localtime') WHERE id = ?")
      .run(token, student.id);

    res.json({
      success: true,
      token,
      student: {
        id: student.id,
        name: student.name,
        studentNumber: student.student_number
      },
      classroom: {
        id: classroom.id,
        code: classroom.code,
        name: classroom.name,
        description: classroom.description,
        teacherName: classroom.teacher_name,
        hasTeacherApiKey: !!classroom.gemini_api_key
      }
    });
  } catch (err) {
    console.error('Student login error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
  }
});

// Join classroom via code (Unified / Backward compatibility)
app.post('/api/student/join', (req, res) => {
  const { code, name, studentNumber = '', password = '' } = req.body;
  if (!code || !name || name.trim() === '') {
    return res.status(400).json({ error: 'กรุณากรอกรหัสห้องเรียนและชื่อ-นามสกุล' });
  }

  const cleanCode = code.trim().toUpperCase();
  try {
    const classroom = db.prepare(`
      SELECT c.*, t.name as teacher_name 
      FROM classrooms c 
      JOIN teachers t ON c.teacher_id = t.id 
      WHERE c.code = ?
    `).get(cleanCode);

    if (!classroom) {
      return res.status(404).json({ error: 'ไม่พบรหัสห้องเรียนนี้ กรุณาตรวจสอบรหัสอีกครั้ง' });
    }

    const trimmedName = name.trim();
    const cleanNumber = studentNumber.trim();

    // Check if student with same name or number already in classroom, reuse or create
    let student = null;
    if (cleanNumber) {
      student = db.prepare('SELECT * FROM students WHERE classroom_id = ? AND student_number = ?').get(classroom.id, cleanNumber);
    }
    if (!student) {
      student = db.prepare('SELECT * FROM students WHERE classroom_id = ? AND name = ?').get(classroom.id, trimmedName);
    }

    let token = '';
    if (student) {
      // If password provided and student has password, verify it
      if (password && student.password_hash && student.salt) {
        if (!verifyPassword(password, student.password_hash, student.salt)) {
          return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบรหัสผ่านอีกครั้ง' });
        }
      }
      token = generateToken();
      db.prepare("UPDATE students SET session_token = ?, name = ?, student_number = ?, last_active = datetime('now', 'localtime') WHERE id = ?")
        .run(token, trimmedName, cleanNumber, student.id);
      student.name = trimmedName;
      student.student_number = cleanNumber;
    } else {
      const studentId = 'std_' + crypto.randomBytes(8).toString('hex');
      token = generateToken();
      let pHash = null;
      let pSalt = null;
      if (password) {
        const { hash, salt } = hashPassword(password);
        pHash = hash;
        pSalt = salt;
      }
      db.prepare(`
        INSERT INTO students (id, classroom_id, student_number, name, password_hash, salt, session_token)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(studentId, classroom.id, cleanNumber, trimmedName, pHash, pSalt, token);
      student = { id: studentId, student_number: cleanNumber, name: trimmedName };
    }

    res.json({
      success: true,
      token,
      student: {
        id: student.id,
        name: student.name,
        studentNumber: student.student_number
      },
      classroom: {
        id: classroom.id,
        code: classroom.code,
        name: classroom.name,
        description: classroom.description,
        teacherName: classroom.teacher_name,
        hasTeacherApiKey: !!classroom.gemini_api_key
      }
    });
  } catch (err) {
    console.error('Join classroom error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้าร่วมห้องเรียน' });
  }
});

// Student Session Check & Load Progress
app.get('/api/student/session', authenticateStudent, (req, res) => {
  const student = req.student;
  
  // Get all progress for this student
  const progress = db.prepare('SELECT * FROM student_progress WHERE student_id = ?').all(student.id);

  res.json({
    student: {
      id: student.id,
      name: student.name,
      studentNumber: student.student_number
    },
    classroom: {
      id: student.classroom_id,
      code: student.classroom_code,
      name: student.classroom_name,
      teacherName: student.teacher_name,
      hasTeacherApiKey: !!student.gemini_api_key
    },
    progress: progress.map(p => ({
      lessonId: p.lesson_id,
      completed: p.completed === 1,
      xp: p.xp,
      attempts: p.attempts,
      exercisesCompleted: JSON.parse(p.exercises_completed || '[]')
    }))
  });
});

// Record Student Progress & Code Submission
app.post('/api/student/progress', authenticateStudent, (req, res) => {
  const student = req.student;
  const { 
    lessonId, 
    exerciseId = 'ex_1', 
    completed = false, 
    xpEarned = 0, 
    code = '', 
    status = 'pass', // 'pass' or 'fail'
    errorType = null, 
    errorMessage = null, 
    output = '' 
  } = req.body;

  if (!lessonId) {
    return res.status(400).json({ error: 'Missing lessonId' });
  }

  try {
    // 1. Log code submission history for Teacher code inspector & error analytics
    const subId = 'sub_' + crypto.randomBytes(8).toString('hex');
    db.prepare(`
      INSERT INTO code_submissions (id, student_id, classroom_id, lesson_id, exercise_id, code, status, error_type, error_message, output)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(subId, student.id, student.classroom_id, lessonId, exerciseId, code, status, errorType, errorMessage, output);

    // 2. Upsert student_progress
    const existing = db.prepare('SELECT * FROM student_progress WHERE student_id = ? AND lesson_id = ?').get(student.id, lessonId);
    
    if (existing) {
      let exList = JSON.parse(existing.exercises_completed || '[]');
      if (status === 'pass' && !exList.includes(exerciseId)) {
        exList.push(exerciseId);
      }
      const isComplete = (existing.completed === 1 || completed) ? 1 : 0;
      const updatedXp = existing.xp + (xpEarned || 0);
      const attempts = existing.attempts + 1;

      db.prepare(`
        UPDATE student_progress 
        SET completed = ?, xp = ?, exercises_completed = ?, last_exercise_id = ?, attempts = ?, updated_at = datetime('now', 'localtime')
        WHERE id = ?
      `).run(isComplete, updatedXp, JSON.stringify(exList), exerciseId, attempts, existing.id);
    } else {
      const progId = 'prg_' + crypto.randomBytes(8).toString('hex');
      const exList = (status === 'pass') ? [exerciseId] : [];
      db.prepare(`
        INSERT INTO student_progress (id, student_id, classroom_id, lesson_id, completed, xp, exercises_completed, last_exercise_id, attempts)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
      `).run(progId, student.id, student.classroom_id, lessonId, completed ? 1 : 0, xpEarned || 0, JSON.stringify(exList), exerciseId);
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Progress sync error:', err);
    res.status(500).json({ error: 'Failed to record progress' });
  }
});

// Student AI Feedback Proxy (Using Teacher's Key securely!)
app.post('/api/student/ai-feedback', authenticateStudent, async (req, res) => {
  const student = req.student;
  const { 
    lessonId, 
    exerciseId = 'ex_1', 
    userCode = '', 
    runOutput = '', 
    lessonTitle = '', 
    exerciseTitle = '', 
    exerciseDesc = '', 
    solution = '', 
    hint = '', 
    starterCode = '', 
    difficulty = 'easy', 
    expectedOutput = '' 
  } = req.body;

  // Retrieve teacher's Gemini API key from classroom
  const apiKey = student.gemini_api_key;
  if (!apiKey) {
    return res.status(400).json({ 
      error: 'ครูประจำห้องเรียนยังไม่ได้ตั้งค่า Gemini API Key สำหรับห้องนี้ กรุณาแจ้งครูผู้สอนให้เพิ่ม API Key ในหน้าการตั้งค่าห้องเรียน' 
    });
  }

  const model = student.gemini_model || 'gemini-2.5-flash';
  const codeLines = userCode.split('\n').map((l, i) => `${i + 1}: ${l}`).join('\n');
  const solutionLines = solution ? solution.replace(/\\n/g, '\n') : '';
  const starterLines = starterCode ? starterCode.replace(/\\n/g, '\n') : '';
  const difficultyLabel = { easy: 'ง่าย', medium: 'ปานกลาง', hard: 'ยาก' };

  const prompt = `
คุณคือ "พี่ติวเตอร์ใจดี" ประจำห้องเรียนวิชา Python ที่เชี่ยวชาญการสอนและให้กำลังใจนักเรียน
กรุณาวิเคราะห์โค้ดของนักเรียนอย่างละเอียดและให้ feedback ที่เป็นประโยชน์ เป็นกันเอง และให้กำลังใจ 💖

===== ข้อมูลโจทย์ =====
บทเรียน: ${lessonTitle}
ชื่อโจทย์: ${exerciseTitle}
คำอธิบาย: ${exerciseDesc}
ระดับความยาก: ${difficultyLabel[difficulty] || difficulty || 'ไม่ระบุ'}
${expectedOutput ? `ผลลัพธ์ที่ถูกต้อง (Expected Output): ${expectedOutput}` : ''}
${hint ? `คำใบ้ประจำข้อ: ${hint}` : ''}

===== เฉลย (Solution) — ใช้เป็นเกณฑ์เทียบ =====
${solutionLines || '(ไม่มีเฉลย)'}

===== โค้ดเริ่มต้นที่ให้นักเรียน (Starter Code) =====
${starterLines || '(ไม่มี)'}

===== โค้ดของนักเรียน (พร้อมเลขบรรทัด) =====
${codeLines}

===== ผลลัพธ์จากการรัน =====
${runOutput || '(นักเรียนยังไม่ได้รันโค้ด)'}

===== วิธีการตรวจ =====
1. เปรียบเทียบ logic ของโค้ดนักเรียน กับ logic ของเฉลยทีละขั้นตอน
2. ถ้ามี Expected Output: ตรวจว่าผลลัพธ์จากการรันตรงกับ Expected Output หรือไม่
3. ถ้าไม่มี Expected Output: ตรวจว่าโครงสร้างและการใช้คำสั่งถูกต้องตามจุดประสงค์โจทย์หรือไม่
4. ถ้าโค้ดนักเรียนใช้วิธีอื่นที่ต่างจากเฉลยแต่ได้ผลลัพธ์ถูกต้อง ถือว่าถูกต้อง ให้คะแนนเต็มได้
5. โฟกัสคำแนะนำที่กระชับ ตรงประเด็น ชี้จุดผิดพลาดอย่างสุภาพและบอกวิธีแก้ไขทีละสเต็ป

ตอบเป็น JSON ในรูปแบบนี้เท่านั้น (ห้ามมี Markdown หรือ backtick ครอบ):
{
  "score": 0-100,
  "grade": "A" หรือ "B" หรือ "C" หรือ "D" หรือ "F",
  "summary": "สรุปสั้นๆ 1 ประโยค ชื่นชมและให้กำลังใจ",
  "errorCategory": "None" หรือ "SyntaxError" หรือ "IndentationError" หรือ "NameError" หรือ "TypeError" หรือ "LogicError" หรือ "Other",
  "bugs": [
    {
      "severity": "critical" หรือ "warning" หรือ "info",
      "line": "เลขบรรทัด",
      "problem": "อธิบายสาเหตุสั้นๆ กระชับเข้าใจง่าย",
      "bad_code": "โค้ดที่มีปัญหา",
      "fix": "คำใบ้ชี้เป้าให้แก้ได้ตรงจุด"
    }
  ],
  "missing": [
    "สิ่งที่ขาดหายไปสั้นๆ (ถ้ามี)"
  ],
  "improvements": [
    {
      "type": "style" หรือ "readability",
      "description": "คำแนะนำเพิ่มเติม",
      "after": "ตัวอย่างโค้ดสั้นๆ"
    }
  ],
  "strengths": [
    "จุดเด่นหรือคำชม (สูงสุด 1 ข้อ)"
  ],
  "action_plan": "คำแนะนำขั้นต่อไปสั้นๆ 1 ข้อ"
}
`.trim();

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Gemini error response:', errBody);
      return res.status(502).json({ error: 'เชื่อมต่อ AI ไม่สำเร็จ (' + response.status + '): ' + errBody });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error('No content generated by Gemini');
    }

    let parsedResult;
    try {
      const cleanText = rawText.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
      parsedResult = JSON.parse(cleanText);
    } catch (e) {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsedResult = JSON.parse(match[0]);
        } catch {
          parsedResult = {
            score: 75,
            grade: 'B',
            summary: 'AI ได้ทำการวิเคราะห์โค้ดของคุณแล้ว',
            errorCategory: 'Other',
            bugs: [],
            missing: [],
            improvements: [],
            strengths: ['มีความตั้งใจและพยายามเขียนโค้ด'],
            action_plan: 'ลองตรวจสอบผลลัพธ์และทดลองรันใหม่อีกครั้ง'
          };
        }
      } else {
        parsedResult = {
          score: 75,
          grade: 'B',
          summary: 'AI ได้ทำการวิเคราะห์โค้ดของคุณแล้ว',
          errorCategory: 'Other',
          bugs: [],
          missing: [],
          improvements: [],
          strengths: ['มีความตั้งใจและพยายามเขียนโค้ด'],
          action_plan: 'ลองตรวจสอบผลลัพธ์และทดลองรันใหม่อีกครั้ง'
        };
      }
    }

    parsedResult.bugs = parsedResult.bugs || [];
    parsedResult.missing = parsedResult.missing || [];
    parsedResult.improvements = parsedResult.improvements || [];
    parsedResult.strengths = parsedResult.strengths || [];
    parsedResult.action_plan = parsedResult.action_plan || '';

    // Identify error category if bugs exist
    let detectedError = parsedResult.errorCategory || 'None';
    if (detectedError === 'None' && parsedResult.bugs.length > 0) {
      const firstBug = parsedResult.bugs[0].problem || '';
      if (firstBug.includes('Syntax') || firstBug.includes('ไวยากรณ์')) detectedError = 'SyntaxError';
      else if (firstBug.includes('Indent') || firstBug.includes('ย่อหน้า')) detectedError = 'IndentationError';
      else if (firstBug.includes('Name') || firstBug.includes('ตัวแปร')) detectedError = 'NameError';
      else if (firstBug.includes('Type') || firstBug.includes('ชนิด')) detectedError = 'TypeError';
      else detectedError = 'LogicError';
    }

    // Save interaction log for Teacher Analytics!
    const intId = 'ai_' + crypto.randomBytes(8).toString('hex');
    db.prepare(`
      INSERT INTO ai_interactions (id, student_id, classroom_id, lesson_id, exercise_id, user_code, ai_feedback, error_detected)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(intId, student.id, student.classroom_id, lessonId, exerciseId, userCode, JSON.stringify(parsedResult), detectedError);

    res.json({
      success: true,
      feedback: parsedResult
    });
  } catch (err) {
    console.error('Proxy AI feedback error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการประมวลผลคำแนะนำจาก AI: ' + err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 PyLearn Classroom Edition is running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🎓 Student Portal: http://localhost:${PORT}/join.html`);
  console.log(`👩‍🏫 Teacher Portal: http://localhost:${PORT}/teacher-login.html`);
  console.log(`====================================================`);
});
