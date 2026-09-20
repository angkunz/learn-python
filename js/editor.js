// ================================================
// Editor — Styled Textarea (ไม่ต้องพึ่ง CDN)
// ================================================

// ── Create Editor ──
function createEditor(container, initialCode = '') {
  const wrap = document.createElement('div');
  wrap.className = 'code-textarea-wrap';

  const lineNumbers = document.createElement('div');
  lineNumbers.className = 'line-numbers';

  const textarea = document.createElement('textarea');
  textarea.className = 'code-textarea';
  textarea.value = initialCode;
  textarea.spellcheck = false;
  textarea.autocomplete = 'off';
  textarea.autocorrect = 'off';
  textarea.autocapitalize = 'off';

  wrap.appendChild(lineNumbers);
  wrap.appendChild(textarea);
  container.appendChild(wrap);

  // Update line numbers
  function updateLineNumbers() {
    const lines = textarea.value.split('\n').length;
    lineNumbers.innerHTML = Array.from({length: lines}, (_, i) =>
      `<span>${i + 1}</span>`
    ).join('');
  }

  // Tab support
  textarea.addEventListener('keydown', (e) => {
    // Shift+Tab = unindent
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const start = textarea.selectionStart;
      const lineStart = textarea.value.lastIndexOf('\n', start - 1) + 1;
      const line = textarea.value.substring(lineStart);
      if (line.startsWith('    ')) {
        textarea.value = textarea.value.substring(0, lineStart) + textarea.value.substring(lineStart + 4);
        textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, start - 4);
        updateLineNumbers();
      }
    }

    // Tab = indent
    else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = '    ';

      if (start !== end) {
        // Indent selected lines
        const before = textarea.value.substring(0, start);
        const selected = textarea.value.substring(start, end);
        const after = textarea.value.substring(end);
        const indented = selected.split('\n').map(l => spaces + l).join('\n');
        textarea.value = before + indented + after;
        textarea.selectionStart = start;
        textarea.selectionEnd = start + indented.length;
      } else {
        textarea.value = textarea.value.substring(0, start) + spaces + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }
      updateLineNumbers();
    }

    // Enter — auto-indent
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const before = textarea.value.substring(0, start);
      const after = textarea.value.substring(start);
      const currentLine = before.split('\n').pop();
      const indent = currentLine.match(/^(\s*)/)[1];
      const extraIndent = currentLine.trimEnd().endsWith(':') ? '    ' : '';
      const newText = '\n' + indent + extraIndent;
      textarea.value = before + newText + after;
      textarea.selectionStart = textarea.selectionEnd = start + newText.length;
      updateLineNumbers();
    }

    // Auto-close brackets/quotes
    const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
    if (pairs[e.key] && !e.ctrlKey && !e.metaKey) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start === end) {
        e.preventDefault();
        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);
        textarea.value = before + e.key + pairs[e.key] + after;
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }
    }
  });

  textarea.addEventListener('input', updateLineNumbers);
  textarea.addEventListener('scroll', () => {
    lineNumbers.scrollTop = textarea.scrollTop;
  });

  updateLineNumbers();

  // Return a view-like object
  return {
    _textarea: textarea,
    _lineNumbers: lineNumbers,
    destroy() { wrap.remove(); }
  };
}

function getEditorCode(view) {
  return view._textarea.value;
}

function setEditorCode(view, code) {
  view._textarea.value = code;
  // trigger line number update
  view._textarea.dispatchEvent(new Event('input'));
}

// ── Initialize Pyodide ──
let pyodide = null;
let pyodidePromise = null;

async function initPyodide(onProgress) {
  if (pyodide) return pyodide;
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = (async () => {
    try {
      if (onProgress) onProgress('กำลังโหลด Python runtime...');
      pyodide = await loadPyodide({
        indexURL: 'https://unpkg.com/pyodide@0.26.2/'
      });
      if (onProgress) onProgress('กำลังโหลดแพ็กเกจพื้นฐาน...');
      await pyodide.loadPackage('micropip');
      if (onProgress) onProgress('พร้อมแล้ว!');
      return pyodide;
    } catch (e) {
      pyodidePromise = null;
      console.error('Pyodide load error:', e);
      throw e;
    }
  })();

  return pyodidePromise;
}

// ── Run Python Code ──
async function runPython(code, onOutput, onInput, inputBuffer = []) {
  if (!pyodide) throw new Error('Pyodide ยังไม่พร้อม');

  const isRerun = inputBuffer.length > 0;

  // Set up output capture & mocked input in Python
  pyodide.globals.set('_input_queue_js', inputBuffer);

  try {
    pyodide.runPython(`
import builtins
import sys
import time

_output_lines = []
_input_idx = [0]
_input_q = list(_input_queue_js)
_start_time = time.time()
_timeout = 2.5

# Save original print and input only once (avoid saving fakes on re-runs)
if not hasattr(builtins, '_orig_print_saved'):
    builtins._orig_print_saved = builtins.print
if not hasattr(builtins, '_orig_input_saved'):
    builtins._orig_input_saved = builtins.input

import random
random.seed(42)

def _fake_print(*args, sep=' ', end='\\n', **kwargs):
    text = sep.join(str(a) for a in args) + end
    _output_lines.append(text)

def _fake_input(prompt=''):
    if prompt:
        _output_lines.append(str(prompt))
    if _input_idx[0] < len(_input_q):
        val = _input_q[_input_idx[0]]
        _input_idx[0] += 1
        _output_lines.append(val + '\\n')
        return val
    # Use standard ValueError to guarantee string conversion and traceback visibility in JS
    raise ValueError("INPUT_NEEDED:" + str(prompt))

builtins.print = _fake_print
builtins.input = _fake_input
`);
  } catch (err) {
    return { success: false, output: "System Setup Error: " + String(err) };
  }

  try {
    pyodide.globals.set('_user_code', code);
    pyodide.runPython(`
import ast
import time
import sys

sys._pylearn_start_time = time.time()
sys._pylearn_counter = 0

_input_needed = False
_input_prompt = ""

_tree = ast.parse(_user_code)

class _LoopProtector(ast.NodeTransformer):
    def visit_While(self, node):
        self.generic_visit(node)
        check_nodes = ast.parse(
            "sys = __import__('sys')\\n"
            "sys._pylearn_counter += 1\\n"
            "if sys._pylearn_counter % 500 == 0 and __import__('time').time() - sys._pylearn_start_time > 2.5:\\n"
            "    raise TimeoutError('timeout')"
        ).body
        node.body = check_nodes + node.body
        return node
        
    def visit_For(self, node):
        self.generic_visit(node)
        check_nodes = ast.parse(
            "sys = __import__('sys')\\n"
            "sys._pylearn_counter += 1\\n"
            "if sys._pylearn_counter % 500 == 0 and __import__('time').time() - sys._pylearn_start_time > 2.5:\\n"
            "    raise TimeoutError('timeout')"
        ).body
        node.body = check_nodes + node.body
        return node

_LoopProtector().visit(_tree)
ast.fix_missing_locations(_tree)

_compiled = compile(_tree, filename="<exec>", mode="exec")

try:
    exec(_compiled, globals())
except ValueError as e:
    # Catch input signal exception internally to keep CPython state clean and avoid JS trampoline crashes
    if str(e).startswith("INPUT_NEEDED:"):
        _input_needed = True
        _input_prompt = str(e).split("INPUT_NEEDED:")[1]
    else:
        raise e
    `);
    
    // Check if Python flagged that it needs input
    const isInputNeeded = pyodide.globals.get('_input_needed');
    if (isInputNeeded) {
      let prompt = pyodide.globals.get('_input_prompt') || '';
      prompt = prompt.replace(/^['"]|['"]$/g, '');
      
      const partialLines = pyodide.globals.get('_output_lines').toJs();
      if (onOutput) onOutput(partialLines.join(''));
      
      // Restore print before re-running so the next setup can save correctly
      try {
        pyodide.runPython(`
builtins.print = builtins._orig_print_saved
builtins.input = builtins._orig_input_saved
try:
    del _fake_print, _fake_input, _output_lines, _input_idx, _input_q, _start_time, _timeout
    del _user_code, _tree, _LoopProtector, _compiled, _input_needed, _input_prompt
except:
    pass
`);
      } catch (_) {}
      
      if (onInput) {
        const userInput = await onInput(prompt);
        inputBuffer.push(String(userInput));
        // Re-run the script with the new input buffer
        return runPython(code, onOutput, onInput, inputBuffer);
      } else {
        return { success: false, output: "Error: Input required but no input handler provided." };
      }
    }

    const lines = pyodide.globals.get('_output_lines').toJs();
    const output = lines.join('');
    return { success: true, output };
  } catch (e) {
    console.error("Python execution error:", e);
    console.log("Traceback details:", e.message || String(e));
    
    let errMsg = e.message || String(e);

    if (e && (e.type === 'TimeoutError' || e.message?.includes('timeout') || e.message?.includes('TimeoutError'))) {
      return { success: false, output: "❌ Error: รันโค้ดนานเกิน 2.5 วินาที (อาจเกิด Infinite Loop)\nกรุณาตรวจสอบโค้ดของคุณอีกครั้ง" };
    }

    if (errMsg.includes('PythonError:')) {
      errMsg = errMsg.split('PythonError:').pop().trim();
    }
    
    // Clean internal wrapper lines from traceback to show only student code errors
    const lines = errMsg.split('\n');
    const cleanLines = [];
    let isTraceback = false;
    for (const line of lines) {
      if (line.startsWith('Traceback (most recent call last):')) {
        cleanLines.push(line);
        isTraceback = true;
        continue;
      }
      if (line.includes('exec(_compiled') || 
          line.includes('ast.parse') || 
          line.includes('_LoopProtector') ||
          line.includes('ast.fix_missing_locations') || 
          line.includes('__import__')) {
        continue;
      }
      if (isTraceback) {
        if (line.includes('File "/lib/python') || line.includes('return compile(')) {
          continue;
        }
      }
      cleanLines.push(line);
    }
    errMsg = cleanLines.join('\n').trim();
    return { success: false, output: errMsg };
  } finally {
    try {
      pyodide.runPython(`
builtins.print = builtins._orig_print_saved
builtins.input = builtins._orig_input_saved
try:
    del _fake_print, _fake_input, _output_lines, _input_idx, _input_q, _start_time, _timeout
    del _user_code, _tree, _LoopProtector, _compiled, _input_needed, _input_prompt
except:
    pass
      `);
    } catch (_) {}
  }
}
