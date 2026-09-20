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
function showToast(message, type = 'info', duration = 3000) {
  const existing = document.querySelector('.toast-notif');
  if (existing) existing.remove();

  const colors = { success: 'var(--green)', error: 'var(--red)', info: 'var(--purple-light)', warning: 'var(--orange)' };
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  const toast = document.createElement('div');
  toast.className = 'toast-notif';
  toast.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:999;
    padding:12px 24px;border-radius:100px;
    background:rgba(8,11,20,0.95);backdrop-filter:blur(20px);
    border:1px solid ${colors[type]};color:#ffffff;
    font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:8px;
    animation:fadeInUp 0.3s ease;box-shadow:0 8px 32px rgba(0,0,0,0.4);
  `;
  toast.textContent = `${icons[type]} ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity 0.3s'; setTimeout(()=>toast.remove(),300); }, duration);
}

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
