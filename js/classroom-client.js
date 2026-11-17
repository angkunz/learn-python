// ============================================================
// PyLearn Classroom Client SDK
// จัดการบัญชีนักเรียน, ซิงค์ความคืบหน้า และผสาน UI เข้ากับ Navbar หลัก
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

  // ── API: Student Login (Existing Account) ──
  async login(code, studentNumber, password) {
    const res = await fetch('/api/student/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, studentNumber, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'เข้าสู่ระบบไม่สำเร็จ');
    }
    this.setSession(data);
    return data;
  },

  // ── API: Student Register (New Account) ──
  async register(code, studentNumber, name, password) {
    const res = await fetch('/api/student/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, studentNumber, name, password })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'ลงทะเบียนไม่สำเร็จ');
    }
    this.setSession(data);
    return data;
  },

  // ── API: Join (Unified fallback) ──
  async join(code, name, studentNumber = '', password = '') {
    const res = await fetch('/api/student/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, name, studentNumber, password })
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

  // ── UI Integration: Seamlessly embed into Main Navbar (No Overlapping Bars) ──
  integrateNavbar() {
    // 1. Remove any legacy banner if exists
    const legacy = document.getElementById('classroom-banner-container');
    if (legacy) legacy.remove();

    const session = this.getSession();
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Find API Key button anywhere in navbar
    const apiKeyBtn = navbar.querySelector('button[onclick*="showApiKeyModal"], button[title*="API Key"]');

    if (!session || !session.classroom) {
      // Standalone mode: ensure API Key button is visible
      if (apiKeyBtn) apiKeyBtn.style.display = '';
      return;
    }

    // In Classroom Mode: HIDE the API Key button completely!
    if (apiKeyBtn) {
      apiKeyBtn.style.display = 'none';
    }

    const { student, classroom } = session;
    const studentLabel = student.studentNumber ? `เลขที่ ${student.studentNumber} : ${student.name}` : student.name;

    // Check if classroom pill already injected
    let classPill = navbar.querySelector('.classroom-nav-pill');
    if (!classPill) {
      classPill = document.createElement('div');
      classPill.className = 'classroom-nav-pill';

      // Insert after nav-logo or in breadcrumb
      const breadcrumb = document.getElementById('lesson-breadcrumb');
      if (breadcrumb) {
        breadcrumb.prepend(classPill);
      } else {
        const navLinks = navbar.querySelector('.nav-links');
        if (navLinks) {
          navLinks.prepend(classPill);
        } else {
          navbar.querySelector('.nav-logo')?.insertAdjacentElement('afterend', classPill);
        }
      }
    }

    classPill.innerHTML = `
      <span>🏫 <b>${escapeHtml(classroom.name)}</b></span>
      <span class="badge-code">${escapeHtml(classroom.code)}</span>
      <span class="teacher-lbl">(ครู: ${escapeHtml(classroom.teacherName)})</span>
    `;

    // Inject Student info & Leave button into nav-actions
    const navActions = navbar.querySelector('.nav-actions');
    if (navActions) {
      let studentPill = navActions.querySelector('#nav-student-pill');
      if (!studentPill) {
        studentPill = document.createElement('div');
        studentPill.id = 'nav-student-pill';
        studentPill.style.display = 'flex';
        studentPill.style.alignItems = 'center';
        studentPill.style.gap = '8px';
        // Prepend before theme switch
        navActions.prepend(studentPill);
      }

      studentPill.innerHTML = `
        <span class="student-identity-badge" title="บัญชีนักเรียน">👤 ${escapeHtml(studentLabel)}</span>
        <span class="badge-ai-ready" title="AI ใช้โควตาของครูประจำห้องเรียน">⚡ AI โดยครู</span>
        <button class="btn-leave-class" onclick="ClassroomClient.confirmLeave()" title="ออกจากห้องเรียน">ออกจากห้อง</button>
      `;
    }
  },

  // Backward compatible alias
  renderHeaderBanner() {
    this.integrateNavbar();
  },

  confirmLeave() {
    if (confirm('คุณต้องการออกจากห้องเรียนนี้หรือไม่? (ความคืบหน้าที่คุณทำไว้จะยังคงถูกบันทึกบนระบบของคุณครู)')) {
      this.clearSession();
      window.location.href = 'index.html';
    }
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

window.ClassroomClient = ClassroomClient;

// Auto-run integration on load if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ClassroomClient.integrateNavbar());
} else {
  ClassroomClient.integrateNavbar();
}
