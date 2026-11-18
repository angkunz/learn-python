const LESSONS_DATA = [
  // ============================================================
  // ELEMENTARY LEVEL (ระดับประถม)
  // ============================================================
  {
    id: "e1", level: "elementary", order: 1,
    title: "สวัสดีโลก! 🌟", icon: "🌟", duration: "10 นาที",
    description: "เริ่มต้นเขียนโปรแกรมแรกของเรา! เรียนรู้การพิมพ์ข้อความออกหน้าจอ",
    theory: `
<h2>โปรแกรมคืออะไร?</h2>
<p>โปรแกรมคือ <strong>คำสั่งที่เราบอกให้คอมพิวเตอร์ทำ</strong> เหมือนกับสูตรทำอาหาร — บอกทีละขั้นตอน คอมพิวเตอร์จะทำตาม!</p>
<div class="info-box">
  <span class="info-icon">💡</span>
  <div><strong>Python คืออะไร?</strong><br>
  Python คือภาษาที่ใช้พูดคุยกับคอมพิวเตอร์ เหมือนเราพูดภาษาไทยหรือภาษาอังกฤษ แต่นี่คือ "ภาษาคอมพิวเตอร์" ที่อ่านง่ายมาก!</div>
</div>
<h3>print() — พิมพ์ข้อความ</h3>
<p><code>print()</code> คือคำสั่งให้คอมพิวเตอร์ <strong>"แสดงข้อความ"</strong> ออกมาที่หน้าจอ เหมือนถือไมโครโฟนแล้วพูด!</p>
<div class="code-example">
<pre><code>print("สวัสดีโลก!")
print("ฉันชื่อหนูน้อย")
print("ฉันชอบเรียน Python 🐍")</code></pre>
<div class="code-output">สวัสดีโลก!<br>ฉันชื่อหนูน้อย<br>ฉันชอบเรียน Python 🐍</div>
</div>
<div class="info-box">
  <span class="info-icon">⚠️</span>
  <div><strong>จำไว้!</strong><br>
  ต้องใส่ข้อความในเครื่องหมาย <code>"..."</code> เสมอ<br>
  เช่น <code>print("สวัสดี")</code> ✅ &nbsp;&nbsp; <code>print(สวัสดี)</code> ❌</div>
</div>
<h3>Emoji ได้เลย! 🎉</h3>
<div class="code-example">
<pre><code>print("⭐ ดาวดวงเดียวกัน")
print("🌈 รุ้งสวยงาม")
print("🐶🐱🐭 เพื่อนสัตว์")</code></pre>
</div>
<div class="info-box" style="margin-top:10px;">
  <span class="info-icon">💡</span>
  <div><strong>วิธีพิมพ์ Emoji บนแป้นพิมพ์:</strong><br>
  • <b>Windows:</b> กดปุ่ม <kbd>Win</kbd> + <kbd>.</kbd> (จุด) หรือ <kbd>Win</kbd> + <kbd>;</kbd><br>
  • <b>Mac:</b> กดปุ่ม <kbd>Cmd</kbd> + <kbd>Ctrl</kbd> + <kbd>Space</kbd><br>
  • <b>มือถือ / แท็บเล็ต:</b> แตะปุ่มหน้ายิ้ม 😊 บนแป้นพิมพ์ได้เลย</div>
</div>`,
    exercises: [
      {
        id: "e1e1", title: "บอกชื่อตัวเอง", difficulty: "easy",
        description: "เขียนโปรแกรมพิมพ์ชื่อของคุณออกมา เช่น ถ้าชื่อ 'น้องมิ้น' ก็ให้พิมพ์ว่า 'ฉันชื่อ น้องมิ้น'",
        starterCode: "# พิมพ์ชื่อของคุณที่นี่\n",
        hint: "ใช้ print() และใส่ข้อความในเครื่องหมาย \" \" เช่น print(\"ฉันชื่อ ...\")",
        solution: 'print("ฉันชื่อ น้องมิ้น")',
        expectedOutput: ""
      },
      {
        id: "e1e2", title: "บอกของโปรด 3 อย่าง", difficulty: "easy",
        description: "เขียนโปรแกรมบอกของที่คุณชอบ 3 อย่าง แต่ละอย่างให้ขึ้นบรรทัดใหม่",
        starterCode: "# ของโปรดอย่างที่ 1\n# ของโปรดอย่างที่ 2\n# ของโปรดอย่างที่ 3\n",
        hint: "ใช้ print() สามครั้ง แต่ละครั้งพิมพ์ของที่ชอบหนึ่งอย่าง",
        solution: 'print("ชอบไอศกรีม 🍦")\nprint("ชอบการ์ตูน 📺")\nprint("ชอบวาดรูป 🎨")',
        expectedOutput: ""
      },
      {
        id: "e1e3", title: "วาดสัตว์ด้วย Emoji", difficulty: "easy",
        description: "ใช้ print() วาดสัตว์ที่คุณชอบด้วย Emoji อย่างน้อย 3 บรรทัด ให้ดูสนุกและน่ารัก!",
        starterCode: "# วาดสัตว์ด้วย Emoji\n",
        hint: "💡 วิธีพิมพ์ Emoji:\n• Windows: กดปุ่ม Win + . (จุด)\n• Mac: กดปุ่ม Cmd + Ctrl + Space\n📋 หรือคัดลอก Emoji ไปวางได้เลย:\n🐶 🐱 🐰 🐼 🦊 🦁 🐸 🐧 🐾 🌿 🦴 🐟 💖 ✨ ⭐\nตัวอย่าง:\nprint(\"✨ 🐱 🐱 ✨\")",
        solution: 'print("🐶🐾 หมาน้อยตัวน้อย")\nprint("🦮 ชื่อว่า ไทยสัน")\nprint("🏠 อยู่บ้านสุขสันต์")',
        expectedOutput: ""
      }
    ]
  },
  {
    id: "e2", level: "elementary", order: 2,
    title: "เลขมหัศจรรย์ 🔢", icon: "🔢", duration: "10 นาที",
    description: "Python เป็นเครื่องคิดเลขที่เก่งมาก! เรียนรู้การบวก ลบ คูณ หาร",
    theory: `
<h2>Python คือเครื่องคิดเลขที่ฉลาด!</h2>
<p>เราสามารถใช้ Python คำนวณตัวเลขได้เลย ไม่ต้องใช้เครื่องคิดเลขอีกต่อไป!</p>
<div class="type-grid">
  <div class="type-card str"><span>+</span><p>บวก<br><code>5 + 3</code></p></div>
  <div class="type-card int"><span>-</span><p>ลบ<br><code>10 - 4</code></p></div>
  <div class="type-card float"><span>*</span><p>คูณ<br><code>3 * 4</code></p></div>
  <div class="type-card bool"><span>/</span><p>หาร<br><code>8 / 2</code></p></div>
</div>
<div class="code-example">
<pre><code>print(5 + 3)      # ได้ 8
print(10 - 4)     # ได้ 6
print(3 * 4)      # ได้ 12
print(8 / 2)      # ได้ 4.0</code></pre>
<div class="code-output">8<br>6<br>12<br>4.0</div>
</div>
<div class="info-box">
  <span class="info-icon">💡</span>
  <div><strong>เครื่องหมายคูณในภาษาคอมพิวเตอร์คือ <code>*</code></strong> และเครื่องหมายหารคือ <code>/</code><br>
  เช่น <code>print(5 * 3)</code> จะได้ผลลัพธ์ <code>15</code></div>
</div>
<h3>คำนวณใน print() ได้เลย</h3>
<div class="code-example">
<pre><code>print("ราคาขนม:", 5 + 10 + 3, "บาท")
print("ขนมทั้งหมด:", 3 * 5, "ชิ้น")
print("แบ่งได้คนละ:", 12 / 4, "ชิ้น")</code></pre>
<div class="code-output">ราคาขนม: 18 บาท<br>ขนมทั้งหมด: 15 ชิ้น<br>แบ่งได้คนละ: 3.0 ชิ้น</div>
</div>`,
    exercises: [
      {
        id: "e2e1", title: "คำนวณราคาของเล่น", difficulty: "easy",
        description: "รถของเล่นราคา 120 บาท ตุ๊กตาราคา 85 บาท ช่วยคิดว่าซื้อทั้งสองอย่างต้องจ่ายกี่บาท (แสดงในรูปแบบ 'ราคารวม: 205 บาท')",
        starterCode: "# คำนวณราคารวม\n",
        hint: "ใช้ print(\"ราคารวม:\", 120 + 85, \"บาท\")",
        solution: 'print("ราคารวม:", 120 + 85, "บาท")',
        expectedOutput: "ราคารวม: 205 บาท"
      },
      {
        id: "e2e2", title: "แบ่งขนมให้เพื่อน", difficulty: "easy",
        description: "มีขนม 24 ชิ้น อยากแบ่งให้เพื่อน 4 คนเท่าๆ กัน แต่ละคนได้กี่ชิ้น? และถ้ามี 3 คน แต่ละคนได้กี่ชิ้น?",
        starterCode: "# แบ่งขนม 24 ชิ้น ให้ 4 คน\n\n# แบ่งขนม 24 ชิ้น ให้ 3 คน\n",
        hint: "ใช้เครื่องหมาย / สำหรับการหาร เช่น print(\"แบ่งให้ 4 คน คนละ:\", 24 / 4, \"ชิ้น\")",
        solution: 'print("แบ่งให้ 4 คน คนละ:", 24 / 4, "ชิ้น")\nprint("แบ่งให้ 3 คน คนละ:", 24 / 3, "ชิ้น")',
        expectedOutput: "แบ่งให้ 4 คน คนละ: 6.0 ชิ้น\nแบ่งให้ 3 คน คนละ: 8.0 ชิ้น"
      },
      {
        id: "e2e3", title: "คะแนนในเกม", difficulty: "medium",
        description: "เราเล่นเกมได้ 3 รอบ รอบแรก 150 คะแนน รอบสอง 200 คะแนน รอบสาม 175 คะแนน ให้คำนวณ: คะแนนรวม และ คะแนนเฉลี่ยต่อรอบ",
        starterCode: "# คะแนนแต่ละรอบ\nround1 = 150\nround2 = 200\nround3 = 175\n\n# คำนวณคะแนนรวม\n\n# คำนวณคะแนนเฉลี่ย\n",
        hint: "คะแนนรวม = round1 + round2 + round3 และเฉลี่ย = รวม / 3",
        solution: 'round1 = 150\nround2 = 200\nround3 = 175\ntotal = round1 + round2 + round3\nprint("คะแนนรวม:", total)\nprint("เฉลี่ยต่อรอบ:", total / 3)',
        expectedOutput: "คะแนนรวม: 525\nเฉลี่ยต่อรอบ: 175.0"
      }
    ]
  },
  {
    id: "e3", level: "elementary", order: 3,
    title: "กล่องเก็บของ 📦", icon: "📦", duration: "15 นาที",
    description: "เรียนรู้การเก็บข้อมูลในตัวแปร เหมือนกล่องที่มีป้ายชื่อ",
    theory: `
<h2>ตัวแปร = กล่องเก็บของ</h2>
<p>ลองนึกภาพว่า <strong>ตัวแปรคือกล่อง</strong> ที่มีป้ายชื่อกำกับ เราสามารถใส่ข้อมูลลงไปในกล่อง และเรียกใช้ภายหลังได้!</p>
<div class="code-example">
<pre><code>ชื่อ = "น้องมิ้น"        # กล่องชื่อ 'ชื่อ' เก็บข้อความ
อายุ = 10               # กล่องชื่อ 'อายุ' เก็บตัวเลข
วิชาโปรด = "คณิตศาสตร์"

print(ชื่อ)
print(อายุ)
print(วิชาโปรด)</code></pre>
<div class="code-output">น้องมิ้น<br>10<br>คณิตศาสตร์</div>
</div>
<div class="info-box">
  <span class="info-icon">💡</span>
  <div><strong>กฎการตั้งชื่อตัวแปร</strong><br>
  ✅ ใช้ภาษาอังกฤษหรือภาษาไทยได้ (นิยมใช้ภาษาอังกฤษเพื่อให้พิมพ์ง่าย)<br>
  ✅ ใช้ตัวเลขได้ แต่ห้ามขึ้นต้นด้วยตัวเลข<br>
  ✅ ใช้ขีดล่าง _ ได้ เช่น my_name<br>
  ❌ มีช่องว่างไม่ได้ ห้ามใช้ my name</div>
</div>
<h3>ใช้ตัวแปรใน print()</h3>
<div class="code-example">
<pre><code>name = "สมชาย"
age = 12
school = "โรงเรียนดวงดาว"

print("ชื่อ:", name)
print("อายุ:", age, "ปี")
print("โรงเรียน:", school)</code></pre>
<div class="code-output">ชื่อ: สมชาย<br>อายุ: 12 ปี<br>โรงเรียน: โรงเรียนดวงดาว</div>
</div>`,
    exercises: [
      {
        id: "e3e1", title: "บัตรประจำตัวของฉัน", difficulty: "easy",
        description: "สร้างตัวแปรเก็บ ชื่อ, อายุ, และ วิชาโปรด ของตัวเอง แล้วพิมพ์ออกมาให้สวยงาม",
        starterCode: "# เก็บข้อมูลของคุณ\nname = \"...\"\nage = 10\nfavorite = \"...\"\n\n# พิมพ์บัตรประจำตัว\n",
        hint: "แทนที่ ... ด้วยข้อมูลของคุณ แล้วใช้ print() แสดงออกมา",
        solution: 'name = "มิ้น"\nage = 10\nfavorite = "วาดรูป"\nprint("👤 ชื่อ:", name)\nprint("🎂 อายุ:", age, "ปี")\nprint("⭐ วิชาโปรด:", favorite)',
        expectedOutput: ""
      },
      {
        id: "e3e2", title: "อายุในปีหน้า", difficulty: "easy",
        description: "เก็บอายุปัจจุบันของคุณในตัวแปร แล้วคำนวณว่าปีหน้าจะอายุเท่าไหร่ และอีก 5 ปีจะอายุเท่าไหร่",
        starterCode: "age = 10  # เปลี่ยนเป็นอายุของคุณ\n\n# อายุปีหน้า\n\n# อายุอีก 5 ปี\n",
        hint: "ปีหน้า = age + 1 และอีก 5 ปี = age + 5",
        solution: 'age = 10\nprint("อายุตอนนี้:", age, "ปี")\nprint("ปีหน้าอายุ:", age + 1, "ปี")\nprint("อีก 5 ปีอายุ:", age + 5, "ปี")',
        expectedOutput: ""
      },
      {
        id: "e3e3", title: "คะแนนสอบ", difficulty: "medium",
        description: "มีคะแนนสอบ 4 วิชา: คณิต=85, ภาษาไทย=90, วิทย์=78, สังคม=92 ให้เก็บในตัวแปร แล้วคำนวณคะแนนรวมและเฉลี่ย",
        starterCode: "# คะแนนแต่ละวิชา\nmath = 85\nthai = 90\nscience = 78\nsocial = 92\n\n# คะแนนรวม\n\n# คะแนนเฉลี่ย\n",
        hint: "รวม = math + thai + science + social จากนั้น เฉลี่ย = รวม / 4",
        solution: 'math = 85\nthai = 90\nscience = 78\nsocial = 92\ntotal = math + thai + science + social\naverage = total / 4\nprint("คะแนนรวม:", total)\nprint("คะแนนเฉลี่ย:", average)',
        expectedOutput: "คะแนนรวม: 345\nคะแนนเฉลี่ย: 86.25"
      }
    ]
  },
  {
    id: "e4", level: "elementary", order: 4,
    title: "คุยกับโปรแกรม 💬", icon: "💬", duration: "15 นาที",
    description: "ให้โปรแกรมถาม และเราตอบได้! เรียนรู้ input() และ f-string",
    theory: `
<h2>input() — รับคำตอบจากผู้ใช้</h2>
<p>ถ้า <code>print()</code> คือการพูด <code>input()</code> ก็คือการ <strong>ถามและรอคำตอบ</strong>!</p>
<div class="code-example">
<pre><code>name = input("คุณชื่ออะไร? ")
print("สวัสดี", name, "ยินดีที่รู้จัก!")</code></pre>
<div class="code-output">คุณชื่ออะไร? <em>[ผู้ใช้พิมพ์: มิ้น]</em><br>สวัสดี มิ้น ยินดีที่รู้จัก!</div>
</div>
<h3>f-string — พูดรวมข้อมูล</h3>
<p>f-string คือการพิมพ์ข้อความพร้อมตัวแปรได้สวยๆ เพียงใส่ <code>f</code> หน้าเครื่องหมายคำพูด แล้ววางชื่อตัวแปรไว้ใน <code>{ }</code></p>
<div class="code-example">
<pre><code>name = "มิ้น"
age = 10

# แบบธรรมดา
print("สวัสดี", name, "อายุ", age, "ปี")

# แบบ f-string สวยกว่า!
print(f"สวัสดี {name} อายุ {age} ปี")</code></pre>
<div class="code-output">สวัสดี มิ้น อายุ 10 ปี<br>สวัสดี มิ้น อายุ 10 ปี</div>
</div>
<div class="info-box">
  <span class="info-icon">⚠️</span>
  <div><strong>input() ให้ผลเป็นข้อความเสมอ!</strong><br>
  ถ้าต้องการนำมาบวกลบเป็นตัวเลข ต้องครอบด้วย <code>int()</code> ก่อน และเวลาช่องกรอกเด้งขึ้นมา อย่าลืมพิมพ์ตัวเลขลงไปก่อนกดตกลงนะ!<br>
  <code>age = int(input("อายุ: "))</code></div>
</div>`,
    exercises: [
      {
        id: "e4e1", title: "โปรแกรมทักทาย", difficulty: "easy",
        description: "สร้างโปรแกรมที่ถามชื่อผู้ใช้ แล้วทักทายพร้อม emoji สนุกๆ",
        starterCode: "name = input(\"สวัสดี! คุณชื่ออะไร? \")\n# พิมพ์ทักทาย\n",
        hint: "ใช้ print(f\"สวัสดี {name}! ...\") เพื่อพิมพ์พร้อมชื่อ",
        solution: 'name = input("สวัสดี! คุณชื่ออะไร? ")\nprint(f"🌟 สวัสดี {name}! ยินดีที่รู้จักมากเลย!")\nprint(f"🐍 หวังว่า {name} จะสนุกกับการเรียน Python นะ!")',
        expectedOutput: ""
      },
      {
        id: "e4e2", title: "อวยพรวันเกิด", difficulty: "easy",
        description: "สร้างโปรแกรมที่ถามชื่อและอายุ แล้วอวยพรวันเกิดพร้อมบอกว่าปีหน้าจะอายุเท่าไหร่",
        starterCode: "name = input(\"ชื่ออะไรคะ/ครับ? \")\nage = int(input(\"อายุกี่ปี? \"))\n# อวยพรและบอกอายุปีหน้า\n",
        hint: "ใช้ f-string และ age + 1 สำหรับอายุปีหน้า",
        solution: 'name = input("ชื่ออะไรคะ/ครับ? ")\nage = int(input("อายุกี่ปี? "))\nprint(f"🎂 สุขสันต์วันเกิด {name}!")\nprint(f"🎉 อายุ {age} ปีแล้วนะ ปีหน้าจะอายุ {age + 1} ปีเลย!")',
        expectedOutput: ""
      },
      {
        id: "e4e3", title: "เพื่อนสนิท 3 คน", difficulty: "medium",
        description: "สร้างโปรแกรมที่ถามชื่อเพื่อน 3 คน แล้วแนะนำเพื่อนทั้งหมดพร้อมกัน",
        starterCode: "friend1 = input(\"เพื่อนคนที่ 1 ชื่ออะไร? \")\nfriend2 = input(\"เพื่อนคนที่ 2 ชื่ออะไร? \")\nfriend3 = input(\"เพื่อนคนที่ 3 ชื่ออะไร? \")\n# แนะนำเพื่อนทั้งหมด\n",
        hint: "ใช้ print() แนะนำทีละคน ใส่ f-string พร้อม emoji",
        solution: 'friend1 = input("เพื่อนคนที่ 1 ชื่ออะไร? ")\nfriend2 = input("เพื่อนคนที่ 2 ชื่ออะไร? ")\nfriend3 = input("เพื่อนคนที่ 3 ชื่ออะไร? ")\nprint("\\n👋 ขอแนะนำเพื่อนสนิทของฉัน:")\nprint(f"🌟 คนที่ 1: {friend1}")\nprint(f"🌟 คนที่ 2: {friend2}")\nprint(f"🌟 คนที่ 3: {friend3}")',
        expectedOutput: ""
      }
    ]
  },
  {
    id: "e5", level: "elementary", order: 5,
    title: "เลือกได้! 🤔", icon: "🤔", duration: "15 นาที",
    description: "ให้โปรแกรมเลือกทำสิ่งต่างกัน เรียนรู้ if / elif / else พื้นฐาน",
    theory: `
<h2>if / else — แยกสองทาง</h2>
<p>บางครั้งโปรแกรมต้องเลือกว่าจะทำอะไร เหมือนกับเราเดินมาถึงทางแยกแล้วต้องเลือกซ้ายหรือขวา!</p>
<div class="code-example">
<pre><code>weather = "ฝนตก"

if weather == "ฝนตก":
    print("เอาร่มไปด้วยนะ! ☂️")
else:
    print("อากาศดี ออกไปเที่ยวได้เลย! ☀️")</code></pre>
<div class="code-output">เอาร่มไปด้วยนะ! ☂️</div>
</div>
<div class="info-box">
  <span class="info-icon">💡</span>
  <div><strong>เครื่องหมายที่ใช้เปรียบเทียบ</strong><br>
  <code>==</code> เท่ากัน (ต้องเขียนเครื่องหมายเท่ากับติดกัน 2 ตัว!)<br>
  <code>&gt;</code> มากกว่า &nbsp; <code>&lt;</code> น้อยกว่า<br>
  <code>&gt;=</code> มากกว่าหรือเท่ากับ &nbsp; <code>&lt;=</code> น้อยกว่าหรือเท่ากับ</div>
</div>
<h3>elif — เมื่อมีมากกว่า 2 ทางเลือก!</h3>
<p>ถ้ามีทางเลือก 3 ทางขึ้นไป เราใช้ <code>elif</code> (ย่อมาจาก else if แปลว่า "แต่ถ้า...") คั่นตรงกลางได้เลย:</p>
<div class="code-example">
<pre><code>score = 75

if score >= 80:
    print("เก่งมาก! 🏆 ได้เกรด A")
elif score >= 50:
    print("ผ่านแล้ว! 👍 พยายามต่อไปนะ")
else:
    print("ยังไม่ผ่าน 📚 ลองทบทวนอีกครั้งนะ")</code></pre>
<div class="code-output">ผ่านแล้ว! 👍 พยายามต่อไปนะ</div>
</div>`,
    exercises: [
      {
        id: "e5e1", title: "ชอบแมวหรือหมา?", difficulty: "easy",
        description: "ถามผู้ใช้ว่าชอบแมวหรือหมา แล้วตอบให้เหมาะสม (ถ้าพิมพ์ 'แมว' ตอบอย่างหนึ่ง ถ้าไม่ใช่ตอบอีกอย่าง)",
        starterCode: "pet = input(\"คุณชอบ แมว หรือ หมา? \")\n\nif pet == \"แมว\":\n    print(\"เยี่ยม! แมวน่ารักมาก 🐱\")\nelse:\n    # เติมคำสั่ง print() สำหรับสัตว์อื่น\n    pass\n",
        hint: "แทนที่ pass ด้วยคำสั่ง print() ในส่วน else สำหรับคนที่ชอบหมา",
        solution: 'pet = input("คุณชอบ แมว หรือ หมา? ")\nif pet == "แมว":\n    print("เยี่ยม! แมวน่ารักมาก 🐱")\nelse:\n    print("เจ๋ง! หมาเป็นเพื่อนที่ดีมาก 🐶")',
        expectedOutput: ""
      },
      {
        id: "e5e2", title: "อากาศวันนี้เป็นยังไง?", difficulty: "easy",
        description: "รับอุณหภูมิ (องศา) จากผู้ใช้ ถ้า >= 35 บอกว่า 'ร้อนมาก' ถ้าน้อยกว่านั้นบอกว่า 'อากาศพอดี'",
        starterCode: "temp = int(input(\"อุณหภูมิวันนี้กี่องศา? \"))\n\n# ตรวจสอบว่าร้อนหรือไม่ด้วย if / else\n",
        hint: "ใช้ if temp >= 35: แล้วตามด้วย else:",
        solution: 'temp = int(input("อุณหภูมิวันนี้กี่องศา? "))\nif temp >= 35:\n    print(f"🥵 {temp} องศา ร้อนมากเลย! ดื่มน้ำเยอะๆ นะ")\nelse:\n    print(f"😊 {temp} องศา อากาศพอดีเลย เหมาะไปเที่ยว!")',
        expectedOutput: ""
      },
      {
        id: "e5e3", title: "ระบบตรวจคะแนน", difficulty: "medium",
        description: "รับคะแนน (0-100) จากผู้ใช้ ถ้าได้ 80 ขึ้นไป = ผ่านสบาย ถ้า 50-79 = ผ่าน ถ้าน้อยกว่า 50 = ต้องสอบใหม่",
        starterCode: "score = int(input(\"ได้คะแนนกี่คะแนน? \"))\n\n# ตรวจสอบผลการสอบ 3 ช่วงด้วย if / elif / else\n",
        hint: "ใช้ if score >= 80: ตามด้วย elif score >= 50: และปิดท้ายด้วย else:",
        solution: 'score = int(input("ได้คะแนนกี่คะแนน? "))\nif score >= 80:\n    print(f"🏆 ได้ {score} คะแนน ผ่านสบาย เก่งมาก!")\nelif score >= 50:\n    print(f"✅ ได้ {score} คะแนน ผ่าน! แต่ลองพยายามให้ได้มากกว่านี้นะ")\nelse:\n    print(f"📚 ได้ {score} คะแนน ยังไม่ผ่าน ลองทบทวนแล้วสอบใหม่นะ")',
        expectedOutput: ""
      }
    ]
  },

  // ============================================================
  // BEGINNER LEVEL (ระดับผู้เริ่มต้น / มัธยมศึกษาตอนต้น)
  // ============================================================
  {
    id: "b1", level: "beginner", order: 1,
    title: "Python คืออะไร?", icon: "🐍", duration: "15 นาที",
    description: "รู้จัก Python และทำไมจึงเป็นภาษาที่เหมาะสำหรับผู้เริ่มต้น",
    theory: `
<h2>Python คืออะไร?</h2>
<p>Python เป็นภาษาโปรแกรมระดับสูง (High-level Programming Language) ที่ออกแบบมาให้อ่านง่ายและมีโครงสร้างชัดเจน สร้างขึ้นโดย <strong>Guido van Rossum</strong> ในปี ค.ศ. 1991</p>
<div class="info-box">
  <span class="info-icon">💡</span>
  <div><strong>ทำไมต้องเรียน Python?</strong><br>
  Python ประยุกต์ใช้งานได้กว้างขวาง ทั้ง AI/Machine Learning, Web Development, Data Science และระบบอัตโนมัติ (Automation) โดยองค์กรระดับโลกอย่าง Google, Netflix และ NASA ต่างใช้งาน Python</div>
</div>
<h3>โปรแกรมแรกของเรา</h3>
<p>ธรรมเนียมเริ่มต้นของการเรียนเขียนโปรแกรมคือการแสดงคำว่า "Hello, World!" ออกทางหน้าจอ:</p>
<div class="code-example">
<pre><code>print("Hello, World!")</code></pre>
<div class="code-output">Hello, World!</div>
</div>
<p>ฟังก์ชัน <code>print()</code> ทำหน้าที่แสดงข้อมูลออกทางหน้าจอมาตรฐาน (Standard Output)</p>
<h3>หมายเหตุในโค้ด (Comments)</h3>
<p>เราใช้เครื่องหมาย <code>#</code> เพื่อเขียนคำอธิบายกำกับโค้ด โดยตัวแปลภาษา Python จะข้ามข้อความหลัง <code>#</code> ในบรรทัดนั้นไป</p>
<div class="code-example">
<pre><code># นี่คือ comment ตัวแปลภาษา Python จะไม่รันบรรทัดนี้
print("สวัสดีชาวโลก!")  # เขียน comment ต่อท้ายบรรทัดก็ได้
print("ฉันกำลังเรียน Python")</code></pre>
</div>
<h3>Python ทำอะไรได้บ้าง?</h3>
<ul class="feature-list">
  <li>🤖 <strong>AI &amp; Machine Learning</strong> — TensorFlow, PyTorch, scikit-learn</li>
  <li>🌐 <strong>Web Development</strong> — Django, Flask, FastAPI</li>
  <li>📊 <strong>Data Science</strong> — Pandas, NumPy, Matplotlib</li>
  <li>🔧 <strong>Automation</strong> — สคริปต์จัดการไฟล์และงานอัตโนมัติ</li>
  <li>🎮 <strong>Game Development</strong> — Pygame</li>
</ul>`,
    exercises: [
      {
        id: "b1e1", title: "Hello Thailand!", difficulty: "easy",
        description: "เขียนโปรแกรมแสดงข้อความ \"สวัสดีประเทศไทย\" ออกทางหน้าจอ",
        starterCode: "# เขียนโค้ดของคุณที่นี่\n",
        hint: "ใช้ฟังก์ชัน print() และใส่ข้อความในเครื่องหมายคำพูด",
        solution: 'print("สวัสดีประเทศไทย")',
        expectedOutput: "สวัสดีประเทศไทย"
      },
      {
        id: "b1e2", title: "แนะนำตัวเอง", difficulty: "easy",
        description: "เขียนโปรแกรมแนะนำตัวเองโดยพิมพ์ชื่อ อายุ และวิชาโปรด (3 บรรทัด)",
        starterCode: "# พิมพ์: ชื่อของคุณ\n# พิมพ์: อายุของคุณ\n# พิมพ์: วิชาโปรด\n",
        hint: "ใช้ print() สามครั้ง แต่ละครั้งสำหรับข้อมูลหนึ่งอย่าง",
        solution: 'print("ชื่อ: สมชาย")\nprint("อายุ: 15")\nprint("วิชาโปรด: Python")',
        expectedOutput: ""
      },
      {
        id: "b1e3", title: "ศิลปะ ASCII วาดบ้าน", difficulty: "medium",
        description: "ใช้ print() วาดบ้านง่ายๆ ด้วยตัวอักษรอย่างน้อย 4 บรรทัด ให้มีส่วนหลังคา (เช่น ^ หรือ /\\) ตัวบ้าน (| |) และประตู ([])",
        starterCode: "# วาดบ้านทีละบรรทัดด้วย print()\n",
        hint: "ลองพิมพ์ทีละบรรทัด เช่น:\nprint(\"  ^  \")\nprint(\" / \\\\ \")  # หากใช้เครื่องหมาย \\ ในสตริง ต้องพิมพ์ \\\\ สองตัวติดกัน",
        solution: 'print("   ^   ")\nprint("  / \\\\  ")\nprint(" /___\\\\ ")\nprint(" | [] | ")\nprint(" |____| ")',
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b2", level: "beginner", order: 2,
    title: "ตัวแปร ชนิดข้อมูล และตัวดำเนินการ", icon: "📦", duration: "25 นาที",
    description: "เรียนรู้การเก็บข้อมูลในตัวแปร ชนิดข้อมูลพื้นฐาน และการคำนวณทางคณิตศาสตร์",
    theory: `
<h2>ตัวแปร (Variables)</h2>
<p>ตัวแปรคือชื่อที่ใช้เก็บอ้างอิงข้อมูลในหน่วยความจำ โดยใช้เครื่องหมาย <code>=</code> (Assignment Operator) เพื่อกำหนดค่า</p>
<div class="code-example">
<pre><code>name = "สมชาย"      # ข้อความ (String: str)
age = 15             # จำนวนเต็ม (Integer: int)
height = 1.75        # ทศนิยม (Floating-point: float)
is_student = True    # ค่าความจริง (Boolean: bool)

print(name, age, height, is_student)</code></pre>
</div>
<h3>ชนิดข้อมูลพื้นฐาน 4 ชนิด</h3>
<div class="type-grid">
  <div class="type-card str"><span>str</span><p>ข้อความ<br><code>"Hello"</code></p></div>
  <div class="type-card int"><span>int</span><p>จำนวนเต็ม<br><code>42</code></p></div>
  <div class="type-card float"><span>float</span><p>ทศนิยม<br><code>3.14</code></p></div>
  <div class="type-card bool"><span>bool</span><p>จริง/เท็จ<br><code>True</code></p></div>
</div>
<h3>ตัวดำเนินการทางคณิตศาสตร์ (Arithmetic Operators)</h3>
<div class="operator-grid">
  <code>+</code> บวก &nbsp;|&nbsp; <code>-</code> ลบ &nbsp;|&nbsp;
  <code>*</code> คูณ &nbsp;|&nbsp; <code>/</code> หาร (ผลเป็น float) &nbsp;|&nbsp;
  <code>//</code> หารปัดเศษทิ้ง &nbsp;|&nbsp; <code>%</code> หารเอาเศษ (Modulo) &nbsp;|&nbsp;
  <code>**</code> ยกกำลัง
</div>
<div class="code-example">
<pre><code>print(17 / 5)    # 3.4  (หารปกติ)
print(17 // 5)   # 3    (หารตัดทศนิยมทิ้ง)
print(17 % 5)    # 2    (เศษจากการหาร 17 ด้วย 5)
print(2 ** 3)    # 8    (2 ยกกำลัง 3)</code></pre>
</div>
<h3>การตรวจสอบและแปลงชนิดข้อมูล (Type Checking &amp; Casting)</h3>
<div class="code-example">
<pre><code>num_str = "42"
num_int = int(num_str)   # แปลง str เป็น int
print(type(num_int))     # &lt;class 'int'&gt;
print(num_int + 8)       # 50

pi = 3.14
print(int(pi))           # 3 (ตัดทศนิยมออก)
print(str(42))           # "42"</code></pre>
</div>
<div class="warning-box">
  <span>⚠️</span>
  <div><strong>กฎการตั้งชื่อตัวแปร:</strong> ใช้ตัวอักษร <code>a-z</code>, <code>A-Z</code>, ตัวเลข <code>0-9</code> และ <code>_</code> ได้ โดยห้ามขึ้นต้นด้วยตัวเลข ตัวพิมพ์เล็ก-ใหญ่ถือเป็นคนละตัวแปร และห้ามใช้คำสงวนของภาษา เช่น <code>if, for, while, def</code></div>
</div>`,
    exercises: [
      {
        id: "b2e1", title: "สร้างโปรไฟล์", difficulty: "easy",
        description: "สร้างตัวแปร name (ชื่อ), age (อายุ), gpa (เกรดเฉลี่ย) แล้วแสดงผลทั้งหมดทีละบรรทัด",
        starterCode: "# กำหนดค่าให้ตัวแปรทั้ง 3 ตัว\nname = \"\"\nage = 0\ngpa = 0.0\n\n# TODO: แก้ไขค่าข้างต้นเป็นข้อมูลจริง แล้วแสดงผล\nprint(name)\nprint(age)\nprint(gpa)",
        hint: "name เป็น string (อยู่ใน \" \"), age เป็น int, gpa เป็น float เช่น 3.75",
        solution: 'name = "สมชาย"\nage = 16\ngpa = 3.75\nprint(name)\nprint(age)\nprint(gpa)',
        expectedOutput: ""
      },
      {
        id: "b2e2", title: "การแลกค่าตัวแปร", difficulty: "medium",
        description: "กำหนด a = 10 และ b = 20 แล้วแลกค่ากันโดยไม่ใช้ตัวแปรช่วย ให้ a = 20 และ b = 10",
        starterCode: "a = 10\nb = 20\nprint(f'ก่อน: a={a}, b={b}')\n\n# TODO: สลับค่าตัวแปร a และ b\n\n\nprint(f'หลัง: a={a}, b={b}')",
        hint: "ใน Python สามารถสลับค่าพร้อมกันในบรรทัดเดียวด้วย Tuple Unpacking: a, b = b, a",
        solution: "a = 10\nb = 20\nprint(f'ก่อน: a={a}, b={b}')\na, b = b, a\nprint(f'หลัง: a={a}, b={b}')",
        expectedOutput: "ก่อน: a=10, b=20\nหลัง: a=20, b=10"
      },
      {
        id: "b2e3", title: "คำนวณพื้นที่วงกลม", difficulty: "medium",
        description: "กำหนดรัศมีของวงกลม radius = 7 คำนวณพื้นที่วงกลมจากสูตร pi * (radius ยกกำลัง 2) โดยใช้ pi = 3.14159 และแสดงผลทศนิยม 2 ตำแหน่ง",
        starterCode: "pi = 3.14159\nradius = 7\n\n# TODO: คำนวณพื้นที่วงกลมด้วยตัวดำเนินการยกกำลัง (**)\narea = 0\n\nprint(f'พื้นที่ = {area:.2f}')",
        hint: "ใช้ตัวดำเนินการยกกำลัง ** เช่น area = pi * (radius ** 2)",
        solution: "pi = 3.14159\nradius = 7\narea = pi * radius ** 2\nprint(f'พื้นที่ = {area:.2f}')",
        expectedOutput: "พื้นที่ = 153.94"
      }
    ]
  },
  {
    id: "b3", level: "beginner", order: 3,
    title: "รับ Input และจัดรูปแบบผลลัพธ์", icon: "⌨️", duration: "20 นาที",
    description: "เรียนรู้การรับข้อมูลจากผู้ใช้และจัดรูปแบบข้อความด้วย f-string",
    theory: `
<h2>การรับข้อมูลด้วย input()</h2>
<p>ฟังก์ชัน <code>input()</code> ใช้รับข้อความจากแป้นพิมพ์ โดยค่าที่คืนกลับมาจะมีชนิดข้อมูลเป็น <strong><code>str</code> (ข้อความ) เสมอ</strong></p>
<div class="code-example">
<pre><code>name = input("กรุณาใส่ชื่อ: ")
print("สวัสดี " + name)</code></pre>
</div>
<div class="info-box">
  <span>🔔</span>
  <div>ในหน้าเรียนนี้ เมื่อรันคำสั่ง <code>input()</code> ระบบจะแสดงกล่องข้อความ (Dialog) ขึ้นมาให้กรอกค่า</div>
</div>
<h3>การแปลงชนิดข้อมูลจาก input()</h3>
<div class="code-example">
<pre><code>age = int(input("อายุเท่าไร: "))
height = float(input("ส่วนสูงกี่เมตร: "))
print(f"อายุ {age} ปี สูง {height} เมตร")</code></pre>
</div>
<h3>การจัดรูปแบบด้วย f-string</h3>
<div class="code-example">
<pre><code>name = "สมชาย"
score = 95.567

print(f"นักเรียน: {name}")
print(f"คะแนน: {score:.2f}")   # ปัดเศษแสดงทศนิยม 2 ตำแหน่ง (95.57)

# การจัดความกว้างคอลัมน์
print(f"{'ชื่อ':<10} {'คะแนน':>8}")
print(f"{name:<10} {score:>8.2f}")</code></pre>
</div>
<h3>พารามิเตอร์ sep และ end ของ print()</h3>
<div class="code-example">
<pre><code>print("a", "b", "c")           # a b c
print("a", "b", "c", sep="-")  # a-b-c (คั่นด้วย -)
print("Hello", end="!")        # Hello! (ไม่ขึ้นบรรทัดใหม่)
print("Line1\\nLine2")          # ขึ้นบรรทัดใหม่ด้วย \\n</code></pre>
</div>`,
    exercises: [
      {
        id: "b3e1", title: "คำทักทายส่วนตัว", difficulty: "easy",
        description: "รับชื่อและวิชาโปรดจากผู้ใช้ แล้วพิมพ์ข้อความทักทายที่มีทั้งชื่อและวิชาโปรดด้วย f-string",
        starterCode: "name = input('ชื่อของคุณ: ')\nfav_subject = input('วิชาโปรด: ')\n\n# TODO: แสดงข้อความทักทายด้วย f-string\n",
        hint: "ใช้ print(f'สวัสดี {name}! ... {fav_subject} ...')",
        solution: "name = input('ชื่อของคุณ: ')\nfav_subject = input('วิชาโปรด: ')\nprint(f'สวัสดี {name}! วิชา{fav_subject}เป็นวิชาที่ยอดเยี่ยมมาก!')",
        expectedOutput: ""
      },
      {
        id: "b3e2", title: "เครื่องคำนวณ BMI", difficulty: "medium",
        description: "สร้างโปรแกรมรับน้ำหนัก (kg) และส่วนสูง (m) แล้วคำนวณดัชนีมวลกาย BMI = น้ำหนัก / (ส่วนสูงยกกำลัง 2) แสดงผลทศนิยม 2 ตำแหน่ง",
        starterCode: "weight = float(input('น้ำหนัก (kg): '))\nheight = float(input('ส่วนสูง (m): '))\n\n# TODO: คำนวณค่า BMI\nbmi = 0\n\nprint(f'BMI ของคุณ = {bmi:.2f}')",
        hint: "ใช้สูตร bmi = weight / (height ** 2)",
        solution: "weight = float(input('น้ำหนัก (kg): '))\nheight = float(input('ส่วนสูง (m): '))\nbmi = weight / (height ** 2)\nprint(f'BMI ของคุณ = {bmi:.2f}')",
        expectedOutput: ""
      },
      {
        id: "b3e3", title: "ใบเสร็จร้านค้าและคำนวณ VAT", difficulty: "hard",
        description: "รับชื่อสินค้า ราคาต่อชิ้น (float) และจำนวนชิ้น (int) จากผู้ใช้ คำนวณราคารวม (subtotal), ภาษีมูลค่าเพิ่ม 7% (vat = subtotal * 0.07) และยอดสุทธิ (total = subtotal + vat) แสดงผลทศนิยม 2 ตำแหน่ง",
        starterCode: "item = input('ชื่อสินค้า: ')\nprice = float(input('ราคาต่อชิ้น: '))\nqty = int(input('จำนวนชิ้น: '))\n\n# TODO: คำนวณ subtotal, vat (7%) และ total\nsubtotal = 0\nvat = 0\ntotal = 0\n\nprint(f'สินค้า: {item} x {qty}')\nprint(f'ราคารวม: {subtotal:.2f} บาท')\nprint(f'VAT 7%: {vat:.2f} บาท')\nprint(f'ยอดสุทธิ: {total:.2f} บาท')",
        hint: "subtotal = price * qty, vat = subtotal * 0.07 และ total = subtotal + vat",
        solution: "item = input('ชื่อสินค้า: ')\nprice = float(input('ราคาต่อชิ้น: '))\nqty = int(input('จำนวนชิ้น: '))\nsubtotal = price * qty\nvat = subtotal * 0.07\ntotal = subtotal + vat\nprint(f'สินค้า: {item} x {qty}')\nprint(f'ราคารวม: {subtotal:.2f} บาท')\nprint(f'VAT 7%: {vat:.2f} บาท')\nprint(f'ยอดสุทธิ: {total:.2f} บาท')",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b4", level: "beginner", order: 4,
    title: "เงื่อนไข if / elif / else", icon: "🔀", duration: "30 นาที",
    description: "ควบคุมทิศทางการทำงานของโปรแกรมด้วยโครงสร้างแบบมีทางเลือก",
    theory: `
<h2>การตัดสินใจด้วย if / elif / else</h2>
<p>โครงสร้างแบบมีทางเลือกช่วยให้โปรแกรมทำงานต่างกันตามค่าความจริงของเงื่อนไข (ต้องย่อหน้า Indentation 4 ช่องว่างเสมอ)</p>
<div class="code-example">
<pre><code>score = 85

if score >= 80:
    print("เกรด A — ยอดเยี่ยม!")
elif score >= 70:
    print("เกรด B — ดี")
elif score >= 60:
    print("เกรด C — ผ่าน")
else:
    print("เกรด F — ต้องพยายามอีก")</code></pre>
<div class="code-output">เกรด A — ยอดเยี่ยม!</div>
</div>
<h3>ตัวดำเนินการเปรียบเทียบ (Comparison Operators)</h3>
<div class="operator-grid">
  <code>==</code> เท่ากับ &nbsp;|&nbsp; <code>!=</code> ไม่เท่ากับ &nbsp;|&nbsp;
  <code>&gt;</code> มากกว่า &nbsp;|&nbsp; <code>&lt;</code> น้อยกว่า &nbsp;|&nbsp;
  <code>&gt;=</code> มากกว่าหรือเท่ากับ &nbsp;|&nbsp; <code>&lt;=</code> น้อยกว่าหรือเท่ากับ
</div>
<h3>ตัวดำเนินการตรรกศาสตร์ (Logical Operators)</h3>
<div class="code-example">
<pre><code>age = 18
has_id = True

# and: เป็นจริงเมื่อเงื่อนไขทั้งสองฝั่งเป็นจริง
if age >= 18 and has_id:
    print("เข้าได้!")

# or: เป็นจริงเมื่ออย่างน้อยหนึ่งฝั่งเป็นจริง
if age < 18 or not has_id:
    print("ขออภัย ไม่สามารถเข้าได้")

# การใช้ % (หารเอาเศษ) ร่วมกับ == เพื่อเช็กเลขคู่/คี่
num = 14
if num % 2 == 0:
    print("เป็นเลขคู่")</code></pre>
</div>
<h3>Nested if (เงื่อนไขซ้อนเงื่อนไข)</h3>
<div class="code-example">
<pre><code>score = 92
attendance = 90

if score >= 60:
    if attendance >= 80:
        print("ผ่านการสอบ ✓")
    else:
        print("คะแนนผ่าน แต่เวลาเรียนไม่พอ ✗")
else:
    print("ไม่ผ่าน ✗")</code></pre>
</div>`,
    exercises: [
      {
        id: "b4e1", title: "ตรวจเลขคู่/คี่", difficulty: "easy",
        description: "รับตัวเลขจำนวนเต็มจากผู้ใช้ แล้วบอกว่าเป็นเลขคู่หรือเลขคี่",
        starterCode: "num = int(input('ป้อนตัวเลข: '))\n\n# TODO: ตรวจสอบเลขคู่หรือเลขคี่ด้วยตัวดำเนินการ %\n",
        hint: "เลขคู่คือเลขที่หารด้วย 2 ลงตัว (num % 2 == 0)",
        solution: "num = int(input('ป้อนตัวเลข: '))\nif num % 2 == 0:\n    print(f'{num} เป็นเลขคู่')\nelse:\n    print(f'{num} เป็นเลขคี่')",
        expectedOutput: ""
      },
      {
        id: "b4e2", title: "ระบบให้เกรด", difficulty: "medium",
        description: "รับคะแนน (0-100) แล้วแสดงเกรด: 80+ = A, 70-79 = B, 60-69 = C, 50-59 = D, ต่ำกว่า 50 = F",
        starterCode: "score = float(input('คะแนน: '))\n\n# TODO: ตรวจสอบเกรดด้วย if / elif / else\n",
        hint: "ใช้ if/elif/else เรียงลำดับจากเกณฑ์คะแนนสูงลงมาหาต่ำ",
        solution: "score = float(input('คะแนน: '))\nif score >= 80:\n    print('เกรด A')\nelif score >= 70:\n    print('เกรด B')\nelif score >= 60:\n    print('เกรด C')\nelif score >= 50:\n    print('เกรด D')\nelse:\n    print('เกรด F')",
        expectedOutput: ""
      },
      {
        id: "b4e3", title: "ค้นหาค่ามากที่สุด", difficulty: "medium",
        description: "รับตัวเลข 3 ตัว แล้วแสดงค่าที่มากที่สุด โดยไม่ใช้ฟังก์ชัน max()",
        starterCode: "a = float(input('ตัวเลขที่ 1: '))\nb = float(input('ตัวเลขที่ 2: '))\nc = float(input('ตัวเลขที่ 3: '))\n\n# TODO: เปรียบเทียบหาค่ามากที่สุดด้วยตัวดำเนินการ and\n",
        hint: "ตรวจสอบ if a >= b and a >= c: แล้วตามด้วย elif b >= a and b >= c: และ else:",
        solution: "a = float(input('ตัวเลขที่ 1: '))\nb = float(input('ตัวเลขที่ 2: '))\nc = float(input('ตัวเลขที่ 3: '))\nif a >= b and a >= c:\n    print(f'ค่ามากที่สุดคือ {a}')\nelif b >= a and b >= c:\n    print(f'ค่ามากที่สุดคือ {b}')\nelse:\n    print(f'ค่ามากที่สุดคือ {c}')",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b5", level: "beginner", order: 5,
    title: "ลูป for", icon: "🔄", duration: "30 นาที",
    description: "ทำซ้ำคำสั่งตามจำนวนรอบหรือลำดับข้อมูลที่แน่นอนด้วยลูป for",
    theory: `
<h2>ลูป for — การทำซ้ำแบบรู้จำนวนรอบ</h2>
<p>เมื่อต้องทำงานซ้ำตามลำดับหรือจำนวนรอบที่ชัดเจน ลูป <code>for</code> ช่วยลดการเขียนโค้ดซ้ำซ้อนได้เป็นอย่างดี</p>
<div class="code-example">
<pre><code># นับ 1 ถึง 5 (ระวัง! ค่าหยุดของ range จะไม่ถูกรวม)
for i in range(1, 6):
    print(f"ครั้งที่ {i}")</code></pre>
<div class="code-output">ครั้งที่ 1<br>ครั้งที่ 2<br>ครั้งที่ 3<br>ครั้งที่ 4<br>ครั้งที่ 5</div>
</div>
<h3>ฟังก์ชัน range(start, stop, step)</h3>
<div class="code-example">
<pre><code>range(5)          # 0, 1, 2, 3, 4 (เริ่มที่ 0 เสมอหากไม่ระบุ start)
range(1, 6)       # 1, 2, 3, 4, 5
range(0, 10, 2)   # 0, 2, 4, 6, 8 (เพิ่มทีละ 2)
range(10, 0, -1)  # 10, 9, 8, ..., 1 (นับถอยหลัง)</code></pre>
</div>
<h3>การวนลูปผ่านข้อมูลชุด (Iterable)</h3>
<div class="code-example">
<pre><code>fruits = ["🍎 แอปเปิ้ล", "🍌 กล้วย", "🍊 ส้ม"]

for fruit in fruits:
    print(fruit)

# ใช้ enumerate() เมื่อต้องการทั้งลำดับ (index) และข้อมูล
for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")</code></pre>
</div>
<h3>คำสั่ง break และ continue</h3>
<div class="code-example">
<pre><code># break: หยุดออกจากลูปทันที
for i in range(1, 10):
    if i == 5:
        break
    print(i)  # แสดง 1, 2, 3, 4

# continue: ข้ามการทำงานรอบปัจจุบันไปยังรอบถัดไป
for i in range(1, 6):
    if i == 3:
        continue
    print(i)  # แสดง 1, 2, 4, 5</code></pre>
</div>`,
    exercises: [
      {
        id: "b5e1", title: "ผลรวม 1 ถึง n", difficulty: "easy",
        description: "รับตัวเลขจำนวนเต็มบวก n จากผู้ใช้ คำนวณและแสดงผลรวมของ 1 + 2 + ... + n",
        starterCode: "n = int(input('ป้อน n: '))\ntotal = 0\n\nfor i in range(1, n + 1):\n    # TODO: บวกค่า i สะสมเข้าไปใน total\n    pass\n\nprint(f'ผลรวม 1 ถึง {n} = {total}')",
        hint: "แทนที่ pass ด้วย total += i เพื่อบวกค่าสะสมในแต่ละรอบ",
        solution: "n = int(input('ป้อน n: '))\ntotal = 0\nfor i in range(1, n + 1):\n    total += i\nprint(f'ผลรวม 1 ถึง {n} = {total}')",
        expectedOutput: ""
      },
      {
        id: "b5e2", title: "แสดงตารางสูตรคูณ", difficulty: "medium",
        description: "ใช้ Nested Loop (ลูปซ้อนลูป) แสดงตารางสูตรคูณแม่ 2 ถึงแม่ 3 โดยแต่ละแม่คูณตั้งแต่ 1 ถึง 5 ตามรูปแบบที่กำหนด",
        starterCode: "for table in range(2, 4):\n    print(f'=== สูตรคูณแม่ {table} ===')\n    for i in range(1, 6):\n        # TODO: แสดงผลในรูปแบบ '2 x 1 = 2'\n        pass",
        hint: "แทนที่ pass ด้วย print(f'{table} x {i} = {table * i}')",
        solution: "for table in range(2, 4):\n    print(f'=== สูตรคูณแม่ {table} ===')\n    for i in range(1, 6):\n        print(f'{table} x {i} = {table * i}')",
        expectedOutput: "=== สูตรคูณแม่ 2 ===\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n=== สูตรคูณแม่ 3 ===\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15"
      },
      {
        id: "b5e3", title: "ลูปสร้างพีระมิดดาว", difficulty: "hard",
        description: "รับตัวเลขจำนวนชั้น n แล้วพิมพ์สามเหลี่ยมดาว n ชั้น เช่น n=4 ชั้นที่ 1 มี 1 ดวง (*) จนถึงชั้นที่ 4 มี 4 ดวง (****)",
        starterCode: "n = int(input('จำนวนชั้น: '))\nfor i in range(1, n + 1):\n    # TODO: พิมพ์เครื่องหมาย * จำนวน i ดวงในแต่ละชั้น\n    pass",
        hint: "ใน Python สามารถนำข้อความคูณตัวเลขเพื่อทำซ้ำได้ เช่น print('*' * i)",
        solution: "n = int(input('จำนวนชั้น: '))\nfor i in range(1, n + 1):\n    print('*' * i)",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b6", level: "beginner", order: 6,
    title: "ลูป while", icon: "⚡", duration: "25 นาที",
    description: "ทำซ้ำคำสั่งตราบเท่าที่เงื่อนไขยังเป็นจริงด้วยลูป while",
    theory: `
<h2>ลูป while — การทำซ้ำตามเงื่อนไข</h2>
<p>ลูป <code>while</code> จะทำซ้ำคำสั่งภายในบล็อกตราบเท่าที่เงื่อนไขยังมีค่าความจริงเป็น <strong><code>True</code></strong></p>
<div class="code-example">
<pre><code>count = 1
while count <= 5:
    print(f"นับ: {count}")
    count += 1   # สำคัญมาก: ต้องเปลี่ยนค่าตัวแปรควบคุมลูปเสมอ!
print("เสร็จแล้ว!")</code></pre>
<div class="code-output">นับ: 1<br>นับ: 2<br>นับ: 3<br>นับ: 4<br>นับ: 5<br>เสร็จแล้ว!</div>
</div>
<div class="warning-box">
  <span>⚠️</span>
  <div><strong>ระวัง Infinite Loop (ลูปไม่รู้จบ)!</strong> หากเงื่อนไขเป็นจริงตลอดเวลาโดยไม่มีการปรับค่าตัวแปรหรือไม่มีคำสั่ง <code>break</code> โปรแกรมจะค้างเพราะวนทำงานไม่สิ้นสุด</div>
</div>
<h3>การใช้ while True คู่กับ break</h3>
<div class="code-example">
<pre><code>secret = 7
while True:
    guess = int(input("ทายตัวเลข 1-10: "))
    if guess == secret:
        print("ถูกต้อง! 🎉")
        break
    elif guess < secret:
        print("น้อยเกินไป ลองใหม่")
    else:
        print("มากเกินไป ลองใหม่")</code></pre>
</div>
<h3>เปรียบเทียบ for กับ while</h3>
<div class="comparison-box">
  <div><strong>ใช้ for เมื่อ:</strong> รู้จำนวนรอบหรือชุดข้อมูลที่ต้องการวนล่วงหน้า เช่น วน 10 รอบ หรือวนอ่านสมาชิกใน List</div>
  <div><strong>ใช้ while เมื่อ:</strong> ไม่รู้จำนวนรอบที่แน่นอน แต่รู้เงื่อนไขหยุด เช่น วนรับรหัสผ่านจนกว่าจะพิมพ์ถูก</div>
</div>`,
    exercises: [
      {
        id: "b6e1", title: "รอรหัสผ่านที่ถูกต้อง", difficulty: "easy",
        description: "เขียนโปรแกรมรอรหัสผ่าน PIN = '1234' วนถามซ้ำจนกว่าจะพิมพ์ถูก แล้วพิมพ์ 'เข้าสู่ระบบสำเร็จ! ✓' ก่อนหยุดลูป",
        starterCode: "PIN = '1234'\n\nwhile True:\n    code = input('ใส่รหัส: ')\n    if code == PIN:\n        # TODO: แสดงข้อความสำเร็จแล้วหยุดลูป\n        break\n    else:\n        print('รหัสผิด ลองใหม่')",
        hint: "ใส่คำสั่ง print('เข้าสู่ระบบสำเร็จ! ✓') ไว้เหนือคำสั่ง break ภายในบล็อก if",
        solution: "PIN = '1234'\nwhile True:\n    code = input('ใส่รหัส: ')\n    if code == PIN:\n        print('เข้าสู่ระบบสำเร็จ! ✓')\n        break\n    else:\n        print('รหัสผิด ลองใหม่')",
        expectedOutput: ""
      },
      {
        id: "b6e2", title: "คำนวณดอกเบี้ยทบต้น", difficulty: "medium",
        description: "ฝากเงินเริ่มต้น 10,000 บาท ได้รับดอกเบี้ยทบต้น 5% ต่อปี (rate = 0.05) จงเขียนลูป while คำนวณว่าต้องฝากกี่ปีจึงจะมีเงินอย่างน้อย 15,000 บาท",
        starterCode: "balance = 10000\nrate = 0.05\nyears = 0\n\n# TODO: เขียนลูป while ทำงานตราบที่ balance < 15000\n# ในแต่ละรอบให้ปรับค่า balance เพิ่มขึ้น 5% และบวก years เพิ่มทีละ 1\n\n\nprint(f'ใช้เวลา {years} ปี')\nprint(f'เงินสุดท้าย {balance:.2f} บาท')",
        hint: "ใช้ while balance < 15000: แล้วข้างในคำนวณ balance = balance * (1 + rate) คู่กับ years += 1",
        solution: "balance = 10000\nrate = 0.05\nyears = 0\nwhile balance < 15000:\n    balance = balance * (1 + rate)\n    years += 1\nprint(f'ใช้เวลา {years} ปี')\nprint(f'เงินสุดท้าย {balance:.2f} บาท')",
        expectedOutput: "ใช้เวลา 9 ปี\nเงินสุดท้าย 15513.28 บาท"
      },
      {
        id: "b6e3", title: "เกมทายตัวเลข 1-100", difficulty: "hard",
        description: "สร้างเกมสุ่มตัวเลข 1-100 แล้ววนรับค่าทายจากผู้เล่น นับจำนวนครั้งที่ทาย (attempts) พร้อมใบ้ว่า 'ต่ำเกิน!' หรือ 'สูงเกิน!' จนกว่าจะทายถูก",
        starterCode: "import random\nsecret = random.randint(1, 100)\nattempts = 0\n\nprint('ทายตัวเลข 1-100!')\n\nwhile True:\n    guess = int(input('ทาย: '))\n    # TODO: เพิ่มจำนวนครั้ง attempts ทีละ 1\n    # และตรวจสอบว่า guess เท่ากับ, น้อยกว่า หรือมากกว่า secret\n    break\n",
        hint: "บวก attempts += 1 ก่อน จากนั้นเช็ก if guess == secret: ให้พิมพ์จำนวนครั้งแล้ว break ส่วนกรณีอื่นใช้ elif guess < secret: และ else: โดยไม่ต้องมี break ท้ายลูป",
        solution: "import random\nsecret = random.randint(1, 100)\nattempts = 0\nprint('ทายตัวเลข 1-100!')\nwhile True:\n    guess = int(input('ทาย: '))\n    attempts += 1\n    if guess == secret:\n        print(f'ถูก! ใช้ {attempts} ครั้ง')\n        break\n    elif guess < secret:\n        print('ต่ำเกิน!')\n    else:\n        print('สูงเกิน!')",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b7", level: "beginner", order: 7,
    title: "Functions", icon: "🔧", duration: "35 นาที",
    description: "จัดระเบียบโค้ดเป็นฟังก์ชันย่อยเพื่อลดความซ้ำซ้อนและนำกลับมาใช้ใหม่ได้",
    theory: `
<h2>Functions คืออะไร?</h2>
<p>ฟังก์ชันคือชุดคำสั่งที่ตั้งชื่อไว้เพื่อทำงานเฉพาะอย่าง สร้างด้วยคำสงวน <code>def</code> และส่งค่าผลลัพธ์กลับด้วย <code>return</code></p>
<div class="code-example">
<pre><code>def greet(name):
    """ฟังก์ชันสร้างข้อความทักทาย"""
    message = f"สวัสดี {name}! 👋"
    return message

result = greet("สมชาย")
print(result)          # สวัสดี สมชาย! 👋
print(greet("มาลี"))   # สวัสดี มาลี! 👋</code></pre>
</div>
<h3>Parameters, Arguments และค่าเริ่มต้น (Default Parameter)</h3>
<div class="code-example">
<pre><code>def add(a, b):           # a, b คือ Parameters
    return a + b

print(add(3, 4))         # 3, 4 คือ Arguments → 7

def power(base, exp=2):  # exp มีค่าเริ่มต้นเป็น 2
    return base ** exp

print(power(3))          # 3 ยกกำลัง 2 = 9
print(power(3, 3))       # 3 ยกกำลัง 3 = 27</code></pre>
</div>
<h3>การคืนค่าหลายตัว (Multiple Return Values)</h3>
<div class="code-example">
<pre><code>def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([5, 3, 8, 1, 9])
print(f"ต่ำสุด: {low}, สูงสุด: {high}")</code></pre>
</div>
<h3>ขอบเขตตัวแปร (Variable Scope)</h3>
<div class="code-example">
<pre><code>x = 10  # Global variable (เข้าถึงได้ทั้งไฟล์)

def my_func():
    y = 20  # Local variable (มีผลเฉพาะภายในฟังก์ชันนี้)
    print(x, y)

my_func()</code></pre>
</div>`,
    exercises: [
      {
        id: "b7e1", title: "ฟังก์ชันคำนวณเกรด", difficulty: "easy",
        description: "สร้างฟังก์ชัน get_grade(score) ที่รับคะแนนแล้ว return เกรด 'A' (>=80), 'B' (>=70), 'C' (>=60), 'D' (>=50), 'F' (<50) ทดสอบด้วยคะแนน 95, 75, 55, 45",
        starterCode: "def get_grade(score):\n    # TODO: เขียนเงื่อนไขคืนค่าเกรด 'A', 'B', 'C', 'D', 'F'\n    pass\n\nprint(get_grade(95))\nprint(get_grade(75))\nprint(get_grade(55))\nprint(get_grade(45))",
        hint: "ใช้ if/elif/else ร่วมกับคำสั่ง return (ไม่ใช่ print ในฟังก์ชัน)",
        solution: "def get_grade(score):\n    if score >= 80:\n        return 'A'\n    elif score >= 70:\n        return 'B'\n    elif score >= 60:\n        return 'C'\n    elif score >= 50:\n        return 'D'\n    else:\n        return 'F'\nprint(get_grade(95))\nprint(get_grade(75))\nprint(get_grade(55))\nprint(get_grade(45))",
        expectedOutput: "A\nB\nD\nF"
      },
      {
        id: "b7e2", title: "ฟังก์ชันเครื่องคิดเลข", difficulty: "medium",
        description: "สร้างฟังก์ชัน calculate(a, op, b) ที่รับตัวเลข 2 ตัวและตัวดำเนินการ ('+', '-', '*', '/') แล้ว return ผลลัพธ์ (กรณีหารด้วย 0 ให้ return 'หารด้วยศูนย์ไม่ได้!')",
        starterCode: "def calculate(a, op, b):\n    if op == '+':\n        return a + b\n    # TODO: เพิ่มเงื่อนไขสำหรับ '-', '*', '/'\n    \n\nprint(calculate(10, '+', 5))\nprint(calculate(10, '-', 3))\nprint(calculate(4, '*', 6))\nprint(calculate(15, '/', 3))",
        hint: "เพิ่ม elif สำหรับ '-', '*', '/' และในกรณี '/' ให้เช็ก if b != 0: ก่อนหาร",
        solution: "def calculate(a, op, b):\n    if op == '+':\n        return a + b\n    elif op == '-':\n        return a - b\n    elif op == '*':\n        return a * b\n    elif op == '/':\n        if b != 0:\n            return a / b\n        else:\n            return 'หารด้วยศูนย์ไม่ได้!'\nprint(calculate(10, '+', 5))\nprint(calculate(10, '-', 3))\nprint(calculate(4, '*', 6))\nprint(calculate(15, '/', 3))",
        expectedOutput: "15\n7\n24\n5.0"
      },
      {
        id: "b7e3", title: "ฟังก์ชันลำดับ Fibonacci", difficulty: "hard",
        description: "สร้างฟังก์ชัน fibonacci(n) ที่ return ลิสต์ของลำดับ Fibonacci จำนวน n ตัวแรก เช่น fibonacci(8) คืนค่า [0, 1, 1, 2, 3, 5, 8, 13]",
        starterCode: "def fibonacci(n):\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    \n    sequence = [0, 1]\n    while len(sequence) < n:\n        # TODO: คำนวณตัวถัดไปจากผลรวมของ 2 ตัวท้ายสุด แล้วเพิ่มเข้า sequence\n        pass\n    return sequence\n\nprint(fibonacci(8))\nprint(fibonacci(10))",
        hint: "ตัวถัดไปคือ sequence[-1] + sequence[-2] จากนั้นใช้ sequence.append(...) เพื่อต่อท้ายลิสต์",
        solution: "def fibonacci(n):\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    sequence = [0, 1]\n    while len(sequence) < n:\n        next_num = sequence[-1] + sequence[-2]\n        sequence.append(next_num)\n    return sequence\nprint(fibonacci(8))\nprint(fibonacci(10))",
        expectedOutput: "[0, 1, 1, 2, 3, 5, 8, 13]\n[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]"
      }
    ]
  },
  {
    id: "b8", level: "beginner", order: 8,
    title: "Lists และ Tuples", icon: "📋", duration: "30 นาที",
    description: "เรียนรู้การจัดเก็บข้อมูลหลายค่าอย่างเป็นลำดับด้วย List และ Tuple",
    theory: `
<h2>List — รายการข้อมูลที่เปลี่ยนแปลงค่าได้ (Mutable)</h2>
<div class="code-example">
<pre><code>fruits = ["แอปเปิ้ล", "กล้วย", "ส้ม", "มะม่วง"]

# เข้าถึงด้วยดัชนี (Index เริ่มต้นที่ 0 เสมอ!)
print(fruits[0])    # แอปเปิ้ล
print(fruits[-1])   # มะม่วง (นับย้อนจากตัวท้ายสุด)

# การตัดช่วงข้อมูล (Slicing)
print(fruits[1:3])  # ['กล้วย', 'ส้ม']
print(fruits[:2])   # ['แอปเปิ้ล', 'กล้วย']</code></pre>
</div>
<h3>เมธอดและฟังก์ชันจัดการ List ที่ใช้บ่อย</h3>
<div class="code-example">
<pre><code>nums = [3, 1, 4, 1, 5]

nums.append(9)      # ต่อท้าย: [3, 1, 4, 1, 5, 9]
nums.insert(0, 10)  # แทรกที่ตำแหน่ง 0: [10, 3, 1, 4, 1, 5, 9]
nums.remove(1)      # ลบเลข 1 ตัวแรกที่พบ
nums.sort()         # เรียงจากน้อยไปมาก
nums.reverse()      # กลับลำดับจากหลังมาหน้า

print(len(nums), sum(nums), max(nums), min(nums))</code></pre>
</div>
<h3>Tuple — รายการข้อมูลที่แก้ไขไม่ได้ (Immutable)</h3>
<div class="code-example">
<pre><code>point = (10, 20)         # Tuple ใช้วงเล็บโค้ง ()
x, y = point             # Unpacking แยกค่าลงตัวแปร
print(f"x={x}, y={y}")   # x=10, y=20</code></pre>
</div>
<h3>List Comprehension พื้นฐาน</h3>
<div class="code-example">
<pre><code>squares = [i**2 for i in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

evens = [i for i in range(1, 11) if i % 2 == 0]
print(evens)    # [2, 4, 6, 8, 10]</code></pre>
</div>`,
    exercises: [
      {
        id: "b8e1", title: "สถิติคะแนนสอบ", difficulty: "easy",
        description: "กำหนด scores = [85, 92, 78, 65, 90, 88, 72] จงแสดงคะแนนสูงสุด ต่ำสุด ค่าเฉลี่ย (ทศนิยม 1 ตำแหน่ง) และลิสต์ที่เรียงจากน้อยไปมาก",
        starterCode: "scores = [85, 92, 78, 65, 90, 88, 72]\n\n# TODO: เติมการหาค่าสูงสุด ต่ำสุด ค่าเฉลี่ย และเรียงลำดับ\nprint(f'สูงสุด: {max(scores)}')\nprint(f'ต่ำสุด: {0}')\nprint(f'เฉลี่ย: {0:.1f}')\n\n# เรียงลำดับ scores จากน้อยไปมาก\n\nprint(f'เรียงแล้ว: {scores}')",
        hint: "ใช้ min(scores) หาค่าต่ำสุด, sum(scores)/len(scores) หาค่าเฉลี่ย และเรียก scores.sort() ก่อนพิมพ์บรรทัดสุดท้าย",
        solution: "scores = [85, 92, 78, 65, 90, 88, 72]\nprint(f'สูงสุด: {max(scores)}')\nprint(f'ต่ำสุด: {min(scores)}')\nprint(f'เฉลี่ย: {sum(scores)/len(scores):.1f}')\nscores.sort()\nprint(f'เรียงแล้ว: {scores}')",
        expectedOutput: "สูงสุด: 92\nต่ำสุด: 65\nเฉลี่ย: 81.4\nเรียงแล้ว: [65, 72, 78, 85, 88, 90, 92]"
      },
      {
        id: "b8e2", title: "กรองตัวเลขด้วย List Comprehension", difficulty: "medium",
        description: "จาก numbers = [1..20] ใช้ List Comprehension สร้าง 2 ลิสต์ ได้แก่ เลขคู่ทั้งหมด (evens) และเลขที่หารด้วย 3 ลงตัว (div3)",
        starterCode: "numbers = list(range(1, 21))\n\n# TODO: เขียน List Comprehension กรองตัวเลขทั้ง 2 ชุด\nevens = []\ndiv3 = []\n\nprint('เลขคู่:', evens)\nprint('หารด้วย 3:', div3)",
        hint: "ใช้ [n for n in numbers if n % 2 == 0] สำหรับเลขคู่ และเช็ก n % 3 == 0 สำหรับเลขที่หารด้วย 3 ลงตัว",
        solution: "numbers = list(range(1, 21))\nevens = [n for n in numbers if n % 2 == 0]\ndiv3 = [n for n in numbers if n % 3 == 0]\nprint('เลขคู่:', evens)\nprint('หารด้วย 3:', div3)",
        expectedOutput: "เลขคู่: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]\nหารด้วย 3: [3, 6, 9, 12, 15, 18]"
      },
      {
        id: "b8e3", title: "หมุนสมาชิกใน List", difficulty: "hard",
        description: "สร้างฟังก์ชัน rotate(lst, k) ที่หมุนสมาชิกในลิสต์ไปทางขวา k ตำแหน่ง เช่น rotate([1,2,3,4,5], 2) คืนค่า [4, 5, 1, 2, 3]",
        starterCode: "def rotate(lst, k):\n    n = len(lst)\n    k = k % n\n    # TODO: ใช้ Slicing ตัดท้าย k ตัวมาต่อด้านหน้า\n    return lst\n\nprint(rotate([1, 2, 3, 4, 5], 2))\nprint(rotate([1, 2, 3, 4, 5], 1))",
        hint: "หาก k == 0 คืนค่า lst ได้เลย หรือใช้ Slicing: lst[-k:] + lst[:-k]",
        solution: "def rotate(lst, k):\n    n = len(lst)\n    k = k % n\n    if k == 0:\n        return lst\n    return lst[-k:] + lst[:-k]\nprint(rotate([1, 2, 3, 4, 5], 2))\nprint(rotate([1, 2, 3, 4, 5], 1))",
        expectedOutput: "[4, 5, 1, 2, 3]\n[5, 1, 2, 3, 4]"
      }
    ]
  },
  {
    id: "b9", level: "beginner", order: 9,
    title: "Dictionaries", icon: "📖", duration: "30 นาที",
    description: "เก็บและค้นหาข้อมูลแบบจับคู่ Key-Value อย่างรวดเร็ว",
    theory: `
<h2>Dictionary — โครงสร้างข้อมูลแบบ Key-Value</h2>
<div class="code-example">
<pre><code>student = {
    "name": "สมชาย",
    "age": 16,
    "grade": "A",
    "subjects": ["คณิต", "วิทย์", "Python"]
}

print(student["name"])       # สมชาย
print(student.get("age"))    # 16 (.get() จะคืนค่า None แทนการเกิด Error หากไม่พบ key)
print(student["subjects"])   # ['คณิต', 'วิทย์', 'Python']</code></pre>
</div>
<h3>การเพิ่ม แก้ไข และลบข้อมูลใน Dictionary</h3>
<div class="code-example">
<pre><code>info = {"a": 1, "b": 2}

info["c"] = 3          # เพิ่ม key ใหม่
info["a"] = 100        # แก้ไขค่าเดิม
del info["b"]          # ลบคู่ key-value

print(info)            # {'a': 100, 'c': 3}
print(info.keys())     # dict_keys(['a', 'c'])
print(info.values())   # dict_values([100, 3])
print(info.items())    # dict_items([('a', 100), ('c', 3)])</code></pre>
</div>
<h3>การวนลูปอ่าน Dictionary</h3>
<div class="code-example">
<pre><code>scores = {"คณิต": 95, "วิทย์": 88, "ภาษาไทย": 92}

for subject, score in scores.items():
    print(f"{subject}: {score} คะแนน")</code></pre>
</div>`,
    exercises: [
      {
        id: "b9e1", title: "ระบบเมนูอาหาร", difficulty: "easy",
        description: "เติมรายการอาหารใน dict menu ให้ครบ 5 รายการพร้อมราคา แสดงรายการทั้งหมดและคำนวณราคาเฉลี่ย",
        starterCode: "menu = {\n    'ข้าวผัด': 50,\n    'ผัดไทย': 60,\n    # TODO: เพิ่มรายการอาหารและราคาอีก 3 รายการ\n}\n\nprint('=== เมนูอาหาร ===')\nfor item, price in menu.items():\n    print(f'{item}: {price} บาท')\n\navg = sum(menu.values()) / len(menu)\nprint(f'ราคาเฉลี่ย: {avg:.0f} บาท')",
        hint: "เติมคู่ 'ชื่อเมนู': ราคา คั่นด้วยจุลภาค (,) อีก 3 รายการในปีกกา menu",
        solution: "menu = {'ข้าวผัด': 50, 'ผัดไทย': 60, 'ต้มยำ': 80, 'ราดหน้า': 55, 'ส้มตำ': 45}\nprint('=== เมนูอาหาร ===')\nfor item, price in menu.items():\n    print(f'{item}: {price} บาท')\navg = sum(menu.values()) / len(menu)\nprint(f'ราคาเฉลี่ย: {avg:.0f} บาท')",
        expectedOutput: ""
      },
      {
        id: "b9e2", title: "นับความถี่ของคำ", difficulty: "medium",
        description: "นับความถี่ของแต่ละคำในประโยค 'the cat sat on the mat the cat' แล้วแสดงคำคู่กับจำนวนครั้งที่พบ",
        starterCode: "sentence = 'the cat sat on the mat the cat'\nwords = sentence.split()\nfrequency = {}\n\nfor word in words:\n    # TODO: หากมี word ใน frequency แล้วให้บวก 1 หากยังไม่มีให้ตั้งค่าเริ่มต้นเป็น 1\n    pass\n\nfor word, count in frequency.items():\n    print(f'{word}: {count} ครั้ง')",
        hint: "เช็ก if word in frequency: ให้เพิ่ม frequency[word] += 1 มิฉะนั้น frequency[word] = 1",
        solution: "sentence = 'the cat sat on the mat the cat'\nwords = sentence.split()\nfrequency = {}\nfor word in words:\n    if word in frequency:\n        frequency[word] += 1\n    else:\n        frequency[word] = 1\nfor word, count in frequency.items():\n    print(f'{word}: {count} ครั้ง')",
        expectedOutput: "the: 3 ครั้ง\ncat: 2 ครั้ง\nsat: 1 ครั้ง\non: 1 ครั้ง\nmat: 1 ครั้ง"
      },
      {
        id: "b9e3", title: "ระบบจัดการสต็อกสินค้า", difficulty: "hard",
        description: "เขียนฟังก์ชัน add_stock(inv, item, qty) เพื่อเพิ่มจำนวนสินค้า (หากเป็นสินค้าใหม่ให้สร้าง key ใหม่) และ remove_stock(inv, item, qty) เพื่อตัดสต็อกเมื่อมีสินค้าเพียงพอ",
        starterCode: "inventory = {'ดินสอ': 50, 'ปากกา': 30, 'ยางลบ': 20}\n\ndef add_stock(inv, item, qty):\n    # TODO: เพิ่มจำนวน qty ให้สินค้า item ใน dict inv\n    pass\n\ndef remove_stock(inv, item, qty):\n    # TODO: ถ้ามี item ใน inv และจำนวน >= qty ให้หักลดจำนวนและ return True มิฉะนั้น return False\n    pass\n\nadd_stock(inventory, 'ไม้บรรทัด', 15)\nremove_stock(inventory, 'ดินสอ', 10)\n\nfor item, qty in inventory.items():\n    print(f'{item}: {qty} ชิ้น')",
        hint: "ใน add_stock ใช้ inv[item] = inv.get(item, 0) + qty ได้เลย ส่วนใน remove_stock เช็ก if item in inv and inv[item] >= qty: ก่อนหักลบ",
        solution: "inventory = {'ดินสอ': 50, 'ปากกา': 30, 'ยางลบ': 20}\ndef add_stock(inv, item, qty):\n    if item in inv:\n        inv[item] += qty\n    else:\n        inv[item] = qty\ndef remove_stock(inv, item, qty):\n    if item in inv and inv[item] >= qty:\n        inv[item] -= qty\n        return True\n    return False\nadd_stock(inventory, 'ไม้บรรทัด', 15)\nremove_stock(inventory, 'ดินสอ', 10)\nfor item, qty in inventory.items():\n    print(f'{item}: {qty} ชิ้น')",
        expectedOutput: "ดินสอ: 40 ชิ้น\nปากกา: 30 ชิ้น\nยางลบ: 20 ชิ้น\nไม้บรรทัด: 15 ชิ้น"
      }
    ]
  },
  {
    id: "b10", level: "beginner", order: 10,
    title: "String Methods", icon: "✍️", duration: "25 นาที",
    description: "จัดการ ค้นหา และดัดแปลงข้อความด้วยเมธอดมาตรฐานของ String",
    theory: `
<h2>String Methods ที่สำคัญ</h2>
<div class="code-example">
<pre><code>text = "  Hello, Python World!  "

print(text.upper())          # แปลงเป็นตัวพิมพ์ใหญ่ทั้งหมด
print(text.lower())          # แปลงเป็นตัวพิมพ์เล็กทั้งหมด
print(text.strip())          # ตัดช่องว่างหัว-ท้ายออก
print(text.strip().title())  # ขึ้นต้นคำด้วยตัวพิมพ์ใหญ่

print(text.replace("Python", "Amazing"))
print(text.find("Python"))   # คืนตำแหน่งดัชนีที่พบ (-1 หากไม่พบ)
print("Python" in text)      # True</code></pre>
</div>
<h3>การแยกและรวมข้อความด้วย split() และ join()</h3>
<div class="code-example">
<pre><code>sentence = "Python,Java,C++,JavaScript"
languages = sentence.split(",")
print(languages)  # ['Python', 'Java', 'C++', 'JavaScript']

joined = " | ".join(languages)
print(joined)     # Python | Java | C++ | JavaScript</code></pre>
</div>`,
    exercises: [
      {
        id: "b10e1", title: "ตรวจสอบคำ Palindrome", difficulty: "medium",
        description: "เขียนฟังก์ชัน is_palindrome(text) ตรวจสอบว่าข้อความอ่านจากหน้าไปหลังเหมือนกับหลังมาหน้าหรือไม่ (ไม่คิดตัวพิมพ์เล็ก-ใหญ่และช่องว่าง)",
        starterCode: "def is_palindrome(text):\n    cleaned = text.lower().replace(' ', '')\n    # TODO: เปรียบเทียบ cleaned กับสตริงที่กลับด้านแล้ว\n    return False\n\nprint(is_palindrome('racecar'))\nprint(is_palindrome('hello'))\nprint(is_palindrome('A man a plan a canal Panama'))",
        hint: "ใช้ Slicing cleaned[::-1] เพื่อกลับลำดับตัวอักษรจากหลังมาหน้า แล้วเปรียบเทียบด้วย ==",
        solution: "def is_palindrome(text):\n    cleaned = text.lower().replace(' ', '')\n    return cleaned == cleaned[::-1]\nprint(is_palindrome('racecar'))\nprint(is_palindrome('hello'))\nprint(is_palindrome('A man a plan a canal Panama'))",
        expectedOutput: "True\nFalse\nTrue"
      },
      {
        id: "b10e2", title: "นับสระและพยัญชนะภาษาอังกฤษ", difficulty: "medium",
        description: "เขียนฟังก์ชัน count_vowels_consonants(text) เพื่อนับจำนวนสระ (a, e, i, o, u) และพยัญชนะภาษาอังกฤษ (ไม่นับช่องว่างหรือเครื่องหมาย)",
        starterCode: "def count_vowels_consonants(text):\n    text = text.lower()\n    vowels = 'aeiou'\n    v_count = 0\n    c_count = 0\n    for ch in text:\n        # TODO: ตรวจว่า ch เป็นตัวอักษรด้วย ch.isalpha() แล้วแยกนับสระกับพยัญชนะ\n        pass\n    return v_count, c_count\n\nv, c = count_vowels_consonants('Hello World')\nprint(f'สระ: {v}, พยัญชนะ: {c}')",
        hint: "เช็ก if ch.isalpha(): ก่อน จากนั้นซ้อน if ch in vowels: เพื่อเพิ่ม v_count += 1 มิฉะนั้นเพิ่ม c_count += 1",
        solution: "def count_vowels_consonants(text):\n    text = text.lower()\n    vowels = 'aeiou'\n    v_count = 0\n    c_count = 0\n    for ch in text:\n        if ch.isalpha():\n            if ch in vowels:\n                v_count += 1\n            else:\n                c_count += 1\n    return v_count, c_count\nv, c = count_vowels_consonants('Hello World')\nprint(f'สระ: {v}, พยัญชนะ: {c}')",
        expectedOutput: "สระ: 3, พยัญชนะ: 7"
      },
      {
        id: "b10e3", title: "เข้ารหัสข้อความ Caesar Cipher", difficulty: "hard",
        description: "เขียนฟังก์ชัน caesar_encrypt(text, shift) เลื่อนตัวอักษรภาษาอังกฤษไปข้างหน้า shift ตำแหน่งแบบวนรอบ 26 ตัวอักษร (คงตัวพิมพ์ใหญ่-เล็กและช่องว่างไว้ตามเดิม)",
        starterCode: "def caesar_encrypt(text, shift):\n    result = ''\n    for char in text:\n        if char.isalpha():\n            base = ord('A') if char.isupper() else ord('a')\n            # TODO: คำนวณตัวอักษรใหม่ที่เลื่อนไป shift ตำแหน่ง (วนรอบด้วย % 26) แล้วต่อเข้า result\n            pass\n        else:\n            result += char\n    return result\n\nprint(caesar_encrypt('Hello World', 3))\nprint(caesar_encrypt('Python', 13))",
        hint: "ใช้ chr((ord(char) - base + shift) % 26 + base) เพื่อหาตัวอักษรที่เลื่อนแล้ว จากนั้นบวกต่อเข้าตัวแปร result",
        solution: "def caesar_encrypt(text, shift):\n    result = ''\n    for char in text:\n        if char.isalpha():\n            base = ord('A') if char.isupper() else ord('a')\n            encrypted = chr((ord(char) - base + shift) % 26 + base)\n            result += encrypted\n        else:\n            result += char\n    return result\nprint(caesar_encrypt('Hello World', 3))\nprint(caesar_encrypt('Python', 13))",
        expectedOutput: "Khoor Zruog\nClguba"
      }
    ]
  },

  // ============================================================
  // INTERMEDIATE LEVEL (ระดับกลาง / มัธยมศึกษาตอนปลาย)
  // ============================================================
  {
    id: "i1", level: "intermediate", order: 1,
    title: "Error Handling", icon: "🛡️", duration: "30 นาที",
    description: "ดักจับและจัดการข้อผิดพลาดขณะรันโปรแกรมอย่างรัดกุมด้วย try / except / finally",
    theory: `
<h2>Error Handling — การจัดการข้อยกเว้น (Exceptions)</h2>
<p>การใช้บล็อก <code>try / except</code> ช่วยป้องกันไม่ให้โปรแกรมหยุดทำงานกะทันหันเมื่อเกิดข้อผิดพลาดระหว่างรัน (Runtime Error)</p>
<div class="code-example">
<pre><code>try:
    num = int(input("ใส่ตัวเลข: "))
    result = 100 / num
    print(f"ผลลัพธ์: {result}")
except ValueError:
    print("กรุณาใส่ตัวเลขเท่านั้น!")
except ZeroDivisionError:
    print("หารด้วยศูนย์ไม่ได้!")
except Exception as e:
    print(f"เกิดข้อผิดพลาดอื่นๆ: {e}")
finally:
    print("จบการทำงาน (รันเสมอ)")</code></pre>
</div>
<h3>การสร้างและโยน Exception ด้วย raise</h3>
<div class="code-example">
<pre><code>def check_age(age):
    if age < 0:
        raise ValueError("อายุต้องไม่ติดลบ!")
    if age > 150:
        raise ValueError("อายุมากเกินไป!")
    return f"อายุ {age} ปี"

try:
    print(check_age(-5))
except ValueError as e:
    print(f"Error: {e}")</code></pre>
</div>`,
    exercises: [
      {
        id: "i1e1", title: "เครื่องคิดเลขปลอดภัย", difficulty: "medium",
        description: "เติมบล็อก except ในฟังก์ชัน safe_calculate() เพื่อดักจับ ValueError (คืนค่า 'กรุณาใส่ตัวเลขที่ถูกต้อง') และ ZeroDivisionError (คืนค่า 'หารด้วยศูนย์ไม่ได้!')",
        starterCode: "def safe_calculate():\n    try:\n        a = float(input('ตัวเลขแรก: '))\n        op = input('ตัวดำเนินการ (+,-,*,/): ')\n        b = float(input('ตัวเลขที่สอง: '))\n        if op == '+':\n            return a + b\n        elif op == '-':\n            return a - b\n        elif op == '*':\n            return a * b\n        elif op == '/':\n            return a / b\n    # TODO: ดักจับ ValueError และ ZeroDivisionError แล้ว return ข้อความตามโจทย์\n    except Exception:\n        pass\n\nresult = safe_calculate()\nprint(f'ผลลัพธ์: {result}')",
        hint: "แทนที่ except Exception: ด้วย except ValueError: และ except ZeroDivisionError: แยกกัน 2 บล็อก",
        solution: "def safe_calculate():\n    try:\n        a = float(input('ตัวเลขแรก: '))\n        op = input('ตัวดำเนินการ (+,-,*,/): ')\n        b = float(input('ตัวเลขที่สอง: '))\n        if op == '+':\n            return a + b\n        elif op == '-':\n            return a - b\n        elif op == '*':\n            return a * b\n        elif op == '/':\n            return a / b\n    except ValueError:\n        return 'กรุณาใส่ตัวเลขที่ถูกต้อง'\n    except ZeroDivisionError:\n        return 'หารด้วยศูนย์ไม่ได้!'\nresult = safe_calculate()\nprint(f'ผลลัพธ์: {result}')",
        expectedOutput: ""
      },
      {
        id: "i1e2", title: "Custom Exception ถอนเงินเกินบัญชี", difficulty: "hard",
        description: "สร้าง Custom Exception ชื่อ InsufficientFundsError และเขียนฟังก์ชัน withdraw(balance, amount) ที่โยน Error นี้เมื่อถอนเงินมากกว่ายอดคงเหลือ",
        starterCode: "class InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        # TODO: เรียก super().__init__() ส่งข้อความ 'ยอดเงินไม่พอ: มี {balance} บาท แต่ถอน {amount} บาท'\n        pass\n\ndef withdraw(balance, amount):\n    # TODO: ถ้า amount > balance ให้ raise InsufficientFundsError(balance, amount)\n    # มิฉะนั้นให้ return ยอดเงินคงเหลือหลังหักถอน\n    pass\n\ntry:\n    new_balance = withdraw(500, 1000)\nexcept InsufficientFundsError as e:\n    print(f'Error: {e}')\n\nnew_balance = withdraw(1000, 300)\nprint(f'ยอดคงเหลือ: {new_balance} บาท')",
        hint: "ใช้ super().__init__(f'ยอดเงินไม่พอ: มี {balance} บาท แต่ถอน {amount} บาท') และใน withdraw() ใช้คำสั่ง raise เมื่อยอดถอนเกิน balance",
        solution: "class InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        super().__init__(f'ยอดเงินไม่พอ: มี {balance} บาท แต่ถอน {amount} บาท')\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFundsError(balance, amount)\n    return balance - amount\ntry:\n    new_balance = withdraw(500, 1000)\nexcept InsufficientFundsError as e:\n    print(f'Error: {e}')\nnew_balance = withdraw(1000, 300)\nprint(f'ยอดคงเหลือ: {new_balance} บาท')",
        expectedOutput: "Error: ยอดเงินไม่พอ: มี 500 บาท แต่ถอน 1000 บาท\nยอดคงเหลือ: 700 บาท"
      },
      {
        id: "i1e3", title: "ค้นหาข้อมูลพร้อมบันทึก Log เสมอ", difficulty: "hard",
        description: "เติมโครงสร้าง try / except KeyError / finally ในฟังก์ชัน get_user(user_id) เพื่อค้นหาชื่อจาก dict database พร้อมพิมพ์ Log ทุกขั้นตอนตามผลลัพธ์ที่กำหนด",
        starterCode: "database = {'user1': 'สมชาย', 'user2': 'มาลี'}\n\ndef get_user(user_id):\n    # TODO: ใช้ try ดึงค่า database[user_id] พิมพ์ 'Log: อ่านข้อมูล {user_id} สำเร็จ' แล้ว return ข้อมูล\n    # หากเกิด KeyError ให้พิมพ์ 'Log: ไม่พบ {user_id}' แล้ว return None\n    # และใช้ finally พิมพ์ 'Log: จบการค้นหา' เสมอ\n    pass\n\nprint(get_user('user1'))\nprint('---')\nprint(get_user('user99'))",
        hint: "บล็อก finally จะทำงานก่อนที่ฟังก์ชันจะส่งค่า return ออกไปจริงเสมอ จึงเหมาะกับการบันทึก Log ปิดท้าย",
        solution: "database = {'user1': 'สมชาย', 'user2': 'มาลี'}\ndef get_user(user_id):\n    try:\n        data = database[user_id]\n        print(f'Log: อ่านข้อมูล {user_id} สำเร็จ')\n        return data\n    except KeyError:\n        print(f'Log: ไม่พบ {user_id}')\n        return None\n    finally:\n        print('Log: จบการค้นหา')\nprint(get_user('user1'))\nprint('---')\nprint(get_user('user99'))",
        expectedOutput: "Log: อ่านข้อมูล user1 สำเร็จ\nLog: จบการค้นหา\nสมชาย\n---\nLog: ไม่พบ user99\nLog: จบการค้นหา\nNone"
      }
    ]
  },
  {
    id: "i2", level: "intermediate", order: 2,
    title: "OOP — Class และ Object", icon: "🏛️", duration: "45 นาที",
    description: "เรียนรู้การเขียนโปรแกรมเชิงวัตถุ การสร้างคลาส แอตทริบิวต์ และเมธอด",
    theory: `
<h2>Object-Oriented Programming (OOP)</h2>
<p>การเขียนโปรแกรมเชิงวัตถุช่วยมัดรวม <strong>ข้อมูล (Attributes)</strong> และ <strong>พฤติกรรมการทำงาน (Methods)</strong> ที่เกี่ยวข้องกันไว้ในพิมพ์เขียวเดียวกันที่เรียกว่า <code>class</code></p>
<div class="code-example">
<pre><code>class Student:
    school = "โรงเรียน Python"  # Class attribute
    
    def __init__(self, name, age, grade):
        self.name = name        # Instance attributes
        self.age = age
        self.grade = grade
        self.scores = []
    
    def add_score(self, score):
        self.scores.append(score)
    
    def get_average(self):
        if not self.scores:
            return 0
        return sum(self.scores) / len(self.scores)
    
    def __str__(self):
        return f"นักเรียน: {self.name} อายุ {self.age} ปี"

s1 = Student("สมชาย", 16, "ม.4")
s1.add_score(90)
s1.add_score(85)
print(s1)
print(f"เฉลี่ย: {s1.get_average()}")</code></pre>
</div>`,
    exercises: [
      {
        id: "i2e1", title: "Class BankAccount", difficulty: "medium",
        description: "เติมเมธอด deposit(amount) และ withdraw(amount) ในคลาส BankAccount ให้เพิ่ม/ลดยอดเงินและบันทึกประวัติลง self.history (หากยอดเงินไม่พอถอนให้พิมพ์ 'ยอดเงินไม่พอ!')",
        starterCode: "class BankAccount:\n    def __init__(self, owner, initial_balance=0):\n        self.owner = owner\n        self.balance = initial_balance\n        self.history = []\n    \n    def deposit(self, amount):\n        # TODO: เพิ่มยอดเงินเข้า self.balance และ append 'ฝาก +{amount}' ลง self.history\n        pass\n    \n    def withdraw(self, amount):\n        # TODO: ถ้า amount <= self.balance ให้หักยอดเงินและ append 'ถอน -{amount}'\n        # มิฉะนั้นให้ print('ยอดเงินไม่พอ!')\n        pass\n    \n    def show_history(self):\n        print(f'=== ประวัติ {self.owner} ===')\n        for h in self.history:\n            print(h)\n        print(f'ยอดคงเหลือ: {self.balance}')\n\nacc = BankAccount('สมชาย', 1000)\nacc.deposit(500)\nacc.withdraw(200)\nacc.withdraw(2000)\nacc.show_history()",
        hint: "ใช้ self.balance += amount คู่กับ self.history.append(f'ฝาก +{amount}') และเช็ก if amount <= self.balance: ในเมธอด withdraw",
        solution: "class BankAccount:\n    def __init__(self, owner, initial_balance=0):\n        self.owner = owner\n        self.balance = initial_balance\n        self.history = []\n    def deposit(self, amount):\n        self.balance += amount\n        self.history.append(f'ฝาก +{amount}')\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n            self.history.append(f'ถอน -{amount}')\n        else:\n            print('ยอดเงินไม่พอ!')\n    def show_history(self):\n        print(f'=== ประวัติ {self.owner} ===')\n        for h in self.history:\n            print(h)\n        print(f'ยอดคงเหลือ: {self.balance}')\nacc = BankAccount('สมชาย', 1000)\nacc.deposit(500)\nacc.withdraw(200)\nacc.withdraw(2000)\nacc.show_history()",
        expectedOutput: "ยอดเงินไม่พอ!\n=== ประวัติ สมชาย ===\nฝาก +500\nถอน -200\nยอดคงเหลือ: 1300"
      },
      {
        id: "i2e2", title: "Class Rectangle", difficulty: "medium",
        description: "เติมเมธอด area() คำนวณพื้นที่, perimeter() คำนวณเส้นรอบรูป และ is_square() ตรวจสอบว่าเป็นสี่เหลี่ยมจัตุรัสหรือไม่",
        starterCode: "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        # TODO: คืนค่าพื้นที่สี่เหลี่ยม\n        pass\n    \n    def perimeter(self):\n        # TODO: คืนค่าความยาวเส้นรอบรูป\n        pass\n    \n    def is_square(self):\n        # TODO: คืนค่า True หากด้านกว้างเท่ากับด้านสูง มิฉะนั้นคืนค่า False\n        pass\n    \n    def __str__(self):\n        return f'Rectangle({self.width}x{self.height})'\n\nr1 = Rectangle(5, 3)\nr2 = Rectangle(4, 4)\n\nprint(r1)\nprint(f'พื้นที่: {r1.area()}')\nprint(f'เส้นรอบรูป: {r1.perimeter()}')\nprint(f'เป็นสี่เหลี่ยมจัตุรัส: {r2.is_square()}')\nprint(f'พื้นที่ใหญ่กว่า: {r1 if r1.area() > r2.area() else r2}')",
        hint: "area คืนค่า self.width * self.height, perimeter คืนค่า 2 * (self.width + self.height) และ is_square คืนค่า self.width == self.height",
        solution: "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    def area(self):\n        return self.width * self.height\n    def perimeter(self):\n        return 2 * (self.width + self.height)\n    def is_square(self):\n        return self.width == self.height\n    def __str__(self):\n        return f'Rectangle({self.width}x{self.height})'\nr1 = Rectangle(5, 3)\nr2 = Rectangle(4, 4)\nprint(r1)\nprint(f'พื้นที่: {r1.area()}')\nprint(f'เส้นรอบรูป: {r1.perimeter()}')\nprint(f'เป็นสี่เหลี่ยมจัตุรัส: {r2.is_square()}')\nprint(f'พื้นที่ใหญ่กว่า: {r1 if r1.area() > r2.area() else r2}')",
        expectedOutput: "Rectangle(5x3)\nพื้นที่: 15\nเส้นรอบรูป: 16\nเป็นสี่เหลี่ยมจัตุรัส: True\nพื้นที่ใหญ่กว่า: Rectangle(4x4)"
      },
      {
        id: "i2e3", title: "ระบบจัดการห้องสมุด", difficulty: "hard",
        description: "เติมเมธอด borrow(isbn) และ return_book(isbn) ในคลาส Library เพื่อเปลี่ยนสถานะ available ของหนังสือและคืนค่าข้อความแจ้งผล",
        starterCode: "class Book:\n    def __init__(self, title, author, isbn):\n        self.title = title\n        self.author = author\n        self.isbn = isbn\n        self.available = True\n    \n    def __str__(self):\n        status = '✓ พร้อมยืม' if self.available else '✗ ถูกยืมแล้ว'\n        return f'{self.title} โดย {self.author} [{status}]'\n\nclass Library:\n    def __init__(self, name):\n        self.name = name\n        self.books = []\n    \n    def add_book(self, book):\n        self.books.append(book)\n    \n    def borrow(self, isbn):\n        # TODO: ค้นหาหนังสือที่ isbn ตรงกันและ available เป็น True\n        # เปลี่ยน available เป็น False แล้ว return f'ยืม \"{book.title}\" สำเร็จ'\n        # หากไม่พบหรือถูกยืมแล้ว ให้ return 'ไม่พบหนังสือหรือถูกยืมแล้ว'\n        pass\n    \n    def return_book(self, isbn):\n        # TODO: ค้นหาหนังสือที่ isbn ตรงกัน เปลี่ยน available เป็น True\n        # แล้ว return f'คืน \"{book.title}\" สำเร็จ' (หากไม่พบ return 'ไม่พบหนังสือ')\n        pass\n    \n    def show_all(self):\n        print(f'=== {self.name} ===')\n        for book in self.books:\n            print(' -', book)\n\nlib = Library('ห้องสมุด Python')\nlib.add_book(Book('Python Crash Course', 'Eric', 'P001'))\nlib.add_book(Book('Clean Code', 'Robert', 'C001'))\nlib.show_all()\nprint(lib.borrow('P001'))\nlib.show_all()",
        hint: "วนลูป for book in self.books: แล้วตรวจเงื่อนไข if book.isbn == isbn and book.available: เพื่อปรับ book.available = False",
        solution: "class Book:\n    def __init__(self, title, author, isbn):\n        self.title = title\n        self.author = author\n        self.isbn = isbn\n        self.available = True\n    def __str__(self):\n        status = '✓ พร้อมยืม' if self.available else '✗ ถูกยืมแล้ว'\n        return f'{self.title} โดย {self.author} [{status}]'\nclass Library:\n    def __init__(self, name):\n        self.name = name\n        self.books = []\n    def add_book(self, book):\n        self.books.append(book)\n    def borrow(self, isbn):\n        for book in self.books:\n            if book.isbn == isbn and book.available:\n                book.available = False\n                return f'ยืม \"{book.title}\" สำเร็จ'\n        return 'ไม่พบหนังสือหรือถูกยืมแล้ว'\n    def return_book(self, isbn):\n        for book in self.books:\n            if book.isbn == isbn:\n                book.available = True\n                return f'คืน \"{book.title}\" สำเร็จ'\n        return 'ไม่พบหนังสือ'\n    def show_all(self):\n        print(f'=== {self.name} ===')\n        for book in self.books:\n            print(' -', book)\nlib = Library('ห้องสมุด Python')\nlib.add_book(Book('Python Crash Course', 'Eric', 'P001'))\nlib.add_book(Book('Clean Code', 'Robert', 'C001'))\nlib.show_all()\nprint(lib.borrow('P001'))\nlib.show_all()",
        expectedOutput: "=== ห้องสมุด Python ===\n - Python Crash Course โดย Eric [✓ พร้อมยืม]\n - Clean Code โดย Robert [✓ พร้อมยืม]\nยืม \"Python Crash Course\" สำเร็จ\n=== ห้องสมุด Python ===\n - Python Crash Course โดย Eric [✗ ถูกยืมแล้ว]\n - Clean Code โดย Robert [✓ พร้อมยืม]"
      }
    ]
  },
  {
    id: "i3", level: "intermediate", order: 3,
    title: "Inheritance และ Polymorphism", icon: "🧬", duration: "40 นาที",
    description: "สืบทอดคุณสมบัติจากคลาสแม่ด้วย super() และเขียนทับเมธอด (Method Overriding)",
    theory: `
<h2>Inheritance — การสืบทอดคลาส</h2>
<p>คลาสลูก (Subclass) สามารถรับเอาแอตทริบิวต์และเมธอดจากคลาสแม่ (Base Class) มาใช้งานและต่อยอดได้โดยไม่ต้องเขียนซ้ำ</p>
<div class="code-example">
<pre><code>class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound
    
    def speak(self):
        return f"{self.name} พูดว่า: {self.sound}!"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "โฮ่ง")
        self.breed = breed
    
    def fetch(self):
        return f"{self.name} วิ่งไปคาบบอล! 🎾"

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "เมี้ยว")

dog = Dog("บัดดี้", "Golden")
cat = Cat("วิสกี้")
print(dog.speak())  # บัดดี้ พูดว่า: โฮ่ง!
print(cat.speak())  # วิสกี้ พูดว่า: เมี้ยว!</code></pre>
</div>`,
    exercises: [
      {
        id: "i3e1", title: "ระบบคำนวณเงินเดือนพนักงาน", difficulty: "hard",
        description: "เขียน Override เมธอด get_salary() ของ Manager (เงินเดือนฐานรวมโบนัส bonus_pct) และ Developer (เงินเดือนฐานคูณตัวคูณตามระดับ level: 1=1.0, 2=1.3, 3=1.7)",
        starterCode: "class Employee:\n    def __init__(self, name, base_salary):\n        self.name = name\n        self.base_salary = base_salary\n    \n    def get_salary(self):\n        return self.base_salary\n    \n    def __str__(self):\n        return f'{self.__class__.__name__}: {self.name} เงินเดือน {self.get_salary():,.0f} บาท'\n\nclass Manager(Employee):\n    def __init__(self, name, base_salary, bonus_pct):\n        super().__init__(name, base_salary)\n        self.bonus_pct = bonus_pct\n    \n    def get_salary(self):\n        # TODO: คืนค่าเงินเดือนรวมโบนัส base_salary * (1 + bonus_pct)\n        pass\n\nclass Developer(Employee):\n    def __init__(self, name, base_salary, level):\n        super().__init__(name, base_salary)\n        self.level = level\n    \n    def get_salary(self):\n        multiplier = {1: 1.0, 2: 1.3, 3: 1.7}\n        # TODO: คืนค่า base_salary คูณตัวคูณตาม self.level\n        pass\n\nstaff = [\n    Manager('สมชาย', 50000, 0.3),\n    Developer('มาลี', 40000, 3),\n    Developer('ชัยวัฒน์', 35000, 1)\n]\n\nfor e in staff:\n    print(e)",
        hint: "ใน Manager คืนค่า self.base_salary * (1 + self.bonus_pct) ส่วนใน Developer คืนค่า self.base_salary * multiplier.get(self.level, 1.0)",
        solution: "class Employee:\n    def __init__(self, name, base_salary):\n        self.name = name\n        self.base_salary = base_salary\n    def get_salary(self):\n        return self.base_salary\n    def __str__(self):\n        return f'{self.__class__.__name__}: {self.name} เงินเดือน {self.get_salary():,.0f} บาท'\nclass Manager(Employee):\n    def __init__(self, name, base_salary, bonus_pct):\n        super().__init__(name, base_salary)\n        self.bonus_pct = bonus_pct\n    def get_salary(self):\n        return self.base_salary * (1 + self.bonus_pct)\nclass Developer(Employee):\n    def __init__(self, name, base_salary, level):\n        super().__init__(name, base_salary)\n        self.level = level\n    def get_salary(self):\n        multiplier = {1: 1.0, 2: 1.3, 3: 1.7}\n        return self.base_salary * multiplier.get(self.level, 1.0)\nstaff = [Manager('สมชาย', 50000, 0.3), Developer('มาลี', 40000, 3), Developer('ชัยวัฒน์', 35000, 1)]\nfor e in staff:\n    print(e)",
        expectedOutput: "Manager: สมชาย เงินเดือน 65,000 บาท\nDeveloper: มาลี เงินเดือน 68,000 บาท\nDeveloper: ชัยวัฒน์ เงินเดือน 35,000 บาท"
      },
      {
        id: "i3e2", title: "Shape Calculator (Polymorphism)", difficulty: "medium",
        description: "สร้างเมธอด area() ในคลาสลูก Circle, Triangle และ Rectangle ให้คำนวณพื้นที่ตามสูตรเรขาคณิตของแต่ละรูปทรง",
        starterCode: "import math\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n    \n    def describe(self):\n        return f'{self.__class__.__name__}: พื้นที่ = {self.area():.2f}'\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        # TODO: สูตรพื้นที่วงกลม math.pi * (radius ** 2)\n        pass\n\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n    def area(self):\n        # TODO: สูตรพื้นที่สามเหลี่ยม 0.5 * base * height\n        pass\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        # TODO: สูตรพื้นที่สี่เหลี่ยมผืนผ้า w * h\n        pass\n\nshapes = [Circle(5), Triangle(6, 4), Rectangle(3, 7)]\nfor s in shapes:\n    print(s.describe())",
        hint: "แทนที่ pass ในเมธอด area() ทั้ง 3 คลาสด้วย return ตามสูตรคณิตศาสตร์ของแต่ละรูปทรง",
        solution: "import math\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n    def describe(self):\n        return f'{self.__class__.__name__}: พื้นที่ = {self.area():.2f}'\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return math.pi * self.radius ** 2\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n    def area(self):\n        return 0.5 * self.base * self.height\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\nshapes = [Circle(5), Triangle(6, 4), Rectangle(3, 7)]\nfor s in shapes:\n    print(s.describe())",
        expectedOutput: "Circle: พื้นที่ = 78.54\nTriangle: พื้นที่ = 12.00\nRectangle: พื้นที่ = 21.00"
      },
      {
        id: "i3e3", title: "เกมตัวละคร RPG", difficulty: "hard",
        description: "เติมเมธอด shield() ของ Warrior (ฟื้นฟู self.hp เพิ่ม 20) และเมธอด fireball(target) ของ Mage (หาก mana >= 20 ให้ลด mana ลง 20 และลด target.hp ลง 60)",
        starterCode: "import random\n\nclass Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.max_hp = hp\n        self.attack_power = attack\n    \n    def attack(self, target):\n        dmg = random.randint(self.attack_power - 5, self.attack_power + 5)\n        target.hp -= dmg\n        return f'{self.name} โจมตี {target.name} ด้วยพลัง {dmg}!'\n    \n    def status(self):\n        return f'{self.name}: {max(0, self.hp)}/{self.max_hp} HP'\n\nclass Warrior(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=150, attack=20)\n    \n    def shield(self):\n        # TODO: เพิ่ม self.hp ขึ้น 20 แล้ว return f'{self.name} ใช้โล่! ฟื้น 20 HP'\n        pass\n\nclass Mage(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=80, attack=35)\n        self.mana = 100\n    \n    def fireball(self, target):\n        # TODO: ถ้า self.mana >= 20 ให้หัก mana 20 ลด target.hp ลง 60\n        # แล้ว return f'{self.name} ใช้ไฟบอล! ทำความเสียหาย 60!'\n        # มิฉะนั้น return f'{self.name} ไม่มี mana พอ!'\n        pass\n\nhero = Warrior('อัศวิน')\nboss = Mage('จอมเวทย์ชั่ว')\n\nprint(hero.attack(boss))\nprint(boss.fireball(hero))\nprint(hero.shield())\nprint(hero.status())\nprint(boss.status())",
        hint: "ใน shield() บวก self.hp += 20 ส่วนใน fireball(target) ตรวจ if self.mana >= 20: หัก self.mana -= 20 และหัก target.hp -= 60",
        solution: "import random\nclass Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.max_hp = hp\n        self.attack_power = attack\n    def attack(self, target):\n        dmg = random.randint(self.attack_power - 5, self.attack_power + 5)\n        target.hp -= dmg\n        return f'{self.name} โจมตี {target.name} ด้วยพลัง {dmg}!'\n    def status(self):\n        return f'{self.name}: {max(0, self.hp)}/{self.max_hp} HP'\nclass Warrior(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=150, attack=20)\n    def shield(self):\n        self.hp += 20\n        return f'{self.name} ใช้โล่! ฟื้น 20 HP'\nclass Mage(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=80, attack=35)\n        self.mana = 100\n    def fireball(self, target):\n        if self.mana >= 20:\n            self.mana -= 20\n            dmg = 60\n            target.hp -= dmg\n            return f'{self.name} ใช้ไฟบอล! ทำความเสียหาย {dmg}!'\n        return f'{self.name} ไม่มี mana พอ!'\nhero = Warrior('อัศวิน')\nboss = Mage('จอมเวทย์ชั่ว')\nprint(hero.attack(boss))\nprint(boss.fireball(hero))\nprint(hero.shield())\nprint(hero.status())\nprint(boss.status())",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "i4", level: "intermediate", order: 4,
    title: "Comprehensions & Lambda", icon: "⚡", duration: "30 นาที",
    description: "ประมวลผลข้อมูลอย่างกระชับด้วย List/Dict Comprehension, Lambda, map และ filter",
    theory: `
<h2>List, Dict และ Set Comprehension</h2>
<div class="code-example">
<pre><code># List Comprehension
result = [x**2 for x in range(10) if x % 2 == 0]
print(result)   # [0, 4, 16, 36, 64]

# Dict Comprehension
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Set Comprehension
unique_mod = {x % 5 for x in range(20)}
print(unique_mod)  # {0, 1, 2, 3, 4}</code></pre>
</div>
<h3>Lambda Functions คู่กับ sorted(), map(), filter()</h3>
<div class="code-example">
<pre><code>students = [('สมชาย', 85), ('มาลี', 92), ('วิชัย', 78)]

# เรียงตามคะแนนจากมากไปน้อย
sorted_s = sorted(students, key=lambda s: s[1], reverse=True)
print(sorted_s)

# map แปลงข้อมูลทุกตัว / filter คัดกรองตามเงื่อนไข
doubled = list(map(lambda x: x * 2, [1, 2, 3, 4, 5]))
evens = list(filter(lambda x: x % 2 == 0, range(10)))</code></pre>
</div>`,
    exercises: [
      {
        id: "i4e1", title: "ประมวลผลข้อมูลนักเรียนครบวงจร", difficulty: "medium",
        description: "จากข้อมูล students จงใช้ List Comprehension กรองรายชื่อคนที่ได้เกรด A (score >= 80), ใช้ sorted() คู่กับ lambda เรียงคะแนนจากมากไปน้อย และใช้ Dict Comprehension แปลงเป็น dict {ชื่อ: คะแนน}",
        starterCode: "students = [\n    {'name': 'สมชาย', 'score': 92},\n    {'name': 'มาลี', 'score': 78},\n    {'name': 'วิชัย', 'score': 88},\n    {'name': 'สุดา', 'score': 65},\n    {'name': 'ชัยวัฒน์', 'score': 95},\n]\n\n# TODO 1: กรองเฉพาะชื่อนักเรียนที่ได้ score >= 80\ngrade_a = []\nprint('เกรด A:', grade_a)\n\n# TODO 2: เรียง students ตาม score จากมากไปน้อยด้วย lambda\nsorted_students = []\nfor s in sorted_students:\n    print(f\"{s['name']}: {s['score']}\")\n\n# TODO 3: สร้าง Dict Comprehension รูปแบบ {'ชื่อ': คะแนน}\nscore_dict = {}\nprint('Dict คะแนน:', score_dict)",
        hint: "grade_a ใช้ [s['name'] for s in students if s['score'] >= 80], sorted ใช้ key=lambda s: s['score'], reverse=True และ score_dict ใช้ {s['name']: s['score'] for s in students}",
        solution: "students = [{'name': 'สมชาย', 'score': 92}, {'name': 'มาลี', 'score': 78}, {'name': 'วิชัย', 'score': 88}, {'name': 'สุดา', 'score': 65}, {'name': 'ชัยวัฒน์', 'score': 95}]\ngrade_a = [s['name'] for s in students if s['score'] >= 80]\nprint('เกรด A:', grade_a)\nsorted_students = sorted(students, key=lambda s: s['score'], reverse=True)\nfor s in sorted_students:\n    print(f\"{s['name']}: {s['score']}\")\nscore_dict = {s['name']: s['score'] for s in students}\nprint('Dict คะแนน:', score_dict)",
        expectedOutput: "เกรด A: ['สมชาย', 'วิชัย', 'ชัยวัฒน์']\nชัยวัฒน์: 95\nสมชาย: 92\nวิชัย: 88\nมาลี: 78\nสุดา: 65\nDict คะแนน: {'สมชาย': 92, 'มาลี': 78, 'วิชัย': 88, 'สุดา': 65, 'ชัยวัฒน์': 95}"
      },
      {
        id: "i4e2", title: "Pipeline ด้วย map() และ filter()", difficulty: "hard",
        description: "สร้าง Data Pipeline จากตัวเลข 1 ถึง 50: ขั้นที่ 1 กรองเฉพาะเลขคี่ → ขั้นที่ 2 ยกกำลังสองทุกตัว → ขั้นที่ 3 กรองเก็บเฉพาะค่าที่น้อยกว่า 500 แล้วแปลงเป็น list",
        starterCode: "numbers = range(1, 51)\n\n# TODO: ใช้ filter() และ map() ร่วมกับ lambda ต่อกัน 3 ขั้นตอน\nodd = []\nsquared = []\nresult = []\n\nprint(result)",
        hint: "odd = filter(lambda x: x % 2 != 0, numbers), squared = map(lambda x: x**2, odd) และ result = list(filter(lambda x: x < 500, squared))",
        solution: "numbers = range(1, 51)\nodd = filter(lambda x: x % 2 != 0, numbers)\nsquared = map(lambda x: x**2, odd)\nresult = list(filter(lambda x: x < 500, squared))\nprint(result)",
        expectedOutput: "[1, 9, 25, 49, 81, 121, 169, 225, 289, 361, 441]"
      },
      {
        id: "i4e3", title: "Matrix Operations ด้วย Nested Comprehension", difficulty: "hard",
        description: "ใช้ Nested List Comprehension สร้างเมทริกซ์เอกลักษณ์ (Identity Matrix) ขนาด 4x4 และหาเมทริกซ์สลับเปลี่ยน (Transpose) ของเมทริกซ์ 3x3 ที่กำหนดให้",
        starterCode: "n = 4\n\n# TODO 1: สร้าง Identity Matrix ขนาด n x n (แนวทแยงมุมหลัก i == j มีค่าเป็น 1 นอกนั้นเป็น 0)\nidentity = []\nprint('Identity Matrix:')\nfor row in identity:\n    print(row)\n\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n# TODO 2: สลับแถวเป็นหลัก (Transpose) ของ matrix\ntransposed = []\nprint('\\nOriginal:', matrix)\nprint('Transposed:', transposed)",
        hint: "identity ใช้ [[1 if i == j else 0 for j in range(n)] for i in range(n)] และ transposed ใช้ [[matrix[j][i] for j in range(len(matrix))] for i in range(len(matrix[0]))]",
        solution: "n = 4\nidentity = [[1 if i == j else 0 for j in range(n)] for i in range(n)]\nprint('Identity Matrix:')\nfor row in identity:\n    print(row)\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\ntransposed = [[matrix[j][i] for j in range(len(matrix))] for i in range(len(matrix[0]))]\nprint('\\nOriginal:', matrix)\nprint('Transposed:', transposed)",
        expectedOutput: "Identity Matrix:\n[1, 0, 0, 0]\n[0, 1, 0, 0]\n[0, 0, 1, 0]\n[0, 0, 0, 1]\n\nOriginal: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nTransposed: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]"
      }
    ]
  },
  {
    id: "i5", level: "intermediate", order: 5,
    title: "Modules และ Standard Library", icon: "📦", duration: "25 นาที",
    description: "เรียกใช้โมดูลมาตรฐานของ Python ทั้ง math, statistics, random และ datetime",
    theory: `
<h2>Modules — คลังเครื่องมือมาตรฐานของ Python</h2>
<div class="code-example">
<pre><code>import math
import random
import datetime

print(math.pi)          # 3.141592653589793
print(math.sqrt(16))    # 4.0
print(math.ceil(3.2))   # 4 (ปัดขึ้น)
print(math.floor(3.8))  # 3 (ปัดลง)

print(random.randint(1, 10))
print(random.choice(['แดง', 'เขียว', 'น้ำเงิน']))

now = datetime.datetime.now()
print(now.strftime("%d/%m/%Y %H:%M"))</code></pre>
</div>
<h3>รูปแบบการ import โมดูล</h3>
<div class="code-example">
<pre><code>import math                       # นำเข้าทั้งโมดูล
from math import pi, sqrt         # นำเข้าเฉพาะฟังก์ชัน/ค่าคงที่ที่ต้องการ
from math import pi as my_pi      # นำเข้าพร้อมตั้งชื่อเล่น (Alias)
import statistics as stats        # ตั้งชื่อย่อให้เรียกใช้ง่ายขึ้น

print(my_pi, sqrt(25))</code></pre>
</div>`,
    exercises: [
      {
        id: "i5e1", title: "วิเคราะห์ค่าทางสถิติ", difficulty: "medium",
        description: "ใช้โมดูล statistics คำนวณค่าเฉลี่ย (mean), มัธยฐาน (median), ส่วนเบี่ยงเบนมาตรฐาน (stdev), ความแปรปรวน (variance) และพิสัย (Range) ของข้อมูลคะแนน",
        starterCode: "import statistics\n\nscores = [72, 85, 90, 68, 95, 78, 82, 88, 76, 91]\n\n# TODO: คำนวณค่าทางสถิติด้วยฟังก์ชันในโมดูล statistics\nmean_val = 0\nmedian_val = 0\nstdev_val = 0\nvar_val = 0\n\nprint(f'Mean: {mean_val:.2f}')\nprint(f'Median: {median_val}')\nprint(f'Std Dev: {stdev_val:.2f}')\nprint(f'Variance: {var_val:.2f}')\nprint(f'Max: {max(scores)}, Min: {min(scores)}')\nprint(f'Range: {max(scores) - min(scores)}')",
        hint: "เรียกใช้ statistics.mean(scores), statistics.median(scores), statistics.stdev(scores) และ statistics.variance(scores)",
        solution: "import statistics\nscores = [72, 85, 90, 68, 95, 78, 82, 88, 76, 91]\nprint(f'Mean: {statistics.mean(scores):.2f}')\nprint(f'Median: {statistics.median(scores)}')\nprint(f'Std Dev: {statistics.stdev(scores):.2f}')\nprint(f'Variance: {statistics.variance(scores):.2f}')\nprint(f'Max: {max(scores)}, Min: {min(scores)}')\nprint(f'Range: {max(scores) - min(scores)}')",
        expectedOutput: "Mean: 82.50\nMedian: 83.5\nStd Dev: 8.85\nVariance: 78.28\nMax: 95, Min: 68\nRange: 27"
      },
      {
        id: "i5e2", title: "จำลองเกมทอยลูกเต๋า 10 รอบ", difficulty: "medium",
        description: "ใช้โมดูล random สุ่มแต้มลูกเต๋า 2 ลูกรวมกัน (ลูกละ 1-6) แข่งกับคอมพิวเตอร์จำนวน 10 รอบ พร้อมนับสถิติชนะ เสมอ และแพ้",
        starterCode: "import random\n\nwins = draws = losses = 0\n\nfor round_num in range(1, 11):\n    # TODO: สุ่มแต้มลูกเต๋า 2 ลูกให้ player และ computer แล้วเปรียบเทียบผล\n    player = 0\n    computer = 0\n    result = ''\n    \n    print(f'รอบ {round_num}: คุณ={player} คอม={computer} → {result}')\n\nprint(f'\\nสรุป: ชนะ {wins} | เสมอ {draws} | แพ้ {losses}')",
        hint: "แต้ม 2 ลูกคือ random.randint(1, 6) + random.randint(1, 6) แล้วใช้ if/elif/else เทียบแต้มเพื่อบวก wins, draws หรือ losses",
        solution: "import random\nwins = draws = losses = 0\nfor round_num in range(1, 11):\n    player = random.randint(1, 6) + random.randint(1, 6)\n    computer = random.randint(1, 6) + random.randint(1, 6)\n    if player > computer:\n        result = 'ชนะ! 🎉'\n        wins += 1\n    elif player == computer:\n        result = 'เสมอ 🤝'\n        draws += 1\n    else:\n        result = 'แพ้ 😢'\n        losses += 1\n    print(f'รอบ {round_num}: คุณ={player} คอม={computer} → {result}')\nprint(f'\\nสรุป: ชนะ {wins} | เสมอ {draws} | แพ้ {losses}')",
        expectedOutput: ""
      },
      {
        id: "i5e3", title: "คำนวณอายุและนับถอยหลังวันเกิด", difficulty: "medium",
        description: "ใช้ date จากโมดูล datetime เขียนฟังก์ชัน calculate_age() คำนวณอายุเต็มปีบริบูรณ์ และ days_until_birthday() นับจำนวนวันที่เหลือก่อนถึงวันเกิดครั้งถัดไป",
        starterCode: "from datetime import date\n\ndef calculate_age(birth_year, birth_month, birth_day):\n    today = date.today()\n    born = date(birth_year, birth_month, birth_day)\n    # TODO: คำนวณอายุเต็มปี (หักออก 1 ปีหากปีนี้ยังไม่ถึงเดือนและวันเกิด)\n    return 0\n\ndef days_until_birthday(birth_month, birth_day):\n    today = date.today()\n    # TODO: สร้างวันเกิดในปีปัจจุบัน หากผ่านไปแล้วให้เลื่อนเป็นปีหน้า แล้วคืนค่าจำนวนวัน (.days)\n    return 0\n\nage = calculate_age(2008, 5, 15)\ndays = days_until_birthday(5, 15)\nprint(f'อายุ: {age} ปี')\nprint(f'วันเกิดอีก: {days} วัน')\nprint(f'วันนี้: {date.today().strftime(\"%d/%m/%Y\")}')",
        hint: "เช็กว่าถึงวันเกิดปีนี้หรือยังด้วย if (today.month, today.day) < (born.month, born.day): age -= 1 และหาผลต่างจำนวนวันด้วย (next_bd - today).days",
        solution: "from datetime import date\ndef calculate_age(birth_year, birth_month, birth_day):\n    today = date.today()\n    born = date(birth_year, birth_month, birth_day)\n    age = today.year - born.year\n    if (today.month, today.day) < (born.month, born.day):\n        age -= 1\n    return age\ndef days_until_birthday(birth_month, birth_day):\n    today = date.today()\n    next_bd = date(today.year, birth_month, birth_day)\n    if next_bd < today:\n        next_bd = date(today.year + 1, birth_month, birth_day)\n    return (next_bd - today).days\nage = calculate_age(2008, 5, 15)\ndays = days_until_birthday(5, 15)\nprint(f'อายุ: {age} ปี')\nprint(f'วันเกิดอีก: {days} วัน')\nprint(f'วันนี้: {date.today().strftime(\"%d/%m/%Y\")}')",
        expectedOutput: ""
      }
    ]
  },

  // ============================================================
  // ADVANCED LEVEL (ระดับสูง / เตรียมอุดมศึกษาและโอลิมปิกวิชาการ)
  // ============================================================
  {
    id: "a1", level: "advanced", order: 1,
    title: "Decorators", icon: "🎨", duration: "40 นาที",
    description: "ห่อหุ้มและขยายความสามารถของฟังก์ชันด้วย Higher-Order Functions และ Decorators",
    theory: `
<h2>Decorators — การห่อหุ้มเสริมความสามารถให้ฟังก์ชัน</h2>
<p>Decorator คือฟังก์ชันที่รับฟังก์ชันอื่นเข้าไปเป็นอาร์กิวเมนต์ แล้วคืนฟังก์ชันตัวใหม่ที่เพิ่มพฤติกรรมก่อนหรือหลังการทำงานเดิมโดยไม่ต้องแก้โค้ดต้นฉบับ</p>
<div class="code-example">
<pre><code>import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} ใช้เวลา {end - start:.4f} วินาที")
        return result
    return wrapper

@timer
def slow_sum():
    return sum(range(1000000))

print(slow_sum())</code></pre>
</div>
<h3>Decorator Factory (Decorator ที่รับพารามิเตอร์ได้)</h3>
<div class="code-example">
<pre><code>def repeat(times=2):
    def decorator(func):
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator</code></pre>
</div>`,
    exercises: [
      {
        id: "a1e1", title: "Logger Decorator", difficulty: "medium",
        description: "สร้าง decorator @log_call ที่พิมพ์บันทึกการเรียกฟังก์ชันในรูปแบบ 'เรียก {ชื่อฟังก์ชัน}({args}, {kwargs})' และพิมพ์ 'ผลลัพธ์: {result}' ก่อนคืนค่า",
        starterCode: "def log_call(func):\n    def wrapper(*args, **kwargs):\n        # TODO: พิมพ์ชื่อฟังก์ชันพร้อม args/kwargs เรียกทำงานฟังก์ชันจริง พิมพ์ผลลัพธ์ แล้ว return ค่ากลับ\n        pass\n    return wrapper\n\n@log_call\ndef add(a, b):\n    return a + b\n\n@log_call\ndef greet(name, greeting='สวัสดี'):\n    return f'{greeting} {name}!'\n\nadd(3, 4)\ngreet('สมชาย')\ngreet('มาลี', greeting='หวัดดี')",
        hint: "ใช้ func.__name__ เพื่อดึงชื่อฟังก์ชัน เรียก result = func(*args, **kwargs) พิมพ์ผลลัพธ์ แล้วอย่าลืม return result",
        solution: "def log_call(func):\n    def wrapper(*args, **kwargs):\n        print(f'เรียก {func.__name__}({args}, {kwargs})')\n        result = func(*args, **kwargs)\n        print(f'ผลลัพธ์: {result}')\n        return result\n    return wrapper\n@log_call\ndef add(a, b):\n    return a + b\n@log_call\ndef greet(name, greeting='สวัสดี'):\n    return f'{greeting} {name}!'\nadd(3, 4)\ngreet('สมชาย')\ngreet('มาลี', greeting='หวัดดี')",
        expectedOutput: "เรียก add((3, 4), {})\nผลลัพธ์: 7\nเรียก greet(('สมชาย',), {})\nผลลัพธ์: สวัสดี สมชาย!\nเรียก greet(('มาลี',), {'greeting': 'หวัดดี'})\nผลลัพธ์: หวัดดี มาลี!"
      },
      {
        id: "a1e2", title: "Memoization Cache Decorator", difficulty: "hard",
        description: "สร้าง decorator @memoize เพื่อจำผลลัพธ์ที่เคยคำนวณแล้วไว้ใน dict cache ช่วยลดเวลาการทำงานของฟังก์ชันเวียนบังเกิด (Recursion) อย่าง Fibonacci",
        starterCode: "import time\n\ndef memoize(func):\n    cache = {}\n    def wrapper(*args):\n        # TODO: หากยังไม่มี args ใน cache ให้คำนวณและเก็บลง cache ก่อนคืนค่า cache[args]\n        pass\n    return wrapper\n\ndef fib_slow(n):\n    if n <= 1:\n        return n\n    return fib_slow(n - 1) + fib_slow(n - 2)\n\n@memoize\ndef fib_fast(n):\n    if n <= 1:\n        return n\n    return fib_fast(n - 1) + fib_fast(n - 2)\n\nstart = time.time()\nprint(f'fib(35) = {fib_fast(35)}')\nprint(f'ใช้เวลา: {time.time() - start:.6f}s (fast)')\n\nstart = time.time()\nprint(f'fib(28) = {fib_slow(28)}')\nprint(f'ใช้เวลา: {time.time() - start:.4f}s (slow)')",
        hint: "เช็ก if args not in cache: cache[args] = func(*args) แล้ว return cache[args]",
        solution: "import time\ndef memoize(func):\n    cache = {}\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper\ndef fib_slow(n):\n    if n <= 1:\n        return n\n    return fib_slow(n - 1) + fib_slow(n - 2)\n@memoize\ndef fib_fast(n):\n    if n <= 1:\n        return n\n    return fib_fast(n - 1) + fib_fast(n - 2)\nstart = time.time()\nprint(f'fib(35) = {fib_fast(35)}')\nprint(f'ใช้เวลา: {time.time() - start:.6f}s (fast)')\nstart = time.time()\nprint(f'fib(28) = {fib_slow(28)}')\nprint(f'ใช้เวลา: {time.time() - start:.4f}s (slow)')",
        expectedOutput: ""
      },
      {
        id: "a1e3", title: "Role-Based Access Control Decorator", difficulty: "hard",
        description: "สร้าง decorator @require_role(role) ตรวจสอบสิทธิ์ของ dict user ก่อนอนุญาตให้รันฟังก์ชัน หากสิทธิ์ไม่ตรงให้โยน PermissionError",
        starterCode: "def require_role(role):\n    def decorator(func):\n        def wrapper(user, *args, **kwargs):\n            # TODO: ถ้า user.get('role') == role ให้เรียก func(user, *args, **kwargs)\n            # มิฉะนั้นให้ raise PermissionError(f'ต้องการสิทธิ์ {role} แต่ {user[\"name\"]} มีสิทธิ์ {user[\"role\"]}')\n            pass\n        return wrapper\n    return decorator\n\n@require_role('admin')\ndef delete_user(user, target_id):\n    return f'{user[\"name\"]} ลบ user {target_id} สำเร็จ'\n\n@require_role('teacher')\ndef add_grade(user, student, score):\n    return f'{user[\"name\"]} บันทึกคะแนน {student}: {score}'\n\nadmin = {'name': 'อาจารย์ใหญ่', 'role': 'admin'}\nteacher = {'name': 'ครูสมชาย', 'role': 'teacher'}\nstudent = {'name': 'นักเรียน', 'role': 'student'}\n\nprint(delete_user(admin, 'user123'))\nprint(add_grade(teacher, 'มาลี', 95))\n\ntry:\n    delete_user(student, 'user999')\nexcept PermissionError as e:\n    print(f'Error: {e}')",
        hint: "ตรวจเงื่อนไข user.get('role') == role ใน wrapper แล้ว return ค่าจาก func(user, *args, **kwargs) หากไม่ตรงใช้คำสั่ง raise PermissionError(...)",
        solution: "def require_role(role):\n    def decorator(func):\n        def wrapper(user, *args, **kwargs):\n            if user.get('role') == role:\n                return func(user, *args, **kwargs)\n            else:\n                raise PermissionError(f'ต้องการสิทธิ์ {role} แต่ {user[\"name\"]} มีสิทธิ์ {user[\"role\"]}')\n        return wrapper\n    return decorator\n@require_role('admin')\ndef delete_user(user, target_id):\n    return f'{user[\"name\"]} ลบ user {target_id} สำเร็จ'\n@require_role('teacher')\ndef add_grade(user, student, score):\n    return f'{user[\"name\"]} บันทึกคะแนน {student}: {score}'\nadmin = {'name': 'อาจารย์ใหญ่', 'role': 'admin'}\nteacher = {'name': 'ครูสมชาย', 'role': 'teacher'}\nstudent = {'name': 'นักเรียน', 'role': 'student'}\nprint(delete_user(admin, 'user123'))\nprint(add_grade(teacher, 'มาลี', 95))\ntry:\n    delete_user(student, 'user999')\nexcept PermissionError as e:\n    print(f'Error: {e}')",
        expectedOutput: "อาจารย์ใหญ่ ลบ user user123 สำเร็จ\nครูสมชาย บันทึกคะแนน มาลี: 95\nError: ต้องการสิทธิ์ admin แต่ นักเรียน มีสิทธิ์ student"
      }
    ]
  },
  {
    id: "a2", level: "advanced", order: 2,
    title: "Generators และ Iterators", icon: "🔁", duration: "35 นาที",
    description: "ประมวลผลลำดับข้อมูลขนาดใหญ่แบบประหยัดหน่วยความจำด้วย Lazy Evaluation",
    theory: `
<h2>Generators — สร้างค่าทีละตัวเมื่อถูกเรียกใช้ (Lazy Evaluation)</h2>
<p>ฟังก์ชันที่ใช้คำสั่ง <code>yield</code> แทน <code>return</code> จะกลายเป็น Generator ซึ่งพักสถานะการทำงานไว้ชั่วคราวและส่งค่าออกทีละตัวโดยไม่ต้องจองหน่วยความจำเก็บข้อมูลทั้งหมดพร้อมกัน</p>
<div class="code-example">
<pre><code>def fibonacci_gen():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci_gen()
for _ in range(10):
    print(next(gen), end=' ')
# 0 1 1 2 3 5 8 13 21 34</code></pre>
</div>
<h3>โปรโตคอล Iterator (__iter__ และ __next__)</h3>
<div class="code-example">
<pre><code>class Counter:
    def __init__(self, limit):
        self.current = 1
        self.limit = limit

    def __iter__(self):
        return self

    def __next__(self):
        if self.current > self.limit:
            raise StopIteration
        val = self.current
        self.current += 1
        return val</code></pre>
</div>`,
    exercises: [
      {
        id: "a2e1", title: "Prime Number Generator", difficulty: "hard",
        description: "สร้าง Generator prime_gen() ที่ผลิตจำนวนเฉพาะอย่างไม่สิ้นสุดด้วยคำสั่ง yield แล้วใช้ itertools.islice ดึงจำนวนเฉพาะ 20 ตัวแรกออกมาแสดง",
        starterCode: "from itertools import islice\n\ndef prime_gen():\n    def is_prime(n):\n        if n < 2:\n            return False\n        for i in range(2, int(n**0.5) + 1):\n            if n % i == 0:\n                return False\n        return True\n    \n    n = 2\n    # TODO: วนลูป while True หาก is_prime(n) เป็นจริงให้ yield n แล้วเพิ่มค่า n ทีละ 1\n    pass\n\nprimes = list(islice(prime_gen(), 20))\nprint(primes)",
        hint: "เขียน while True: เช็ก if is_prime(n): yield n แล้วบวก n += 1 นอกบล็อก if",
        solution: "from itertools import islice\ndef prime_gen():\n    def is_prime(n):\n        if n < 2:\n            return False\n        for i in range(2, int(n**0.5) + 1):\n            if n % i == 0:\n                return False\n        return True\n    n = 2\n    while True:\n        if is_prime(n):\n            yield n\n        n += 1\nprimes = list(islice(prime_gen(), 20))\nprint(primes)",
        expectedOutput: "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71]"
      },
      {
        id: "a2e2", title: "Generator Data Pipeline", difficulty: "hard",
        description: "เติม Generator filter_positive(data) เพื่อส่งออกเฉพาะค่าบวก และ square(data) เพื่อส่งออกค่ายกกำลังสอง แล้วเชื่อมต่อเป็น Pipeline",
        starterCode: "def read_data():\n    data = [10, -5, 20, -3, 15, 8, -1, 25, 12, -8]\n    for item in data:\n        yield item\n\ndef filter_positive(data):\n    # TODO: วนอ่าน data แล้ว yield เฉพาะค่าที่มากกว่า 0\n    pass\n\ndef square(data):\n    # TODO: วนอ่าน data แล้ว yield ค่ายกกำลัง 2\n    pass\n\npipeline = square(filter_positive(read_data()))\nresult = list(pipeline)\nprint('Pipeline result:', result)\nprint('Sum:', sum(result))",
        hint: "ใน filter_positive ใช้ for item in data: if item > 0: yield item และใน square ใช้ for item in data: yield item ** 2",
        solution: "def read_data():\n    data = [10, -5, 20, -3, 15, 8, -1, 25, 12, -8]\n    for item in data:\n        yield item\ndef filter_positive(data):\n    for item in data:\n        if item > 0:\n            yield item\ndef square(data):\n    for item in data:\n        yield item ** 2\npipeline = square(filter_positive(read_data()))\nresult = list(pipeline)\nprint('Pipeline result:', result)\nprint('Sum:', sum(result))",
        expectedOutput: "Pipeline result: [100, 400, 225, 64, 625, 144]\nSum: 1558"
      },
      {
        id: "a2e3", title: "Custom Iterator Class นับถอยหลัง", difficulty: "hard",
        description: "เติมเมธอด __iter__() และ __next__() ให้คลาส Countdown นับถอยหลังจาก start ลงไปจนถึง 0 (เมื่อต่ำกว่า 0 ให้โยน StopIteration)",
        starterCode: "class Countdown:\n    def __init__(self, start):\n        self.current = start\n    \n    def __iter__(self):\n        # TODO: คืนค่าอ็อบเจกต์ iterator ตัวเอง\n        pass\n    \n    def __next__(self):\n        # TODO: ถ้า self.current < 0 ให้ raise StopIteration\n        # มิฉะนั้นเก็บค่าปัจจุบัน ลดค่า self.current ลง 1 แล้วคืนค่าที่เก็บไว้\n        pass\n\ncountdown = Countdown(5)\nfor n in countdown:\n    print(n, end=' ')\nprint('🚀 ปล่อยจรวด!')\nprint(list(Countdown(3)))",
        hint: "__iter__ คืนค่า self ส่วน __next__ เช็ก if self.current < 0: raise StopIteration ก่อนลดค่าและ return",
        solution: "class Countdown:\n    def __init__(self, start):\n        self.current = start\n    def __iter__(self):\n        return self\n    def __next__(self):\n        if self.current < 0:\n            raise StopIteration\n        value = self.current\n        self.current -= 1\n        return value\ncountdown = Countdown(5)\nfor n in countdown:\n    print(n, end=' ')\nprint('🚀 ปล่อยจรวด!')\nprint(list(Countdown(3)))",
        expectedOutput: "5 4 3 2 1 0 🚀 ปล่อยจรวด!\n[3, 2, 1, 0]"
      }
    ]
  },
  {
    id: "a3", level: "advanced", order: 3,
    title: "Data Structures & Algorithms", icon: "🏗️", duration: "50 นาที",
    description: "โครงสร้างข้อมูลพื้นฐานและอัลกอริทึมการเรียงลำดับ: Stack, Queue, Linked List, BST และ Sorting",
    theory: `
<h2>1. Stack (LIFO) และ Queue (FIFO)</h2>
<p><strong>Stack</strong> ทำงานแบบเข้าทีหลังออกก่อน (Last-In, First-Out) เช่น การตรวจสอบวงเล็บเปิด-ปิด ส่วน <strong>Queue</strong> ทำงานแบบเข้าก่อนออกก่อน (First-In, First-Out) เช่น ระบบบัตรคิว</p>
<div class="code-example">
<pre><code>class Stack:
    def __init__(self):
        self._data = []
    def push(self, item):
        self._data.append(item)
    def pop(self):
        if not self._data:
            raise IndexError("Stack ว่าง!")
        return self._data.pop()

def check_brackets(text):
    stack = Stack()
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in text:
        if ch in '([{':
            stack.push(ch)
        elif ch in ')]}':
            if not stack._data or stack.pop() != pairs[ch]:
                return False
    return len(stack._data) == 0

print(check_brackets("(a + b) * [c - d]"))  # True</code></pre>
</div>
<h3>2. Linked List และโหนด (Node)</h3>
<p>Linked List เก็บข้อมูลในโหนด (<code>Node</code>) ที่เชื่อมโยงกันด้วยตัวชี้ <code>next</code> ช่วยให้เพิ่มหรือลบข้อมูลที่หัว-ท้ายคิวได้ในเวลาคงที่</p>
<div class="code-example">
<pre><code>class Node:
    def __init__(self, data):
        self.data = data
        self.next = None</code></pre>
</div>
<h3>3. Binary Search Tree (BST)</h3>
<p>ต้นไม้ค้นหาแบบทวิภาคจัดเก็บโหนดโดยให้ <strong>ลูกฝั่งซ้ายมีค่าน้อยกว่าโหนดแม่</strong> และ <strong>ลูกฝั่งขวามีค่ามากกว่าโหนดแม่</strong> เมื่อท่องต้นไม้แบบ In-order (ซ้าย → แม่ → ขวา) จะได้ข้อมูลเรียงจากน้อยไปมากเสมอ</p>
<div class="code-example">
<pre><code>class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None</code></pre>
</div>`,
    exercises: [
      {
        id: "a3e1", title: "Queue ด้วย Linked List", difficulty: "hard",
        description: "เติมเมธอด enqueue(item) ต่อท้ายคิว และ dequeue() ดึงข้อมูลหัวคิวออกตามหลัก FIFO เพื่อจำลองการให้บริการคิวธนาคาร",
        starterCode: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass Queue:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n        self.size = 0\n    \n    def enqueue(self, item):\n        # TODO: สร้าง Node ใหม่ ต่อท้าย self.tail อัปเดต head/tail และเพิ่ม self.size\n        pass\n    \n    def dequeue(self):\n        # TODO: หากคิวว่างให้ raise IndexError('Queue ว่าง')\n        # ดึงข้อมูลจาก self.head เลื่อน head ไปตัวถัดไป (หากว่างให้เซต tail = None) ลด size แล้ว return ข้อมูล\n        pass\n\nbank_queue = Queue()\ncustomers = ['สมชาย', 'มาลี', 'วิชัย', 'สุดา']\n\nfor c in customers:\n    bank_queue.enqueue(c)\n    print(f'{c} เข้าคิว')\n\nprint('\\nให้บริการ:')\nwhile bank_queue.size > 0:\n    customer = bank_queue.dequeue()\n    print(f'บริการ {customer} ✓')",
        hint: "ใน enqueue หาก self.tail มีอยู่ให้ชี้ self.tail.next = node แล้วเลื่อน self.tail = node (และหาก self.head เป็น None ให้ชี้ไปที่ node ด้วย)",
        solution: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\nclass Queue:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n        self.size = 0\n    def enqueue(self, item):\n        node = Node(item)\n        if self.tail:\n            self.tail.next = node\n        self.tail = node\n        if not self.head:\n            self.head = node\n        self.size += 1\n    def dequeue(self):\n        if not self.head:\n            raise IndexError('Queue ว่าง')\n        data = self.head.data\n        self.head = self.head.next\n        if not self.head:\n            self.tail = None\n        self.size -= 1\n        return data\nbank_queue = Queue()\ncustomers = ['สมชาย', 'มาลี', 'วิชัย', 'สุดา']\nfor c in customers:\n    bank_queue.enqueue(c)\n    print(f'{c} เข้าคิว')\nprint('\\nให้บริการ:')\nwhile bank_queue.size > 0:\n    customer = bank_queue.dequeue()\n    print(f'บริการ {customer} ✓')",
        expectedOutput: "สมชาย เข้าคิว\nมาลี เข้าคิว\nวิชัย เข้าคิว\nสุดา เข้าคิว\n\nให้บริการ:\nบริการ สมชาย ✓\nบริการ มาลี ✓\nบริการ วิชัย ✓\nบริการ สุดา ✓"
      },
      {
        id: "a3e2", title: "Binary Search Tree (BST)", difficulty: "hard",
        description: "เติมเมธอดเวียนบังเกิด _insert(), _search() และการท่องต้นไม้แบบ inorder() (ซ้าย → ตัวเอง → ขวา) ให้สมบูรณ์",
        starterCode: "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, val):\n        self.root = self._insert(self.root, val)\n    \n    def _insert(self, node, val):\n        if not node:\n            return TreeNode(val)\n        # TODO: ถ้า val < node.val ให้แทรกฝั่งซ้าย ถ้า val > node.val ให้แทรกฝั่งขวา แล้ว return node\n        return node\n    \n    def search(self, val):\n        return self._search(self.root, val)\n    \n    def _search(self, node, val):\n        # TODO: ค้นหาค่า val ในต้นไม้ คืนค่า True หากพบ และ False หากไม่พบ\n        pass\n    \n    def inorder(self):\n        result = []\n        def traverse(node):\n            # TODO: ท่องแบบ In-order (ซ้าย -> append ค่าปัจจุบัน -> ขวา)\n            pass\n        traverse(self.root)\n        return result\n\nbst = BST()\nfor val in [5, 3, 7, 1, 4, 6, 8]:\n    bst.insert(val)\n\nprint('In-order (เรียงลำดับ):', bst.inorder())\nprint('ค้นหา 4:', bst.search(4))\nprint('ค้นหา 9:', bst.search(9))",
        hint: "ใน _insert ใช้ node.left = self._insert(node.left, val) เมื่อ val < node.val ส่วนใน traverse เช็ก if node: แล้วเรียก traverse(node.left), result.append(node.val), traverse(node.right)",
        solution: "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\nclass BST:\n    def __init__(self):\n        self.root = None\n    def insert(self, val):\n        self.root = self._insert(self.root, val)\n    def _insert(self, node, val):\n        if not node:\n            return TreeNode(val)\n        if val < node.val:\n            node.left = self._insert(node.left, val)\n        elif val > node.val:\n            node.right = self._insert(node.right, val)\n        return node\n    def search(self, val):\n        return self._search(self.root, val)\n    def _search(self, node, val):\n        if not node:\n            return False\n        if val == node.val:\n            return True\n        if val < node.val:\n            return self._search(node.left, val)\n        return self._search(node.right, val)\n    def inorder(self):\n        result = []\n        def traverse(node):\n            if node:\n                traverse(node.left)\n                result.append(node.val)\n                traverse(node.right)\n        traverse(self.root)\n        return result\nbst = BST()\nfor val in [5, 3, 7, 1, 4, 6, 8]:\n    bst.insert(val)\nprint('In-order (เรียงลำดับ):', bst.inorder())\nprint('ค้นหา 4:', bst.search(4))\nprint('ค้นหา 9:', bst.search(9))",
        expectedOutput: "In-order (เรียงลำดับ): [1, 3, 4, 5, 6, 7, 8]\nค้นหา 4: True\nค้นหา 9: False"
      },
      {
        id: "a3e3", title: "เปรียบเทียบอัลกอริทึม Sorting", difficulty: "hard",
        description: "เติมส่วนแกนหลักของ Bubble Sort (สลับค่าคู่ติดกัน) และ Quick Sort (แบ่งข้อมูลตามค่า pivot) เพื่อเปรียบเทียบความเร็วกับ Merge Sort",
        starterCode: "import time\nimport random\n\ndef bubble_sort(arr):\n    arr = arr.copy()\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            # TODO: ถ้า arr[j] > arr[j + 1] ให้สลับตำแหน่งกัน\n            pass\n    return arr\n\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    return result + left[i:] + right[j:]\n\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    # TODO: แบ่งสมาชิกเป็น left (< pivot), mid (== pivot) และ right (> pivot)\n    # แล้ว return quick_sort(left) + mid + quick_sort(right)\n    return arr\n\ndata = random.sample(range(1000), 300)\n\nfor name, func in [('Bubble Sort', bubble_sort), ('Merge Sort', merge_sort), ('Quick Sort', quick_sort)]:\n    start = time.time()\n    result = func(data)\n    elapsed = time.time() - start\n    print(f'{name}: {elapsed:.4f}s (ถูกต้อง: {result == sorted(data)})')",
        hint: "ใน bubble_sort สลับค่าด้วย arr[j], arr[j+1] = arr[j+1], arr[j] ส่วนใน quick_sort ใช้ List Comprehension แยก left, mid, right เทียบกับค่า pivot",
        solution: "import time\nimport random\ndef bubble_sort(arr):\n    arr = arr.copy()\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    return result + left[i:] + right[j:]\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    mid = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + mid + quick_sort(right)\ndata = random.sample(range(1000), 300)\nfor name, func in [('Bubble Sort', bubble_sort), ('Merge Sort', merge_sort), ('Quick Sort', quick_sort)]:\n    start = time.time()\n    result = func(data)\n    elapsed = time.time() - start\n    print(f'{name}: {elapsed:.4f}s (ถูกต้อง: {result == sorted(data)})')",
        expectedOutput: ""
      }
    ]
  }
];

// Helper functions
function getLessonsByLevel(level) {
  return LESSONS_DATA.filter(l => l.level === level).sort((a, b) => a.order - b.order);
}

function getLessonById(id) {
  return LESSONS_DATA.find(l => l.id === id);
}

function getAllLevels() {
  return ['elementary', 'beginner', 'intermediate', 'advanced'];
}

function getLevelInfo(level) {
  const info = {
    elementary: { label: 'ระดับประถม', color: '#f472b6', icon: '🌸', description: 'สนุกกับ Python ตั้งแต่เริ่มต้น' },
    beginner: { label: 'ผู้เริ่มต้น', color: '#10b981', icon: '🌱', description: 'เรียนพื้นฐาน Python ครบถ้วน' },
    intermediate: { label: 'ระดับกลาง', color: '#3b82f6', icon: '🚀', description: 'OOP, Modules, Error Handling' },
    advanced: { label: 'ระดับสูง', color: '#8b5cf6', icon: '⚡', description: 'Decorators, Generators, Algorithms' }
  };
  return info[level];
}

// ── Grade Level System ──
const GRADE_KEY = 'python_grade_level';
const GRADE_CONFIG = {
  elementary: {
    label: '🌸 ประถมศึกษา (ป.1–ป.6)',
    description: 'เนื้อหาพื้นฐานสนุกๆ เหมาะสำหรับนักเรียนประถม',
    levels: ['elementary']
  },
  middle: {
    label: '🌿 มัธยมต้น (ม.1–ม.3)',
    description: 'เรียนพื้นฐานการเขียนโปรแกรมเชิงโครงสร้างครบถ้วนตามวัย',
    levels: ['beginner']
  },
  high: {
    label: '🚀 มัธยมปลาย (ม.4–ม.6)',
    description: 'ครอบคลุมพื้นฐานถึงการเขียนโปรแกรมเชิงวัตถุและโครงสร้างข้อมูลขั้นสูง',
    levels: ['beginner', 'intermediate', 'advanced']
  }
};

function getGradeLevel() {
  return localStorage.getItem(GRADE_KEY) || 'middle';
}
function setGradeLevel(grade) {
  localStorage.setItem(GRADE_KEY, grade);
}
function getLevelsByGrade(grade) {
  return (GRADE_CONFIG[grade] || GRADE_CONFIG.middle).levels;
}
function getGradeConfig(grade) {
  return GRADE_CONFIG[grade] || GRADE_CONFIG.middle;
}