// ============================================================
// PyLearn Classroom Client SDK
// จัดการ Session นักเรียน, ซิงค์ความคืบหน้า และเรียกใช้ AI ผ่านครูผู้สอน
// ============================================================

const CLASSROOM_SESSION_KEY = 'pylearn_student_session';

const ClassroomClient = {
  // ── Session Management ──
  getSession() {
    try {
      const raw = localStorage.getItem(CLASSROOM_SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setSession(data) {
    localStorage.setItem(CLASSROOM_SESSION_KEY, JSON.stringify(data));
  },

  clearSession() {
    localStorage.removeItem(CLASSROOM_SESSION_KEY);
  },

  isInClassroom() {
    const session = this.getSession();
    return !!(session && session.token && session.classroom);
  },

  // ── API: Join Classroom ──
  async join(code, name, studentNumber = '') {
    const res = await fetch('/api/student/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, name, studentNumber })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'ไม่สามารถเข้าร่วมห้องเรียนได้');
    }
    this.setSession(data);
    return data;
  },

  // ── API: Check/Refresh Session & Load Classroom Progress ──
  async checkSession() {
    const session = this.getSession();
    if (!session || !session.token) return null;

    try {
      const res = await fetch('/api/student/session', {
        headers: { 'Authorization': `Bearer ${session.token}` }
      });
      if (!res.ok) {
        if (res.status === 401) this.clearSession();
        return null;
      }
      const data = await res.json();
      // Update session info
      session.student = data.student;
      session.classroom = data.classroom;
      this.setSession(session);
      return data;
    } catch {
      return null;
    }
  },

  // ── API: Sync Progress & Code Submissions ──
  async syncProgress(lessonId, exerciseId, completed, xpEarned, code, status, errorType, errorMessage, output) {
    const session = this.getSession();
    if (!session || !session.token) return;

    try {
      await fetch('/api/student/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}`
        },
        body: JSON.stringify({
          lessonId,
          exerciseId,
          completed,
          xpEarned,
          code,
          status,
          errorType,
          errorMessage,
          output
        })
      });
    } catch (e) {
      console.warn('Classroom sync skipped or offline:', e.message);
    }
  },

  // ── API: Request AI Feedback using Teacher's Key ──
  async requestTeacherAI(params) {
    const session = this.getSession();
    if (!session || !session.token) {
      throw new Error('ไม่ได้อยู่ในโหมดห้องเรียน');
    }

    const res = await fetch('/api/student/ai-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify(params)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'ไม่สามารถขอคำแนะนำจาก AI ผ่านห้องเรียนได้');
    }
    return data.feedback;
  },

  // ── UI Helper: Render Classroom Header Banner ──
  renderHeaderBanner(containerId = 'classroom-banner-container') {
    const session = this.getSession();
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.prepend(container);
    }

    if (!session || !session.classroom) {
      container.innerHTML = '';
      return;
    }

    const { student, classroom } = session;
    const studentLabel = student.studentNumber ? `เลขที่ ${student.studentNumber} : ${student.name}` : student.name;

    container.innerHTML = `
      <div style="background: linear-gradient(90deg, #1e1b4b 0%, #312e81 100%); border-bottom: 1px solid rgba(129, 140, 248, 0.3); color: #e0e7ff; padding: 6px 16px; font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between; z-index: 9999; position: relative;">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span style="background: #4f46e5; color: white; padding: 2px 8px; border-radius: 999px; font-weight: 700; font-size: 0.75rem;">🏫 ห้องเรียน ${classroom.code}</span>
          <span style="font-weight: 600; color: #ffffff;">${classroom.name}</span>
          <span style="color: #a5b4fc;">(ครูผู้สอน: ${classroom.teacherName})</span>
          <span style="color: #818cf8;">|</span>
          <span>👤 นักเรียน: <b>${studentLabel}</b></span>
          ${classroom.hasTeacherApiKey ? '<span title="ใช้ API Key ของครูผู้สอน" style="background:rgba(34,197,94,0.2);color:#4ade80;padding:2px 8px;border-radius:6px;font-size:0.75rem;">⚡ AI พร้อมใช้งาน</span>' : '<span title="ครูยังไม่ได้ตั้งค่า API Key" style="background:rgba(239,68,68,0.2);color:#f87171;padding:2px 8px;border-radius:6px;font-size:0.75rem;">⚠️ รอครูใส่ AI Key</span>'}
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button onclick="ClassroomClient.confirmLeave()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #cbd5e1; padding: 2px 10px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; transition: 0.2s;" onmouseover="this.style.background='rgba(239,68,68,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
            ออกจากห้องเรียน
          </button>
        </div>
      </div>
    `;
  },

  confirmLeave() {
    if (confirm('คุณต้องการออกจากห้องเรียนนี้หรือไม่? (ความคืบหน้าที่บันทึกบนระบบของครูจะไม่สูญหาย)')) {
      this.clearSession();
      location.href = 'index.html';
    }
  }
};

window.ClassroomClient = ClassroomClient;
