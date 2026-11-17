// ============================================================
// PyLearn — Dual-Engine Database Adapter (MySQL / TiDB Cloud & SQLite)
// ============================================================

require('dotenv').config();
const path = require('path');
const fs = require('fs');

let dbDriver = 'sqlite';
let pool = null;
let sqliteDb = null;

// Normalizer to convert SQLite dialect specific queries to MySQL / TiDB
function normalizeQueryForMySQL(sql) {
  return sql
    .replace(/datetime\('now',\s*'localtime'\)/gi, 'NOW()')
    .replace(/datetime\('now'\)/gi, 'NOW()')
    .replace(/date\('now',\s*'-1 day',\s*'localtime'\)/gi, 'DATE_SUB(CURDATE(), INTERVAL 1 DAY)')
    .replace(/date\('now',\s*'localtime'\)/gi, 'CURDATE()')
    .replace(/CAST\((.*?)\s+AS\s+INTEGER\)/gi, 'CAST($1 AS SIGNED)');
}

// 1. Initialize MySQL / TiDB Cloud Pool if DB_TYPE is mysql
const isTiDB = String(process.env.MYSQL_HOST || '').includes('tidbcloud.com') || 
               parseInt(process.env.MYSQL_PORT || '0') === 4000 || 
               process.env.MYSQL_SSL === 'true';

if (process.env.DB_TYPE === 'mysql') {
  try {
    const mysql = require('mysql2/promise');
    const mysqlConfig = process.env.MYSQL_URL ? {
      uri: process.env.MYSQL_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ...(isTiDB ? { ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true } } : {})
    } : {
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || (isTiDB ? '4000' : '3306')),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'pylearn',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4',
      ...(isTiDB ? { ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true } } : {})
    };

    pool = mysql.createPool(mysqlConfig);
    dbDriver = 'mysql';
    console.log(`🐬 [Database] Connected to MySQL / TiDB Cloud Pool (${mysqlConfig.host || 'URI'}:${mysqlConfig.port || (isTiDB ? '4000' : '3306')}/${mysqlConfig.database || 'pylearn'})`);
  } catch (err) {
    console.warn(`⚠️ [Database] Failed to initialize MySQL pool: ${err.message}. Falling back to SQLite.`);
    dbDriver = 'sqlite';
  }
}

// 2. Initialize SQLite Fallback & Schema Migration
function initSqliteSchema(sDb) {
  sDb.exec(`
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
      curriculum_lessons TEXT,
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
}

function getSqliteDb() {
  if (!sqliteDb) {
    const { DatabaseSync } = require('node:sqlite');
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'pylearn.db');
    sqliteDb = new DatabaseSync(dbPath);
    sqliteDb.exec('PRAGMA journal_mode = WAL;');
    sqliteDb.exec('PRAGMA foreign_keys = ON;');
    initSqliteSchema(sqliteDb);
  }
  return sqliteDb;
}

if (dbDriver === 'sqlite') {
  console.log('📦 [Database] Using local SQLite database (data/pylearn.db)');
  getSqliteDb();
}

// 3. Unified Async DB Adapter Interface
const db = {
  get driver() {
    return dbDriver;
  },

  prepare(sql) {
    if (dbDriver === 'mysql' && pool) {
      const normSql = normalizeQueryForMySQL(sql);
      return {
        async get(...params) {
          const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
          const [rows] = await pool.query(normSql, flatParams);
          return rows && rows.length > 0 ? rows[0] : undefined;
        },
        async all(...params) {
          const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
          const [rows] = await pool.query(normSql, flatParams);
          return rows || [];
        },
        async run(...params) {
          const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
          const [result] = await pool.query(normSql, flatParams);
          return {
            changes: result.affectedRows || 0,
            lastInsertRowid: result.insertId || null
          };
        }
      };
    } else {
      const sqlite = getSqliteDb();
      const stmt = sqlite.prepare(sql);
      return {
        async get(...params) {
          const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
          return stmt.get(...flatParams);
        },
        async all(...params) {
          const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
          return stmt.all(...flatParams);
        },
        async run(...params) {
          const flatParams = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
          return stmt.run(...flatParams);
        }
      };
    }
  },

  async query(sql, params = []) {
    if (dbDriver === 'mysql' && pool) {
      const normSql = normalizeQueryForMySQL(sql);
      const [rows] = await pool.query(normSql, params);
      return rows;
    } else {
      const sqlite = getSqliteDb();
      return sqlite.prepare(sql).all(...params);
    }
  },

  async exec(sql) {
    if (dbDriver === 'mysql' && pool) {
      await pool.query(sql);
    } else {
      getSqliteDb().exec(sql);
    }
  }
};

module.exports = db;
