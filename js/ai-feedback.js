// ================================================
// AI Feedback — Gemini API (ละเอียด + เจาะจง)
// ================================================

// ── Check Mode Storage ──
const CHECK_MODE_KEY = 'python_check_mode'; // 'ai' | 'auto'
function getCheckMode() { return localStorage.getItem(CHECK_MODE_KEY) || 'auto'; }
function setCheckMode(mode) { localStorage.setItem(CHECK_MODE_KEY, mode); }

const AI_STORAGE_KEY = 'python_ai_api_key';
const AI_SESSION_KEY = 'python_ai_api_key_session';
const AI_MODELS = [
  'gemini-1.5-flash',
  'gemini-2.0-flash-exp',
  'gemini-1.5-pro'
];

// ================================================
// 🔒 AES-256-GCM Encryption (Web Crypto API)
// ================================================
async function _getCryptoKey() {
  const passphrase = new TextEncoder().encode(location.origin + '_pylearn_key_v1');
  const keyMaterial = await crypto.subtle.importKey('raw', passphrase, 'PBKDF2', false, ['deriveKey']);
  const salt = new TextEncoder().encode('pylearn_api_key_encryption_salt');
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function _encryptKey(plainKey) {
  const cryptoKey = await _getCryptoKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plainKey);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, encoded);
  return JSON.stringify({
    v: 1,
    iv: Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join(''),
    data: Array.from(new Uint8Array(ciphertext)).map(b => b.toString(16).padStart(2, '0')).join('')
  });
}

async function _decryptKey(stored) {
  try {
    const parsed = JSON.parse(stored);
    if (!parsed.iv || !parsed.data) throw new Error('Not encrypted format');
    const iv = new Uint8Array(parsed.iv.match(/.{2}/g).map(h => parseInt(h, 16)));
    const data = new Uint8Array(parsed.data.match(/.{2}/g).map(h => parseInt(h, 16)));
    const cryptoKey = await _getCryptoKey();
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, data);
    return new TextDecoder().decode(decrypted);
  } catch {
    // Backward compatibility: plain text key from old version → auto-migrate
    if (stored && !stored.startsWith('{')) {
      try {
        const encrypted = await _encryptKey(stored);
        localStorage.setItem(AI_STORAGE_KEY, encrypted);
      } catch { /* migration failed, still return the key */ }
      return stored;
    }
    return '';
  }
}

// ── Key Storage (Encrypted) ──
function hasStoredApiKey() {
  return !!(localStorage.getItem(AI_STORAGE_KEY) || sessionStorage.getItem(AI_SESSION_KEY));
}

async function getApiKey() {
  // Session key takes priority
  const sessionStored = sessionStorage.getItem(AI_SESSION_KEY);
  if (sessionStored) return await _decryptKey(sessionStored);
  const stored = localStorage.getItem(AI_STORAGE_KEY);
  if (!stored) return '';
  return await _decryptKey(stored);
}

async function saveApiKey(key, sessionOnly = false) {
  const encrypted = await _encryptKey(key.trim());
  if (sessionOnly) {
    sessionStorage.setItem(AI_SESSION_KEY, encrypted);
    localStorage.removeItem(AI_STORAGE_KEY);
  } else {
    localStorage.setItem(AI_STORAGE_KEY, encrypted);
    sessionStorage.removeItem(AI_SESSION_KEY);
  }
}

function clearApiKey() {
  localStorage.removeItem(AI_STORAGE_KEY);
  sessionStorage.removeItem(AI_SESSION_KEY);
}

function _maskKey(key) {
  if (!key || key.length < 8) return '⬤⬤⬤⬤';
  return '⬤'.repeat(6) + key.slice(-4);
}

// ── Show API Key Modal ──
async function showApiKeyModal(onSave) {
  const existing = document.getElementById('api-key-modal');
  if (existing) existing.remove();

  const currentKey = await getApiKey();
  const hasSaved = !!currentKey;
  const maskedDisplay = hasSaved ? _maskKey(currentKey) : '';

  const modal = document.createElement('div');
  modal.id = 'api-key-modal';
  modal.className = 'modal-backdrop';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-icon">🔐</div>
      <div class="modal-title">ตั้งค่า Gemini API Key</div>
      <div class="modal-desc">
        กรอก Google Gemini API Key เพื่อให้ AI ตรวจโค้ดและให้ feedback ได้<br>
        <small style="color:var(--text-muted)">รับ key ฟรีที่ <a href="https://aistudio.google.com" target="_blank" style="color:var(--purple-light)">aistudio.google.com</a></small>
      </div>
      ${hasSaved ? `
      <div id="api-key-status" style="display:flex;align-items:center;gap:8px;padding:10px 14px;
        background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:10px;margin-bottom:12px;">
        <span style="color:#10b981;font-size:1rem;">✅</span>
        <div style="flex:1;">
          <div style="font-size:0.8rem;color:#10b981;font-weight:600;">Key บันทึกอยู่แล้ว (เข้ารหัส)</div>
          <div style="font-size:0.75rem;color:var(--text-muted);font-family:monospace;letter-spacing:1px;">${maskedDisplay}</div>
        </div>
        <button id="api-delete-btn" style="background:rgba(239,68,68,0.12);color:#ef4444;border:1px solid rgba(239,68,68,0.3);
          border-radius:8px;padding:5px 10px;font-size:0.75rem;cursor:pointer;transition:all 0.2s;">🗑️ ลบ</button>
      </div>` : ''}
      <input type="password" class="modal-input" id="api-key-input"
        placeholder="${hasSaved ? 'กรอก key ใหม่เพื่อเปลี่ยน...' : 'AIza...'}" autocomplete="off">
      <div id="api-key-error" style="color:var(--red); font-size:0.8rem; margin-top:8px; display:none; text-align:center;">API Key ไม่ถูกต้อง กรุณาลองใหม่</div>
      <label id="api-session-label" style="display:flex;align-items:center;gap:8px;margin-top:10px;cursor:pointer;
        padding:8px 12px;border-radius:8px;background:rgba(255,255,255,0.03);border:1px solid var(--glass-border);
        font-size:0.8rem;color:var(--text-secondary);transition:all 0.2s;">
        <input type="checkbox" id="api-session-only" style="accent-color:var(--purple-light);width:16px;height:16px;cursor:pointer;">
        <div>
          <div style="font-weight:600;">⏱️ ใช้ key เฉพาะครั้งนี้</div>
          <div style="font-size:0.7rem;color:var(--text-muted);margin-top:2px;">Key จะหายเมื่อปิดแท็บ — เหมาะสำหรับคอมฯ ที่ใช้ร่วมกัน</div>
        </div>
      </label>
      <div style="margin-top:10px;padding:8px 12px;border-radius:8px;background:rgba(124,58,237,0.06);
        border:1px solid rgba(124,58,237,0.15);font-size:0.72rem;color:var(--text-muted);line-height:1.5;">
        🔒 Key ถูกเข้ารหัส (AES-256) ก่อนบันทึกลงเบราว์เซอร์ ไม่มีใครอ่านได้จาก DevTools โดยตรง
      </div>
      <div class="modal-actions">
        <button class="modal-btn-cancel" id="api-modal-cancel">ยกเลิก</button>
        <button class="modal-btn-save" id="api-modal-save">💾 บันทึก</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  const input = modal.querySelector('#api-key-input');
  const errorMsg = modal.querySelector('#api-key-error');
  const saveBtn = modal.querySelector('#api-modal-save');
  const sessionCheckbox = modal.querySelector('#api-session-only');
  const deleteBtn = modal.querySelector('#api-delete-btn');

  input.focus();

  // Delete key button
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      clearApiKey();
      modal.remove();
      if (window.showToast) window.showToast('ลบ API Key เรียบร้อยแล้ว', 'success');
    };
  }

  modal.querySelector('#api-modal-cancel').onclick = () => modal.remove();

  saveBtn.onclick = async () => {
    let key = input.value.trim();
    key = key.replace(/[^\w\-\.]/g, ''); // Remove hidden characters (e.g. zero-width spaces)
    if (!key) {
      // If no new key but already have one saved, just close
      if (hasSaved) {
        modal.remove();
        if (onSave) onSave(currentKey);
        return;
      }
      input.style.borderColor = 'var(--red)';
      return;
    }

    // UI Loading state
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<div class="spinner" style="width:14px;height:14px;margin:0;display:inline-block;vertical-align:middle;"></div> กำลังตรวจสอบ...';
    errorMsg.style.display = 'none';
    input.style.borderColor = 'var(--glass-border)';

    try {
      // Validate key by fetching model info
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash?key=${key}`);
      if (!res.ok && res.status !== 429) throw new Error('Invalid key');

      // Valid — save encrypted
      const isSessionOnly = sessionCheckbox?.checked || false;
      await saveApiKey(key, isSessionOnly);
      modal.remove();
      const modeText = isSessionOnly ? ' (เฉพาะครั้งนี้)' : '';
      if (window.showToast) window.showToast(`🔒 บันทึก API Key สำเร็จ${modeText}!`, 'success');
      onSave && onSave(key);

    } catch (err) {
      // Invalid
      saveBtn.disabled = false;
      saveBtn.innerHTML = '💾 บันทึก';
      input.style.borderColor = 'var(--red)';
      errorMsg.style.display = 'block';
    }
  };

  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') saveBtn.click(); });
}

// ── Main Entry ──
async function getAIFeedback(lessonTitle, exerciseTitle, exerciseDesc, userCode, runOutput, solution, hint, starterCode, difficulty, expectedOutput) {
  let apiKey = await getApiKey();
  if (!apiKey) {
    return new Promise((resolve) => {
      showApiKeyModal((key) => {
        apiKey = key;
        resolve(callGemini(apiKey, lessonTitle, exerciseTitle, exerciseDesc, userCode, runOutput, solution, hint, starterCode, difficulty, expectedOutput));
      });
    });
  }
  return callGemini(apiKey, lessonTitle, exerciseTitle, exerciseDesc, userCode, runOutput, solution, hint, starterCode, difficulty, expectedOutput);
}

// ── Call Gemini ──
async function callGemini(apiKey, lessonTitle, exerciseTitle, exerciseDesc, userCode, runOutput, solution, hint, starterCode, difficulty, expectedOutput, modelIndex = 0) {
  const codeLines = userCode.split('\n').map((l, i) => `${i+1}: ${l}`).join('\n');
  const solutionLines = solution ? solution.replace(/\\n/g, '\n') : '';
  const starterLines = starterCode ? starterCode.replace(/\\n/g, '\n') : '';

  const difficultyLabel = { easy: 'ง่าย', medium: 'ปานกลาง', hard: 'ยาก' };

  const prompt = `
คุณคือ "พี่ติวเตอร์ใจดี" ที่เชี่ยวชาญ Python และมีประสบการณ์สอนเด็กนักเรียนมัธยม
กรุณาวิเคราะห์โค้ดของนักเรียนอย่างละเอียดและให้ feedback ที่เป็นประโยชน์ เป็นกันเอง และให้กำลังใจ 💖

===== ข้อมูลโจทย์ =====
บทเรียน: ${lessonTitle}
ชื่อโจทย์: ${exerciseTitle}
คำอธิบาย: ${exerciseDesc}
ระดับความยาก: ${difficultyLabel[difficulty] || difficulty || 'ไม่ระบุ'}
${expectedOutput ? `ผลลัพธ์ที่ถูกต้อง (Expected Output): ${expectedOutput}` : ''}
${hint ? `คำใบ้ประจำข้อ: ${hint}` : ''}

===== เฉลย (Solution) — ใช้เป็นเกณฑ์เทียบ =====
${solutionLines || '(ไม่มีเฉลย)'}

===== โค้ดเริ่มต้นที่ให้นักเรียน (Starter Code) =====
${starterLines || '(ไม่มี)'}

===== โค้ดของนักเรียน (พร้อมเลขบรรทัด) =====
${codeLines}

===== ผลลัพธ์จากการรัน =====
${runOutput || '(นักเรียนยังไม่ได้รันโค้ด)'}

===== วิธีการตรวจ =====
1. เปรียบเทียบ **logic** ของโค้ดนักเรียน กับ logic ของเฉลย (Solution) ทีละขั้นตอน
2. ถ้ามี Expected Output: ตรวจว่าผลลัพธ์จากการรันตรงกับ Expected Output หรือไม่
3. ถ้าไม่มี Expected Output (โจทย์ปลายเปิด): ตรวจว่าโครงสร้างและการใช้คำสั่งถูกต้องตามจุดประสงค์โจทย์หรือไม่ **อนุโลมให้ข้อความ (String) ที่ผู้เรียนพิมพ์แตกต่างจากตัวอย่างในโจทย์ได้ (เช่น พิมพ์ภาษาอังกฤษแทนภาษาไทย หรือใช้คำอื่น) หากใช้ฟังก์ชันถูกต้อง ให้ 100 คะแนนเต็มได้เลย ห้ามหักคะแนนเรื่องข้อความไม่เป๊ะ**
4. ถ้าโค้ดนักเรียนใช้ **วิธีอื่น** ที่ต่างจากเฉลยแต่ได้ผลลัพธ์/หลักการถูกต้องเหมือนกัน → ถือว่า **ถูกต้อง** ให้คะแนนเต็มได้
5. แยกแยะให้ชัดเจนว่าส่วนไหนคือ Starter Code (ที่ให้มา) vs ส่วนที่นักเรียนเขียนเอง — ถ้ามีปัญหาให้โฟกัสที่ส่วนที่นักเรียนเขียน
6. ปรับความเข้มของ feedback ตามระดับความยาก (ข้อง่าย: อธิบายพื้นฐานมากขึ้น / ข้อยาก: ให้ hint เชิงลึก)

===== คำสั่ง =====
วิเคราะห์โค้ดตามวิธีการตรวจข้างต้น แล้วตอบเป็น JSON โครงสร้างนี้เท่านั้น:

{
  "score": <ตัวเลข 0-100>,
  "grade": <"A"/"B"/"C"/"D"/"F">,
  "summary": "<สรุปสั้นๆ 1 ประโยค ชื่นชมและให้กำลังใจ>",

  "bugs": [
    {
      "severity": <"critical"/"warning"/"info">,
      "line": "<เลขบรรทัด>",
      "problem": "<อธิบายสาเหตุสั้นๆ กระชับเข้าใจง่าย>",
      "bad_code": "<copy โค้ดที่ผิดมา (ระวังการ escape quote/newline)>",
      "fix": "<คำใบ้สั้นๆ ชี้เป้าให้แก้ได้ตรงจุด>"
    }
  ],

  "missing": [
    "<สิ่งที่ขาดหายไปสั้นๆ (สูงสุด 2 ข้อ)>"
  ],

  "improvements": [
    {
      "type": <"style"/"performance"/"readability">,
      "description": "<คำแนะนำสั้นๆ (สูงสุด 1 ข้อ)>",
      "after": "<โค้ดตัวอย่างที่ดีกว่า (สั้นๆ)>"
    }
  ],

  "strengths": [
    "<จุดเด่นหรือคำชมสั้นๆ (สูงสุด 1 ข้อ)>"
  ],

  "action_plan": "<คำแนะนำขั้นต่อไปสั้นๆ 1-2 ข้อ>"
}

===== เกณฑ์คะแนน =====
- 90-100: โค้ดถูกต้องสมบูรณ์ ผลลัพธ์ตรงตามโจทย์ (เทียบกับเฉลย)
- 75-89: logic ถูกต้องเป็นส่วนใหญ่ แต่มีจุดเล็กๆ ที่ปรับปรุงได้
- 60-74: โค้ดทำงานได้บางส่วน หรือ logic ไม่ครบตามเฉลย
- 40-59: มีข้อผิดพลาดที่ทำให้โปรแกรมทำงานผิด หรือผลลัพธ์ไม่ตรง
- 0-39: ยังไม่เข้าใจโจทย์ หรือโค้ดว่างเปล่า

หมายเหตุสำคัญ:
- เขียนคำอธิบายให้สั้น กระชับ ตรงประเด็นที่สุด (ห้ามเวิ่นเว้อ เพื่อประหยัด Token และป้องกันข้อความขาดหาย)
- ใช้ภาษาสุภาพ เป็นกันเอง มี Emoji แทรกพองาม
- ถ้าโค้ดถูกต้องสมบูรณ์ bugs[] และ missing[] ให้เป็น array ว่าง
- ห้ามบังคับให้นักเรียนเขียน Comment (ไม่ต้องนำมาหักคะแนนหรือตักเตือน)
- ตอบเป็น JSON ที่ถูกต้องตามหลัก Syntax เท่านั้น ห้ามลืม Escape เครื่องหมายคำพูด (\") หรือ Backslash (\\) ใน string
- ห้ามกดขึ้นบรรทัดใหม่ (Enter) ภายในข้อความ (String) ของ JSON เด็ดขาด ให้เขียนติดกันบรรทัดเดียวแล้วพิมพ์ \\n แทน
- ห้ามมีข้อความอื่นหรือคำอธิบายนอกเหนือจากรูปแบบ JSON
`.trim();

  try {
    const modelName = AI_MODELS[modelIndex] || AI_MODELS[0];
    console.log(`[AI Debug] Calling Gemini API (Model: ${modelName})...`);
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      if (response.status === 400 || response.status === 403) {
        clearApiKey();
        throw new Error('API Key ไม่ถูกต้อง กรุณาตั้งค่าใหม่');
      }
      if (response.status === 429) {
        throw new Error('API_RATE_LIMIT');
      }
      throw new Error(`API Error ${response.status}: ${body.slice(0, 100)}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

    let result;
    try {
      let cleanText = text.trim();
      cleanText = cleanText.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/i, '').trim();
      
      // Attempt parse first
      result = JSON.parse(cleanText);
    } catch (parseError) {
      console.warn('JSON Parse Error. Trying to extract JSON block...');
      // Extract everything between the first { and the last }
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        let extracted = match[0];
        try { 
          result = JSON.parse(extracted); 
        } catch (e2) {
          console.warn('Extracted JSON still invalid:', e2);
          result = buildFallback(userCode, runOutput, match[0]); 
        }
      } else {
        result = buildFallback(userCode, runOutput, text);
      }
    }

    // Ensure required fields exist
    result.bugs = result.bugs || [];
    result.missing = result.missing || [];
    result.improvements = result.improvements || [];
    result.strengths = result.strengths || [];
    result.action_plan = result.action_plan || '';
    return result;

  } catch (e) {
    if (e.message.includes('API Key')) throw e;
    // Fallback to next model on rate limit (429) or unavailability (404/503)
    if (e.message === 'API_RATE_LIMIT' || e.message.includes('404') || e.message.includes('503')) {
      if (modelIndex + 1 < AI_MODELS.length) {
        const nextModel = AI_MODELS[modelIndex + 1];
        console.log(`[AI Debug] Model ${AI_MODELS[modelIndex]} failed, switching to ${nextModel}...`);
        return callGemini(apiKey, lessonTitle, exerciseTitle, exerciseDesc, userCode, runOutput, solution, hint, starterCode, difficulty, expectedOutput, modelIndex + 1);
      }
      console.warn('API_RATE_LIMIT exceeded on all fallback models. Falling back to heuristic.');
      return heuristicScore(userCode, runOutput, expectedOutput, solution, true);
    }
    console.warn('Gemini error:', e);
    // Fallback on other errors too
    return heuristicScore(userCode, runOutput, expectedOutput, solution, false);
  }
}

// ── Build fallback from text response ──
function buildFallback(code, output, rawText) {
  // If we got here, AI returned something but it wasn't parseable JSON
  let extractedSummary = '';
  
  // Try to salvage the summary if it looks like a broken JSON string
  const summaryMatch = rawText.match(/"summary"\s*:\s*"([^"]*)/i);
  if (summaryMatch && summaryMatch[1]) {
    extractedSummary = summaryMatch[1];
  } else {
    extractedSummary = rawText.slice(0, 300);
  }
  
  let score = 60;
  const scoreMatch = rawText.match(/"score"\s*:\s*(\d+)/i);
  if (scoreMatch) score = parseInt(scoreMatch[1]);
  
  let grade = 'C';
  const gradeMatch = rawText.match(/"grade"\s*:\s*"([A-F]+)"/i);
  if (gradeMatch) grade = gradeMatch[1];

  return {
    score: score,
    grade: grade,
    summary: '⚠️ AI วิเคราะห์สำเร็จแต่มีปัญหาในการรับข้อมูลบางส่วน: ' + extractedSummary + (extractedSummary.length >= 250 ? '...' : ''),
    bugs: [],
    missing: [],
    improvements: [],
    strengths: ['มีความพยายามในการเขียนโค้ด'],
    action_plan: 'ตรวจสอบความถูกต้องของผลลัพธ์และลองรันดูอีกครั้ง'
  };
}

// ── Heuristic Fallback (ไม่มี API) ──
function heuristicScore(code, output, expectedOutput = '', solution = '', isRateLimit = false) {
  if (!code || code.trim().length < 5) {
    return {
      score: 0, grade: 'F',
      summary: 'ยังไม่มีโค้ด',
      bugs: [{ severity: 'critical', line: '-', problem: 'ไม่มีโค้ด', bad_code: '(ว่าง)', fix: 'เขียนโค้ดตามโจทย์', explanation: 'ต้องเขียนโค้ดก่อนส่งตรวจ' }],
      missing: ['โค้ดทั้งหมด'],
      improvements: [],
      strengths: [],
      action_plan: 'อ่านโจทย์ให้เข้าใจก่อน แล้วเริ่มเขียนโค้ดทีละบรรทัด'
    };
  }

  let score = 30;
  const bugs = [], improvements = [], strengths = [], missing = [];

  const hasError = output && output.toLowerCase().includes('error');
  const hasOutput = output && output.trim().length > 0;

  if (expectedOutput) {
    // Smart heuristic based on expected output
    const outTrim = (output || '').trim();
    const expTrim = expectedOutput.trim();
    if (outTrim === expTrim) {
      score = 100;
      strengths.push('ผลลัพธ์ถูกต้องตรงตามที่โจทย์ต้องการเป๊ะ!');
    } else if (hasError) {
      score = 30;
    } else if (hasOutput) {
      // Partial line matching for more accurate scoring
      const outLines = outTrim.split('\n').map(l => l.trim()).filter(l => l);
      const expLines = expTrim.split('\n').map(l => l.trim()).filter(l => l);
      const matchedLines = expLines.filter(el => outLines.some(ol => ol === el)).length;
      const matchRatio = expLines.length > 0 ? matchedLines / expLines.length : 0;
      if (matchRatio >= 0.8) {
        score = 80;
        strengths.push('ผลลัพธ์ถูกต้องเป็นส่วนใหญ่');
      } else if (matchRatio >= 0.5) {
        score = 60;
      } else {
        score = 45;
      }
      bugs.push({
        severity: 'warning',
        line: '-',
        problem: 'ผลลัพธ์ไม่ตรงกับที่โจทย์ต้องการ',
        bad_code: outTrim.slice(0, 200),
        fix: `พยายามทำให้ผลลัพธ์ออกมาเป็น:\n${expTrim.slice(0, 200)}`,
        explanation: 'ตรวจสอบตัวสะกดและการเว้นวรรคให้ถูกต้อง'
      });
    } else {
      score = 20;
      missing.push('ยังไม่มีผลลัพธ์ — ลองรันโค้ดดูก่อน');
    }
  } else {
    // Basic heuristic
    if (!hasError && hasOutput) score += 20;
    if (code.includes('def ')) { score += 5; strengths.push('มีการแยกโค้ดเป็นฟังก์ชัน'); }
    if (code.includes('f"') || code.includes("f'")) { score += 3; strengths.push('ใช้ f-string'); }
    if (code.includes('try:')) { score += 5; strengths.push('มี error handling'); }
    if (code.length > 200) score += 2;
  }

  if (hasError) {
    const errLine = output.split('\n').find(l => l.toLowerCase().includes('error')) || output;
    bugs.push({
      severity: 'critical',
      line: 'ดูจาก Output',
      problem: 'โค้ดเกิด Error ขณะรัน',
      bad_code: errLine.trim(),
      fix: 'แก้ไข Error ข้างต้นก่อน',
      explanation: 'โค้ดต้องรันได้โดยไม่ error ก่อน'
    });
  }

  score = Math.min(100, Math.max(0, score));
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';

  let summaryText = hasError ? 'โค้ดยังมี Error ต้องแก้ไขก่อน' : (score === 100 ? 'ยอดเยี่ยมมาก! โค้ดทำงานได้ถูกต้อง' : (score >= 75 ? 'ดีมาก! ผลลัพธ์ใกล้เคียงกับที่ต้องการแล้ว' : 'โค้ดทำงานได้ แต่ผลลัพธ์ยังไม่ตรงเป๊ะ ลองปรับอีกนิดนะ'));
  if (isRateLimit) {
    summaryText = '⚠️ (โควตา AI เต็มชั่วคราว ระบบใช้การตรวจแบบพื้นฐาน) ' + summaryText;
  }

  return {
    score, grade,
    summary: summaryText,
    bugs, missing, improvements, strengths,
    action_plan: hasError
      ? '1. อ่าน Error message ให้เข้าใจ\n2. ค้นหาบรรทัดที่ผิด\n3. แก้ไขและ Run ใหม่'
      : (score === 100 ? 'สุดยอด! ไปทำโจทย์ข้อต่อไปได้เลย' : '1. ตรวจสอบผลลัพธ์ให้ตรงกับ Expected Output\n2. ลองทดสอบด้วยค่าอื่นๆ เพิ่มเติม')
  };
}

// ================================================
// Auto Check (ไม่ใช้ AI) — ตรวจแบบ Smart Heuristic
// ================================================
function getAutoFeedback(exerciseDesc, userCode, runOutput, solution, hint, starterCode, difficulty, expectedOutput) {
  // Base heuristic
  const base = heuristicScore(userCode, runOutput, expectedOutput, solution, false);

  // Extra code quality checks
  const extraStrengths = [];
  const extraBugs = [];
  let keywordSimilarity = 0;

  if (userCode && userCode.trim().length > 5) {
    // Check indentation consistency
    const lines = userCode.split('\n').filter(l => l.trim().length > 0);
    const indentMix = lines.some(l => l.startsWith('\t')) && lines.some(l => l.startsWith('  '));
    if (indentMix) {
      extraBugs.push({
        severity: 'warning',
        line: '-',
        problem: 'โค้ดใช้ Tab และ Space ปนกัน อาจทำให้เกิด IndentationError',
        bad_code: '(ใช้ Tab และ Space ผสมกัน)',
        fix: 'ใช้ Space 4 ตัวให้สม่ำเสมอตลอดทั้งไฟล์'
      });
    }

    // Positive patterns
    if (userCode.includes('for ') && userCode.includes('in ')) extraStrengths.push('ใช้ for loop ได้ถูกต้อง');
    if (userCode.includes('while ')) extraStrengths.push('ใช้ while loop');
    if (userCode.includes('if ') && userCode.includes(':')) extraStrengths.push('มีการใช้เงื่อนไข if-else');
    if (userCode.includes('def ')) extraStrengths.push('แบ่งโค้ดเป็นฟังก์ชัน');
    if (userCode.includes('return ')) extraStrengths.push('มีการ return ค่าออกจากฟังก์ชัน');
    if (userCode.includes('list') || userCode.includes('[')) extraStrengths.push('ใช้ List ข้อมูล');
    if (userCode.includes('dict') || userCode.includes('{')) extraStrengths.push('ใช้ Dictionary');
    if (userCode.includes('#')) extraStrengths.push('มี Comment อธิบายโค้ด');

    // Check solution similarity if available
    if (solution) {
      const solClean = solution.replace(/\\n/g, '\n').replace(/\s+/g, ' ').trim().toLowerCase();
      const codeClean = userCode.replace(/\s+/g, ' ').trim().toLowerCase();
      // Keyword matching (use unique keywords for better comparison)
      const solKeywords = [...new Set(solClean.match(/\b(for|while|if|elif|else|def|return|print|input|range|len|append|split|join|int|str|float|list|dict|set|class|try|except|import)\b/g) || [])];
      const codeKeywords = [...new Set(codeClean.match(/\b(for|while|if|elif|else|def|return|print|input|range|len|append|split|join|int|str|float|list|dict|set|class|try|except|import)\b/g) || [])];
      const matched = solKeywords.filter(k => codeKeywords.includes(k));
      keywordSimilarity = solKeywords.length > 0 ? matched.length / solKeywords.length : 0;

      // ── Enhanced scoring when NO expectedOutput ──
      // Compare code structure against solution for a more accurate score
      if (!expectedOutput) {
        const hasError = (runOutput || '').toLowerCase().includes('error');
        const hasOutput = runOutput && runOutput.trim().length > 0;

        // Normalize solution and code for structure comparison
        const solNorm = solution.replace(/\\n/g, '\n');
        const solStmts = solNorm.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
        const codeStmts = userCode.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

        // Count key executable statements in solution
        const keyPatterns = /^(print|def |class |return |if |elif |else:|for |while |raise |yield |import |from |try:|except|finally:)/;
        const solKeyStmts = solStmts.filter(l => keyPatterns.test(l));
        const codeKeyStmts = codeStmts.filter(l => keyPatterns.test(l));

        // Match: how many solution key statements appear (loosely) in code?
        const matchedStmts = solKeyStmts.filter(stmt => {
          // Normalize by emptying parentheses so different arguments match structurally
          const stmtNorm = stmt.replace(/\(.*?\)/g, '()').replace(/\s+/g, ' ').replace(/['"]/g, '');
          return codeKeyStmts.some(cl => {
            const clNorm = cl.replace(/\(.*?\)/g, '()').replace(/\s+/g, ' ').replace(/['"]/g, '');
            // Exact or substring match
            return clNorm === stmtNorm || clNorm.includes(stmtNorm) || stmtNorm.includes(clNorm);
          });
        });
        const structSimilarity = solKeyStmts.length > 0 ? matchedStmts.length / solKeyStmts.length : 0;

        // Also check if starter code was unchanged (student didn't edit)
        const starterNorm = (starterCode || '').replace(/\\n/g, '\n').replace(/\s+/g, ' ').trim();
        const codeNormForCompare = userCode.replace(/\s+/g, ' ').trim();
        const starterUnchanged = starterNorm && codeNormForCompare === starterNorm;

        if (!hasError && hasOutput && !starterUnchanged) {
          // High confidence: code structure closely matches solution
          if (structSimilarity >= 0.8 && keywordSimilarity >= 0.8) {
            base.score = Math.max(base.score, 100);
            base.summary = 'ยอดเยี่ยมมาก! โค้ดทำงานได้ถูกต้องสมบูรณ์ ครบทุกองค์ประกอบ';
            extraStrengths.push('โค้ดมีโครงสร้างถูกต้องครบถ้วนตรงตามโจทย์');
          } else if (structSimilarity >= 0.7 && keywordSimilarity >= 0.7) {
            base.score = Math.max(base.score, 95);
            base.summary = 'ยอดเยี่ยมมาก! โค้ดทำงานได้ถูกต้องสมบูรณ์';
            extraStrengths.push('โค้ดมีโครงสร้างถูกต้องตรงตามโจทย์');
          } else if (structSimilarity >= 0.5 && keywordSimilarity >= 0.5) {
            base.score = Math.max(base.score, 85);
            base.summary = 'ดีมาก! โค้ดทำงานได้ถูกต้องเป็นส่วนใหญ่';
          } else if (structSimilarity >= 0.3 || keywordSimilarity >= 0.4) {
            base.score = Math.max(base.score, 75);
            base.summary = 'ดี! โค้ดทำงานได้ แต่ยังมีจุดที่ปรับปรุงได้';
          } else {
            base.score = Math.max(base.score, 65);
          }
        } else if (!hasError && hasOutput && starterUnchanged) {
          // Student just ran starter code without changes
          if (structSimilarity >= 0.8) {
            // Starter IS the solution (many intermediate/advanced exercises)
            base.score = Math.max(base.score, 100);
            base.summary = 'โค้ดทำงานได้ถูกต้องสมบูรณ์! ลองอ่านทำความเข้าใจแต่ละบรรทัดด้วยนะ';
          } else {
            base.score = Math.max(base.score, 50);
            base.summary = 'โค้ดรันได้ แต่ยังไม่ได้แก้ไขตามโจทย์';
          }
        } else if (hasError) {
          base.score = Math.min(base.score, 40);
        }
      } else {
        // Original logic for when expectedOutput exists
        if (keywordSimilarity >= 0.8 && base.score < 75) {
          base.score = Math.min(75, base.score + 10);
        } else if (keywordSimilarity >= 0.5 && base.score < 65) {
          base.score = Math.min(65, base.score + 5);
        }
      }
    }
  }

  // Merge extras
  const mergedBugs = [...(base.bugs || []), ...extraBugs];
  const mergedStrengths = [...new Set([...(base.strengths || []), ...extraStrengths])].slice(0, 3);

  const score = Math.min(100, Math.max(0, base.score));
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';

  // Better summary based on final score
  let finalSummary = base.summary;
  if (!expectedOutput && score >= 90) {
    finalSummary = base.summary || 'ยอดเยี่ยมมาก! โค้ดทำงานได้ถูกต้อง';
  } else if (!expectedOutput && score >= 75) {
    finalSummary = base.summary || 'ดีมาก! โค้ดใช้งานได้ ผลลัพธ์ถูกต้องเป็นส่วนใหญ่';
  }

  return {
    score,
    grade,
    summary: finalSummary,
    bugs: mergedBugs,
    missing: base.missing || [],
    improvements: base.improvements || [],
    strengths: mergedStrengths,
    action_plan: base.action_plan || '',
    _mode: 'auto'  // marker
  };
}

// ================================================
// Render AI Feedback UI — Premium Redesign
// ================================================
function renderAIResult(containerId, fb) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const gradeColors = {
    A: { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.28)', ring: '#10b981' },
    B: { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.28)',  ring: '#06b6d4' },
    C: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.28)', ring: '#f59e0b' },
    D: { color: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.28)', ring: '#f97316' },
    F: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.28)',  ring: '#ef4444' },
  };
  const gc = gradeColors[fb.grade] || gradeColors.C;
  const emoji = fb.score >= 90 ? '🏆' : fb.score >= 75 ? '⭐' : fb.score >= 60 ? '👍' : fb.score >= 40 ? '💪' : '📖';

  const isAutoMode = fb._mode === 'auto';
  const modeChipStyle = isAutoMode
    ? 'background:rgba(249,115,22,0.15);color:#f97316;border-color:rgba(249,115,22,0.35);'
    : 'background:rgba(124,58,237,0.15);color:var(--purple-light);border-color:rgba(124,58,237,0.35);';
  const modeLabel = isAutoMode ? '⚡ Auto Check' : '🤖 AI Check';

  // circumference = 2π × r = 2π × 36 ≈ 226
  const circ = 226;
  const offset = circ - (fb.score / 100) * circ;
  const uid = Math.random().toString(36).slice(2, 7); // unique for animation

  // ── Score Hero ──
  const scoreHtml = `
    <div class="ai-score-hero" style="background:${gc.bg};border:1px solid ${gc.border};">
      <div class="ai-score-ring-wrap">
        <svg class="ai-score-ring" viewBox="0 0 84 84">
          <circle class="ai-score-ring-bg" cx="42" cy="42" r="36"/>
          <circle class="ai-score-ring-fill" id="ring-${uid}" cx="42" cy="42" r="36"
            stroke="${gc.ring}" style="stroke-dashoffset:${circ};"/>
        </svg>
        <div class="ai-score-ring-num" style="color:${gc.color};">
          ${fb.score}
          <span class="ai-score-ring-slash">/ 100</span>
        </div>
      </div>
      <div class="ai-score-details">
        <div class="ai-score-top-row">
          <span class="ai-grade-pill" style="background:${gc.color};color:#fff;">เกรด ${fb.grade}</span>
          <span class="ai-mode-chip" style="${modeChipStyle}">${modeLabel}</span>
        </div>
        <div class="ai-score-bar-wrap">
          <div class="ai-score-bar-label">
            <span>คะแนน</span><span style="color:${gc.color};font-weight:700;">${fb.score}%</span>
          </div>
          <div class="ai-score-bar-track">
            <div class="ai-score-bar-fill" id="bar-${uid}"
              style="background:linear-gradient(90deg,${gc.ring}99,${gc.ring});"></div>
          </div>
        </div>
        <div class="ai-score-summary">${fb.summary}</div>
      </div>
      <div class="ai-score-emoji-badge">${emoji}</div>
    </div>`;

  // ── All Good Banner ──
  const allGood = (!fb.bugs || fb.bugs.length === 0) && (!fb.missing || fb.missing.length === 0);
  const allGoodBanner = allGood && fb.score >= 80 ? `
    <div class="ai-all-good">
      <div class="ai-all-good-icon">🎉</div>
      <div><strong>โค้ดสมบูรณ์แล้ว!</strong><br>
        <span style="font-size:0.85rem;color:var(--text-secondary);">ไม่พบข้อผิดพลาด ลองทำโจทย์ข้อถัดไปได้เลย</span>
      </div>
    </div>` : '';

  // ── Bugs ──
  const sevBg    = { critical: 'rgba(239,68,68,0.12)',  warning: 'rgba(245,158,11,0.1)', info: 'rgba(6,182,212,0.1)' };
  const sevBdr   = { critical: 'rgba(239,68,68,0.35)',  warning: 'rgba(245,158,11,0.35)', info: 'rgba(6,182,212,0.35)' };
  const sevClr   = { critical: '#ef4444', warning: '#f59e0b', info: '#06b6d4' };
  const sevIcon  = { critical: '🔴', warning: '🟡', info: '🔵' };
  const sevLabel = { critical: 'ข้อผิดพลาดสำคัญ', warning: 'ควรแก้ไข', info: 'ข้อแนะนำ' };
  const topBg    = { critical: 'rgba(239,68,68,0.06)',  warning: 'rgba(245,158,11,0.05)', info: 'rgba(6,182,212,0.05)' };

  const typeIcon = { style: '🎨', performance: '⚡', readability: '📖', best_practice: '✨' };
  const typeLabel = { style: 'รูปแบบโค้ด', performance: 'ประสิทธิภาพ', readability: 'ความอ่านง่าย', best_practice: 'Best Practice' };

  let bugsHtml = '';
  if (fb.bugs && fb.bugs.length > 0) {
    const bugItems = fb.bugs.map(b => {
      const sv = b.severity || 'warning';
      return `
      <div class="ai-bug-item" style="border-color:${sevBdr[sv]||sevBdr.warning};">
        <div class="ai-bug-top" style="background:${topBg[sv]||topBg.warning};">
          <span class="ai-bug-sev-chip" style="color:${sevClr[sv]};background:${sevBg[sv]};border-color:${sevBdr[sv]};">
            ${sevIcon[sv]} ${sevLabel[sv]}
          </span>
          <span class="ai-bug-loc">📍 บรรทัด ${b.line || '-'}</span>
        </div>
        <div class="ai-bug-body">
          <div class="ai-bug-problem-text">${b.problem}</div>
          ${b.bad_code ? `
          <div class="ai-code-compare">
            <div class="ai-code-block ai-code-bad">
              <div class="ai-code-label-tag" style="color:#ef4444;">❌ โค้ดที่มีปัญหา</div>
              <pre>${escHtml(b.bad_code)}</pre>
            </div>
            <div class="ai-code-block ai-code-good">
              <div class="ai-code-label-tag" style="color:#10b981;">✅ วิธีแก้ไข</div>
              <pre>${escHtml(b.fix)}</pre>
            </div>
          </div>` : ''}
          ${b.explanation ? `<div class="ai-bug-explain">💡 ${b.explanation}</div>` : ''}
        </div>
      </div>`; }).join('');
    bugsHtml = `
      <div class="ai-card">
        <div class="ai-card-header" style="color:#ef4444;background:rgba(239,68,68,0.06);">
          <div class="ai-card-header-dot" style="background:#ef4444;box-shadow:0 0 8px #ef4444aa;"></div>
          ข้อผิดพลาด &amp; จุดที่ต้องแก้ไข
          <span style="margin-left:auto;background:rgba(239,68,68,0.15);color:#ef4444;
            border-radius:20px;padding:2px 10px;font-size:0.72rem;">${fb.bugs.length} จุด</span>
        </div>
        <div class="ai-card-body">${bugItems}</div>
      </div>`;
  }

  // ── Missing ──
  let missingHtml = '';
  if (fb.missing && fb.missing.length > 0) {
    const items = fb.missing.map(m => `
      <div class="ai-missing-item">
        <div class="ai-missing-dot"></div>${m}
      </div>`).join('');
    missingHtml = `
      <div class="ai-card">
        <div class="ai-card-header" style="color:#f59e0b;background:rgba(245,158,11,0.06);">
          <div class="ai-card-header-dot" style="background:#f59e0b;box-shadow:0 0 8px #f59e0baa;"></div>
          สิ่งที่ยังขาด / ยังไม่ได้ทำ
        </div>
        <div class="ai-card-body">${items}</div>
      </div>`;
  }

  // ── Improvements ──
  let improvHtml = '';
  if (fb.improvements && fb.improvements.length > 0) {
    const items = fb.improvements.map(imp => `
      <div class="ai-improv-item">
        <div class="ai-improv-top">
          ${typeIcon[imp.type] || '🔧'} ${typeLabel[imp.type] || imp.type}
        </div>
        <div class="ai-improv-body">
          <div class="ai-improv-desc">${imp.description}</div>
          ${(imp.before && imp.after) ? `
          <div class="ai-code-compare">
            <div class="ai-code-block ai-code-before">
              <div class="ai-code-label-tag" style="color:var(--text-muted);">เดิม</div>
              <pre>${escHtml(imp.before)}</pre>
            </div>
            <div class="ai-code-block ai-code-after">
              <div class="ai-code-label-tag" style="color:var(--purple-light);">แนะนำ</div>
              <pre>${escHtml(imp.after)}</pre>
            </div>
          </div>` : (imp.after ? `
          <div class="ai-code-block ai-code-after" style="border-radius:10px;overflow:hidden;">
            <div class="ai-code-label-tag" style="color:var(--purple-light);">ตัวอย่างที่ดีกว่า</div>
            <pre>${escHtml(imp.after)}</pre>
          </div>` : '')}
        </div>
      </div>`).join('');
    improvHtml = `
      <div class="ai-card">
        <div class="ai-card-header" style="color:var(--purple-light);background:rgba(124,58,237,0.06);">
          <div class="ai-card-header-dot" style="background:var(--purple-light);box-shadow:0 0 8px rgba(168,85,247,0.6);"></div>
          จุดที่ควรปรับปรุง
        </div>
        <div class="ai-card-body">${items}</div>
      </div>`;
  }

  // ── Strengths ──
  let strengthHtml = '';
  if (fb.strengths && fb.strengths.length > 0) {
    const items = fb.strengths.map(s => `
      <div class="ai-strength-item">
        <span class="ai-strength-icon">✅</span>${s}
      </div>`).join('');
    strengthHtml = `
      <div class="ai-card">
        <div class="ai-card-header" style="color:#10b981;background:rgba(16,185,129,0.06);">
          <div class="ai-card-header-dot" style="background:#10b981;box-shadow:0 0 8px #10b98199;"></div>
          จุดเด่นของโค้ด
        </div>
        <div class="ai-card-body">
          <div class="ai-strength-list">${items}</div>
        </div>
      </div>`;
  }

  // ── Action Plan ──
  let actionHtml = '';
  if (fb.action_plan) {
    const steps = fb.action_plan.split('\n').filter(s => s.trim());
    const stepsHtml = steps.length > 1
      ? steps.map((s, i) => `
        <div class="ai-action-step">
          <div class="ai-action-step-num">${i + 1}</div>
          <div style="font-size:0.875rem;color:var(--text-secondary);line-height:1.6;">${s.replace(/^\d+[\.\)]\s*/, '')}</div>
        </div>`).join('')
      : `<div style="font-size:0.875rem;color:var(--text-secondary);line-height:1.7;">${fb.action_plan}</div>`;
    actionHtml = `
      <div class="ai-card">
        <div class="ai-card-header" style="color:var(--cyan);background:rgba(6,182,212,0.06);">
          <div class="ai-card-header-dot" style="background:var(--cyan);box-shadow:0 0 8px rgba(6,182,212,0.6);"></div>
          แผนการแก้ไขต่อไป
        </div>
        <div class="ai-action-body">${stepsHtml}</div>
      </div>`;
  }

  // ── Compose ──
  el.innerHTML = `<div class="ai-fb-wrap">${scoreHtml}${allGoodBanner}${bugsHtml}${missingHtml}${improvHtml}${strengthHtml}${actionHtml}</div>`;

  // Animate score ring + bar after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const ring = document.getElementById(`ring-${uid}`);
      const bar  = document.getElementById(`bar-${uid}`);
      if (ring) ring.style.strokeDashoffset = offset;
      if (bar)  bar.style.width = fb.score + '%';
    });
  });
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
