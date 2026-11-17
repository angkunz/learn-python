// Integration Test Suite for PyLearn Classroom Edition
const assert = require('assert');

async function runTests() {
  console.log('🚀 Starting PyLearn Classroom Test Suite...\n');
  const baseUrl = 'http://localhost:3000';

  // 1. Teacher Register
  console.log('1. Testing Teacher Registration...');
  const testEmail = `teacher_${Date.now()}@testschool.ac.th`;
  const regRes = await fetch(`${baseUrl}/api/teacher/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'อาจารย์วิทยาศาสตร์ สอนดี',
      email: testEmail,
      password: 'password123'
    })
  });
  const regData = await regRes.json();
  assert.strictEqual(regRes.status, 200, `Register failed: ${JSON.stringify(regData)}`);
  assert.ok(regData.token, 'Token missing');
  assert.strictEqual(regData.teacher.name, 'อาจารย์วิทยาศาสตร์ สอนดี');
  const teacherToken = regData.token;
  console.log('   ✅ Teacher registered successfully! Teacher ID:', regData.teacher.id);

  // 2. Teacher Login
  console.log('\n2. Testing Teacher Login...');
  const loginRes = await fetch(`${baseUrl}/api/teacher/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: 'password123' })
  });
  const loginData = await loginRes.json();
  assert.strictEqual(loginRes.status, 200);
  assert.ok(loginData.token);
  console.log('   ✅ Teacher login verified!');

  // 3. Create Classroom
  console.log('\n3. Testing Classroom Creation...');
  const createClassRes = await fetch(`${baseUrl}/api/teacher/classrooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${teacherToken}`
    },
    body: JSON.stringify({
      name: 'วิชาการเขียนโปรแกรม ม.4/1',
      description: 'ภาคเรียนที่ 1 ปีการศึกษา 2569',
      geminiApiKey: 'AIzaSyDummyKeyForTestingOnly12345',
      geminiModel: 'gemini-2.5-flash'
    })
  });
  const classData = await createClassRes.json();
  assert.strictEqual(createClassRes.status, 200);
  const classroom = classData.classroom;
  assert.ok(classroom.id);
  assert.ok(classroom.code && classroom.code.length === 6);
  assert.strictEqual(classroom.hasApiKey, true);
  console.log(`   ✅ Classroom created! Name: "${classroom.name}", Code: [${classroom.code}]`);

  // 4. Student Register & Login with Password / PIN
  console.log('\n4. Testing Student Account Register & Login...');
  const regStdRes = await fetch(`${baseUrl}/api/student/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: classroom.code,
      name: 'เด็กชายสมเกียรติ มุ่งมั่น',
      studentNumber: '05',
      password: 'mypassword123'
    })
  });
  const regStdText = await regStdRes.text();
  let regStdData;
  try {
    regStdData = JSON.parse(regStdText);
  } catch (err) {
    console.error('Register response was not JSON! Status:', regStdRes.status, 'Body:', regStdText);
    throw err;
  }
  assert.strictEqual(regStdRes.status, 200, `Student register failed: ${JSON.stringify(regStdData)}`);
  assert.ok(regStdData.token);
  const studentId = regStdData.student.id;
  console.log(`   ✅ Student registered account! ID: ${studentId}, Name: ${regStdData.student.name}`);

  // Test Student Login
  const loginStdRes = await fetch(`${baseUrl}/api/student/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: classroom.code,
      studentNumber: '05',
      password: 'mypassword123'
    })
  });
  const loginStdData = await loginStdRes.json();
  assert.strictEqual(loginStdRes.status, 200, 'Student login failed');
  assert.ok(loginStdData.token);
  let studentToken = loginStdData.token;
  console.log('   ✅ Student login with Student Number and Password verified!');

  // Test Teacher Reset Student Password
  const resetRes = await fetch(`${baseUrl}/api/teacher/classrooms/${classroom.id}/students/${studentId}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${teacherToken}`
    },
    body: JSON.stringify({ newPassword: 'newpin9999' })
  });
  assert.strictEqual(resetRes.status, 200);
  console.log('   ✅ Teacher reset student password verified!');

  // Verify login with new password
  const newLoginRes = await fetch(`${baseUrl}/api/student/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: classroom.code,
      studentNumber: '05',
      password: 'newpin9999'
    })
  });
  assert.strictEqual(newLoginRes.status, 200);
  const newLoginData = await newLoginRes.json();
  studentToken = newLoginData.token;
  console.log('   ✅ Student login with updated password verified!');

  // 5. Student Progress & Code Submission
  console.log('\n5. Testing Student Code Submissions (Pass & Error Tracking)...');
  // 5.1 Simulate a failed attempt with IndentationError
  const failRes = await fetch(`${baseUrl}/api/student/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${studentToken}`
    },
    body: JSON.stringify({
      lessonId: '1-hello-world',
      exerciseId: 'ex_1',
      completed: false,
      xpEarned: 0,
      code: 'for i in range(5):\nprint(i)',
      status: 'fail',
      errorType: 'IndentationError',
      errorMessage: 'IndentationError: expected an indented block',
      output: 'IndentationError: expected an indented block after "for" statement on line 1'
    })
  });
  assert.strictEqual(failRes.status, 200);

  // 5.2 Simulate successful submission
  const passRes = await fetch(`${baseUrl}/api/student/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${studentToken}`
    },
    body: JSON.stringify({
      lessonId: '1-hello-world',
      exerciseId: 'ex_1',
      completed: true,
      xpEarned: 20,
      code: 'for i in range(5):\n    print(i)',
      status: 'pass',
      errorType: null,
      errorMessage: null,
      output: '0\n1\n2\n3\n4'
    })
  });
  assert.strictEqual(passRes.status, 200);
  console.log('   ✅ Submissions recorded: 1 IndentationError logged, 1 Pass logged!');

  // 6. Teacher Classroom Overview & Analytics
  console.log('\n6. Testing Teacher Classroom Analytics & Error Focus...');
  const overviewRes = await fetch(`${baseUrl}/api/teacher/classrooms/${classroom.id}/overview`, {
    headers: { 'Authorization': `Bearer ${teacherToken}` }
  });
  const overviewData = await overviewRes.json();
  assert.strictEqual(overviewRes.status, 200);
  assert.strictEqual(overviewData.stats.totalStudents, 1);
  assert.strictEqual(overviewData.stats.totalSubmissions, 2);
  assert.ok(overviewData.commonErrors.some(e => e.error_type === 'IndentationError'), 'IndentationError should be tracked');
  console.log('   ✅ Overview Analytics confirmed!');
  console.log('      - Total Students:', overviewData.stats.totalStudents);
  console.log('      - Pass Rate:', overviewData.stats.passRate + '%');
  console.log('      - Common Errors tracked:', overviewData.commonErrors.map(e => `${e.error_type} (${e.count})`).join(', '));
  console.log('      - Teacher Focus Insights:', overviewData.insights[0]);

  // 7. Teacher Classroom Progress Matrix
  console.log('\n7. Testing Progress Matrix...');
  const matrixRes = await fetch(`${baseUrl}/api/teacher/classrooms/${classroom.id}/matrix`, {
    headers: { 'Authorization': `Bearer ${teacherToken}` }
  });
  const matrixData = await matrixRes.json();
  assert.strictEqual(matrixRes.status, 200);
  assert.strictEqual(matrixData.students.length, 1);
  const matrixStudent = matrixData.students[0];
  assert.strictEqual(matrixStudent.name, 'เด็กชายสมเกียรติ มุ่งมั่น');
  assert.strictEqual(matrixStudent.total_xp, 20);
  console.log('   ✅ Progress Matrix verified! Student XP:', matrixStudent.total_xp);

  // 8. Individual Student Detailed Inspection
  console.log('\n8. Testing Individual Student Diagnostics & Code Inspector...');
  const studentRes = await fetch(`${baseUrl}/api/teacher/classrooms/${classroom.id}/students/${studentId}`, {
    headers: { 'Authorization': `Bearer ${teacherToken}` }
  });
  const studentDetail = await studentRes.json();
  assert.strictEqual(studentRes.status, 200);
  assert.ok(studentDetail.diagnosis);
  assert.ok(studentDetail.recentSubmissions.length >= 2);
  console.log('   ✅ Individual Student Profile loaded:');
  console.log('      - Skill Level:', studentDetail.diagnosis.skillLevel);
  console.log('      - Recent Submissions inspected:', studentDetail.recentSubmissions.length);
  console.log('      - Inspected Code preview:', studentDetail.recentSubmissions[0].code.trim());
  console.log('      - Coaching Recommendation:', studentDetail.diagnosis.coachingTip);

  // 9. Export CSV
  console.log('\n9. Testing CSV Export...');
  const csvRes = await fetch(`${baseUrl}/api/teacher/classrooms/${classroom.id}/export-csv`, {
    headers: { 'Authorization': `Bearer ${teacherToken}` }
  });
  assert.strictEqual(csvRes.status, 200);
  const csvText = await csvRes.text();
  assert.ok(csvText.includes('เด็กชายสมเกียรติ มุ่งมั่น'));
  console.log('   ✅ CSV Export generated successfully (UTF-8 with Thai support)!');

  console.log('\n======================================================');
  console.log('🎉 ALL TESTS PASSED! PyLearn Classroom is 100% operational!');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
