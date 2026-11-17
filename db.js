const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'pylearn.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode for high concurrency
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS teachers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS classrooms (
    id TEXT PRIMARY KEY,
    teacher_id TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    gemini_api_key TEXT,
    gemini_model TEXT DEFAULT 'gemini-2.5-flash',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    classroom_id TEXT,
    student_id_code TEXT,
    student_number TEXT,
    grade_class TEXT,
    name TEXT NOT NULL,
    password_hash TEXT,
    salt TEXT,
    session_token TEXT UNIQUE NOT NULL,
    last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS student_progress (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    classroom_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    xp INTEGER DEFAULT 0,
    exercises_completed TEXT DEFAULT '[]',
    last_exercise_id TEXT,
    attempts INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE,
    UNIQUE(student_id, lesson_id)
  );

  CREATE TABLE IF NOT EXISTS code_submissions (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    classroom_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    exercise_id TEXT NOT NULL,
    code TEXT NOT NULL,
    status TEXT NOT NULL,
    error_type TEXT,
    error_message TEXT,
    output TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS ai_interactions (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    classroom_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    exercise_id TEXT NOT NULL,
    user_code TEXT,
    ai_feedback TEXT,
    error_detected TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
  );
`);

// Safe column migrations for existing databases
try {
  db.exec('ALTER TABLE students ADD COLUMN password_hash TEXT;');
} catch {}
try {
  db.exec('ALTER TABLE students ADD COLUMN salt TEXT;');
} catch {}
try {
  db.exec('ALTER TABLE students ADD COLUMN student_id_code TEXT;');
} catch {}
try {
  db.exec('ALTER TABLE students ADD COLUMN grade_class TEXT;');
} catch {}

// Migration: Allow classroom_id to be NULL so students can register before joining a classroom
try {
  const tableInfo = db.prepare('PRAGMA table_info(students)').all();
  const classCol = tableInfo.find(c => c.name === 'classroom_id');
  if (classCol && classCol.notnull === 1) {
    db.exec('PRAGMA foreign_keys = OFF;');
    db.exec(`
      CREATE TABLE IF NOT EXISTS students_temp_migration (
        id TEXT PRIMARY KEY,
        classroom_id TEXT,
        student_id_code TEXT,
        student_number TEXT,
        grade_class TEXT,
        name TEXT NOT NULL,
        password_hash TEXT,
        salt TEXT,
        session_token TEXT UNIQUE NOT NULL,
        last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE
      );
      INSERT INTO students_temp_migration (id, classroom_id, student_id_code, student_number, grade_class, name, password_hash, salt, session_token, last_active, created_at)
      SELECT id, CASE WHEN classroom_id = '' THEN NULL ELSE classroom_id END, student_id_code, student_number, grade_class, name, password_hash, salt, session_token, last_active, created_at FROM students;
      DROP TABLE students;
      ALTER TABLE students_temp_migration RENAME TO students;
      PRAGMA foreign_keys = ON;
    `);
  }
} catch (migErr) {
  console.error('Migration notice for students table:', migErr.message);
}

module.exports = db;
