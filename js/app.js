// ================================================
// App — State, Progress, Navigation
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

// ── Progress ──
function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
  catch { return {}; }
}
function saveProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}
function markLessonDone(lessonId) {
  const p = getProgress();
  if (!p[lessonId]) {
    p[lessonId] = {};
  }
  if (!p[lessonId].done) {
    p[lessonId].done = true;
    p[lessonId].ts = Date.now();
    saveProgress(p);
    addXP(50);
    return true;
  }
  return false;
}
function markExerciseDone(lessonId, exId) {
  const p = getProgress();
  if (!p[lessonId]) p[lessonId] = {};
  if (!p[lessonId].exercises) p[lessonId].exercises = {};
  const isNew = !p[lessonId].exercises[exId];
  p[lessonId].exercises[exId] = true;
  saveProgress(p);
  if (isNew) addXP(20);
  return isNew;
}
function isLessonDone(lessonId) {
  const p = getProgress();
  return !!(p[lessonId]?.done);
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
      left: ${Math.random()*100}%;
      top: -10%;
      background: ${colors[Math.floor(Math.random()*colors.length)]};
      width: ${6+Math.random()*8}px;
      height: ${6+Math.random()*8}px;
      animation-delay: ${Math.random()*1.5}s;
      animation-duration: ${2+Math.random()*2}s;
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

  // Keep at most 3 simultaneous toasts to avoid clutter
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

  // Progress bar countdown
  if (progressBar) {
    progressBar.style.transition = `width ${duration}ms linear`;
    requestAnimationFrame(() => {
      progressBar.style.width = '0%';
    });
  }

  timer = setTimeout(dismiss, duration);

  // Pause on hover
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

// ── Theme Toggle System ──
document.addEventListener('DOMContentLoaded', () => {
  const themeCheckboxes = document.querySelectorAll('.theme-switch-cb');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  themeCheckboxes.forEach(cb => {
    cb.checked = currentTheme === 'dark';
    cb.addEventListener('change', (e) => {
      document.body.classList.add('theme-transition');
      const isDark = e.target.checked;
      
      themeCheckboxes.forEach(otherCb => {
        if(otherCb !== cb) otherCb.checked = isDark;
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
});
