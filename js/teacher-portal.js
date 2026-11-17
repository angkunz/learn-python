// ============================================================
// PyLearn Teacher Portal Client Script
// จัดการห้องเรียน, สถิติวิเคราะห์, จุดเน้นผู้เรียน, และตรวจโค้ดรายบุคคล
// ============================================================

const TEACHER_TOKEN_KEY = 'pylearn_teacher_token';

let currentTeacher = null;
let classrooms = [];
let selectedClassroomId = null;
let currentMatrixData = [];

// ── Auth Check ──
function getTeacherToken() {
  return localStorage.getItem(TEACHER_TOKEN_KEY);
}

function requireAuth() {
  const token = getTeacherToken();
  if (!token) {
    window.location.href = 'teacher-login.html';
    return false;
  }
  return true;
}

function logoutTeacher() {
  if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
    localStorage.removeItem(TEACHER_TOKEN_KEY);
    localStorage.removeItem('pylearn_teacher_profile');
    window.location.href = 'teacher-login.html';
  }
}

// ── API Fetch Helper with Bearer Token ──
async function teacherFetch(url, options = {}) {
  const token = getTeacherToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  };

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    alert('Session หมดอายุ กรุณาเข้าสู่ระบบใหม่');
    localStorage.removeItem(TEACHER_TOKEN_KEY);
    window.location.href = 'teacher-login.html';
    throw new Error('Unauthorized');
  }
  return res;
}

// ── Boot / Init ──
document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth()) return;
  await loadTeacherProfile();
  await loadClassrooms();
});

// ── Load Teacher & Classrooms ──
async function loadTeacherProfile() {
  try {
    const res = await teacherFetch('/api/teacher/me');
    if (!res.ok) throw new Error('Failed to load profile');
    const data = await res.json();
    currentTeacher = data.teacher;
    classrooms = data.classrooms;

    document.getElementById('teacher-name-display').textContent = currentTeacher.name;
    document.getElementById('teacher-email-display').textContent = currentTeacher.email;

    renderClassroomCards();

    // Auto-select first classroom if available
    if (classrooms.length > 0) {
      selectClassroom(classrooms[0].id);
    } else {
      document.getElementById('classroom-details-section').style.display = 'none';
      document.getElementById('no-classrooms-message').style.display = 'block';
    }
  } catch (err) {
    console.error('Error loading teacher:', err);
  }
}

async function loadClassrooms() {
  // classrooms loaded via loadTeacherProfile
}

function renderClassroomCards() {
  const grid = document.getElementById('classroom-grid');
  if (!grid) return;

  if (classrooms.length === 0) {
    grid.innerHTML = '';
    return;
  }

  document.getElementById('no-classrooms-message').style.display = 'none';
  grid.innerHTML = classrooms.map(cls => {
    const isAct = cls.id === selectedClassroomId ? 'active' : '';
    const apiBadge = cls.hasApiKey 
      ? '<span class="cls-api-status ready">⚡ AI พร้อมใช้งาน</span>'
      : '<span class="cls-api-status missing">⚠️ ยังไม่ใส่ AI Key</span>';

    return `
      <div class="classroom-card ${isAct}" onclick="selectClassroom('${cls.id}')" id="cls-card-${cls.id}">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <span class="cls-badge-code" title="รหัสห้องเรียน">
            ${cls.code}
            <button class="btn-copy-code" onclick="event.stopPropagation(); copyJoinLink('${cls.code}')" title="คัดลอกลิงก์ให้นักเรียน">📋</button>
          </span>
          <button class="btn-copy-code" onclick="event.stopPropagation(); openEditClassroomModal('${cls.id}')" title="ตั้งค่าห้องเรียน / API Key" style="font-size:1.1rem;">⚙️</button>
        </div>

        <div class="cls-name">${escapeHtml(cls.name)}</div>
        <div class="cls-desc">${escapeHtml(cls.description || 'ไม่มีคำอธิบาย')}</div>

        <div class="cls-footer">
          <div>👥 นักเรียน: <b>${cls.student_count || 0}</b> คน</div>
          <div>${apiBadge}</div>
        </div>
      </div>
    `;
  }).join('');
}

function copyJoinLink(code) {
  const joinUrl = `${window.location.origin}/join.html?code=${code}`;
  navigator.clipboard.writeText(joinUrl).then(() => {
    if (window.showToast) window.showToast(`คัดลอกลิงก์ห้องเรียน (${code}) แล้ว! ส่งให้นักเรียนได้ทันที`, 'success');
    else alert(`คัดลอกลิงก์แล้ว: ${joinUrl}`);
  });
}

function copyClassroomCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    if (window.showToast) window.showToast(`คัดลอกรหัส ${code} แล้ว!`, 'success');
  });
}

// ── Select Classroom & Load Data ──
async function selectClassroom(id) {
  selectedClassroomId = id;
  const cls = classrooms.find(c => c.id === id);
  if (!cls) return;

  // Update card active styles
  document.querySelectorAll('.classroom-card').forEach(el => el.classList.remove('active'));
  const card = document.getElementById(`cls-card-${id}`);
  if (card) card.classList.add('active');

  const detailsSec = document.getElementById('classroom-details-section');
  detailsSec.style.display = 'block';

  document.getElementById('current-class-title').textContent = cls.name;
  document.getElementById('current-class-code').textContent = cls.code;

  // Load Overview & Matrix
  await Promise.all([
    loadClassroomOverview(id),
    loadClassroomMatrix(id)
  ]);
}

// ── Overview Tab ──
async function loadClassroomOverview(id) {
  try {
    const res = await teacherFetch(`/api/teacher/classrooms/${id}/overview`);
    if (!res.ok) throw new Error('Failed to load overview');
    const data = await res.json();

    // Render Stats
    document.getElementById('stat-total-students').textContent = data.stats.totalStudents;
    document.getElementById('stat-active-today').textContent = data.stats.activeStudentsToday;
    document.getElementById('stat-pass-rate').textContent = `${data.stats.passRate}%`;
    document.getElementById('stat-ai-queries').textContent = data.stats.totalAIQuestions;

    // Render Pedagogical Insights
    const insightsList = document.getElementById('insights-list');
    if (data.insights && data.insights.length > 0) {
      insightsList.innerHTML = data.insights.map(item => `<li>${item}</li>`).join('');
    } else {
      insightsList.innerHTML = '<li>ยังไม่มีข้อมูลข้อผิดพลาดเด่นชัด นักเรียนในห้องเรียนเริ่มเรียนรู้ได้อย่างราบรื่น</li>';
    }

    // Render Common Errors (Focus Areas)
    renderCommonErrors(data.commonErrors, data.stats.totalSubmissions);

    // Render Bottleneck Lessons
    renderBottlenecks(data.bottleneckLessons);

  } catch (err) {
    console.error('Error loading overview:', err);
  }
}

function renderCommonErrors(errors, totalSubmissions) {
  const container = document.getElementById('common-errors-container');
  if (!container) return;

  if (!errors || errors.length === 0) {
    container.innerHTML = '<div style="color:var(--text-secondary);font-size:0.88rem;padding:12px;">ยังไม่มีสถิติข้อผิดพลาด (นักเรียนยังไม่ได้ส่งโค้ด)</div>';
    return;
  }

  const maxCount = Math.max(...errors.map(e => e.count), 1);
  const colors = {
    SyntaxError: '#ef4444',
    IndentationError: '#f97316',
    NameError: '#eab308',
    TypeError: '#a855f7',
    LogicError: '#3b82f6',
    Other: '#64748b'
  };

  container.innerHTML = errors.map(err => {
    const pct = Math.round((err.count / maxCount) * 100);
    const color = colors[err.error_type] || '#6366f1';
    let tip = '';
    if (err.error_type === 'SyntaxError') tip = 'ลืมวงเล็บ หรือลืมโคลอน (:)';
    else if (err.error_type === 'IndentationError') tip = 'ย่อหน้าบรรทัดไม่ตรงกัน';
    else if (err.error_type === 'NameError') tip = 'ตัวแปรยังไม่ประกาศ หรือสะกดผิด';
    else if (err.error_type === 'TypeError') tip = 'ชนิดข้อมูลไม่ตรง เช่น str + int';

    return `
      <div class="error-bar-item">
        <div class="error-bar-header">
          <span><b>${err.error_type}</b> <small style="color:var(--text-secondary);font-weight:400;">(${tip})</small></span>
          <span>${err.count} ครั้ง</span>
        </div>
        <div class="error-bar-track">
          <div class="error-bar-fill" style="width: ${pct}%; background: ${color};"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderBottlenecks(bottlenecks) {
  const container = document.getElementById('bottlenecks-container');
  if (!container) return;

  if (!bottlenecks || bottlenecks.length === 0) {
    container.innerHTML = '<div style="color:var(--text-secondary);font-size:0.88rem;padding:12px;">นักเรียนผ่านบทเรียนได้ดี ไม่พบโจทย์ที่ติดขัดสะสม</div>';
    return;
  }

  container.innerHTML = bottlenecks.map((item, idx) => {
    const lesson = typeof getLessonById === 'function' ? getLessonById(item.lesson_id) : null;
    const lessonName = lesson ? lesson.title : item.lesson_id;

    return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
        <div>
          <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">${idx + 1}. ${lessonName}</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);">รหัสบทเรียน: ${item.lesson_id}</div>
        </div>
        <div style="text-align:right;">
          <span style="background:rgba(239,68,68,0.15);color:#ef4444;padding:3px 8px;border-radius:6px;font-size:0.78rem;font-weight:700;">
            ผิด ${item.fail_count} ครั้ง
          </span>
          <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">จาก ${item.total_attempts} การรัน</div>
        </div>
      </div>
    `;
  }).join('');
}

// ── Progress Matrix Tab ──
async function loadClassroomMatrix(id) {
  try {
    const res = await teacherFetch(`/api/teacher/classrooms/${id}/matrix`);
    if (!res.ok) throw new Error('Failed to load matrix');
    const data = await res.json();
    currentMatrixData = data.students || [];
    renderMatrixTable(currentMatrixData);
  } catch (err) {
    console.error('Error loading matrix:', err);
  }
}

function renderMatrixTable(students) {
  const tbody = document.getElementById('matrix-table-body');
  if (!tbody) return;

  if (students.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align:center;padding:32px;color:var(--text-secondary);">
          ยังไม่มีนักเรียนเข้าร่วมห้องเรียนนี้<br>
          <button class="btn-inspect" onclick="copyJoinLink('${document.getElementById('current-class-code').textContent}')" style="margin-top:12px;">
            📋 คัดลอกลิงก์เชิญนักเรียน
          </button>
        </td>
      </tr>
    `;
    return;
  }

  // Get available lesson list (from LESSONS_DATA if loaded)
  const allLessons = typeof LESSONS_DATA !== 'undefined' ? LESSONS_DATA.slice(0, 12) : [];

  tbody.innerHTML = students.map(s => {
    // Generate mini dots for lessons
    let dotsHtml = '';
    if (allLessons.length > 0) {
      dotsHtml = allLessons.map(l => {
        const prog = s.progress && s.progress[l.id];
        if (prog && prog.completed) return `<span class="status-dot completed" title="${l.title}: สำเร็จแล้ว">✓</span>`;
        if (prog && prog.attempts > 0) return `<span class="status-dot in-progress" title="${l.title}: กำลังทำ">⏳</span>`;
        return `<span class="status-dot empty" title="${l.title}: ยังไม่เริ่ม">•</span>`;
      }).join('');
    } else {
      dotsHtml = `<span>${s.completed_lessons_count || 0} บท</span>`;
    }

    const lastActiveStr = s.last_active ? new Date(s.last_active).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }) : '-';

    return `
      <tr>
        <td style="font-weight:700;color:var(--text-primary);font-family:monospace;">${s.student_id_code || '-'}</td>
        <td style="color:var(--text-secondary);">${s.grade_class || '-'}</td>
        <td style="font-weight:700;color:var(--cyan);">${s.student_number || '-'}</td>
        <td style="font-weight:600;">${escapeHtml(s.name)}</td>
        <td style="color:#eab308;font-weight:700;">⭐ ${s.total_xp || 0} XP</td>
        <td style="font-weight:700;color:var(--green);">${s.completed_lessons_count || 0} บท</td>
        <td>${dotsHtml}</td>
        <td>${s.total_submissions || 0} ครั้ง</td>
        <td><span style="font-size:0.8rem;color:var(--text-secondary);">${lastActiveStr}</span></td>
        <td>
          <button class="btn-inspect" onclick="openStudentDiagnosticsModal('${s.id}')">
            🔍 วิเคราะห์รายบุคคล
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterMatrixStudents() {
  const query = document.getElementById('matrix-search-input').value.toLowerCase().trim();
  if (!query) {
    renderMatrixTable(currentMatrixData);
    return;
  }
  const filtered = currentMatrixData.filter(s => 
    s.name.toLowerCase().includes(query) || 
    (s.student_id_code && s.student_id_code.toLowerCase().includes(query)) ||
    (s.grade_class && s.grade_class.toLowerCase().includes(query)) ||
    (s.student_number && s.student_number.includes(query))
  );
  renderMatrixTable(filtered);
}

// ── Individual Student Diagnostics Modal ──
async function openStudentDiagnosticsModal(studentId) {
  const modal = document.getElementById('student-modal');
  modal.style.display = 'flex';
  const body = document.getElementById('student-modal-body');
  body.innerHTML = '<div style="text-align:center;padding:40px;"><div class="spinner"></div> กำลังประมวลผลการวิเคราะห์ผู้เรียน...</div>';

  try {
    const res = await teacherFetch(`/api/teacher/classrooms/${selectedClassroomId}/students/${studentId}`);
    if (!res.ok) throw new Error('Failed to load student diagnosis');
    const data = await res.json();
    const { student, diagnosis, recentSubmissions, studentErrors, aiQueries } = data;

    body.innerHTML = `
      <div style="border-bottom:1px solid var(--border);padding-bottom:16px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <h2 style="margin:0 0 4px;font-size:1.3rem;color:var(--text-primary);">
            👤 ${escapeHtml(student.name)}
          </h2>
          <div style="font-size:0.88rem;color:var(--cyan);font-weight:600;margin-bottom:4px;">
            เลขประจำตัว: ${student.student_id_code || '-'} | ชั้น: ${student.grade_class || '-'} | เลขที่: ${student.student_number || '-'}
          </div>
          <div style="font-size:0.85rem;color:var(--text-secondary);">
            สะสม <b>${student.total_xp} XP</b> | ผ่านแล้ว <b>${student.completed_lessons_count} บทเรียน</b> | ใช้งานล่าสุด: ${student.last_active || '-'}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="background:rgba(99,102,241,0.15);padding:6px 14px;border-radius:10px;border:1px solid rgba(99,102,241,0.3);">
            <span style="font-size:0.75rem;color:#818cf8;display:block;">ระดับความสามารถ</span>
            <b style="color:var(--primary-light);font-size:0.95rem;">${diagnosis.skillLevel}</b>
          </div>
          <button onclick="promptResetStudentPassword('${student.id}', '${escapeHtml(student.name)}')" class="btn-inspect" style="background:rgba(234,179,8,0.15);border-color:#eab308;color:#eab308;padding:8px 12px;" title="รีเซ็ตรหัสผ่านเมื่อนักเรียนลืม">
            🔑 รีเซ็ตรหัสผ่าน
          </button>
        </div>
      </div>

      <!-- AI Diagnosis Card -->
      <div style="background:linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.06) 100%);border:1px solid rgba(99,102,241,0.3);border-radius:14px;padding:18px;margin-bottom:20px;">
        <div style="font-weight:700;color:#a5b4fc;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
          <span>🧠 บทวิเคราะห์พัฒนาการผู้เรียน (AI Diagnosis)</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:12px;">
          <div>
            <span style="font-size:0.82rem;font-weight:700;color:#4ade80;">🌟 จุดเด่น / พัฒนาการที่ดี:</span>
            <ul style="margin:4px 0 0;padding-left:18px;font-size:0.85rem;color:var(--text-primary);line-height:1.5;">
              ${diagnosis.strengths.map(s => `<li>${s}</li>`).join('') || '<li>เพิ่งเริ่มเรียนรู้</li>'}
            </ul>
          </div>
          <div>
            <span style="font-size:0.82rem;font-weight:700;color:#f87171;">⚠️ จุดเน้นที่ต้องพัฒนา:</span>
            <ul style="margin:4px 0 0;padding-left:18px;font-size:0.85rem;color:var(--text-primary);line-height:1.5;">
              ${diagnosis.areasForGrowth.map(a => `<li>${a}</li>`).join('') || '<li>ไม่มีข้อผิดพลาดเด่นชัด</li>'}
            </ul>
          </div>
        </div>
        ${diagnosis.coachingTip ? `
          <div style="border-top:1px solid rgba(99,102,241,0.2);padding-top:10px;margin-top:10px;font-size:0.85rem;color:#e0e7ff;">
            💡 <b>คำแนะนำสำหรับครูผู้สอน:</b> ${diagnosis.coachingTip}
          </div>
        ` : ''}
      </div>

      <!-- Code Inspector (โค้ดจริงที่นักเรียนเขียน) -->
      <div style="margin-bottom:24px;">
        <h3 style="font-size:1.05rem;margin:0 0 12px;color:var(--text-primary);display:flex;align-items:center;gap:8px;">
          <span>📝 ประวัติการเขียนโค้ดและส่งตรวจล่าสุด</span>
        </h3>
        ${recentSubmissions.length === 0 ? '<div style="color:var(--text-secondary);font-size:0.85rem;">ยังไม่มีประวัติการส่งโค้ด</div>' : `
          <div style="display:flex;flex-direction:column;gap:12px;max-height:340px;overflow-y:auto;padding-right:4px;">
            ${recentSubmissions.map(sub => {
              const statusBadge = sub.status === 'pass' 
                ? '<span style="color:#4ade80;font-weight:700;font-size:0.8rem;">✅ ผ่าน (Pass)</span>' 
                : `<span style="color:#ef4444;font-weight:700;font-size:0.8rem;">❌ ไม่ผ่าน (${sub.error_type || 'Error'})</span>`;
              return `
                <div style="background:var(--bg-alt);border:1px solid var(--border);border-radius:10px;padding:12px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                    <div>
                      <b>บทเรียน:</b> <span style="color:var(--cyan);">${sub.lesson_id}</span> (${sub.exercise_id})
                    </div>
                    <div>${statusBadge} <small style="color:var(--text-secondary);margin-left:8px;">${sub.created_at || ''}</small></div>
                  </div>
                  <div class="code-preview-box">${escapeHtml(sub.code)}</div>
                  ${sub.output ? `<div style="font-size:0.75rem;color:var(--text-secondary);margin-top:6px;"><b>ผลการรัน:</b> ${escapeHtml(sub.output.slice(0, 200))}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- AI Interactions -->
      <div>
        <h3 style="font-size:1.05rem;margin:0 0 12px;color:var(--text-primary);display:flex;align-items:center;gap:8px;">
          <span>🤖 ประวัติการขอคำแนะนำจาก AI</span>
        </h3>
        ${aiQueries.length === 0 ? '<div style="color:var(--text-secondary);font-size:0.85rem;">นักเรียนยังไม่เคยขอคำแนะนำจาก AI</div>' : `
          <div style="display:flex;flex-direction:column;gap:10px;max-height:220px;overflow-y:auto;">
            ${aiQueries.map(ai => {
              let fbSummary = '';
              try {
                const parsed = JSON.parse(ai.ai_feedback);
                fbSummary = parsed.summary || parsed.hint || '';
              } catch { fbSummary = ai.ai_feedback.slice(0, 150); }
              return `
                <div style="background:var(--bg-alt);border:1px solid var(--border);border-radius:8px;padding:10px;font-size:0.85rem;">
                  <div style="display:flex;justify-content:space-between;color:var(--text-secondary);font-size:0.78rem;margin-bottom:4px;">
                    <span>บทเรียน ${ai.lesson_id}</span>
                    <span>${ai.created_at || ''}</span>
                  </div>
                  <div style="color:var(--text-primary);"><b>คำแนะนำจาก AI:</b> ${escapeHtml(fbSummary)}</div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

  } catch (err) {
    body.innerHTML = `<div style="color:var(--red);text-align:center;padding:24px;">❌ ${err.message}</div>`;
  }
}

function closeStudentModal() {
  document.getElementById('student-modal').style.display = 'none';
}

async function promptResetStudentPassword(studentId, studentName) {
  const newPass = prompt(`กรุณากรอกรหัสผ่านใหม่สำหรับนักเรียน "${studentName}" (อย่างน้อย 4 ตัวอักษร):`, '1234');
  if (!newPass) return;
  if (newPass.length < 4) {
    alert('รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร');
    return;
  }

  try {
    const res = await teacherFetch(`/api/teacher/classrooms/${selectedClassroomId}/students/${studentId}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ newPassword: newPass })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'รีเซ็ตรหัสผ่านไม่สำเร็จ');
    if (window.showToast) window.showToast(`รีเซ็ตรหัสผ่านของ ${studentName} เรียบร้อยแล้ว! รหัสใหม่คือ: ${newPass}`, 'success');
    else alert(`รีเซ็ตรหัสผ่านของ ${studentName} เรียบร้อยแล้ว! รหัสใหม่คือ: ${newPass}`);
  } catch (err) {
    alert('เกิดข้อผิดพลาด: ' + err.message);
  }
}

// ── Export CSV ──
function exportCurrentClassCSV() {
  if (!selectedClassroomId) return;
  const token = getTeacherToken();
  window.open(`/api/teacher/classrooms/${selectedClassroomId}/export-csv?token=${token}`, '_blank');
}

// ── Create Classroom Modal ──
function openCreateClassroomModal() {
  document.getElementById('create-modal').style.display = 'flex';
  document.getElementById('create-cls-name').value = '';
  document.getElementById('create-cls-desc').value = '';
  document.getElementById('create-cls-key').value = '';
  document.getElementById('create-cls-error').style.display = 'none';
}

function closeCreateModal() {
  document.getElementById('create-modal').style.display = 'none';
}

async function handleCreateClassroom(e) {
  e.preventDefault();
  const name = document.getElementById('create-cls-name').value.trim();
  const description = document.getElementById('create-cls-desc').value.trim();
  const geminiApiKey = document.getElementById('create-cls-key').value.trim();
  const geminiModel = document.getElementById('create-cls-model').value;
  const btn = document.getElementById('btn-create-submit');
  const errBox = document.getElementById('create-cls-error');

  errBox.style.display = 'none';
  btn.disabled = true;
  btn.textContent = '⏳ กำลังสร้าง...';

  try {
    const res = await teacherFetch('/api/teacher/classrooms', {
      method: 'POST',
      body: JSON.stringify({ name, description, geminiApiKey, geminiModel })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'สร้างห้องเรียนไม่สำเร็จ');

    closeCreateModal();
    if (window.showToast) window.showToast(`สร้างห้องเรียน "${name}" สำเร็จ!`, 'success');
    await loadTeacherProfile();
    selectClassroom(data.classroom.id);
  } catch (err) {
    errBox.textContent = '❌ ' + err.message;
    errBox.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'สร้างห้องเรียน';
  }
}

// ── Edit Classroom / API Key Modal ──
function openEditClassroomModal(id) {
  const cls = classrooms.find(c => c.id === id);
  if (!cls) return;

  document.getElementById('edit-modal').style.display = 'flex';
  document.getElementById('edit-cls-id').value = cls.id;
  document.getElementById('edit-cls-name').value = cls.name;
  document.getElementById('edit-cls-desc').value = cls.description || '';
  document.getElementById('edit-cls-key').value = ''; // keep empty unless changed
  document.getElementById('edit-cls-key').placeholder = cls.hasApiKey ? '(มี API Key อยู่แล้ว ใส่ใหม่หากต้องการเปลี่ยน)' : 'AIzaSy...';
  document.getElementById('edit-cls-model').value = cls.gemini_model || 'gemini-2.5-flash';
  document.getElementById('edit-cls-error').style.display = 'none';
  document.getElementById('test-key-status').innerHTML = '';
}

function closeEditModal() {
  document.getElementById('edit-modal').style.display = 'none';
}

async function testApiKeyInModal() {
  const key = document.getElementById('edit-cls-key').value.trim();
  const statusEl = document.getElementById('test-key-status');
  if (!key) {
    statusEl.innerHTML = '<span style="color:var(--orange);">⚠️ กรุณากรอก API Key ก่อนกดทดสอบ</span>';
    return;
  }

  statusEl.innerHTML = '<span style="color:var(--text-secondary);">⏳ กำลังทดสอบเชื่อมต่อ Google Gemini...</span>';
  try {
    const res = await teacherFetch('/api/teacher/test-api-key', {
      method: 'POST',
      body: JSON.stringify({ apiKey: key })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'คีย์ใช้งานไม่ได้');
    statusEl.innerHTML = '<span style="color:#4ade80;">✅ ' + data.message + '</span>';
  } catch (err) {
    statusEl.innerHTML = '<span style="color:#ef4444;">❌ ' + err.message + '</span>';
  }
}

async function handleUpdateClassroom(e) {
  e.preventDefault();
  const id = document.getElementById('edit-cls-id').value;
  const name = document.getElementById('edit-cls-name').value.trim();
  const description = document.getElementById('edit-cls-desc').value.trim();
  const keyInput = document.getElementById('edit-cls-key').value.trim();
  const geminiModel = document.getElementById('edit-cls-model').value;
  const btn = document.getElementById('btn-update-submit');
  const errBox = document.getElementById('edit-cls-error');

  errBox.style.display = 'none';
  btn.disabled = true;
  btn.textContent = '⏳ กำลังบันทึก...';

  const payload = { name, description, geminiModel };
  if (keyInput !== '') {
    payload.geminiApiKey = keyInput;
  }

  try {
    const res = await teacherFetch(`/api/teacher/classrooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'บันทึกการแก้ไขไม่สำเร็จ');

    closeEditModal();
    if (window.showToast) window.showToast('บันทึกการตั้งค่าห้องเรียนเรียบร้อยแล้ว!', 'success');
    await loadTeacherProfile();
    selectClassroom(id);
  } catch (err) {
    errBox.textContent = '❌ ' + err.message;
    errBox.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'บันทึกการเปลี่ยนแปลง';
  }
}

async function deleteSelectedClassroom() {
  if (!selectedClassroomId) return;
  const cls = classrooms.find(c => c.id === selectedClassroomId);
  if (!cls) return;

  if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบห้องเรียน "${cls.name}"?\n(ข้อมูลนักเรียนและผลงานในห้องเรียนนี้ทั้งหมดจะถูกลบ)`)) {
    try {
      const res = await teacherFetch(`/api/teacher/classrooms/${cls.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('ลบไม่สำเร็จ');
      if (window.showToast) window.showToast('ลบห้องเรียนเรียบร้อยแล้ว', 'info');
      await loadTeacherProfile();
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
    }
  }
}

// ── Tab Switching inside Classroom Details ──
function switchDetailsTab(tabName) {
  document.querySelectorAll('.details-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-btn-${tabName}`).classList.add('active');

  document.getElementById('overview-view').style.display = tabName === 'overview' ? 'block' : 'none';
  document.getElementById('matrix-view').style.display = tabName === 'matrix' ? 'block' : 'none';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
