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
    localStorage.removeItem('python_progress_v2');
    localStorage.removeItem('python_xp');
    if (typeof updateXPDisplay === 'function') {
      updateXPDisplay();
    }
  },

  // ── Apply Student Progress & XP from Server to Local State ──
  applyProgress(progressList = []) {
    const localProgress = {};
    let totalXp = 0;
    (progressList || []).forEach(p => {
      const exMap = {};
      (p.exercisesCompleted || []).forEach(exId => {
        exMap[exId] = true;
      });
      localProgress[p.lessonId] = {
        done: !!p.completed,
        exercises: exMap
      };
      totalXp += (p.xp || 0);
    });

    localStorage.setItem('python_progress_v2', JSON.stringify(localProgress));
    localStorage.setItem('python_xp', String(totalXp));

    if (typeof updateXPDisplay === 'function') {
      updateXPDisplay();
    }
    const navXp = document.getElementById('nav-xp');
    if (navXp) {
      navXp.textContent = `⭐ ${totalXp} XP`;
    }
    const studentXpCounter = document.getElementById('nav-xp-counter');
    if (studentXpCounter) {
      studentXpCounter.textContent = totalXp;
    }
    const menuXp = document.getElementById('menu-student-xp');
    if (menuXp) {
      menuXp.textContent = totalXp;
    }
    if (typeof renderSidebar === 'function') {
      renderSidebar();
    }
    if (typeof renderLevels === 'function') {
      renderLevels();
    }
  },

  isInClassroom() {
    const session = this.getSession();
    return !!(session && session.token && session.classroom);
  },

  async safeJson(res) {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      if (window.location.protocol === 'file:') {
        throw new Error('คุณกำลังเปิดไฟล์ผ่าน file:// กรุณาเปิดผ่าน http://localhost:3000');
      }
      if (window.location.port !== '3000' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        throw new Error(`คุณกำลังเปิดผ่านพอร์ต :${window.location.port || '80'} (ไม่ใช่พอร์ต 3000) กรุณาเปิดผ่าน http://localhost:3000`);
      }
      if (res.status === 404 || text.includes('The page') || text.includes('Cannot GET') || text.includes('<!DOCTYPE html>')) {
        throw new Error(`ไม่พบ API เซิร์ฟเวอร์ (${res.status} Not Found) กรุณาตรวจสอบว่ารัน 'node server.js' หรือ 'npm start' แล้วหรือยัง`);
      }
      throw new Error(`เซิร์ฟเวอร์ตอบกลับไม่ถูกต้อง (${res.status}): ${text.slice(0, 100)}`);
    }
  },

  // ── API: Student Login (Existing Account) ──
  async login(studentIdCode, password) {
    const res = await fetch('/api/student/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentIdCode, password })
    });
    const data = await this.safeJson(res);
    if (!res.ok) {
      throw new Error(data.error || 'เข้าสู่ระบบไม่สำเร็จ');
    }
    this.setSession(data);
    this.applyProgress(data.progress || []);
    return data;
  },

  // ── API: Student Register (Step 1: Create Account) ──
  async register(studentIdCode, name, gradeClass, studentNumber, password, classroomCode = '') {
    const res = await fetch('/api/student/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentIdCode, name, gradeClass, studentNumber, password, classroomCode })
    });
    const data = await this.safeJson(res);
    if (!res.ok) {
      throw new Error(data.error || 'ลงทะเบียนไม่สำเร็จ');
    }
    this.setSession(data);
    this.applyProgress([]); // Brand new student starts with 0 XP & clean progress
    return data;
  },

  // ── API: Join Classroom with Code (Step 2) ──
  async joinClassroom(code) {
    const session = this.getSession();
    if (!session || !session.token) {
      throw new Error('กรุณาเข้าสู่ระบบนักเรียนก่อน');
    }
    const res = await fetch('/api/student/join-classroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify({ code })
    });
    const data = await this.safeJson(res);
    if (!res.ok) {
      throw new Error(data.error || 'เข้าร่วมห้องเรียนไม่สำเร็จ');
    }
    session.classroom = data.classroom;
    session.hasClassroom = true;
    this.setSession(session);
    // Refresh student progress from server
    await this.checkSession();
    return data;
  },

  // ── API: Join (Unified fallback) ──
  async join(code, name, studentNumber = '', password = '') {
    const res = await fetch('/api/student/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, name, studentNumber, password })
    });
    const data = await this.safeJson(res);
    if (!res.ok) {
      throw new Error(data.error || 'ไม่สามารถเข้าร่วมห้องเรียนได้');
    }
    this.setSession(data);
    this.applyProgress(data.progress || []);
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
      this.applyProgress(data.progress || []);
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

  // ── UI Integration: Clean, Uncluttered Navbar ──
  integrateNavbar() {
    const session = this.getSession();
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Clean up any legacy injected elements
    document.getElementById('classroom-banner-container')?.remove();
    document.getElementById('nav-student-pill')?.remove();
    navbar.querySelectorAll('.classroom-nav-pill').forEach(el => el.remove());

    const apiKeyBtn = navbar.querySelector('button[onclick*="showApiKeyModal"], button[title*="API Key"]');

    if (!session || !session.classroom) {
      document.body.classList.remove('is-classroom-mode');
      if (apiKeyBtn) apiKeyBtn.style.display = '';
      return;
    }

    // Set classroom mode on body
    document.body.classList.add('is-classroom-mode');

    // 1. In Classroom Mode: HIDE all redundant links in navbar
    if (apiKeyBtn) {
      apiKeyBtn.style.setProperty('display', 'none', 'important');
      apiKeyBtn.classList.add('hide-in-classroom');
    }

    const playgroundActionLink = navbar.querySelector('.nav-actions a[href*="playground.html"]');
    if (playgroundActionLink) {
      playgroundActionLink.style.setProperty('display', 'none', 'important');
      playgroundActionLink.classList.add('hide-in-classroom');
    }

    // Hide redundant navigation links (เข้าห้องเรียน, สำหรับครูผู้สอน)
    navbar.querySelectorAll('a[href*="join.html"], a[href*="teacher-login.html"]').forEach(el => {
      el.style.setProperty('display', 'none', 'important');
      el.classList.add('hide-in-classroom');
    });

    // Ensure .nav-links has clean, relevant links for student
    const navLinks = navbar.querySelector('.nav-links');
    if (navLinks) {
      let lessonLink = navLinks.querySelector('a[href="lesson.html"]');
      if (!lessonLink && !document.getElementById('lesson-breadcrumb')) {
        lessonLink = document.createElement('a');
        lessonLink.href = 'lesson.html';
        lessonLink.textContent = 'บทเรียน';
        lessonLink.style.fontWeight = '700';
        navLinks.appendChild(lessonLink);
      }
    }

    const { student, classroom } = session;
    const studentLabel = student.studentNumber ? `เลขที่ ${student.studentNumber}: ${student.name}` : student.name;
    const currentXp = (window.getXP && typeof window.getXP === 'function') ? window.getXP() : (student.totalXp || 0);

    // 2. Compact Classroom Badge right next to Logo
    let tag = navbar.querySelector('.nav-classroom-tag');
    if (!tag) {
      tag = document.createElement('div');
      tag.className = 'nav-classroom-tag';
      navbar.querySelector('.nav-logo')?.insertAdjacentElement('afterend', tag);
    }
    tag.innerHTML = `
      <span class="tag-icon">🏫</span>
      <span class="tag-name">${escapeHtml(classroom.name)}</span>
      <span class="tag-code">${escapeHtml(classroom.code)}</span>
    `;
    tag.title = `ครูผู้สอน: ${classroom.teacherName}`;

    // 3. Compact Student Profile Dropdown in .nav-actions
    const navActions = navbar.querySelector('.nav-actions');
    if (navActions) {
      let dropdownWrap = navActions.querySelector('.nav-student-dropdown');
      if (!dropdownWrap) {
        dropdownWrap = document.createElement('div');
        dropdownWrap.className = 'nav-student-dropdown';
        // Prepend before theme switch
        navActions.prepend(dropdownWrap);
      }

      dropdownWrap.innerHTML = `
        <button class="nav-student-trigger" onclick="ClassroomClient.toggleMenu(event)" title="ข้อมูลผู้เรียนและห้องเรียน">
          <span class="nav-student-avatar">👤</span>
          <span class="nav-student-name">${escapeHtml(studentLabel)}</span>
          <span class="nav-student-xp">⭐ <span id="nav-xp-counter">${currentXp}</span> XP</span>
          <span class="nav-student-caret">▾</span>
        </button>
        <div class="nav-student-menu" id="nav-student-menu">
          <div class="menu-header">
            <div class="menu-name">${escapeHtml(student.name)}</div>
            <div class="menu-sub">${student.gradeClass ? 'ชั้น ' + escapeHtml(student.gradeClass) : ''} ${student.studentNumber ? 'เลขที่ ' + escapeHtml(student.studentNumber) : ''} (รหัส: ${escapeHtml(student.studentIdCode || '-')})</div>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-info-row">
            <span class="menu-info-lbl">⭐ คะแนนสะสม:</span>
            <span class="menu-info-val" style="color:var(--yellow, #eab308);font-weight:700;"><span id="menu-student-xp">${currentXp}</span> XP</span>
          </div>
          <div class="menu-info-row">
            <span class="menu-info-lbl">🏫 ห้องเรียน:</span>
            <span class="menu-info-val">${escapeHtml(classroom.name)} (${escapeHtml(classroom.code)})</span>
          </div>
          <div class="menu-info-row">
            <span class="menu-info-lbl">👩‍🏫 ครูผู้สอน:</span>
            <span class="menu-info-val">${escapeHtml(classroom.teacherName)}</span>
          </div>
          <div class="menu-divider"></div>
          <a href="lesson.html" class="menu-link-btn">📚 เข้าสู่บทเรียน</a>
          <button class="menu-leave-btn" onclick="ClassroomClient.confirmLeave()">
            🚪 ออกจากห้องเรียน
          </button>
        </div>
      `;
    }
  },

  toggleMenu(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('nav-student-menu');
    if (menu) {
      menu.classList.toggle('open');
    }
  },

  // Helper: get active curriculum lessons
  getCurriculumLessons(allLessons) {
    const session = this.getSession();
    if (!session || !session.classroom || !session.classroom.curriculum) {
      return allLessons;
    }
    const curr = session.classroom.curriculum;
    if (curr.lessonIds && Array.isArray(curr.lessonIds) && curr.lessonIds.length > 0) {
      return allLessons.filter(l => curr.lessonIds.includes(l.id));
    }
    return allLessons;
  },

  isSequential() {
    const session = this.getSession();
    return !!(session?.classroom?.curriculum?.sequential);
  },

  // Backward compatible alias
  renderHeaderBanner() {
    this.integrateNavbar();
  },

  async confirmLeave() {
    const ok = window.pylearnConfirm
      ? await window.pylearnConfirm(
          'คุณต้องการออกจากห้องเรียนนี้หรือไม่?\n(ความคืบหน้าและการส่งงานของคุณจะยังคงถูกบันทึกบนระบบของคุณครูอย่างปลอดภัย)',
          'ออกจากห้องเรียน',
          { type: 'warning', confirmText: 'ออกจากห้องเรียน', cancelText: 'อยู่ต่อ' }
        )
      : confirm('คุณต้องการออกจากห้องเรียนนี้หรือไม่? (ความคืบหน้าที่คุณทำไว้จะยังคงถูกบันทึกบนระบบของคุณครู)');
    if (ok) {
      this.clearSession();
      if (window.showToast) window.showToast('ออกจากห้องเรียนเรียบร้อยแล้ว 👋', 'info');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    }
  }
};

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-student-dropdown')) {
    document.getElementById('nav-student-menu')?.classList.remove('open');
  }
});

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
