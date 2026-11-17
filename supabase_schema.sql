-- ============================================================
-- PyLearn Classroom Database Schema for Supabase (PostgreSQL)
-- ============================================================
-- วางโค้ดนี้ใน Supabase SQL Editor แล้วกด "Run" เพื่อสร้างตารางทั้งหมด

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Classrooms Table
CREATE TABLE IF NOT EXISTS classrooms (
    id TEXT PRIMARY KEY,
    teacher_id TEXT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    curriculum_lessons TEXT, -- JSON array string of lesson IDs
    gemini_api_key TEXT,    -- Stored securely on server side
    gemini_model TEXT DEFAULT 'gemini-2.5-flash',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Students Table
CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    classroom_id TEXT REFERENCES classrooms(id) ON DELETE CASCADE,
    student_id_code TEXT,   -- รหัสประจำตัวนักเรียน (สำหรับเข้าสู่ระบบ)
    student_number TEXT,    -- เลขที่
    grade_class TEXT,       -- ชั้นเรียน (เช่น ม.4/1)
    name TEXT NOT NULL,
    password_hash TEXT,
    salt TEXT,
    session_token TEXT UNIQUE NOT NULL,
    last_active TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Student Progress Table (เก็บบทเรียนที่ผ่านและ XP)
CREATE TABLE IF NOT EXISTS student_progress (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    classroom_id TEXT NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    xp INTEGER DEFAULT 0,
    exercises_completed TEXT DEFAULT '[]', -- JSON array
    last_exercise_id TEXT,
    attempts INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT student_lesson_unique UNIQUE(student_id, lesson_id)
);

-- 6. Code Submissions Table (บันทึกประวัติการส่งโค้ด)
CREATE TABLE IF NOT EXISTS code_submissions (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    classroom_id TEXT NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    exercise_id TEXT NOT NULL,
    code TEXT NOT NULL,
    status TEXT NOT NULL, -- 'pass' หรือ 'error'
    error_type TEXT,      -- เช่น 'IndentationError', 'SyntaxError'
    error_message TEXT,
    output TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. AI Interactions Table (บันทึกการตรวจและคำแนะนำของ AI)
CREATE TABLE IF NOT EXISTS ai_interactions (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    classroom_id TEXT NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    exercise_id TEXT NOT NULL,
    user_code TEXT,
    ai_feedback TEXT,     -- JSON String ของผลวิเคราะห์
    error_detected TEXT,  -- ชนิดข้อผิดพลาดหลักที่ AI ตรวจพบ
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES (เพิ่มความเร็วในการสืบค้นข้อมูลในชั้นเรียนจริง)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_classrooms_teacher ON classrooms(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classrooms_code ON classrooms(code);
CREATE INDEX IF NOT EXISTS idx_students_classroom ON students(classroom_id);
CREATE INDEX IF NOT EXISTS idx_students_id_code ON students(student_id_code);
CREATE INDEX IF NOT EXISTS idx_students_token ON students(session_token);
CREATE INDEX IF NOT EXISTS idx_progress_student ON student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_progress_classroom ON student_progress(classroom_id);
CREATE INDEX IF NOT EXISTS idx_submissions_classroom ON code_submissions(classroom_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON code_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_ai_classroom ON ai_interactions(classroom_id);

-- ============================================================
-- REALTIME REPLICATION (เปิดให้ Supabase Realtime สตรีมข้อมูลสด)
-- ============================================================
-- อนุญาตให้ Realtime แจ้งเตือนเมื่อนักเรียนส่งโค้ด หรือมีความคืบหน้าใหม่
ALTER PUBLICATION supabase_realtime ADD TABLE code_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE student_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE ai_interactions;
