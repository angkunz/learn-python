// ================================================
// Editor — Styled Textarea & Pyodide Runner
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
    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) =>
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
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
      });
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

// ── Analyze Python AST Structure (Anti-Shortcut Helper for Exercise Grader) ──
function analyzePythonStructure(code) {
  if (!pyodide) return null;
  try {
    pyodide.globals.set('_inspect_code', String(code || ''));
    const rawJson = pyodide.runPython(`
import ast, json

def _analyze(src):
    try:
        tree = ast.parse(src)
    except Exception as err:
        return json.dumps({"validSyntax": False, "error": str(err)})

    features = {
        "validSyntax": True,
        "statementCount": len(tree.body),
        "hasFor": False,
        "hasWhile": False,
        "hasIf": False,
        "hasFunctionDef": False,
        "hasClassDef": False,
        "hasTry": False,
        "hasListComp": False,
        "hasDictComp": False,
        "hasLambda": False,
        "hasYield": False,
        "callsInput": False,
        "callsPrint": False
    }
    for node in ast.walk(tree):
        if isinstance(node, ast.For): features["hasFor"] = True
        elif isinstance(node, ast.While): features["hasWhile"] = True
        elif isinstance(node, ast.If): features["hasIf"] = True
        elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)): features["hasFunctionDef"] = True
        elif isinstance(node, ast.ClassDef): features["hasClassDef"] = True
        elif isinstance(node, ast.Try): features["hasTry"] = True
        elif isinstance(node, ast.ListComp): features["hasListComp"] = True
        elif isinstance(node, ast.DictComp): features["hasDictComp"] = True
        elif isinstance(node, ast.Lambda): features["hasLambda"] = True
        elif isinstance(node, (ast.Yield, ast.YieldFrom)): features["hasYield"] = True
        elif isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
            if node.func.id == "input": features["callsInput"] = True
            elif node.func.id == "print": features["callsPrint"] = True
    return json.dumps(features)

_analyze(_inspect_code)
`);
    return JSON.parse(rawJson);
  } catch {
    return null;
  } finally {
    try { pyodide.runPython('del _inspect_code, _analyze'); } catch (_) {}
  }
}

// ── Run Python Code ──
async function runPython(code, onOutput, onInput, inputBuffer = [], options = {}) {
  if (!pyodide) throw new Error('Pyodide ยังไม่พร้อม');

  const isFirstRun = inputBuffer.length === 0;
  // กำหนดค่า seed สำหรับสุ่มใหม่ต่อการกดรัน 1 ครั้ง แต่คงค่าเดิมไว้หากมีการ re-run เพื่อรอรับ input() หลายบรรทัด
  const runSeed = (options.runSeed !== undefined && options.runSeed !== null)
    ? options.runSeed
    : Math.floor(Date.now() % 1000000000) + Math.floor(Math.random() * 100000);

  pyodide.globals.set('_input_queue_js', inputBuffer);
  pyodide.globals.set('_pylearn_seed', runSeed);
  pyodide.globals.set('_is_first_run', isFirstRun);

  try {
    pyodide.runPython(`
import builtins
import sys
import time
import random

_output_lines = []
_input_idx = [0]
_input_q = list(_input_queue_js)
_start_time = time.time()
_timeout = 2.5

if not hasattr(builtins, '_orig_print_saved'):
    builtins._orig_print_saved = builtins.print
if not hasattr(builtins, '_orig_input_saved'):
    builtins._orig_input_saved = builtins.input

# ใช้ seed ประจำรอบการกด Run (ไม่ล็อกตายตัวที่ 42 เพื่อให้เกมสุ่มเลขได้ผลจริงไม่ซ้ำกันทั้งห้อง)
random.seed(int(_pylearn_seed))

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
    if str(e).startswith("INPUT_NEEDED:"):
        _input_needed = True
        _input_prompt = str(e).split("INPUT_NEEDED:")[1]
    else:
        raise e
    `);

    const isInputNeeded = pyodide.globals.get('_input_needed');
    if (isInputNeeded) {
      let prompt = pyodide.globals.get('_input_prompt') || '';
      prompt = prompt.replace(/^['"]|['"]$/g, '');

      const partialLines = pyodide.globals.get('_output_lines').toJs();
      if (onOutput) onOutput(partialLines.join(''));

      try {
        pyodide.runPython(`
builtins.print = builtins._orig_print_saved
builtins.input = builtins._orig_input_saved
try:
    del _fake_print, _fake_input, _output_lines, _input_idx, _input_q, _start_time, _timeout
    del _user_code, _tree, _LoopProtector, _compiled, _input_needed, _input_prompt, _pylearn_seed, _is_first_run
except:
    pass
`);
      } catch (_) {}

      if (onInput) {
        const userInput = await onInput(prompt);
        inputBuffer.push(String(userInput));
        // ส่ง runSeed เดิมต่อไปเพื่อให้เลขสุ่มในรอบการรันเดียวกันไม่เปลี่ยนกลางคันหลังป้อน input()
        return runPython(code, onOutput, onInput, inputBuffer, { ...options, runSeed });
      } else {
        return { success: false, output: "Error: Input required but no input handler provided." };
      }
    }

    const lines = pyodide.globals.get('_output_lines').toJs();
    const output = lines.join('');
    return { success: true, output };
  } catch (e) {
    console.error("Python execution error:", e);
    let errMsg = e.message || String(e);

    if (e && (e.type === 'TimeoutError' || e.message?.includes('timeout') || e.message?.includes('TimeoutError'))) {
      return { success: false, output: "❌ Error: รันโค้ดนานเกิน 2.5 วินาที (อาจเกิด Infinite Loop)\nกรุณาตรวจสอบโค้ดของคุณอีกครั้ง" };
    }

    if (errMsg.includes('PythonError:')) {
      errMsg = errMsg.split('PythonError:').pop().trim();
    }

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
      if (isTraceback && (line.includes('File "/lib/python') || line.includes('return compile('))) {
        continue;
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
    del _user_code, _tree, _LoopProtector, _compiled, _input_needed, _input_prompt, _pylearn_seed, _is_first_run
except:
    pass
      `);
    } catch (_) {}
  }
}
