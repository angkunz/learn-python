// ============================================================
// PyLearn — MySQL Connection & Migration Verification Tool
// ============================================================
// สคริปต์ทดสอบการเชื่อมต่อ MySQL และตรวจสอบตารางข้อมูล

require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function testMySQL() {
  console.log('🐬 กำลังทดสอบการเชื่อมต่อ MySQL / MariaDB...\n');

  const isTiDB = String(process.env.MYSQL_HOST || '').includes('tidbcloud.com') || 
                 parseInt(process.env.MYSQL_PORT || '0') === 4000 || 
                 process.env.MYSQL_SSL === 'true';

  const config = process.env.MYSQL_URL ? {
    uri: process.env.MYSQL_URL,
    ...(isTiDB ? { ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true } } : {})
  } : {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || (isTiDB ? '4000' : '3306')),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'pylearn',
    charset: 'utf8mb4',
    ...(isTiDB ? { ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true } } : {})
  };

  console.log(`📌 ข้อมูลการเชื่อมต่อ:`);
  console.log(`   - Host: ${config.host || 'URI'}`);
  console.log(`   - Port: ${config.port || (isTiDB ? '4000' : '3306')}`);
  console.log(`   - User: ${config.user || '-'}`);
  console.log(`   - Database: ${config.database || '-'}`);
  console.log(`   - SSL: ${isTiDB ? 'เปิดใช้งาน (TLSv1.2 สำหรับ TiDB Cloud / Cloud MySQL)' : 'ปิด (Localhost)'}\n`);

  let connection;
  try {
    // 1. ลองเชื่อมต่อแบบไม่ระบุ Database ก่อน เผื่อยังไม่ได้สร้าง Database
    const testConfig = { ...config };
    delete testConfig.database;
    connection = await mysql.createConnection(testConfig);
    console.log('✅ 1. เชื่อมต่อไปยัง MySQL Server สำเร็จ!');

    // 2. ตรวจสอบหรือสร้าง Database
    const dbName = config.database || 'pylearn';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${dbName}\`;`);
    console.log(`✅ 2. ตรวจสอบ Database [${dbName}] สำเร็จ!`);

    // 3. ตรวจสอบตารางใน Database
    const [tables] = await connection.query('SHOW TABLES;');
    const tableNames = tables.map(t => Object.values(t)[0]);
    console.log(`\n📋 ตารางที่พบใน [${dbName}]: (${tableNames.length} ตาราง)`);
    if (tableNames.length > 0) {
      tableNames.forEach(name => console.log(`   - ${name}`));
    } else {
      console.log('   (ยังไม่มีตารางใน Database)');
    }

    const requiredTables = ['teachers', 'classrooms', 'students', 'student_progress', 'code_submissions', 'ai_interactions'];
    const missingTables = requiredTables.filter(t => !tableNames.includes(t));

    if (missingTables.length > 0) {
      console.log(`\n⚠️ ยังขาดตาราง: [${missingTables.join(', ')}]`);
      console.log('🚀 กำลังรันไฟล์ mysql_schema.sql เพื่อสร้างตารางทั้งหมดให้อัตโนมัติ...');

      const schemaPath = path.join(__dirname, 'mysql_schema.sql');
      if (fs.existsSync(schemaPath)) {
        const sqlContent = fs.readFileSync(schemaPath, 'utf8');
        // Split by statement
        const statements = sqlContent
          .split(/;\s*$/m)
          .map(s => s.trim())
          .filter(s => s.length > 0 && !s.startsWith('--'));

        for (const sql of statements) {
          if (sql) await connection.query(sql);
        }
        console.log('🎉 สร้างตาราง MySQL ทั้งหมดเรียบร้อยแล้ว 100%!');
      } else {
        console.error('❌ ไม่พบไฟล์ mysql_schema.sql');
      }
    } else {
      console.log('\n🎉 เยี่ยมมาก! ตารางข้อมูลทั้งหมดของ PyLearn พร้อมใช้งานแล้ว 100%!');
    }

    console.log('\n======================================================');
    console.log('💡 วิธีเปิดใช้งาน MySQL ในระบบ PyLearn:');
    console.log('1. เปิดไฟล์ .env แล้วตั้งค่า:');
    console.log('   DB_TYPE=mysql');
    console.log('2. สั่งรันเว็บด้วย: npm start');
    console.log('======================================================\n');

  } catch (err) {
    console.error('\n❌ เชื่อมต่อ MySQL ไม่สำเร็จ:');
    console.error(`   Error Code: ${err.code || 'UNKNOWN'}`);
    console.error(`   Message: ${err.message}\n`);
    console.log('💡 คำแนะนำการแก้ไข:');
    console.log('1. ตรวจสอบว่าเปิดโปรแกรม MySQL แล้วหรือยัง (เช่น กด Start โมดูล MySQL ใน XAMPP / Laragon)');
    console.log('2. ตรวจสอบ User / Password ในไฟล์ .env ให้ตรงกับ MySQL ของเครื่องคุณ');
    console.log('3. พอร์ตเริ่มต้นโดยปกติคือ 3306\n');
  } finally {
    if (connection) await connection.end();
  }
}

testMySQL();
