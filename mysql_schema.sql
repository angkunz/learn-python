-- ============================================================
-- PyLearn Classroom Database Schema for MySQL / MariaDB
-- ============================================================
-- รองรับการ Import ผ่าน phpMyAdmin หรือ MySQL Workbench / CLI
-- รองรับภาษาไทยสมบูรณ์ด้วย utf8mb4_unicode_ci

CREATE DATABASE IF NOT EXISTS `pylearn` 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `pylearn`;

-- 1. ตารางข้อมูลครูผู้สอน (Teachers)
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_teachers_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. ตารางห้องเรียน (Classrooms)
CREATE TABLE IF NOT EXISTS `classrooms` (
  `id` VARCHAR(64) NOT NULL,
  `teacher_id` VARCHAR(64) NOT NULL,
  `code` VARCHAR(32) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `curriculum_lessons` TEXT,
  `gemini_api_key` TEXT,
  `gemini_model` VARCHAR(100) DEFAULT 'gemini-2.5-flash',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_classrooms_code` (`code`),
  KEY `idx_classrooms_teacher` (`teacher_id`),
  CONSTRAINT `fk_classrooms_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. ตารางนักเรียน (Students)
CREATE TABLE IF NOT EXISTS `students` (
  `id` VARCHAR(64) NOT NULL,
  `classroom_id` VARCHAR(64) DEFAULT NULL,
  `student_id_code` VARCHAR(64) DEFAULT NULL,
  `student_number` VARCHAR(32) DEFAULT NULL,
  `grade_class` VARCHAR(64) DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) DEFAULT NULL,
  `salt` VARCHAR(255) DEFAULT NULL,
  `session_token` VARCHAR(191) NOT NULL,
  `last_active` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_students_token` (`session_token`),
  KEY `idx_students_classroom` (`classroom_id`),
  KEY `idx_students_id_code` (`student_id_code`),
  CONSTRAINT `fk_students_classroom` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. ตารางบันทึกความคืบหน้าของนักเรียน (Student Progress)
CREATE TABLE IF NOT EXISTS `student_progress` (
  `id` VARCHAR(64) NOT NULL,
  `student_id` VARCHAR(64) NOT NULL,
  `classroom_id` VARCHAR(64) NOT NULL,
  `lesson_id` VARCHAR(64) NOT NULL,
  `completed` TINYINT(1) DEFAULT 0,
  `xp` INT DEFAULT 0,
  `exercises_completed` TEXT,
  `last_exercise_id` VARCHAR(64) DEFAULT NULL,
  `attempts` INT DEFAULT 0,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_student_lesson` (`student_id`, `lesson_id`),
  KEY `idx_progress_student` (`student_id`),
  KEY `idx_progress_classroom` (`classroom_id`),
  CONSTRAINT `fk_progress_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_progress_classroom` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. ตารางบันทึกการส่งโค้ดแบบฝึกหัด (Code Submissions)
CREATE TABLE IF NOT EXISTS `code_submissions` (
  `id` VARCHAR(64) NOT NULL,
  `student_id` VARCHAR(64) NOT NULL,
  `classroom_id` VARCHAR(64) NOT NULL,
  `lesson_id` VARCHAR(64) NOT NULL,
  `exercise_id` VARCHAR(64) NOT NULL,
  `code` MEDIUMTEXT NOT NULL,
  `status` VARCHAR(32) NOT NULL,
  `error_type` VARCHAR(100) DEFAULT NULL,
  `error_message` TEXT,
  `output` MEDIUMTEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_submissions_student` (`student_id`),
  KEY `idx_submissions_classroom` (`classroom_id`),
  KEY `idx_submissions_error` (`error_type`),
  CONSTRAINT `fk_submissions_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_submissions_classroom` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. ตารางบันทึกการวิเคราะห์ของ AI (AI Interactions)
CREATE TABLE IF NOT EXISTS `ai_interactions` (
  `id` VARCHAR(64) NOT NULL,
  `student_id` VARCHAR(64) NOT NULL,
  `classroom_id` VARCHAR(64) NOT NULL,
  `lesson_id` VARCHAR(64) NOT NULL,
  `exercise_id` VARCHAR(64) NOT NULL,
  `user_code` MEDIUMTEXT,
  `ai_feedback` MEDIUMTEXT,
  `error_detected` VARCHAR(100) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_ai_student` (`student_id`),
  KEY `idx_ai_classroom` (`classroom_id`),
  KEY `idx_ai_error` (`error_detected`),
  CONSTRAINT `fk_ai_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ai_classroom` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
