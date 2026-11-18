// ================================================
// App — State, Progress, Validation & Navigation
// ================================================

// ── HTML Escape Helper (XSS Prevention) ──
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const PROGRESS_KEY = 'python_progress_v2';
const XP_KEY = 'python_xp';

// ── Progress & Strict 3-Exercise Completion System ──
function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
  catch { return {}; }
}
function saveProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function getLessonExerciseStats(lessonId) {
  const lesson = (typeof getLessonById === 'function') ? getLessonById(lessonId) : null;
  const exercises = Array.isArray(lesson?.exercises) ? lesson.exercises : [];
  const p = getProgress();
  const exDoneMap = p[lessonId]?.exercises || {};

  const completedIds = [];
  const missingNumbers = [];

  exercises.forEach((ex, idx) => {
    if (exDoneMap[ex.id]) {
      completedIds.push(ex.id);
    } else {
      missingNumbers.push(idx + 1);
    }
  });

  const total = exercises.length;
  const doneCount = completedIds.length;
  const allDone = total > 0 ? doneCount >= total : true;

  return {
    total,
    doneCount,
    allDone,
    completedIds,
    missingNumbers
  };
}

function areAllExercisesDone(lessonId) {
  return getLessonExerciseStats(lessonId).allDone;
}

/**
 * ตรวจสอบความถูกต้องของโค้ดและผลรันระดับรายข้อ (ป้องกันโค้ดว่าง โค้ดค้าง # TODO และการพิมพ์ print ทางลัด)
 */
function validateExerciseSubmission(lessonId, exId, userCode, runResult) {
  const lesson = (typeof getLessonById === 'function') ? getLessonById(lessonId) : null;
  const ex = lesson?.exercises?.find(item => item.id === exId);

  if (!runResult || !runResult.success) {
    return { passed: false, reason: 'โค้ดยังมีข้อผิดพลาด (Error) กรุณาแก้ไขก่อนส่งตรวจ' };
  }

  const stripComments = (src) => String(src || '')
    .split('\n')
    .map(l => l.replace(/#.*$/, '').trim())
    .filter(Boolean)
    .join('\n');

  const cleanUser = stripComments(userCode);
  const cleanStarter = stripComments(ex?.starterCode || '');

  if (!cleanUser) {
    return { passed: false, reason: 'กรุณาเขียนโค้ดคำสั่ง Python ก่อนส่งตรวจ' };
  }
  if (userCode.includes('???') || /#\s*TODO/i.test(userCode)) {
    return { passed: false, reason: 'ยังเติมโค้ดในจุด # TODO หรือ ??? ไม่ครบถ้วน' };
  }
  if (cleanStarter && cleanUser === cleanStarter) {
    return { passed: false, reason: 'คุณยังไม่ได้แก้ไขหรือเติมโค้ดเพิ่มเติมจากโครงร่างตั้งต้น' };
  }

  // ตรวจโครงสร้างคำสั่งบังคับตามเฉลยต้นแบบ (ป้องกันการเขียน print() คำตอบลอยๆ)
  if (ex?.solution) {
    const sol = ex.solution;
    const astInfo = (typeof analyzePythonStructure === 'function') ? analyzePythonStructure(userCode) : null;

    const checks = [
      { need: /\binput\s*\(/.test(sol), ok: astInfo ? astInfo.callsInput : /\binput\s*\(/.test(cleanUser), msg: 'โจทย์ข้อนี้กำหนดให้รับข้อมูลด้วยคำสั่ง input()' },
      { need: /\bfor\s+\w+\s+in\b/.test(sol) && !/\[.+\bfor\b.+\]/.test(sol), ok: astInfo ? (astInfo.hasFor || astInfo.hasListComp) : /\bfor\b/.test(cleanUser), msg: 'โจทย์ข้อนี้ต้องการให้ฝึกใช้ลูป for' },
      { need: /\bwhile\s+/.test(sol), ok: astInfo ? astInfo.hasWhile : /\bwhile\b/.test(cleanUser), msg: 'โจทย์ข้อนี้ต้องการให้ฝึกใช้ลูป while' },
      { need: /\bdef\s+\w+/.test(sol), ok: astInfo ? astInfo.hasFunctionDef : /\bdef\s+\w+/.test(cleanUser), msg: 'โจทย์ข้อนี้กำหนดให้สร้างฟังก์ชันด้วย def' },
      { need: /\bclass\s+\w+/.test(sol), ok: astInfo ? astInfo.hasClassDef : /\bclass\s+\w+/.test(cleanUser), msg: 'โจทย์ข้อนี้กำหนดให้สร้างคลาสด้วย class' },
      { need: /\btry\s*:/.test(sol), ok: astInfo ? astInfo.hasTry : /\btry\s*:/.test(cleanUser), msg: 'โจทย์ข้อนี้กำหนดให้ดักจับข้อผิดพลาดด้วย try / except' },
      { need: /\byield\b/.test(sol), ok: astInfo ? astInfo.hasYield : /\byield\b/.test(cleanUser), msg: 'โจทย์ข้อนี้กำหนดให้สร้าง Generator ด้วยคำสั่ง yield' }
    ];

    for (const rule of checks) {
      if (rule.need && !rule.ok) {
        return { passed: false, reason: rule.msg };
      }
    }
  }

  // ตรวจเทียบ expectedOutput (กรณีโจทย์มีผลลัพธ์ตายตัว)
  const expected = String(ex?.expectedOutput || '').trim();
  const actual = String(runResult.output || '').trim();

  if (expected) {
    const norm = (s) => s.split('\n').map(line => line.trimEnd()).join('\n').trim();
    if (norm(actual) !== norm(expected)) {
      return { passed: false, reason: 'ผลลัพธ์บนหน้าจอยังไม่ตรงตามที่โจทย์กำหนด' };
    }
  } else if (!actual) {
    return { passed: false, reason: 'โปรแกรมยังไม่มีข้อความแสดงผลออกทางหน้าจอ (print)' };
  }

  return { passed: true, reason: 'ผ่านเกณฑ์ครบถ้วน' };
}

function markLessonDone(lessonId, options = {}) {
  const { silent = false, autoTriggered = false } = options;
  const stats = getLessonExerciseStats(lessonId);

  if (!stats.allDone) {
    if (!silent) {
      const remainText = stats.missingNumbers.map(n => `ข้อที่ ${n}`).join(', ');
      showToast(
        `ต้องทำแบบฝึกหัดให้ผ่านครบทั้ง ${stats.total} ข้อก่อนจบบทเรียน (ผ่านแล้ว ${stats.doneCount}/${stats.total} — ยังเหลือ ${remainText})`,
        'warning',
        4200,
        'ยังจบบทเรียนไม่ได้ 🔒'
      );
    }
    syncCompleteButtonState(lessonId);
    return false;
  }

  const p = getProgress();
  if (!p[lessonId]) p[lessonId] = {};

  if (!p[lessonId].done) {
    p[lessonId].done = true;
    p[lessonId].ts = Date.now();
    saveProgress(p);
    addXP(50);
    syncCompleteButtonState(lessonId);
    if (typeof renderSidebar === 'function') renderSidebar();

    // ซิงค์สถานะจบบทเรียน (+50 XP) ขึ้นเซิร์ฟเวอร์ห้องเรียนอัตโนมัติ
    if (window.ClassroomClient && ClassroomClient.isInClassroom()) {
      ClassroomClient.syncProgress(lessonId, null, true, 50, '', 'completed', null, null, '');
    }

    if (autoTriggered && !silent) {
      celebrate();
      showToast(
        `ยอดเยี่ยม! คุณทำแบบฝึกหัดครบทั้ง ${stats.total}/${stats.total} ข้อ ระบบบันทึกผ่านบทเรียนและมอบโบนัส +50 XP ให้เรียบร้อยแล้ว`,
        'success',
        4800,
        'ผ่านบทเรียนสมบูรณ์ 🎉'
      );
    }
    return true;
  }

  syncCompleteButtonState(lessonId);
  return false;
}

function markExerciseDone(lessonId, exId, options = {}) {
  const { autoCompleteLesson = true } = options;
  const p = getProgress();
  if (!p[lessonId]) p[lessonId] = {};
  if (!p[lessonId].exercises) p[lessonId].exercises = {};

  const isNew = !p[lessonId].exercises[exId];
  p[lessonId].exercises[exId] = true;
  saveProgress(p);
  if (isNew) addXP(20);

  syncCompleteButtonState(lessonId);

  // Auto-Complete บทเรียนทันทีเมื่อทำผ่านครบทุกข้อ (ป้องกันเด็กทำครบ 3 ข้อแล้วลืมกดปุ่มท้ายหน้า)
  const stats = getLessonExerciseStats(lessonId);
  if (autoCompleteLesson && stats.total > 0 && stats.allDone && !p[lessonId]?.done) {
    markLessonDone(lessonId, { autoTriggered: true });
  }
  return isNew;
}

function isLessonDone(lessonId) {
  const p = getProgress();
  return !!(p[lessonId]?.done) && areAllExercisesDone(lessonId);
}

function isExerciseDone(lessonId, exId) {
  const p = getProgress();
  return !!(p[lessonId]?.exercises?.[exId]);
}

function getLevelProgress(level) {
  const lessons = getLessonsByLevel(level);
  const done = lessons.filter(l => isLessonDone(l.id)).length;
  return { done, total: lessons.length, pct: lessons.length ? Math.round(done / lessons.length * 100) : 0 };
}

// ── UI Lock & Sequential Guard on lesson.html ──
function getCurrentPageLessonId() {
  if (window.currentLesson && window.currentLesson.id) {
    return window.currentLesson.id;
  }
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('id');
  if (fromUrl) return fromUrl;

  const activeSidebarItem = document.querySelector('.sidebar-lesson.active[data-id], .sidebar-lesson.active[href*="id="]');
  if (activeSidebarItem) {
    if (activeSidebarItem.dataset.id) return activeSidebarItem.dataset.id;
    const hrefMatch = activeSidebarItem.getAttribute('href')?.match(/[?&]id=([^&]+)/);
    if (hrefMatch) return hrefMatch[1];
  }

  if (typeof LESSONS_DATA !== 'undefined' && Array.isArray(LESSONS_DATA) && LESSONS_DATA.length > 0) {
    return LESSONS_DATA[0].id;
  }
  return null;
}

function enforceSequentialLessonAccess() {
  if (!window.location.pathname.endsWith('lesson.html')) return;
  if (!window.ClassroomClient || !ClassroomClient.isInClassroom() || !ClassroomClient.isSequential()) return;
  if (typeof LESSONS_DATA === 'undefined' || !Array.isArray(LESSONS_DATA)) return;

  const currentId = getCurrentPageLessonId();
  if (!currentId) return;

  const activeLessons = ClassroomClient.getCurriculumLessons(LESSONS_DATA);
  const targetIdx = activeLessons.findIndex(l => l.id === currentId);
  if (targetIdx <= 0) return;

  // ค้นหาบทเรียนแรกสุดที่ยังทำไม่ผ่านครบทุกข้อ
  for (let i = 0; i < targetIdx; i++) {
    const prevLesson = activeLessons[i];
    if (!isLessonDone(prevLesson.id)) {
      showToast(
        `ห้องเรียนนี้กำหนดให้เรียนตามลำดับ กรุณาทำบท "${prevLesson.title}" ให้ครบทั้ง 3 ข้อก่อนครับ`,
        'warning',
        3800,
        'ล็อกลำดับบทเรียน 🔒'
      );
      setTimeout(() => {
        window.location.replace(`lesson.html?id=${encodeURIComponent(prevLesson.id)}`);
      }, 900);
      return;
    }
  }
}

function injectCompletionLockStyles() {
  if (document.getElementById('pylearn-complete-lock-styles')) return;
  const style = document.createElement('style');
  style.id = 'pylearn-complete-lock-styles';
  style.textContent = `
    .btn-complete.is-locked {
      background: var(--bg-alt, #e2e8f0) !important;
      color: var(--text-secondary, #5a5a66) !important;
      border-style: dashed !important;
      cursor: not-allowed !important;
      opacity: 0.88;
      box-shadow: none !important;
      transform: none !important;
    }
    [data-theme="dark"] .btn-complete.is-locked {
      background: #1e2430 !important;
      color: #94a3b8 !important;
      border-color: rgba(255, 255, 255, 0.25) !important;
    }
  `;
  document.head.appendChild(style);
}

function syncCompleteButtonState(targetLessonId = null) {
  const lessonId = targetLessonId || getCurrentPageLessonId();
  if (!lessonId) return;

  const buttons = document.querySelectorAll('.btn-complete, #btn-complete, #complete-btn');
  if (!buttons.length) return;

  injectCompletionLockStyles();

  const stats = getLessonExerciseStats(lessonId);
  const lessonCompleted = isLessonDone(lessonId);
  const stateKey = `${lessonId}:${stats.doneCount}/${stats.total}:${lessonCompleted}`;

  buttons.forEach(btn => {
    if (btn.dataset.lockState === stateKey) return;
    btn.dataset.lockState = stateKey;

    if (lessonCompleted) {
      btn.classList.remove('is-locked');
      btn.removeAttribute('aria-disabled');
      btn.innerHTML = '✓ เรียนจบบทนี้แล้ว';
      btn.title = 'คุณผ่านแบบฝึกหัดครบทุกข้อและเรียนจบบทนี้เรียบร้อยแล้ว';
    } else if (!stats.allDone) {
      btn.classList.add('is-locked');
      btn.setAttribute('aria-disabled', 'true');
      btn.innerHTML = `🔒 ทำแบบฝึกหัดให้ครบ (${stats.doneCount}/${stats.total} ข้อ)`;
      btn.title = `ต้องทำแบบฝึกหัดผ่านครบทั้ง ${stats.total} ข้อก่อนจึงจะจบบทเรียนได้`;
    } else {
      btn.classList.remove('is-locked');
      btn.removeAttribute('aria-disabled');
      btn.innerHTML = '✓ เรียนจบบทนี้ (+50 XP)';
      btn.title = 'ผ่านแบบฝึกหัดครบทุกข้อแล้ว กดเพื่อยืนยันจบบทเรียน';
    }
  });
}

// ── XP System ──
function getXP() {
  return parseInt(localStorage.getItem(XP_KEY) || '0');
}
function addXP(amount) {
  const current = getXP();
  localStorage.setItem(XP_KEY, current + amount);
  updateXPDisplay();
}
function updateXPDisplay() {
  const el = document.getElementById('nav-xp');
  if (el) el.textContent = `⭐ ${getXP()} XP`;
}

// ── Navigation ──
function navigateToLesson(lessonId) {
  if (window.ClassroomClient && ClassroomClient.isInClassroom() && ClassroomClient.isSequential() && typeof LESSONS_DATA !== 'undefined') {
    const activeLessons = ClassroomClient.getCurriculumLessons(LESSONS_DATA);
    const targetIdx = activeLessons.findIndex(l => l.id === lessonId);
    for (let i = 0; i < targetIdx; i++) {
      if (!isLessonDone(activeLessons[i].id)) {
        showToast(
          `กรุณาเรียนและทำแบบฝึกหัดบท "${activeLessons[i].title}" ให้ครบ 3 ข้อก่อนข้ามไปบทถัดไป`,
          'warning',
          3800,
          'เรียนตามลำดับ 🔒'
        );
        return;
      }
    }
  }
  window.location.href = `lesson.html?id=${lessonId}`;
}
function navigateToIndex() {
  window.location.href = 'index.html';
}

// ── Celebration ──
function celebrate() {
  const container = document.createElement('div');
  container.className = 'celebration';
  document.body.appendChild(container);

  const colors = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.cssText = `
      left: ${Math.random() * 100}%;
      top: -10%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      animation-delay: ${Math.random() * 1.5}s;
      animation-duration: ${2 + Math.random() * 2}s;
    `;
    container.appendChild(c);
  }
  setTimeout(() => container.remove(), 4000);
}

// ── Toast Notification ──
function showToast(message, type = 'info', duration = 3500, title = null) {
  let container = document.getElementById('pylearn-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'pylearn-toast-container';
    container.className = 'pylearn-toast-container';
    document.body.appendChild(container);
  }

  while (container.children.length >= 3) {
    container.firstElementChild.remove();
  }

  const typeConfig = {
    success: { icon: '✨', tag: 'สำเร็จ', defaultTitle: 'เยี่ยมมาก!' },
    error:   { icon: '🚨', tag: 'ข้อผิดพลาด', defaultTitle: 'เกิดข้อผิดพลาด' },
    warning: { icon: '⚠️', tag: 'คำเตือน', defaultTitle: 'ข้อควรระวัง' },
    info:    { icon: '💡', tag: 'แจ้งเตือน', defaultTitle: 'ข้อมูล' }
  };
  const cfg = typeConfig[type] || typeConfig.info;

  const toast = document.createElement('div');
  toast.className = `pylearn-toast toast-notif pylearn-toast-${type}`;

  const headerTitle = title || cfg.defaultTitle;

  toast.innerHTML = `
    <div class="pylearn-toast-accent pylearn-toast-accent-${type}"></div>
    <div class="pylearn-toast-icon-wrap pylearn-toast-icon-${type}">
      ${cfg.icon}
    </div>
    <div class="pylearn-toast-content">
      <div class="pylearn-toast-header">
        <span class="pylearn-toast-tag pylearn-toast-tag-${type}">${cfg.tag}</span>
        <span class="pylearn-toast-title">${escapeHtml(headerTitle)}</span>
      </div>
      <div class="pylearn-toast-message">${escapeHtml(message)}</div>
    </div>
    <button class="pylearn-toast-close" title="ปิดการแจ้งเตือน" aria-label="Close">✕</button>
    <div class="pylearn-toast-progress">
      <div class="pylearn-toast-progress-bar pylearn-toast-bar-${type}"></div>
    </div>
  `;

  const closeBtn = toast.querySelector('.pylearn-toast-close');
  const progressBar = toast.querySelector('.pylearn-toast-progress-bar');

  let isDismissed = false;
  let timer = null;

  const dismiss = () => {
    if (isDismissed) return;
    isDismissed = true;
    if (timer) clearTimeout(timer);
    toast.classList.add('pylearn-toast-hiding');
    setTimeout(() => toast.remove(), 280);
  };

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dismiss();
  });

  if (progressBar) {
    progressBar.style.transition = `width ${duration}ms linear`;
    requestAnimationFrame(() => {
      progressBar.style.width = '0%';
    });
  }

  timer = setTimeout(dismiss, duration);

  toast.addEventListener('mouseenter', () => {
    if (timer) clearTimeout(timer);
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '100%';
    }
  });

  toast.addEventListener('mouseleave', () => {
    timer = setTimeout(dismiss, 1500);
    if (progressBar) {
      progressBar.style.transition = 'width 1500ms linear';
      requestAnimationFrame(() => {
        progressBar.style.width = '0%';
      });
    }
  });

  container.appendChild(toast);
  return toast;
}

// ── PyLearn Modern Dialog System (Alert & Confirm Modals) ──
window.pylearnAlert = function(message, title = 'แจ้งเตือน', type = 'info') {
  return new Promise((resolve) => {
    const existing = document.getElementById('pylearn-dialog-overlay');
    if (existing) existing.remove();

    const icons = {
      info: '💡',
      success: '🎉',
      warning: '⚠️',
      danger: '🚨'
    };
    const icon = icons[type] || '💡';

    const overlay = document.createElement('div');
    overlay.id = 'pylearn-dialog-overlay';
    overlay.className = 'pylearn-dialog-overlay';
    overlay.innerHTML = `
      <div class="pylearn-dialog-card">
        <div class="pylearn-dialog-icon pylearn-dialog-icon-${type}">
          ${icon}
        </div>
        <div class="pylearn-dialog-title">${escapeHtml(title)}</div>
        <div class="pylearn-dialog-message">${escapeHtml(message)}</div>
        <div class="pylearn-dialog-actions">
          <button class="pylearn-dialog-btn pylearn-dialog-btn-primary" id="pylearn-dialog-ok">
            เข้าใจแล้ว ✓
          </button>
        </div>
      </div>
    `;

    const close = () => {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      resolve();
    };

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') close();
    };

    overlay.querySelector('#pylearn-dialog-ok').onclick = close;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    overlay.querySelector('#pylearn-dialog-ok').focus();
  });
};

window.pylearnConfirm = function(message, title = 'ยืนยันการทำรายการ', options = {}) {
  return new Promise((resolve) => {
    const existing = document.getElementById('pylearn-dialog-overlay');
    if (existing) existing.remove();

    const {
      type = 'warning',
      confirmText = 'ยืนยัน',
      cancelText = 'ยกเลิก',
      confirmBtnClass = 'pylearn-dialog-btn-primary'
    } = options;

    const icons = {
      warning: '⚠️',
      danger: '🗑️',
      info: '❓',
      success: '✨'
    };
    const icon = icons[type] || '⚠️';

    const overlay = document.createElement('div');
    overlay.id = 'pylearn-dialog-overlay';
    overlay.className = 'pylearn-dialog-overlay';
    overlay.innerHTML = `
      <div class="pylearn-dialog-card">
        <div class="pylearn-dialog-icon pylearn-dialog-icon-${type}">
          ${icon}
        </div>
        <div class="pylearn-dialog-title">${escapeHtml(title)}</div>
        <div class="pylearn-dialog-message">${escapeHtml(message)}</div>
        <div class="pylearn-dialog-actions">
          <button class="pylearn-dialog-btn pylearn-dialog-btn-cancel" id="pylearn-dialog-cancel">
            ${escapeHtml(cancelText)}
          </button>
          <button class="pylearn-dialog-btn ${confirmBtnClass || 'pylearn-dialog-btn-primary'}" id="pylearn-dialog-confirm">
            ${escapeHtml(confirmText)}
          </button>
        </div>
      </div>
    `;

    const finish = (result) => {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      resolve(result);
    };

    const onKey = (e) => {
      if (e.key === 'Escape') finish(false);
      else if (e.key === 'Enter') finish(true);
    };

    overlay.querySelector('#pylearn-dialog-confirm').onclick = () => finish(true);
    overlay.querySelector('#pylearn-dialog-cancel').onclick = () => finish(false);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) finish(false);
    });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(overlay);
    overlay.querySelector('#pylearn-dialog-confirm').focus();
  });
};

// ── Input Dialog for Python input() ──
function createInputDialog(promptText) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'input-dialog-overlay';
    overlay.innerHTML = `
      <div class="input-dialog">
        <div style="font-size:0.75rem;font-weight:700;color:var(--purple-light);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">
          🐍 Python input()
        </div>
        <div class="input-dialog-prompt">${escapeHtml(promptText) || 'ป้อนค่า:'}</div>
        <input class="input-dialog-field" type="text" id="dialog-input" autocomplete="off" placeholder="พิมพ์คำตอบที่นี่...">
        <button class="input-dialog-btn" id="dialog-ok">ยืนยัน ↵</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('#dialog-input');
    input.focus();

    const submit = () => {
      const val = input.value;
      overlay.remove();
      resolve(val);
    };

    overlay.querySelector('#dialog-ok').onclick = submit;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  });
}

// ── Theme Toggle, Sequential Guard & Completion Button Guard ──
document.addEventListener('DOMContentLoaded', () => {
  const themeCheckboxes = document.querySelectorAll('.theme-switch-cb');
  const currentTheme = localStorage.getItem('theme') || 'light';

  themeCheckboxes.forEach(cb => {
    cb.checked = currentTheme === 'dark';
    cb.addEventListener('change', (e) => {
      document.body.classList.add('theme-transition');
      const isDark = e.target.checked;

      themeCheckboxes.forEach(otherCb => {
        if (otherCb !== cb) otherCb.checked = isDark;
      });

      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }

      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 300);
    });
  });

  // ดักปุ่ม .btn-complete ไม่ให้กดข้ามหากยังทำไม่ครบ 3 ข้อ
  document.addEventListener('click', (e) => {
    const completeBtn = e.target.closest('.btn-complete, #btn-complete, #complete-btn');
    if (!completeBtn) return;

    const lessonId = getCurrentPageLessonId();
    if (!lessonId) return;

    const stats = getLessonExerciseStats(lessonId);
    if (!stats.allDone) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const remainText = stats.missingNumbers.map(n => `ข้อที่ ${n}`).join(', ');
      showToast(
        `กรุณาทำแบบฝึกหัดให้ผ่านครบทั้ง ${stats.total} ข้อก่อนจบบทเรียน (ยังเหลือ ${remainText})`,
        'warning',
        4200,
        'ยังกดจบบทเรียนไม่ได้ 🔒'
      );

      const exPanel = document.querySelector('.exercise-panel');
      if (exPanel) {
        exPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, true);

  enforceSequentialLessonAccess();
  syncCompleteButtonState();

  const lessonObserverTarget = document.querySelector('.lesson-main') || document.body;
  const observer = new MutationObserver(() => {
    syncCompleteButtonState();
  });
  observer.observe(lessonObserverTarget, { childList: true, subtree: true });
});
