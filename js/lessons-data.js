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
        hint: "ลองใช้ emoji หลายตัวในบรรทัดเดียว เช่น print(\"🐶 หมาน้อย\")",
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
  <div class="type-card float"><span>×</span><p>คูณ<br><code>3 * 4</code></p></div>
  <div class="type-card bool"><span>÷</span><p>หาร<br><code>8 / 2</code></p></div>
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
  <div><strong>เครื่องหมายคูณคือ *</strong> ไม่ใช่ × นะ!<br>
  และเครื่องหมายหารคือ / ไม่ใช่ ÷<br>
  <code>print(5 * 3)</code> = 15</div>
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
        description: "รถของเล่นราคา 120 บาท ตุ๊กตาราคา 85 บาท ช่วยคิดว่าซื้อทั้งสองอย่างต้องจ่ายกี่บาท",
        starterCode: "# คำนวณราคารวม\n",
        hint: "ใช้ print(120 + 85) หรือจะใส่ข้อความด้วยก็ได้",
        solution: 'print("ราคารวม:", 120 + 85, "บาท")',
        expectedOutput: "ราคารวม: 205 บาท"
      },
      {
        id: "e2e2", title: "แบ่งขนมให้เพื่อน", difficulty: "easy",
        description: "มีขนม 24 ชิ้น อยากแบ่งให้เพื่อน 4 คนเท่าๆ กัน แต่ละคนได้กี่ชิ้น? และถ้ามี 3 คน แต่ละคนได้กี่ชิ้น?",
        starterCode: "# แบ่งขนม 24 ชิ้น ให้ 4 คน\n\n# แบ่งขนม 24 ชิ้น ให้ 3 คน\n",
        hint: "ใช้เครื่องหมาย / สำหรับการหาร เช่น print(24 / 4)",
        solution: 'print("แบ่งให้ 4 คน คนละ:", 24 / 4, "ชิ้น")\nprint("แบ่งให้ 3 คน คนละ:", 24 / 3, "ชิ้น")',
        expectedOutput: ""
      },
      {
        id: "e2e3", title: "คะแนนในเกม", difficulty: "medium",
        description: "เราเล่นเกมได้ 3 รอบ รอบแรก 150 คะแนน รอบสอง 200 คะแนน รอบสาม 175 คะแนน ให้คำนวณ: คะแนนรวม และ คะแนนเฉลี่ยต่อรอบ",
        starterCode: "# คะแนนแต่ละรอบ\nround1 = 150\nround2 = 200\nround3 = 175\n\n# คำนวณคะแนนรวม\n\n# คำนวณคะแนนเฉลี่ย\n",
        hint: "คะแนนรวม = round1 + round2 + round3 และเฉลี่ย = รวม / 3",
        solution: 'round1 = 150\nround2 = 200\nround3 = 175\ntotal = round1 + round2 + round3\nprint("คะแนนรวม:", total)\nprint("เฉลี่ยต่อรอบ:", total / 3)',
        expectedOutput: ""
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
  ✅ ใช้ภาษาอังกฤษหรือภาษาไทยได้<br>
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
        starterCode: "# เก็บข้อมูลของคุณ\nname = \"...\"\nage = ...\nfavorite = \"...\"\n\n# พิมพ์บัตรประจำตัว\n",
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
        expectedOutput: ""
      }
    ]
  },
  {
    id: "e4", level: "elementary", order: 4,
    title: "คุยกับโปรแกรม 💬", icon: "💬", duration: "15 นาที",
    description: "ให้โปรแกรมถาม และเราตอบได้! เรียนรู้ input() และ f-string",
    theory: `
<h2>input() — รับคำตอบจากผู้ใช้</h2>
<p>ถ้า <code>print()</code> คือการพูด ก็ <code>input()</code> คือการ <strong>ถามและรอคำตอบ</strong>!</p>
<div class="code-example">
<pre><code>name = input("คุณชื่ออะไร? ")
print("สวัสดี", name, "ยินดีที่รู้จัก!")</code></pre>
<div class="code-output">คุณชื่ออะไร? <em>[ผู้ใช้พิมพ์: มิ้น]</em><br>สวัสดี มิ้น ยินดีที่รู้จัก!</div>
</div>
<h3>f-string — พูดรวมข้อมูล</h3>
<p>f-string คือการพิมพ์ข้อความพร้อมตัวแปรได้สวยๆ ใส่ f ข้างหน้าแล้วใส่ {} รอบตัวแปร</p>
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
  ถ้าต้องการตัวเลข ต้องแปลงด้วย int() ก่อน<br>
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
    description: "ให้โปรแกรมเลือกทำสิ่งต่างกัน เรียนรู้ if/else พื้นฐาน",
    theory: `
<h2>if/else — แยกทาง</h2>
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
  <code>==</code> เท่ากัน (ใช้สองตัว!)<br>
  <code>></code> มากกว่า &nbsp; <code>&lt;</code> น้อยกว่า<br>
  <code>>=</code> มากกว่าหรือเท่ากัน</div>
</div>
<h3>ตัวอย่างเพิ่มเติม</h3>
<div class="code-example">
<pre><code>score = 75

if score >= 80:
    print("เก่งมาก! 🏆 ได้เกรด A")
else:
    print("ทำได้ดี! 👍 ลองพยายามอีกนะ")</code></pre>
<div class="code-output">ทำได้ดี! 👍 ลองพยายามอีกนะ</div>
</div>`,
    exercises: [
      {
        id: "e5e1", title: "ชอบแมวหรือหมา?", difficulty: "easy",
        description: "ถามผู้ใช้ว่าชอบแมวหรือหมา แล้วตอบให้เหมาะสม (ถ้าพิมพ์ 'แมว' ตอบอย่างหนึ่ง ถ้าไม่ใช่ตอบอีกอย่าง)",
        starterCode: "pet = input(\"คุณชอบ แมว หรือ หมา? \")\n\nif pet == \"แมว\":\n    print(\"เยี่ยม! แมวน่ารักมาก 🐱\")\nelse:\n    # เติมส่วนที่ชอบหมา\n",
        hint: "เติม print() ในส่วน else สำหรับคนที่ชอบหมา",
        solution: 'pet = input("คุณชอบ แมว หรือ หมา? ")\nif pet == "แมว":\n    print("เยี่ยม! แมวน่ารักมาก 🐱")\nelse:\n    print("เจ๋ง! หมาเป็นเพื่อนที่ดีมาก 🐶")',
        expectedOutput: ""
      },
      {
        id: "e5e2", title: "อากาศวันนี้เป็นยังไง?", difficulty: "easy",
        description: "รับอุณหภูมิ (องศา) จากผู้ใช้ ถ้า >= 35 บอกว่า 'ร้อนมาก' ถ้าน้อยกว่านั้นบอกว่า 'อากาศพอดี'",
        starterCode: "temp = int(input(\"อุณหภูมิวันนี้กี่องศา? \"))\n\n# ตรวจสอบว่าร้อนหรือไม่\n",
        hint: "ใช้ if temp >= 35 แล้ว print ข้อความตามเงื่อนไข",
        solution: 'temp = int(input("อุณหภูมิวันนี้กี่องศา? "))\nif temp >= 35:\n    print(f"🥵 {temp} องศา ร้อนมากเลย! ดื่มน้ำเยอะๆ นะ")\nelse:\n    print(f"😊 {temp} องศา อากาศพอดีเลย เหมาะไปเที่ยว!")',
        expectedOutput: ""
      },
      {
        id: "e5e3", title: "ระบบตรวจคะแนน", difficulty: "medium",
        description: "รับคะแนน (0-100) จากผู้ใช้ ถ้าได้ 80 ขึ้นไป = ผ่านสบาย ถ้า 50-79 = ผ่าน ถ้าน้อยกว่า 50 = ต้องสอบใหม่",
        starterCode: "score = int(input(\"ได้คะแนนกี่คะแนน? \"))\n\n# ตรวจสอบผลการสอบ\n",
        hint: "ใช้ if score >= 80 แล้ว elif score >= 50 แล้ว else",
        solution: 'score = int(input("ได้คะแนนกี่คะแนน? "))\nif score >= 80:\n    print(f"🏆 ได้ {score} คะแนน ผ่านสบาย เก่งมาก!")\nelif score >= 50:\n    print(f"✅ ได้ {score} คะแนน ผ่าน! แต่ลองพยายามให้ได้มากกว่านี้นะ")\nelse:\n    print(f"📚 ได้ {score} คะแนน ยังไม่ผ่าน ลองทบทวนแล้วสอบใหม่นะ")',
        expectedOutput: ""
      }
    ]
  },

  // ============================================================
  // BEGINNER LEVEL
  // ============================================================
  {

    id: "b1", level: "beginner", order: 1,
    title: "Python คืออะไร?", icon: "🐍", duration: "15 นาที",
    description: "รู้จัก Python และทำไมมันถึงเป็นภาษาที่ดีสำหรับผู้เริ่มต้น",
    theory: `
<h2>Python คืออะไร?</h2>
<p>Python เป็นภาษาโปรแกรมมิ่งระดับสูง (High-level Programming Language) ที่ออกแบบมาให้อ่านง่ายและเขียนง่าย สร้างโดย <strong>Guido van Rossum</strong> ในปี 1991</p>
<div class="info-box">
  <span class="info-icon">💡</span>
  <div><strong>ทำไมต้องเรียน Python?</strong><br>
  Python ใช้งานได้หลากหลาย: AI/Machine Learning, Web Development, Data Science, Automation และอีกมากมาย บริษัทชั้นนำอย่าง Google, Netflix, NASA ใช้ Python!</div>
</div>
<h3>โปรแกรมแรกของเรา</h3>
<p>ประเพณีของการเรียนภาษาโปรแกรมใหม่คือการพิมพ์ "Hello, World!" ลองดูกัน:</p>
<div class="code-example">
<pre><code>print("Hello, World!")</code></pre>
<div class="code-output">Hello, World!</div>
</div>
<p>ฟังก์ชัน <code>print()</code> ใช้แสดงข้อความออกมาทางหน้าจอ ง่ายมากใช่ไหม?</p>
<h3>ความคิดเห็น (Comments)</h3>
<p>เราสามารถเพิ่ม comment ในโค้ดโดยใช้ <code>#</code> Python จะไม่รันส่วนนี้</p>
<div class="code-example">
<pre><code># นี่คือ comment Python จะไม่รันบรรทัดนี้
print("สวัสดีชาวโลก!")  # comment ต่อท้ายโค้ดได้ด้วย
print("ฉันกำลังเรียน Python")</code></pre>
</div>
<h3>Python ทำอะไรได้บ้าง?</h3>
<ul class="feature-list">
  <li>🤖 <strong>AI & Machine Learning</strong> — TensorFlow, PyTorch</li>
  <li>🌐 <strong>Web Development</strong> — Django, Flask, FastAPI</li>
  <li>📊 <strong>Data Science</strong> — Pandas, NumPy, Matplotlib</li>
  <li>🔧 <strong>Automation</strong> — สคริปต์ทำงานอัตโนมัติ</li>
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
        id: "b1e3", title: "ศิลปะ ASCII", difficulty: "medium",
        description: "ใช้ print() วาดบ้านง่ายๆ ด้วยตัวอักษร ให้มีหลังคา (^) ตัวบ้าน (|_|) และประตู",
        starterCode: "# วาดบ้านด้วย print()\n",
        hint: "ลองพิมพ์ทีละบรรทัด เช่น print('  ^  ')",
        solution: 'print("  /\\\\ ")\nprint(" /  \\ ")\nprint("/____\\ ")\nprint("|  [] |")\nprint("|_____|")',
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b2", level: "beginner", order: 2,
    title: "ตัวแปรและชนิดข้อมูล", icon: "📦", duration: "25 นาที",
    description: "เรียนรู้การเก็บข้อมูลในตัวแปรและชนิดข้อมูลพื้นฐาน",
    theory: `
<h2>ตัวแปร (Variables)</h2>
<p>ตัวแปรคือ "กล่อง" สำหรับเก็บข้อมูล เราตั้งชื่อกล่องและใส่ค่าลงไป</p>
<div class="code-example">
<pre><code>name = "สมชาย"      # เก็บข้อความ (String)
age = 15             # เก็บตัวเลขจำนวนเต็ม (Integer)
height = 1.75        # เก็บตัวเลขทศนิยม (Float)
is_student = True    # เก็บค่าจริง/เท็จ (Boolean)

print(name)
print(age)
print(height)
print(is_student)</code></pre>
</div>
<h3>ชนิดข้อมูลพื้นฐาน 4 ชนิด</h3>
<div class="type-grid">
  <div class="type-card str"><span>str</span><p>ข้อความ<br><code>"Hello"</code></p></div>
  <div class="type-card int"><span>int</span><p>จำนวนเต็ม<br><code>42</code></p></div>
  <div class="type-card float"><span>float</span><p>ทศนิยม<br><code>3.14</code></p></div>
  <div class="type-card bool"><span>bool</span><p>จริง/เท็จ<br><code>True</code></p></div>
</div>
<h3>ตรวจสอบชนิดข้อมูลด้วย type()</h3>
<div class="code-example">
<pre><code>x = 42
print(type(x))      # &lt;class 'int'&gt;

y = "Python"
print(type(y))      # &lt;class 'str'&gt;

z = 3.14
print(type(z))      # &lt;class 'float'&gt;</code></pre>
</div>
<h3>การแปลงชนิดข้อมูล (Type Conversion)</h3>
<div class="code-example">
<pre><code>num_str = "42"
num_int = int(num_str)   # แปลง string เป็น int
print(num_int + 8)       # 50

pi = 3.14
print(int(pi))           # 3 (ตัดทศนิยม)
print(str(42))           # "42"</code></pre>
</div>
<div class="warning-box">
  <span>⚠️</span>
  <div><strong>กฎการตั้งชื่อตัวแปร:</strong> ใช้ตัวอักษร a-z, A-Z, ตัวเลข 0-9, และ _ ได้ แต่ห้ามขึ้นต้นด้วยตัวเลข และห้ามใช้คำสงวน เช่น <code>if, for, while</code></div>
</div>`,
    exercises: [
      {
        id: "b2e1", title: "สร้างโปรไฟล์", difficulty: "easy",
        description: "สร้างตัวแปร name (ชื่อ), age (อายุ), gpa (เกรดเฉลี่ย) แล้วแสดงผลทั้งหมด",
        starterCode: "# สร้างตัวแปรและแสดงผล\nname = \nage = \ngpa = \n\nprint(name)\nprint(age)\nprint(gpa)",
        hint: "name ควรเป็น string (ใส่เครื่องหมาย \"\"), age เป็น int, gpa เป็น float",
        solution: 'name = "สมชาย"\nage = 16\ngpa = 3.75\nprint(name)\nprint(age)\nprint(gpa)',
        expectedOutput: ""
      },
      {
        id: "b2e2", title: "การแลกค่าตัวแปร", difficulty: "medium",
        description: "กำหนด a = 10 และ b = 20 แล้วแลกค่ากัน โดยไม่ใช้ตัวแปรช่วย ให้ a = 20 และ b = 10",
        starterCode: "a = 10\nb = 20\nprint(f'ก่อน: a={a}, b={b}')\n\n# แลกค่า a และ b\n\n\nprint(f'หลัง: a={a}, b={b}')",
        hint: "ใน Python สามารถแลกค่าได้ง่ายๆ ด้วย: a, b = b, a",
        solution: "a = 10\nb = 20\nprint(f'ก่อน: a={a}, b={b}')\na, b = b, a\nprint(f'หลัง: a={a}, b={b}')",
        expectedOutput: ""
      },
      {
        id: "b2e3", title: "คำนวณพื้นที่วงกลม", difficulty: "medium",
        description: "รับรัศมีของวงกลม (radius = 7) แล้วคำนวณพื้นที่ (π × r²) โดยใช้ pi = 3.14159 แสดงผลทศนิยม 2 ตำแหน่ง",
        starterCode: "pi = 3.14159\nradius = 7\n\n# คำนวณพื้นที่\narea = \n\nprint(f'พื้นที่ = {area:.2f}')",
        hint: "พื้นที่วงกลม = pi * radius * radius หรือ pi * radius**2",
        solution: "pi = 3.14159\nradius = 7\narea = pi * radius ** 2\nprint(f'พื้นที่ = {area:.2f}')",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b3", level: "beginner", order: 3,
    title: "รับ Input และแสดงผล", icon: "⌨️", duration: "20 นาที",
    description: "เรียนรู้การรับข้อมูลจากผู้ใช้และการจัดรูปแบบการแสดงผล",
    theory: `
<h2>การรับข้อมูล input()</h2>
<p>ฟังก์ชัน <code>input()</code> ใช้รับข้อมูลจากผู้ใช้ ผลลัพธ์จะเป็น <strong>string เสมอ</strong></p>
<div class="code-example">
<pre><code>name = input("กรุณาใส่ชื่อ: ")
print("สวัสดี " + name)</code></pre>
</div>
<div class="info-box">
  <span>🔔</span>
  <div>ใน playground นี้ input() จะแสดง dialog ให้กรอกข้อมูล</div>
</div>
<h3>แปลงชนิดข้อมูลจาก input</h3>
<div class="code-example">
<pre><code>age = int(input("อายุเท่าไร: "))
height = float(input("ส่วนสูงกี่เมตร: "))
print(f"อายุ {age} ปี สูง {height} เมตร")</code></pre>
</div>
<h3>การจัดรูปแบบ f-string (ดีที่สุด!)</h3>
<div class="code-example">
<pre><code>name = "สมชาย"
score = 95.5
grade = "A"

# f-string: ใส่ตัวแปรใน {}
print(f"นักเรียน: {name}")
print(f"คะแนน: {score:.1f}")   # ทศนิยม 1 ตำแหน่ง
print(f"เกรด: {grade}")

# จัดหน้า
print(f"{'ชื่อ':<10} {'คะแนน':>6}")
print(f"{name:<10} {score:>6.1f}")</code></pre>
</div>
<h3>print() แบบต่างๆ</h3>
<div class="code-example">
<pre><code>print("a", "b", "c")           # a b c
print("a", "b", sep="-")       # a-b (คั่นด้วย -)
print("Hello", end="!")        # Hello! (ไม่ขึ้นบรรทัดใหม่)
print("Line1\\nLine2")          # ขึ้นบรรทัดใหม่ด้วย \\n</code></pre>
</div>`,
    exercises: [
      {
        id: "b3e1", title: "เครื่องคำนวณ BMI", difficulty: "medium",
        description: "สร้างโปรแกรมรับน้ำหนัก (kg) และส่วนสูง (m) แล้วคำนวณ BMI = น้ำหนัก / (ส่วนสูง²) แสดงผล 2 ตำแหน่ง",
        starterCode: "weight = float(input('น้ำหนัก (kg): '))\nheight = float(input('ส่วนสูง (m): '))\n\n# คำนวณ BMI\nbmi = \n\nprint(f'BMI ของคุณ = {bmi:.2f}')",
        hint: "BMI = weight / (height ** 2)",
        solution: "weight = float(input('น้ำหนัก (kg): '))\nheight = float(input('ส่วนสูง (m): '))\nbmi = weight / (height ** 2)\nprint(f'BMI ของคุณ = {bmi:.2f}')",
        expectedOutput: ""
      },
      {
        id: "b3e2", title: "คำทักทายส่วนตัว", difficulty: "easy",
        description: "รับชื่อและวิชาโปรดจากผู้ใช้ แล้วพิมพ์ข้อความทักทายที่มีทั้งชื่อและวิชาโปรด",
        starterCode: "name = input('ชื่อของคุณ: ')\nfav_subject = input('วิชาโปรด: ')\n\n# แสดงผลการทักทาย\n",
        hint: "ใช้ f-string เพื่อรวมตัวแปรในข้อความ",
        solution: "name = input('ชื่อของคุณ: ')\nfav_subject = input('วิชาโปรด: ')\nprint(f'สวัสดี {name}! วิชา{fav_subject}เป็นวิชาที่ยอดเยี่ยมมาก!')",
        expectedOutput: ""
      },
      {
        id: "b3e3", title: "ตาราง multiplication", difficulty: "hard",
        description: "รับตัวเลข n จากผู้ใช้ แสดงตาราง n ถึง 10 ในรูปแบบ 'n x 1 = n'",
        starterCode: "n = int(input('ป้อนตัวเลข: '))\n# แสดงสูตรคูณ\nfor i in range(1, 11):\n    print(f'{n} x {i} = ???')",
        hint: "แก้ ??? ให้เป็น n * i",
        solution: "n = int(input('ป้อนตัวเลข: '))\nfor i in range(1, 11):\n    print(f'{n} x {i} = {n * i}')",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b4", level: "beginner", order: 4,
    title: "เงื่อนไข if/elif/else", icon: "🔀", duration: "30 นาที",
    description: "ควบคุมทิศทางการทำงานของโปรแกรมด้วยเงื่อนไข",
    theory: `
<h2>การตัดสินใจด้วย if</h2>
<p>โปรแกรมต้องตัดสินใจตลอดเวลา เราใช้ <code>if</code> เพื่อบอกให้โปรแกรมทำอะไรเมื่อเงื่อนไขเป็นจริง</p>
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
<h3>ตัวดำเนินการเปรียบเทียบ</h3>
<div class="operator-grid">
  <code>==</code> เท่ากับ &nbsp;|&nbsp; <code>!=</code> ไม่เท่ากับ &nbsp;|&nbsp;
  <code>&gt;</code> มากกว่า &nbsp;|&nbsp; <code>&lt;</code> น้อยกว่า &nbsp;|&nbsp;
  <code>&gt;=</code> มากกว่าหรือเท่ากับ &nbsp;|&nbsp; <code>&lt;=</code> น้อยกว่าหรือเท่ากับ
</div>
<h3>ตัวดำเนินการตรรกะ (Logical Operators)</h3>
<div class="code-example">
<pre><code>age = 18
has_id = True

# and: ทั้งคู่ต้องเป็นจริง
if age >= 18 and has_id:
    print("เข้าได้!")

# or: อย่างน้อยหนึ่งอย่างเป็นจริง
if age < 18 or not has_id:
    print("ขออภัย ไม่สามารถเข้าได้")

# not: กลับค่า
if not False:
    print("True!")</code></pre>
</div>
<h3>Nested if (if ซ้อน if)</h3>
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
        description: "รับตัวเลขจากผู้ใช้ แล้วบอกว่าเป็นเลขคู่หรือเลขคี่",
        starterCode: "num = int(input('ป้อนตัวเลข: '))\n\n# ตรวจสอบและแสดงผล\n",
        hint: "เลขคู่คือเลขที่หาร 2 แล้วเหลือเศษ 0 ใช้ % เพื่อหาเศษ",
        solution: "num = int(input('ป้อนตัวเลข: '))\nif num % 2 == 0:\n    print(f'{num} เป็นเลขคู่')\nelse:\n    print(f'{num} เป็นเลขคี่')",
        expectedOutput: ""
      },
      {
        id: "b4e2", title: "ระบบให้เกรด", difficulty: "medium",
        description: "รับคะแนน (0-100) แล้วแสดงเกรด: 80+ = A, 70-79 = B, 60-69 = C, 50-59 = D, ต่ำกว่า 50 = F",
        starterCode: "score = float(input('คะแนน: '))\n\n# ตรวจสอบเกรด\n",
        hint: "ใช้ if/elif/else เรียงจากคะแนนสูงไปต่ำ",
        solution: "score = float(input('คะแนน: '))\nif score >= 80:\n    print('เกรด A')\nelif score >= 70:\n    print('เกรด B')\nelif score >= 60:\n    print('เกรด C')\nelif score >= 50:\n    print('เกรด D')\nelse:\n    print('เกรด F')",
        expectedOutput: ""
      },
      {
        id: "b4e3", title: "ค้นหาค่ามากที่สุด", difficulty: "medium",
        description: "รับตัวเลข 3 ตัว แล้วแสดงค่าที่มากที่สุด โดยไม่ใช้ฟังก์ชัน max()",
        starterCode: "a = float(input('ตัวเลขที่ 1: '))\nb = float(input('ตัวเลขที่ 2: '))\nc = float(input('ตัวเลขที่ 3: '))\n\n# หาค่ามากที่สุด\n",
        hint: "เปรียบเทียบ a, b, c ด้วย if/elif",
        solution: "a = float(input('ตัวเลขที่ 1: '))\nb = float(input('ตัวเลขที่ 2: '))\nc = float(input('ตัวเลขที่ 3: '))\nif a >= b and a >= c:\n    print(f'ค่ามากที่สุดคือ {a}')\nelif b >= a and b >= c:\n    print(f'ค่ามากที่สุดคือ {b}')\nelse:\n    print(f'ค่ามากที่สุดคือ {c}')",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b5", level: "beginner", order: 5,
    title: "ลูป for", icon: "🔄", duration: "30 นาที",
    description: "ทำซ้ำงานอัตโนมัติด้วยลูป for",
    theory: `
<h2>ลูป for — ทำซ้ำอัตโนมัติ</h2>
<p>เมื่อต้องทำงานซ้ำๆ หลายครั้ง ลูป <code>for</code> ช่วยได้!</p>
<div class="code-example">
<pre><code># นับ 1 ถึง 5
for i in range(1, 6):
    print(f"ครั้งที่ {i}")
</code></pre>
<div class="code-output">ครั้งที่ 1<br>ครั้งที่ 2<br>ครั้งที่ 3<br>ครั้งที่ 4<br>ครั้งที่ 5</div>
</div>
<h3>range() — สร้างลำดับตัวเลข</h3>
<div class="code-example">
<pre><code>range(5)        # 0, 1, 2, 3, 4
range(1, 6)     # 1, 2, 3, 4, 5
range(0, 10, 2) # 0, 2, 4, 6, 8  (step=2)
range(10, 0, -1)# 10, 9, 8, ... 1 (นับถอยหลัง)</code></pre>
</div>
<h3>วนลูปผ่าน List</h3>
<div class="code-example">
<pre><code>fruits = ["🍎 แอปเปิ้ล", "🍌 กล้วย", "🍊 ส้ม"]

for fruit in fruits:
    print(fruit)

# ได้ทั้ง index และค่า
for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")</code></pre>
</div>
<h3>break และ continue</h3>
<div class="code-example">
<pre><code># break: หยุดลูป
for i in range(1, 10):
    if i == 5:
        break       # หยุดเมื่อ i = 5
    print(i)        # พิมพ์ 1, 2, 3, 4

# continue: ข้ามรอบนี้
for i in range(1, 6):
    if i == 3:
        continue    # ข้าม i = 3
    print(i)        # พิมพ์ 1, 2, 4, 5</code></pre>
</div>`,
    exercises: [
      {
        id: "b5e1", title: "ผลรวม 1 ถึง n", difficulty: "easy",
        description: "รับตัวเลข n จากผู้ใช้ คำนวณและแสดงผลรวมของ 1 + 2 + ... + n",
        starterCode: "n = int(input('ป้อน n: '))\ntotal = 0\n\nfor i in range(1, n+1):\n    # บวกเพิ่ม\n    \nprint(f'ผลรวม 1 ถึง {n} = {total}')",
        hint: "บวก i เข้า total ในแต่ละรอบ: total = total + i หรือ total += i",
        solution: "n = int(input('ป้อน n: '))\ntotal = 0\nfor i in range(1, n+1):\n    total += i\nprint(f'ผลรวม 1 ถึง {n} = {total}')",
        expectedOutput: ""
      },
      {
        id: "b5e2", title: "แสดงตารางสูตรคูณ", difficulty: "medium",
        description: "แสดงตารางสูตรคูณ แม่ 2 ถึง แม่ 5 แต่ละแม่ตั้งแต่ 1-10",
        starterCode: "for table in range(2, 6):\n    print(f'\\n=== สูตรคูณแม่ {table} ===')\n    for i in range(1, 11):\n        # แสดงผล\n        pass",
        hint: "print(f'{table} x {i} = {table * i}')",
        solution: "for table in range(2, 6):\n    print(f'\\n=== สูตรคูณแม่ {table} ===')\n    for i in range(1, 11):\n        print(f'{table} x {i} = {table * i}')",
        expectedOutput: ""
      },
      {
        id: "b5e3", title: "ลูปสร้างพีระมิด", difficulty: "hard",
        description: "รับตัวเลข n แล้วพิมพ์พีระมิดดาว n ชั้น เช่น n=4 → ชั้น1มี1ดาว ชั้น2มี2ดาว ... ชั้น4มี4ดาว",
        starterCode: "n = int(input('จำนวนชั้น: '))\nfor i in range(1, n+1):\n    # พิมพ์ดาว i ดวงในแต่ละชั้น\n    pass",
        hint: "ใช้ '*' * i เพื่อทำซ้ำตัวอักษร",
        solution: "n = int(input('จำนวนชั้น: '))\nfor i in range(1, n+1):\n    print('*' * i)",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b6", level: "beginner", order: 6,
    title: "ลูป while", icon: "⚡", duration: "25 นาที",
    description: "ทำซ้ำตราบเท่าที่เงื่อนไขยังเป็นจริง",
    theory: `
<h2>ลูป while</h2>
<p>ลูป <code>while</code> จะทำซ้ำตราบเท่าที่เงื่อนไขยังเป็น <strong>True</strong></p>
<div class="code-example">
<pre><code>count = 1
while count <= 5:
    print(f"นับ: {count}")
    count += 1   # อย่าลืมเพิ่มค่า!
print("เสร็จแล้ว!")</code></pre>
<div class="code-output">นับ: 1<br>นับ: 2<br>นับ: 3<br>นับ: 4<br>นับ: 5<br>เสร็จแล้ว!</div>
</div>
<div class="warning-box">
  <span>⚠️</span>
  <div><strong>Infinite Loop!</strong> ถ้าลืมอัปเดตตัวแปรในลูป โปรแกรมจะวนไม่หยุด ระวังด้วยนะ!</div>
</div>
<h3>while กับ break</h3>
<div class="code-example">
<pre><code># เกมทายตัวเลข
secret = 7
while True:
    guess = int(input("ทายตัวเลข 1-10: "))
    if guess == secret:
        print("ถูกต้อง! 🎉")
        break
    elif guess < secret:
        print("น้อยกว่า ลองอีก")
    else:
        print("มากกว่า ลองอีก")</code></pre>
</div>
<h3>for vs while — ใช้เมื่อไหร่?</h3>
<div class="comparison-box">
  <div><strong>for</strong> — รู้จำนวนรอบล่วงหน้า<br>เช่น วน 10 ครั้ง, วนผ่าน list</div>
  <div><strong>while</strong> — ไม่รู้จำนวนรอบ<br>เช่น รอ input ถูก, รอเงื่อนไขเป็น False</div>
</div>`,
    exercises: [
      {
        id: "b6e1", title: "รอรหัสถูก", difficulty: "easy",
        description: "โปรแกรมรอรหัสผ่าน PIN = '1234' วนถามจนกว่าจะถูก แล้วพิมพ์ 'เข้าสู่ระบบสำเร็จ'",
        starterCode: "PIN = '1234'\n\nwhile True:\n    code = input('ใส่รหัส: ')\n    if code == PIN:\n        # สำเร็จ\n        break\n    else:\n        print('รหัสผิด ลองใหม่')",
        hint: "เพิ่ม print สำเร็จหลัง break",
        solution: "PIN = '1234'\nwhile True:\n    code = input('ใส่รหัส: ')\n    if code == PIN:\n        print('เข้าสู่ระบบสำเร็จ! ✓')\n        break\n    else:\n        print('รหัสผิด ลองใหม่')",
        expectedOutput: ""
      },
      {
        id: "b6e2", title: "คำนวณดอกเบี้ย", difficulty: "medium",
        description: "ฝากเงิน 10,000 บาท ดอกเบี้ย 5% ต่อปี วนคำนวณจนกว่าจะมีเงินถึง 15,000 บาท แสดงจำนวนปีที่ใช้",
        starterCode: "balance = 10000\nrate = 0.05\nyears = 0\n\nwhile balance < 15000:\n    balance = balance * (1 + rate)\n    years += 1\n\nprint(f'ใช้เวลา {years} ปี')\nprint(f'เงินสุดท้าย {balance:.2f} บาท')",
        hint: "โค้ดนี้เกือบสมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "balance = 10000\nrate = 0.05\nyears = 0\nwhile balance < 15000:\n    balance = balance * (1 + rate)\n    years += 1\nprint(f'ใช้เวลา {years} ปี')\nprint(f'เงินสุดท้าย {balance:.2f} บาท')",
        expectedOutput: ""
      },
      {
        id: "b6e3", title: "เกมทายตัวเลข", difficulty: "hard",
        description: "สร้างเกมทายตัวเลข 1-100 ให้คำใบ้ 'สูงเกิน'/'ต่ำเกิน' นับจำนวนครั้งที่เล่น แสดงเมื่อถูก",
        starterCode: "import random\nsecret = random.randint(1, 100)\nattempts = 0\n\nprint('ทายตัวเลข 1-100!')\n\nwhile True:\n    guess = int(input('ทาย: '))\n    attempts += 1\n    \n    if guess == secret:\n        print(f'ถูก! ใช้ {attempts} ครั้ง')\n        break\n    elif guess < secret:\n        print('ต่ำเกิน!')\n    else:\n        print('สูงเกิน!')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ได้เลย!",
        solution: "import random\nsecret = random.randint(1, 100)\nattempts = 0\nprint('ทายตัวเลข 1-100!')\nwhile True:\n    guess = int(input('ทาย: '))\n    attempts += 1\n    if guess == secret:\n        print(f'ถูก! ใช้ {attempts} ครั้ง')\n        break\n    elif guess < secret:\n        print('ต่ำเกิน!')\n    else:\n        print('สูงเกิน!')",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b7", level: "beginner", order: 7,
    title: "Functions", icon: "🔧", duration: "35 นาที",
    description: "บรรจุโค้ดที่ใช้ซ้ำในฟังก์ชัน เพื่อให้โปรแกรมอ่านง่ายและใช้ซ้ำได้",
    theory: `
<h2>Functions คืออะไร?</h2>
<p>ฟังก์ชันคือ "เครื่องมือ" ที่เราสร้างเองได้ เขียนครั้งเดียว เรียกใช้ได้หลายครั้ง</p>
<div class="code-example">
<pre><code>def greet(name):
    """ฟังก์ชันทักทาย"""
    message = f"สวัสดี {name}! 👋"
    return message

# เรียกใช้ฟังก์ชัน
result = greet("สมชาย")
print(result)          # สวัสดี สมชาย! 👋
print(greet("มาลี")) # สวัสดี มาลี! 👋</code></pre>
</div>
<h3>Parameters และ Arguments</h3>
<div class="code-example">
<pre><code>def add(a, b):          # a, b คือ parameters
    return a + b

print(add(3, 4))        # 3, 4 คือ arguments → 7
print(add(10, 20))      # 30

# Default Parameters
def power(base, exp=2):  # exp มีค่า default = 2
    return base ** exp

print(power(3))     # 3² = 9
print(power(3, 3))  # 3³ = 27</code></pre>
</div>
<h3>Multiple Return Values</h3>
<div class="code-example">
<pre><code>def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([5, 3, 8, 1, 9])
print(f"ต่ำสุด: {low}, สูงสุด: {high}")</code></pre>
</div>
<h3>Variable Scope</h3>
<div class="code-example">
<pre><code>x = 10  # Global variable

def my_func():
    y = 20  # Local variable (อยู่แค่ในฟังก์ชัน)
    print(x)  # เข้าถึง global ได้
    print(y)

my_func()
# print(y)  # Error! y ไม่มีนอกฟังก์ชัน</code></pre>
</div>`,
    exercises: [
      {
        id: "b7e1", title: "ฟังก์ชันคำนวณเกรด", difficulty: "easy",
        description: "สร้างฟังก์ชัน get_grade(score) ที่รับคะแนนแล้ว return เกรด A/B/C/D/F ทดสอบด้วยคะแนน 95, 75, 55, 45",
        starterCode: "def get_grade(score):\n    # เขียน logic ของคุณ\n    pass\n\n# ทดสอบ\nprint(get_grade(95))  # A\nprint(get_grade(75))  # B\nprint(get_grade(55))  # D\nprint(get_grade(45))  # F",
        hint: "ใช้ if/elif/else แล้ว return เกรด",
        solution: "def get_grade(score):\n    if score >= 80:\n        return 'A'\n    elif score >= 70:\n        return 'B'\n    elif score >= 60:\n        return 'C'\n    elif score >= 50:\n        return 'D'\n    else:\n        return 'F'\nprint(get_grade(95))\nprint(get_grade(75))\nprint(get_grade(55))\nprint(get_grade(45))",
        expectedOutput: ""
      },
      {
        id: "b7e2", title: "เครื่องคิดเลข", difficulty: "medium",
        description: "สร้างฟังก์ชัน calculate(a, op, b) ที่รับตัวเลข 2 ตัวและตัวดำเนินการ (+,-,*,/) แล้ว return ผลลัพธ์",
        starterCode: "def calculate(a, op, b):\n    if op == '+':\n        return a + b\n    # เพิ่ม -, *, /\n    \n\nprint(calculate(10, '+', 5))  # 15\nprint(calculate(10, '-', 3))  # 7\nprint(calculate(4, '*', 6))   # 24\nprint(calculate(15, '/', 3))  # 5.0",
        hint: "เพิ่ม elif สำหรับ '-', '*', '/' และระวัง division by zero",
        solution: "def calculate(a, op, b):\n    if op == '+':\n        return a + b\n    elif op == '-':\n        return a - b\n    elif op == '*':\n        return a * b\n    elif op == '/':\n        if b != 0:\n            return a / b\n        else:\n            return 'หารด้วยศูนย์ไม่ได้!'\nprint(calculate(10, '+', 5))\nprint(calculate(10, '-', 3))\nprint(calculate(4, '*', 6))\nprint(calculate(15, '/', 3))",
        expectedOutput: ""
      },
      {
        id: "b7e3", title: "ฟังก์ชัน Fibonacci", difficulty: "hard",
        description: "สร้างฟังก์ชัน fibonacci(n) ที่ return ลำดับ Fibonacci n ตัวแรก เช่น fibonacci(8) → [0,1,1,2,3,5,8,13]",
        starterCode: "def fibonacci(n):\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    \n    sequence = [0, 1]\n    while len(sequence) < n:\n        # คำนวณตัวถัดไป\n        next_num = ???\n        sequence.append(next_num)\n    return sequence\n\nprint(fibonacci(8))\nprint(fibonacci(10))",
        hint: "ตัวถัดไปของ Fibonacci = ผลรวมสองตัวก่อนหน้า sequence[-1] + sequence[-2]",
        solution: "def fibonacci(n):\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    sequence = [0, 1]\n    while len(sequence) < n:\n        next_num = sequence[-1] + sequence[-2]\n        sequence.append(next_num)\n    return sequence\nprint(fibonacci(8))\nprint(fibonacci(10))",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b8", level: "beginner", order: 8,
    title: "Lists และ Tuples", icon: "📋", duration: "30 นาที",
    description: "เรียนรู้การเก็บข้อมูลหลายค่าในคอลเลคชัน",
    theory: `
<h2>List — รายการที่แก้ไขได้</h2>
<div class="code-example">
<pre><code>fruits = ["แอปเปิ้ล", "กล้วย", "ส้ม", "มะม่วง"]

# เข้าถึงด้วย index (เริ่มจาก 0)
print(fruits[0])    # แอปเปิ้ล
print(fruits[-1])   # มะม่วง (นับจากหลัง)

# Slicing
print(fruits[1:3])  # ['กล้วย', 'ส้ม']
print(fruits[:2])   # ['แอปเปิ้ล', 'กล้วย']</code></pre>
</div>
<h3>การแก้ไข List</h3>
<div class="code-example">
<pre><code>nums = [3, 1, 4, 1, 5]

nums.append(9)      # เพิ่มท้าย: [3,1,4,1,5,9]
nums.insert(0, 10)  # แทรกตำแหน่ง 0: [10,3,1,4,1,5,9]
nums.remove(1)      # ลบค่า 1 (ตัวแรก): [10,3,4,1,5,9]
nums.sort()         # เรียงลำดับ: [1,3,4,5,9,10]
nums.reverse()      # กลับลำดับ: [10,9,5,4,3,1]

print(len(nums))    # จำนวนสมาชิก: 6
print(sum(nums))    # ผลรวม
print(1 in nums)    # True/False</code></pre>
</div>
<h3>Tuple — รายการที่แก้ไขไม่ได้</h3>
<div class="code-example">
<pre><code>point = (10, 20)         # Tuple ใช้ ()
x, y = point             # Unpacking
print(f"x={x}, y={y}")  # x=10, y=20

colors = ("แดง", "เขียว", "น้ำเงิน")
print(colors[0])         # แดง
# colors[0] = "เหลือง"  # Error! แก้ไขไม่ได้!</code></pre>
</div>
<h3>List Comprehension</h3>
<div class="code-example">
<pre><code># แบบธรรมดา
squares = []
for i in range(1, 6):
    squares.append(i**2)

# แบบ List Comprehension (สั้นกว่า!)
squares = [i**2 for i in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# มีเงื่อนไข
evens = [i for i in range(1, 11) if i % 2 == 0]
print(evens)    # [2, 4, 6, 8, 10]</code></pre>
</div>`,
    exercises: [
      {
        id: "b8e1", title: "สถิติคะแนน", difficulty: "easy",
        description: "กำหนด scores = [85, 92, 78, 65, 90, 88, 72] แสดงคะแนนสูงสุด ต่ำสุด ค่าเฉลี่ย และเรียงจากน้อยไปมาก",
        starterCode: "scores = [85, 92, 78, 65, 90, 88, 72]\n\nprint(f'สูงสุด: {max(scores)}')\nprint(f'ต่ำสุด: ???')\nprint(f'เฉลี่ย: {sum(scores)/len(scores):.1f}')\n\nscores.sort()\nprint(f'เรียงแล้ว: {scores}')",
        hint: "ใช้ min() สำหรับค่าต่ำสุด",
        solution: "scores = [85, 92, 78, 65, 90, 88, 72]\nprint(f'สูงสุด: {max(scores)}')\nprint(f'ต่ำสุด: {min(scores)}')\nprint(f'เฉลี่ย: {sum(scores)/len(scores):.1f}')\nscores.sort()\nprint(f'เรียงแล้ว: {scores}')",
        expectedOutput: ""
      },
      {
        id: "b8e2", title: "กรองตัวเลข", difficulty: "medium",
        description: "จาก numbers = [1..20] ใช้ List Comprehension สร้าง 2 list: เลขคู่ทั้งหมด, เลขที่หารด้วย 3 ลงตัว",
        starterCode: "numbers = list(range(1, 21))\n\n# List Comprehension\nevens = [n for n in numbers if ???]\ndiv3 = [n for n in numbers if ???]\n\nprint('เลขคู่:', evens)\nprint('หารด้วย 3:', div3)",
        hint: "เลขคู่: n % 2 == 0, หารด้วย 3: n % 3 == 0",
        solution: "numbers = list(range(1, 21))\nevens = [n for n in numbers if n % 2 == 0]\ndiv3 = [n for n in numbers if n % 3 == 0]\nprint('เลขคู่:', evens)\nprint('หารด้วย 3:', div3)",
        expectedOutput: ""
      },
      {
        id: "b8e3", title: "หมุน List", difficulty: "hard",
        description: "สร้างฟังก์ชัน rotate(lst, k) ที่หมุน list ไปทางขวา k ตำแหน่ง เช่น [1,2,3,4,5], k=2 → [4,5,1,2,3]",
        starterCode: "def rotate(lst, k):\n    # หมุน list ไปทางขวา k ตำแหน่ง\n    n = len(lst)\n    k = k % n  # กัน k ที่มากกว่า len\n    return lst[???:] + lst[:???]\n\nprint(rotate([1,2,3,4,5], 2))  # [4,5,1,2,3]\nprint(rotate([1,2,3,4,5], 1))  # [5,1,2,3,4]",
        hint: "หมุนขวา k = ตัดจากข้างหลัง k ตัว มาต่อข้างหน้า lst[-k:] + lst[:-k]",
        solution: "def rotate(lst, k):\n    n = len(lst)\n    k = k % n\n    return lst[-k:] + lst[:-k]\nprint(rotate([1,2,3,4,5], 2))\nprint(rotate([1,2,3,4,5], 1))",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b9", level: "beginner", order: 9,
    title: "Dictionaries", icon: "📖", duration: "30 นาที",
    description: "เก็บข้อมูลแบบ key-value ที่ทรงพลังและใช้งานบ่อยมาก",
    theory: `
<h2>Dictionary — เก็บข้อมูลแบบ Key-Value</h2>
<div class="code-example">
<pre><code>student = {
    "name": "สมชาย",
    "age": 16,
    "grade": "A",
    "subjects": ["คณิต", "วิทย์", "Python"]
}

print(student["name"])      # สมชาย
print(student.get("age"))   # 16 (ปลอดภัยกว่า [])
print(student["subjects"])  # ['คณิต', 'วิทย์', 'Python']</code></pre>
</div>
<h3>การแก้ไข Dictionary</h3>
<div class="code-example">
<pre><code>info = {"a": 1, "b": 2}

info["c"] = 3          # เพิ่ม key ใหม่
info["a"] = 100        # แก้ไขค่า
del info["b"]          # ลบ key

print(info)            # {'a': 100, 'c': 3}
print(info.keys())     # dict_keys(['a', 'c'])
print(info.values())   # dict_values([100, 3])
print(info.items())    # dict_items([('a',100), ('c',3)])</code></pre>
</div>
<h3>วน loop ผ่าน Dictionary</h3>
<div class="code-example">
<pre><code>scores = {"คณิต": 95, "วิทย์": 88, "ภาษาไทย": 92}

for subject, score in scores.items():
    print(f"{subject}: {score} คะแนน")</code></pre>
</div>`,
    exercises: [
      {
        id: "b9e1", title: "ระบบเมนูอาหาร", difficulty: "easy",
        description: "สร้าง dict เมนูอาหาร 5 รายการพร้อมราคา แสดงรายการและคำนวณราคาเฉลี่ย",
        starterCode: "menu = {\n    'ข้าวผัด': 50,\n    'ผัดไทย': 60,\n    # เพิ่มอีก 3 รายการ\n}\n\nprint('=== เมนูอาหาร ===')\nfor item, price in menu.items():\n    print(f'{item}: {price} บาท')\n\navg = sum(menu.values()) / len(menu)\nprint(f'ราคาเฉลี่ย: {avg:.0f} บาท')",
        hint: "เพิ่มรายการใน dict และใช้ sum(menu.values()) สำหรับผลรวม",
        solution: "menu = {'ข้าวผัด': 50,'ผัดไทย': 60,'ต้มยำ': 80,'ราดหน้า': 55,'ส้มตำ': 45}\nprint('=== เมนูอาหาร ===')\nfor item, price in menu.items():\n    print(f'{item}: {price} บาท')\navg = sum(menu.values()) / len(menu)\nprint(f'ราคาเฉลี่ย: {avg:.0f} บาท')",
        expectedOutput: ""
      },
      {
        id: "b9e2", title: "นับความถี่คำ", difficulty: "medium",
        description: "นับความถี่ของแต่ละคำในประโยค 'the cat sat on the mat the cat' แสดงคำและจำนวนครั้ง",
        starterCode: "sentence = 'the cat sat on the mat the cat'\nwords = sentence.split()\nfrequency = {}\n\nfor word in words:\n    # นับความถี่\n    if word in frequency:\n        frequency[word] += 1\n    else:\n        frequency[word] = ???\n\nfor word, count in frequency.items():\n    print(f'{word}: {count} ครั้ง')",
        hint: "ตั้งต้นที่ 1 เมื่อพบคำใหม่: frequency[word] = 1",
        solution: "sentence = 'the cat sat on the mat the cat'\nwords = sentence.split()\nfrequency = {}\nfor word in words:\n    if word in frequency:\n        frequency[word] += 1\n    else:\n        frequency[word] = 1\nfor word, count in frequency.items():\n    print(f'{word}: {count} ครั้ง')",
        expectedOutput: ""
      },
      {
        id: "b9e3", title: "ระบบสต็อกสินค้า", difficulty: "hard",
        description: "สร้างฟังก์ชัน add_stock(inventory, item, qty) และ remove_stock(inventory, item, qty) จัดการสต็อกสินค้า แสดงสต็อกหลังแก้ไข",
        starterCode: "inventory = {'ดินสอ': 50, 'ปากกา': 30, 'ยางลบ': 20}\n\ndef add_stock(inv, item, qty):\n    if item in inv:\n        inv[item] += qty\n    else:\n        inv[item] = qty\n\ndef remove_stock(inv, item, qty):\n    if item in inv and inv[item] >= qty:\n        inv[item] -= qty\n        return True\n    return False\n\nadd_stock(inventory, 'ไม้บรรทัด', 15)\nremove_stock(inventory, 'ดินสอ', 10)\n\nfor item, qty in inventory.items():\n    print(f'{item}: {qty} ชิ้น')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "inventory = {'ดินสอ': 50, 'ปากกา': 30, 'ยางลบ': 20}\ndef add_stock(inv, item, qty):\n    if item in inv:\n        inv[item] += qty\n    else:\n        inv[item] = qty\ndef remove_stock(inv, item, qty):\n    if item in inv and inv[item] >= qty:\n        inv[item] -= qty\n        return True\n    return False\nadd_stock(inventory, 'ไม้บรรทัด', 15)\nremove_stock(inventory, 'ดินสอ', 10)\nfor item, qty in inventory.items():\n    print(f'{item}: {qty} ชิ้น')",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "b10", level: "beginner", order: 10,
    title: "String Methods", icon: "✍️", duration: "25 นาที",
    description: "จัดการข้อความด้วย String Methods ที่มีประสิทธิภาพ",
    theory: `
<h2>String Methods ที่สำคัญ</h2>
<div class="code-example">
<pre><code>text = "  Hello, Python World!  "

print(text.upper())       # "  HELLO, PYTHON WORLD!  "
print(text.lower())       # "  hello, python world!  "
print(text.strip())       # "Hello, Python World!"
print(text.strip().title()) # "Hello, Python World!"

print(text.replace("Python", "Amazing"))
print(text.find("Python"))    # ตำแหน่งที่พบ
print("Python" in text)       # True</code></pre>
</div>
<h3>Split และ Join</h3>
<div class="code-example">
<pre><code>sentence = "Python,Java,C++,JavaScript"
languages = sentence.split(",")
print(languages)  # ['Python', 'Java', 'C++', 'JavaScript']

joined = " | ".join(languages)
print(joined)     # Python | Java | C++ | JavaScript</code></pre>
</div>`,
    exercises: [
      {
        id: "b10e1", title: "ตรวจสอบ Palindrome", difficulty: "medium",
        description: "เขียนฟังก์ชัน is_palindrome(text) ตรวจสอบว่าคำนั้นอ่านกลับหน้าหลังได้หรือไม่ (ไม่สนใจตัวพิมพ์ใหญ่-เล็ก)",
        starterCode: "def is_palindrome(text):\n    cleaned = text.lower().replace(' ', '')\n    return cleaned == ???\n\nprint(is_palindrome('racecar'))  # True\nprint(is_palindrome('hello'))    # False\nprint(is_palindrome('A man a plan a canal Panama'))  # True",
        hint: "ใช้ cleaned[::-1] เพื่อกลับสตริง",
        solution: "def is_palindrome(text):\n    cleaned = text.lower().replace(' ', '')\n    return cleaned == cleaned[::-1]\nprint(is_palindrome('racecar'))\nprint(is_palindrome('hello'))\nprint(is_palindrome('A man a plan a canal Panama'))",
        expectedOutput: ""
      },
      {
        id: "b10e2", title: "นับสระและพยัญชนะ", difficulty: "medium",
        description: "รับ string แล้วนับจำนวนสระ (a,e,i,o,u) และพยัญชนะ แสดงผลทั้งคู่",
        starterCode: "def count_vowels_consonants(text):\n    text = text.lower()\n    vowels = 'aeiou'\n    v_count = 0\n    c_count = 0\n    for ch in text:\n        if ch.isalpha():\n            if ch in vowels:\n                v_count += 1\n            else:\n                c_count += 1\n    return v_count, c_count\n\nv, c = count_vowels_consonants('Hello World')\nprint(f'สระ: {v}, พยัญชนะ: {c}')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "def count_vowels_consonants(text):\n    text = text.lower()\n    vowels = 'aeiou'\n    v_count = 0\n    c_count = 0\n    for ch in text:\n        if ch.isalpha():\n            if ch in vowels:\n                v_count += 1\n            else:\n                c_count += 1\n    return v_count, c_count\nv, c = count_vowels_consonants('Hello World')\nprint(f'สระ: {v}, พยัญชนะ: {c}')",
        expectedOutput: ""
      },
      {
        id: "b10e3", title: "เข้ารหัสข้อความ Caesar Cipher", difficulty: "hard",
        description: "เขียนฟังก์ชัน caesar_encrypt(text, shift) เข้ารหัสข้อความโดยเลื่อนตัวอักษรไป shift ตำแหน่ง เช่น 'abc', shift=3 → 'def'",
        starterCode: "def caesar_encrypt(text, shift):\n    result = ''\n    for char in text:\n        if char.isalpha():\n            base = ord('A') if char.isupper() else ord('a')\n            encrypted = chr((ord(char) - base + shift) % 26 + base)\n            result += encrypted\n        else:\n            result += char\n    return result\n\nprint(caesar_encrypt('Hello World', 3))  # Khoor Zruog\nprint(caesar_encrypt('Python', 13))      # ROT13",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "def caesar_encrypt(text, shift):\n    result = ''\n    for char in text:\n        if char.isalpha():\n            base = ord('A') if char.isupper() else ord('a')\n            encrypted = chr((ord(char) - base + shift) % 26 + base)\n            result += encrypted\n        else:\n            result += char\n    return result\nprint(caesar_encrypt('Hello World', 3))\nprint(caesar_encrypt('Python', 13))",
        expectedOutput: ""
      }
    ]
  },

  // ============================================================
  // INTERMEDIATE LEVEL
  // ============================================================
  {
    id: "i1", level: "intermediate", order: 1,
    title: "Error Handling", icon: "🛡️", duration: "30 นาที",
    description: "จัดการข้อผิดพลาดอย่างมืออาชีพด้วย try/except",
    theory: `
<h2>Error Handling — จัดการข้อผิดพลาด</h2>
<p>โปรแกรมมีโอกาสเกิด error ตลอดเวลา การใช้ try/except ทำให้โปรแกรมไม่ crash</p>
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
    print(f"เกิดข้อผิดพลาด: {e}")
finally:
    print("จบการทำงาน")</code></pre>
</div>
<h3>Raise Exception เอง</h3>
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
        description: "สร้างเครื่องคิดเลขที่รับ input ได้อย่างปลอดภัย จัดการ ValueError และ ZeroDivisionError",
        starterCode: "def safe_calculate():\n    try:\n        a = float(input('ตัวเลขแรก: '))\n        op = input('ตัวดำเนินการ (+,-,*,/): ')\n        b = float(input('ตัวเลขที่สอง: '))\n        \n        if op == '+':\n            return a + b\n        elif op == '-':\n            return a - b\n        elif op == '*':\n            return a * b\n        elif op == '/':\n            return a / b  # จะเกิด ZeroDivisionError ถ้า b=0\n    except ValueError:\n        return 'กรุณาใส่ตัวเลขที่ถูกต้อง'\n    except ZeroDivisionError:\n        return 'หารด้วยศูนย์ไม่ได้!'\n\nresult = safe_calculate()\nprint(f'ผลลัพธ์: {result}')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "def safe_calculate():\n    try:\n        a = float(input('ตัวเลขแรก: '))\n        op = input('ตัวดำเนินการ (+,-,*,/): ')\n        b = float(input('ตัวเลขที่สอง: '))\n        if op == '+':\n            return a + b\n        elif op == '-':\n            return a - b\n        elif op == '*':\n            return a * b\n        elif op == '/':\n            return a / b\n    except ValueError:\n        return 'กรุณาใส่ตัวเลขที่ถูกต้อง'\n    except ZeroDivisionError:\n        return 'หารด้วยศูนย์ไม่ได้!'\nresult = safe_calculate()\nprint(f'ผลลัพธ์: {result}')",
        expectedOutput: ""
      },
      {
        id: "i1e2", title: "Custom Exception", difficulty: "hard",
        description: "สร้าง Custom Exception ชื่อ InsufficientFundsError แล้วใช้กับฟังก์ชัน withdraw(balance, amount)",
        starterCode: "class InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        super().__init__(f'ยอดเงินไม่พอ: มี {balance} บาท แต่ถอน {amount} บาท')\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFundsError(balance, amount)\n    return balance - amount\n\ntry:\n    new_balance = withdraw(500, 1000)\nexcept InsufficientFundsError as e:\n    print(f'Error: {e}')\n\nnew_balance = withdraw(1000, 300)\nprint(f'ยอดคงเหลือ: {new_balance} บาท')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "class InsufficientFundsError(Exception):\n    def __init__(self, balance, amount):\n        super().__init__(f'ยอดเงินไม่พอ: มี {balance} บาท แต่ถอน {amount} บาท')\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFundsError(balance, amount)\n    return balance - amount\ntry:\n    new_balance = withdraw(500, 1000)\nexcept InsufficientFundsError as e:\n    print(f'Error: {e}')\nnew_balance = withdraw(1000, 300)\nprint(f'ยอดคงเหลือ: {new_balance} บาท')",
        expectedOutput: ""
      },
      {
        id: "i1e3", title: "อ่านไฟล์ปลอดภัย", difficulty: "hard",
        description: "จำลองการอ่านข้อมูลจาก dict (แทนไฟล์) ด้วย try/except/finally บันทึก log ทุกครั้งที่อ่าน",
        starterCode: "database = {'user1': 'สมชาย', 'user2': 'มาลี'}\n\ndef get_user(user_id):\n    try:\n        data = database[user_id]\n        print(f'Log: อ่านข้อมูล {user_id} สำเร็จ')\n        return data\n    except KeyError:\n        print(f'Log: ไม่พบ {user_id}')\n        return None\n    finally:\n        print('Log: จบการค้นหา')\n\nprint(get_user('user1'))\nprint('---')\nprint(get_user('user99'))",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "database = {'user1': 'สมชาย', 'user2': 'มาลี'}\ndef get_user(user_id):\n    try:\n        data = database[user_id]\n        print(f'Log: อ่านข้อมูล {user_id} สำเร็จ')\n        return data\n    except KeyError:\n        print(f'Log: ไม่พบ {user_id}')\n        return None\n    finally:\n        print('Log: จบการค้นหา')\nprint(get_user('user1'))\nprint('---')\nprint(get_user('user99'))",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "i2", level: "intermediate", order: 2,
    title: "OOP — Class และ Object", icon: "🏛️", duration: "45 นาที",
    description: "เรียนรู้การเขียนโปรแกรมเชิงวัตถุ สร้าง Class และ Object",
    theory: `
<h2>Object-Oriented Programming (OOP)</h2>
<p>OOP คือแนวคิดการเขียนโปรแกรมที่จัดระเบียบโค้ดเป็น "วัตถุ" แต่ละชิ้น</p>
<div class="code-example">
<pre><code>class Student:
    school = "โรงเรียน Python"  # Class attribute
    
    def __init__(self, name, age, grade):
        # Instance attributes
        self.name = name
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

# สร้าง Object
s1 = Student("สมชาย", 16, "ม.4")
s1.add_score(90)
s1.add_score(85)
print(s1)
print(f"เฉลี่ย: {s1.get_average()}")</code></pre>
</div>`,
    exercises: [
      {
        id: "i2e1", title: "Class BankAccount", difficulty: "medium",
        description: "สร้าง class BankAccount ที่มี deposit(), withdraw(), get_balance() และแสดง history การทำรายการ",
        starterCode: "class BankAccount:\n    def __init__(self, owner, initial_balance=0):\n        self.owner = owner\n        self.balance = initial_balance\n        self.history = []\n    \n    def deposit(self, amount):\n        self.balance += amount\n        self.history.append(f'ฝาก +{amount}')\n    \n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n            self.history.append(f'ถอน -{amount}')\n        else:\n            print('ยอดเงินไม่พอ!')\n    \n    def get_balance(self):\n        return self.balance\n    \n    def show_history(self):\n        print(f'=== ประวัติ {self.owner} ===')\n        for h in self.history:\n            print(h)\n        print(f'ยอดคงเหลือ: {self.balance}')\n\nacc = BankAccount('สมชาย', 1000)\nacc.deposit(500)\nacc.withdraw(200)\nacc.withdraw(2000)\nacc.show_history()",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "class BankAccount:\n    def __init__(self, owner, initial_balance=0):\n        self.owner = owner\n        self.balance = initial_balance\n        self.history = []\n    def deposit(self, amount):\n        self.balance += amount\n        self.history.append(f'ฝาก +{amount}')\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n            self.history.append(f'ถอน -{amount}')\n        else:\n            print('ยอดเงินไม่พอ!')\n    def get_balance(self):\n        return self.balance\n    def show_history(self):\n        print(f'=== ประวัติ {self.owner} ===')\n        for h in self.history:\n            print(h)\n        print(f'ยอดคงเหลือ: {self.balance}')\nacc = BankAccount('สมชาย', 1000)\nacc.deposit(500)\nacc.withdraw(200)\nacc.withdraw(2000)\nacc.show_history()",
        expectedOutput: ""
      },
      {
        id: "i2e2", title: "Class Rectangle", difficulty: "medium",
        description: "สร้าง class Rectangle ที่คำนวณพื้นที่ เส้นรอบรูป และเปรียบเทียบสองรูปสี่เหลี่ยม",
        starterCode: "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n    \n    def perimeter(self):\n        return 2 * (self.width + self.height)\n    \n    def is_square(self):\n        return self.width == self.height\n    \n    def __str__(self):\n        return f'Rectangle({self.width}x{self.height})'\n\nr1 = Rectangle(5, 3)\nr2 = Rectangle(4, 4)\n\nprint(r1)\nprint(f'พื้นที่: {r1.area()}')\nprint(f'เส้นรอบรูป: {r1.perimeter()}')\nprint(f'เป็นสี่เหลี่ยมจัตุรัส: {r2.is_square()}')\nprint(f'พื้นที่ใหญ่กว่า: {r1 if r1.area() > r2.area() else r2}')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    def area(self):\n        return self.width * self.height\n    def perimeter(self):\n        return 2 * (self.width + self.height)\n    def is_square(self):\n        return self.width == self.height\n    def __str__(self):\n        return f'Rectangle({self.width}x{self.height})'\nr1 = Rectangle(5, 3)\nr2 = Rectangle(4, 4)\nprint(r1)\nprint(f'พื้นที่: {r1.area()}')\nprint(f'เส้นรอบรูป: {r1.perimeter()}')\nprint(f'เป็นสี่เหลี่ยมจัตุรัส: {r2.is_square()}')\nprint(f'พื้นที่ใหญ่กว่า: {r1 if r1.area() > r2.area() else r2}')",
        expectedOutput: ""
      },
      {
        id: "i2e3", title: "ระบบจัดการห้องสมุด", difficulty: "hard",
        description: "สร้าง class Book และ Library ที่มีเมธอด add_book(), borrow(), return_book(), search()",
        starterCode: "class Book:\n    def __init__(self, title, author, isbn):\n        self.title = title\n        self.author = author\n        self.isbn = isbn\n        self.available = True\n    \n    def __str__(self):\n        status = '✓ พร้อมยืม' if self.available else '✗ ถูกยืมแล้ว'\n        return f'{self.title} โดย {self.author} [{status}]'\n\nclass Library:\n    def __init__(self, name):\n        self.name = name\n        self.books = []\n    \n    def add_book(self, book):\n        self.books.append(book)\n    \n    def borrow(self, isbn):\n        for book in self.books:\n            if book.isbn == isbn and book.available:\n                book.available = False\n                return f'ยืม \"{book.title}\" สำเร็จ'\n        return 'ไม่พบหนังสือหรือถูกยืมแล้ว'\n    \n    def return_book(self, isbn):\n        for book in self.books:\n            if book.isbn == isbn:\n                book.available = True\n                return f'คืน \"{book.title}\" สำเร็จ'\n        return 'ไม่พบหนังสือ'\n    \n    def show_all(self):\n        print(f'=== {self.name} ===')\n        for book in self.books:\n            print(' -', book)\n\nlib = Library('ห้องสมุด Python')\nlib.add_book(Book('Python Crash Course', 'Eric', 'P001'))\nlib.add_book(Book('Clean Code', 'Robert', 'C001'))\nlib.show_all()\nprint(lib.borrow('P001'))\nlib.show_all()",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "class Book:\n    def __init__(self, title, author, isbn):\n        self.title = title\n        self.author = author\n        self.isbn = isbn\n        self.available = True\n    def __str__(self):\n        status = '✓ พร้อมยืม' if self.available else '✗ ถูกยืมแล้ว'\n        return f'{self.title} โดย {self.author} [{status}]'\nclass Library:\n    def __init__(self, name):\n        self.name = name\n        self.books = []\n    def add_book(self, book):\n        self.books.append(book)\n    def borrow(self, isbn):\n        for book in self.books:\n            if book.isbn == isbn and book.available:\n                book.available = False\n                return f'ยืม \"{book.title}\" สำเร็จ'\n        return 'ไม่พบหนังสือหรือถูกยืมแล้ว'\n    def return_book(self, isbn):\n        for book in self.books:\n            if book.isbn == isbn:\n                book.available = True\n                return f'คืน \"{book.title}\" สำเร็จ'\n        return 'ไม่พบหนังสือ'\n    def show_all(self):\n        print(f'=== {self.name} ===')\n        for book in self.books:\n            print(' -', book)\nlib = Library('ห้องสมุด Python')\nlib.add_book(Book('Python Crash Course', 'Eric', 'P001'))\nlib.add_book(Book('Clean Code', 'Robert', 'C001'))\nlib.show_all()\nprint(lib.borrow('P001'))\nlib.show_all()",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "i3", level: "intermediate", order: 3,
    title: "Inheritance และ Polymorphism", icon: "🧬", duration: "40 นาที",
    description: "สืบทอดคุณสมบัติจาก class แม่ และ override เมธอด",
    theory: `
<h2>Inheritance — การสืบทอด</h2>
<p>Class ลูกสืบทอด attributes และ methods จาก class แม่ได้</p>
<div class="code-example">
<pre><code>class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound
    
    def speak(self):
        return f"{self.name} พูดว่า: {self.sound}!"
    
    def __str__(self):
        return f"Animal({self.name})"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "โฮ่ง")
        self.breed = breed
    
    def fetch(self):
        return f"{self.name} วิ่งไปเอาบอล! 🎾"

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "เมี้ยว")
    
    def purr(self):
        return f"{self.name} ร้องเร้อ... 😺"

dog = Dog("บัดดี้", "Golden")
cat = Cat("วิสกี้")
print(dog.speak())    # บัดดี้ พูดว่า: โฮ่ง!
print(dog.fetch())
print(cat.speak())    # วิสกี้ พูดว่า: เมี้ยว!
print(cat.purr())</code></pre>
</div>`,
    exercises: [
      {
        id: "i3e1", title: "ระบบพนักงาน", difficulty: "hard",
        description: "สร้าง class Employee (base) และ Manager, Developer (subclass) ที่มีการคำนวณเงินเดือนต่างกัน",
        starterCode: "class Employee:\n    def __init__(self, name, base_salary):\n        self.name = name\n        self.base_salary = base_salary\n    \n    def get_salary(self):\n        return self.base_salary\n    \n    def __str__(self):\n        return f'{self.__class__.__name__}: {self.name} เงินเดือน {self.get_salary():,} บาท'\n\nclass Manager(Employee):\n    def __init__(self, name, base_salary, bonus_pct):\n        super().__init__(name, base_salary)\n        self.bonus_pct = bonus_pct\n    \n    def get_salary(self):\n        return self.base_salary * (1 + self.bonus_pct)\n\nclass Developer(Employee):\n    def __init__(self, name, base_salary, level):\n        super().__init__(name, base_salary)\n        self.level = level  # 1=Junior, 2=Mid, 3=Senior\n    \n    def get_salary(self):\n        multiplier = {1: 1.0, 2: 1.3, 3: 1.7}\n        return self.base_salary * multiplier.get(self.level, 1)\n\nstaff = [\n    Manager('สมชาย', 50000, 0.3),\n    Developer('มาลี', 40000, 3),\n    Developer('ชัยวัฒน์', 35000, 1)\n]\n\nfor e in staff:\n    print(e)",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "class Employee:\n    def __init__(self, name, base_salary):\n        self.name = name\n        self.base_salary = base_salary\n    def get_salary(self):\n        return self.base_salary\n    def __str__(self):\n        return f'{self.__class__.__name__}: {self.name} เงินเดือน {self.get_salary():,} บาท'\nclass Manager(Employee):\n    def __init__(self, name, base_salary, bonus_pct):\n        super().__init__(name, base_salary)\n        self.bonus_pct = bonus_pct\n    def get_salary(self):\n        return self.base_salary * (1 + self.bonus_pct)\nclass Developer(Employee):\n    def __init__(self, name, base_salary, level):\n        super().__init__(name, base_salary)\n        self.level = level\n    def get_salary(self):\n        multiplier = {1: 1.0, 2: 1.3, 3: 1.7}\n        return self.base_salary * multiplier.get(self.level, 1)\nstaff = [Manager('สมชาย', 50000, 0.3),Developer('มาลี', 40000, 3),Developer('ชัยวัฒน์', 35000, 1)]\nfor e in staff:\n    print(e)",
        expectedOutput: ""
      },
      {
        id: "i3e2", title: "Shape Calculator", difficulty: "medium",
        description: "สร้าง class Shape (base) และ Circle, Triangle, Rectangle (subclass) แต่ละชนิดคำนวณพื้นที่ต่างกัน",
        starterCode: "import math\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n    \n    def describe(self):\n        return f'{self.__class__.__name__}: พื้นที่ = {self.area():.2f}'\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return math.pi * self.radius ** 2\n\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n    def area(self):\n        return 0.5 * self.base * self.height\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nshapes = [Circle(5), Triangle(6, 4), Rectangle(3, 7)]\nfor s in shapes:\n    print(s.describe())",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "import math\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n    def describe(self):\n        return f'{self.__class__.__name__}: พื้นที่ = {self.area():.2f}'\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return math.pi * self.radius ** 2\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n    def area(self):\n        return 0.5 * self.base * self.height\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\nshapes = [Circle(5), Triangle(6, 4), Rectangle(3, 7)]\nfor s in shapes:\n    print(s.describe())",
        expectedOutput: ""
      },
      {
        id: "i3e3", title: "เกม RPG ง่ายๆ", difficulty: "hard",
        description: "สร้าง class Character (base) และ Warrior, Mage (subclass) ที่มีการโจมตีต่างกัน",
        starterCode: "import random\n\nclass Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.max_hp = hp\n        self.attack_power = attack\n    \n    def attack(self, target):\n        dmg = random.randint(self.attack_power-5, self.attack_power+5)\n        target.hp -= dmg\n        return f'{self.name} โจมตี {target.name} ด้วยพลัง {dmg}!'\n    \n    def is_alive(self):\n        return self.hp > 0\n    \n    def status(self):\n        return f'{self.name}: {max(0,self.hp)}/{self.max_hp} HP'\n\nclass Warrior(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=150, attack=20)\n    \n    def shield(self):\n        self.hp += 20\n        return f'{self.name} ใช้โล่! ฟื้น 20 HP'\n\nclass Mage(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=80, attack=35)\n        self.mana = 100\n    \n    def fireball(self, target):\n        if self.mana >= 20:\n            self.mana -= 20\n            dmg = 60\n            target.hp -= dmg\n            return f'{self.name} ใช้ไฟบอล! ทำความเสียหาย {dmg}!'\n        return f'{self.name} ไม่มี mana พอ!'\n\nhero = Warrior('อัศวิน')\nboss = Mage('จอมเวทย์ชั่ว')\n\nprint(hero.attack(boss))\nprint(boss.fireball(hero))\nprint(hero.shield())\nprint(hero.status())\nprint(boss.status())",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "import random\nclass Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.max_hp = hp\n        self.attack_power = attack\n    def attack(self, target):\n        dmg = random.randint(self.attack_power-5, self.attack_power+5)\n        target.hp -= dmg\n        return f'{self.name} โจมตี {target.name} ด้วยพลัง {dmg}!'\n    def is_alive(self):\n        return self.hp > 0\n    def status(self):\n        return f'{self.name}: {max(0,self.hp)}/{self.max_hp} HP'\nclass Warrior(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=150, attack=20)\n    def shield(self):\n        self.hp += 20\n        return f'{self.name} ใช้โล่! ฟื้น 20 HP'\nclass Mage(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=80, attack=35)\n        self.mana = 100\n    def fireball(self, target):\n        if self.mana >= 20:\n            self.mana -= 20\n            dmg = 60\n            target.hp -= dmg\n            return f'{self.name} ใช้ไฟบอล! ทำความเสียหาย {dmg}!'\n        return f'{self.name} ไม่มี mana พอ!'\nhero = Warrior('อัศวิน')\nboss = Mage('จอมเวทย์ชั่ว')\nprint(hero.attack(boss))\nprint(boss.fireball(hero))\nprint(hero.shield())\nprint(hero.status())\nprint(boss.status())",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "i4", level: "intermediate", order: 4,
    title: "List Comprehension & Lambda", icon: "⚡", duration: "30 นาที",
    description: "เขียนโค้ดกระชับด้วย List Comprehension และ Lambda Functions",
    theory: `
<h2>List Comprehension ขั้นสูง</h2>
<div class="code-example">
<pre><code># ดั้งเดิม
result = []
for x in range(10):
    if x % 2 == 0:
        result.append(x**2)

# List Comprehension
result = [x**2 for x in range(10) if x % 2 == 0]
print(result)  # [0, 4, 16, 36, 64]

# Dict Comprehension
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # {1:1, 2:4, 3:9, 4:16, 5:25}

# Set Comprehension
unique = {x % 5 for x in range(20)}
print(unique)  # {0, 1, 2, 3, 4}</code></pre>
</div>
<h3>Lambda Functions</h3>
<div class="code-example">
<pre><code># Lambda = ฟังก์ชันไม่มีชื่อ แบบสั้น
square = lambda x: x**2
add = lambda a, b: a + b

print(square(5))   # 25
print(add(3, 4))   # 7

# ใช้กับ sorted(), map(), filter()
students = [('สมชาย', 85), ('มาลี', 92), ('วิชัย', 78)]

# เรียงตามคะแนน
sorted_s = sorted(students, key=lambda s: s[1], reverse=True)
print(sorted_s)

# map: แปลงทุกตัว
doubled = list(map(lambda x: x*2, [1,2,3,4,5]))

# filter: กรอง
evens = list(filter(lambda x: x%2==0, range(10)))</code></pre>
</div>`,
    exercises: [
      {
        id: "i4e1", title: "Data Processing", difficulty: "medium",
        description: "ใช้ List Comprehension และ Lambda จัดการข้อมูลนักเรียน: กรองเกรด A, เรียงตามคะแนน, แปลงเป็น dict",
        starterCode: "students = [\n    {'name': 'สมชาย', 'score': 92},\n    {'name': 'มาลี', 'score': 78},\n    {'name': 'วิชัย', 'score': 88},\n    {'name': 'สุดา', 'score': 65},\n    {'name': 'ชัยวัฒน์', 'score': 95},\n]\n\n# นักเรียนที่ได้ A (score >= 80)\ngrade_a = [s['name'] for s in students if s['score'] >= 80]\nprint('เกรด A:', grade_a)\n\n# เรียงตามคะแนนมากไปน้อย\nsorted_students = sorted(students, key=lambda s: s['score'], reverse=True)\nfor s in sorted_students:\n    print(f\"{s['name']}: {s['score']}\")",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "students = [{'name': 'สมชาย', 'score': 92},{'name': 'มาลี', 'score': 78},{'name': 'วิชัย', 'score': 88},{'name': 'สุดา', 'score': 65},{'name': 'ชัยวัฒน์', 'score': 95}]\ngrade_a = [s['name'] for s in students if s['score'] >= 80]\nprint('เกรด A:', grade_a)\nsorted_students = sorted(students, key=lambda s: s['score'], reverse=True)\nfor s in sorted_students:\n    print(f\"{s['name']}: {s['score']}\")",
        expectedOutput: ""
      },
      {
        id: "i4e2", title: "Pipeline ด้วย map/filter", difficulty: "hard",
        description: "ใช้ map() และ filter() สร้าง pipeline: จาก 1-50 → กรองเฉพาะเลขคี่ → ยกกำลัง 2 → เก็บเฉพาะที่ < 500",
        starterCode: "numbers = range(1, 51)\n\n# Pipeline\nodd = filter(lambda x: x % 2 != 0, numbers)\nsquared = map(lambda x: x**2, odd)\nresult = list(filter(lambda x: x < 500, squared))\n\nprint(result)",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "numbers = range(1, 51)\nodd = filter(lambda x: x % 2 != 0, numbers)\nsquared = map(lambda x: x**2, odd)\nresult = list(filter(lambda x: x < 500, squared))\nprint(result)",
        expectedOutput: ""
      },
      {
        id: "i4e3", title: "Matrix Operations", difficulty: "hard",
        description: "ใช้ List Comprehension สร้าง matrix identity 4x4 และคำนวณ transpose",
        starterCode: "n = 4\n\n# Identity matrix\nidentity = [[1 if i == j else 0 for j in range(n)] for i in range(n)]\nprint('Identity Matrix:')\nfor row in identity:\n    print(row)\n\n# Transpose\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\ntransposed = [[matrix[j][i] for j in range(len(matrix))] for i in range(len(matrix[0]))]\nprint('\\nOriginal:', matrix)\nprint('Transposed:', transposed)",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "n = 4\nidentity = [[1 if i == j else 0 for j in range(n)] for i in range(n)]\nprint('Identity Matrix:')\nfor row in identity:\n    print(row)\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\ntransposed = [[matrix[j][i] for j in range(len(matrix))] for i in range(len(matrix[0]))]\nprint('\\nOriginal:', matrix)\nprint('Transposed:', transposed)",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "i5", level: "intermediate", order: 5,
    title: "Modules และ Packages", icon: "📦", duration: "25 นาที",
    description: "ใช้ module มาตรฐานของ Python เพิ่มความสามารถโปรแกรม",
    theory: `
<h2>Modules — ไลบรารีที่ใช้งานได้ทันที</h2>
<div class="code-example">
<pre><code>import math
import random
import datetime

# math module
print(math.pi)          # 3.14159...
print(math.sqrt(16))    # 4.0
print(math.ceil(3.2))   # 4
print(math.floor(3.8))  # 3

# random module
print(random.randint(1, 10))    # เลขสุ่ม 1-10
print(random.choice(['a','b','c']))
items = [1,2,3,4,5]
random.shuffle(items)

# datetime module
now = datetime.datetime.now()
print(now.strftime("%d/%m/%Y %H:%M"))</code></pre>
</div>
<h3>import แบบต่างๆ</h3>
<div class="code-example">
<pre><code>import math                      # import ทั้ง module
from math import pi, sqrt        # import แค่บางส่วน
from math import pi as π         # ตั้งชื่อใหม่
import random as rnd             # ตั้งชื่อย่อ

print(π)    # 3.14159...
print(sqrt(25))  # 5.0</code></pre>
</div>`,
    exercises: [
      {
        id: "i5e1", title: "เครื่องมือสถิติ", difficulty: "medium",
        description: "ใช้ math และ statistics module คำนวณ mean, median, std deviation จากข้อมูลคะแนน",
        starterCode: "import statistics\nimport math\n\nscores = [72, 85, 90, 68, 95, 78, 82, 88, 76, 91]\n\nprint(f'Mean: {statistics.mean(scores):.2f}')\nprint(f'Median: {statistics.median(scores)}')\nprint(f'Std Dev: {statistics.stdev(scores):.2f}')\nprint(f'Variance: {statistics.variance(scores):.2f}')\nprint(f'Max: {max(scores)}, Min: {min(scores)}')\nprint(f'Range: {max(scores) - min(scores)}')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "import statistics\nimport math\nscores = [72, 85, 90, 68, 95, 78, 82, 88, 76, 91]\nprint(f'Mean: {statistics.mean(scores):.2f}')\nprint(f'Median: {statistics.median(scores)}')\nprint(f'Std Dev: {statistics.stdev(scores):.2f}')\nprint(f'Variance: {statistics.variance(scores):.2f}')\nprint(f'Max: {max(scores)}, Min: {min(scores)}')\nprint(f'Range: {max(scores) - min(scores)}')",
        expectedOutput: ""
      },
      {
        id: "i5e2", title: "เกมลูกเต๋า", difficulty: "medium",
        description: "ใช้ random สร้างเกมทอยลูกเต๋า 2 ลูก เล่น 10 รอบ บันทึกสถิติ",
        starterCode: "import random\n\nwins = draws = losses = 0\n\nfor round_num in range(1, 11):\n    player = random.randint(1, 6) + random.randint(1, 6)\n    computer = random.randint(1, 6) + random.randint(1, 6)\n    \n    if player > computer:\n        result = 'ชนะ! 🎉'\n        wins += 1\n    elif player == computer:\n        result = 'เสมอ 🤝'\n        draws += 1\n    else:\n        result = 'แพ้ 😢'\n        losses += 1\n    \n    print(f'รอบ {round_num}: คุณ={player} คอม={computer} → {result}')\n\nprint(f'\\nสรุป: ชนะ {wins} | เสมอ {draws} | แพ้ {losses}')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "import random\nwins = draws = losses = 0\nfor round_num in range(1, 11):\n    player = random.randint(1, 6) + random.randint(1, 6)\n    computer = random.randint(1, 6) + random.randint(1, 6)\n    if player > computer:\n        result = 'ชนะ! 🎉'\n        wins += 1\n    elif player == computer:\n        result = 'เสมอ 🤝'\n        draws += 1\n    else:\n        result = 'แพ้ 😢'\n        losses += 1\n    print(f'รอบ {round_num}: คุณ={player} คอม={computer} → {result}')\nprint(f'\\nสรุป: ชนะ {wins} | เสมอ {draws} | แพ้ {losses}')",
        expectedOutput: ""
      },
      {
        id: "i5e3", title: "นาฬิกาและวันที่", difficulty: "medium",
        description: "ใช้ datetime สร้างฟังก์ชันที่คำนวณอายุ, วันเกิดครั้งถัดไป, และจำนวนวันที่เหลือ",
        starterCode: "from datetime import datetime, date\n\ndef calculate_age(birth_year, birth_month, birth_day):\n    today = date.today()\n    born = date(birth_year, birth_month, birth_day)\n    age = today.year - born.year\n    if (today.month, today.day) < (born.month, born.day):\n        age -= 1\n    return age\n\ndef days_until_birthday(birth_month, birth_day):\n    today = date.today()\n    next_bd = date(today.year, birth_month, birth_day)\n    if next_bd < today:\n        next_bd = date(today.year + 1, birth_month, birth_day)\n    return (next_bd - today).days\n\nage = calculate_age(2008, 5, 15)\ndays = days_until_birthday(5, 15)\nprint(f'อายุ: {age} ปี')\nprint(f'วันเกิดอีก: {days} วัน')\nprint(f'วันนี้: {date.today().strftime(\"%d/%m/%Y\")}')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "from datetime import datetime, date\ndef calculate_age(birth_year, birth_month, birth_day):\n    today = date.today()\n    born = date(birth_year, birth_month, birth_day)\n    age = today.year - born.year\n    if (today.month, today.day) < (born.month, born.day):\n        age -= 1\n    return age\ndef days_until_birthday(birth_month, birth_day):\n    today = date.today()\n    next_bd = date(today.year, birth_month, birth_day)\n    if next_bd < today:\n        next_bd = date(today.year + 1, birth_month, birth_day)\n    return (next_bd - today).days\nage = calculate_age(2008, 5, 15)\ndays = days_until_birthday(5, 15)\nprint(f'อายุ: {age} ปี')\nprint(f'วันเกิดอีก: {days} วัน')\nprint(f'วันนี้: {date.today().strftime(\"%d/%m/%Y\")}')",
        expectedOutput: ""
      }
    ]
  },

  // ============================================================
  // ADVANCED LEVEL
  // ============================================================
  {
    id: "a1", level: "advanced", order: 1,
    title: "Decorators", icon: "🎨", duration: "40 นาที",
    description: "เพิ่มความสามารถให้ฟังก์ชันด้วย Decorators",
    theory: `
<h2>Decorators — เสริมพลังฟังก์ชัน</h2>
<p>Decorator คือฟังก์ชันที่รับฟังก์ชันอื่นมาและเพิ่มความสามารถให้</p>
<div class="code-example">
<pre><code>import time

def timer(func):
    """วัดเวลาการทำงานของฟังก์ชัน"""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} ใช้เวลา {end-start:.4f} วินาที")
        return result
    return wrapper

@timer
def slow_function():
    total = 0
    for i in range(1000000):
        total += i
    return total

result = slow_function()
print(f"ผลลัพธ์: {result}")</code></pre>
</div>
<h3>Decorator ที่ใช้บ่อย</h3>
<div class="code-example">
<pre><code>def retry(max_attempts=3):
    """ลองใหม่เมื่อเกิด error"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"ครั้งที่ {attempt+1} ล้มเหลว: {e}")
            raise Exception("หมดจำนวนครั้งที่ลอง!")
        return wrapper
    return decorator

import random
@retry(max_attempts=5)
def risky_operation():
    if random.random() < 0.7:
        raise ValueError("เกิดข้อผิดพลาดสุ่ม!")
    return "สำเร็จ!"

print(risky_operation())</code></pre>
</div>`,
    exercises: [
      {
        id: "a1e1", title: "Logger Decorator", difficulty: "medium",
        description: "สร้าง decorator @log_call ที่บันทึกชื่อฟังก์ชัน arguments และผลลัพธ์ทุกครั้งที่เรียก",
        starterCode: "def log_call(func):\n    def wrapper(*args, **kwargs):\n        print(f'เรียก {func.__name__}({args}, {kwargs})')\n        result = func(*args, **kwargs)\n        print(f'ผลลัพธ์: {result}')\n        return result\n    return wrapper\n\n@log_call\ndef add(a, b):\n    return a + b\n\n@log_call\ndef greet(name, greeting='สวัสดี'):\n    return f'{greeting} {name}!'\n\nadd(3, 4)\ngreet('สมชาย')\ngreet('มาลี', greeting='หวัดดี')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "def log_call(func):\n    def wrapper(*args, **kwargs):\n        print(f'เรียก {func.__name__}({args}, {kwargs})')\n        result = func(*args, **kwargs)\n        print(f'ผลลัพธ์: {result}')\n        return result\n    return wrapper\n@log_call\ndef add(a, b):\n    return a + b\n@log_call\ndef greet(name, greeting='สวัสดี'):\n    return f'{greeting} {name}!'\nadd(3, 4)\ngreet('สมชาย')\ngreet('มาลี', greeting='หวัดดี')",
        expectedOutput: ""
      },
      {
        id: "a1e2", title: "Cache Decorator", difficulty: "hard",
        description: "สร้าง decorator @memoize ที่ cache ผลลัพธ์ของฟังก์ชัน Fibonacci เปรียบเทียบเวลา",
        starterCode: "import time\n\ndef memoize(func):\n    cache = {}\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper\n\n# ไม่มี cache\ndef fib_slow(n):\n    if n <= 1:\n        return n\n    return fib_slow(n-1) + fib_slow(n-2)\n\n# มี cache\n@memoize\ndef fib_fast(n):\n    if n <= 1:\n        return n\n    return fib_fast(n-1) + fib_fast(n-2)\n\n# เปรียบเทียบเวลา\nstart = time.time()\nprint(f'fib(35) = {fib_fast(35)}')\nprint(f'ใช้เวลา: {time.time()-start:.6f}s (fast)')\n\nstart = time.time()\nprint(f'fib(30) = {fib_slow(30)}')\nprint(f'ใช้เวลา: {time.time()-start:.4f}s (slow)')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run เพื่อเห็นความต่างของเวลา!",
        solution: "import time\ndef memoize(func):\n    cache = {}\n    def wrapper(*args):\n        if args not in cache:\n            cache[args] = func(*args)\n        return cache[args]\n    return wrapper\ndef fib_slow(n):\n    if n <= 1:\n        return n\n    return fib_slow(n-1) + fib_slow(n-2)\n@memoize\ndef fib_fast(n):\n    if n <= 1:\n        return n\n    return fib_fast(n-1) + fib_fast(n-2)\nstart = time.time()\nprint(f'fib(35) = {fib_fast(35)}')\nprint(f'ใช้เวลา: {time.time()-start:.6f}s (fast)')\nstart = time.time()\nprint(f'fib(30) = {fib_slow(30)}')\nprint(f'ใช้เวลา: {time.time()-start:.4f}s (slow)')",
        expectedOutput: ""
      },
      {
        id: "a1e3", title: "Access Control", difficulty: "hard",
        description: "สร้าง decorator @require_role(role) ที่ตรวจสอบสิทธิ์ก่อนเรียกฟังก์ชัน",
        starterCode: "def require_role(role):\n    def decorator(func):\n        def wrapper(user, *args, **kwargs):\n            if user.get('role') == role:\n                return func(user, *args, **kwargs)\n            else:\n                raise PermissionError(f'ต้องการสิทธิ์ {role} แต่ {user[\"name\"]} มีสิทธิ์ {user[\"role\"]}')\n        return wrapper\n    return decorator\n\n@require_role('admin')\ndef delete_user(user, target_id):\n    return f'{user[\"name\"]} ลบ user {target_id} สำเร็จ'\n\n@require_role('teacher')\ndef add_grade(user, student, score):\n    return f'{user[\"name\"]} บันทึกคะแนน {student}: {score}'\n\nadmin = {'name': 'อาจารย์ใหญ่', 'role': 'admin'}\nteacher = {'name': 'ครูสมชาย', 'role': 'teacher'}\nstudent = {'name': 'นักเรียน', 'role': 'student'}\n\nprint(delete_user(admin, 'user123'))\nprint(add_grade(teacher, 'มาลี', 95))\n\ntry:\n    delete_user(student, 'user999')\nexcept PermissionError as e:\n    print(f'Error: {e}')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "def require_role(role):\n    def decorator(func):\n        def wrapper(user, *args, **kwargs):\n            if user.get('role') == role:\n                return func(user, *args, **kwargs)\n            else:\n                raise PermissionError(f'ต้องการสิทธิ์ {role} แต่ {user[\"name\"]} มีสิทธิ์ {user[\"role\"]}')\n        return wrapper\n    return decorator\n@require_role('admin')\ndef delete_user(user, target_id):\n    return f'{user[\"name\"]} ลบ user {target_id} สำเร็จ'\n@require_role('teacher')\ndef add_grade(user, student, score):\n    return f'{user[\"name\"]} บันทึกคะแนน {student}: {score}'\nadmin = {'name': 'อาจารย์ใหญ่', 'role': 'admin'}\nteacher = {'name': 'ครูสมชาย', 'role': 'teacher'}\nstudent = {'name': 'นักเรียน', 'role': 'student'}\nprint(delete_user(admin, 'user123'))\nprint(add_grade(teacher, 'มาลี', 95))\ntry:\n    delete_user(student, 'user999')\nexcept PermissionError as e:\n    print(f'Error: {e}')",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "a2", level: "advanced", order: 2,
    title: "Generators และ Iterators", icon: "🔁", duration: "35 นาที",
    description: "สร้างลำดับข้อมูลขนาดใหญ่อย่างมีประสิทธิภาพ",
    theory: `
<h2>Generators — ประหยัดหน่วยความจำ</h2>
<p>Generator สร้างค่าทีละตัว ไม่ต้องเก็บทั้งหมดในหน่วยความจำ</p>
<div class="code-example">
<pre><code>def fibonacci_gen():
    """Generator ลำดับ Fibonacci ไม่มีที่สิ้นสุด"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci_gen()
for _ in range(10):
    print(next(gen), end=' ')
# 0 1 1 2 3 5 8 13 21 34

# Generator Expression (เหมือน List Comprehension แต่ขี้เกียจ)
squares = (x**2 for x in range(1000000))  # ไม่กิน RAM!
print(next(squares))   # 0
print(next(squares))   # 1</code></pre>
</div>`,
    exercises: [
      {
        id: "a2e1", title: "Prime Number Generator", difficulty: "hard",
        description: "สร้าง generator ที่ผลิตเลขเฉพาะไม่สิ้นสุด แล้วใช้ islice เอา 20 ตัวแรก",
        starterCode: "def prime_gen():\n    \"\"\"Generator เลขเฉพาะ\"\"\"\n    def is_prime(n):\n        if n < 2:\n            return False\n        for i in range(2, int(n**0.5)+1):\n            if n % i == 0:\n                return False\n        return True\n    \n    n = 2\n    while True:\n        if is_prime(n):\n            yield n\n        n += 1\n\n# เอา 20 เลขเฉพาะแรก\nfrom itertools import islice\nprimes = list(islice(prime_gen(), 20))\nprint(primes)",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "def prime_gen():\n    def is_prime(n):\n        if n < 2:\n            return False\n        for i in range(2, int(n**0.5)+1):\n            if n % i == 0:\n                return False\n        return True\n    n = 2\n    while True:\n        if is_prime(n):\n            yield n\n        n += 1\nfrom itertools import islice\nprimes = list(islice(prime_gen(), 20))\nprint(primes)",
        expectedOutput: ""
      },
      {
        id: "a2e2", title: "Data Pipeline", difficulty: "hard",
        description: "ใช้ generator chain สร้าง data pipeline: อ่านข้อมูล → กรอง → แปลง → รวม",
        starterCode: "def read_data():\n    \"\"\"จำลองการอ่านข้อมูล\"\"\"\n    data = [10, -5, 20, -3, 15, 8, -1, 25, 12, -8]\n    for item in data:\n        yield item\n\ndef filter_positive(data):\n    \"\"\"กรองเฉพาะบวก\"\"\"\n    for item in data:\n        if item > 0:\n            yield item\n\ndef square(data):\n    \"\"\"ยกกำลัง 2\"\"\"\n    for item in data:\n        yield item ** 2\n\n# สร้าง pipeline\npipeline = square(filter_positive(read_data()))\nresult = list(pipeline)\nprint('Pipeline result:', result)\nprint('Sum:', sum(result))",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "def read_data():\n    data = [10, -5, 20, -3, 15, 8, -1, 25, 12, -8]\n    for item in data:\n        yield item\ndef filter_positive(data):\n    for item in data:\n        if item > 0:\n            yield item\ndef square(data):\n    for item in data:\n        yield item ** 2\npipeline = square(filter_positive(read_data()))\nresult = list(pipeline)\nprint('Pipeline result:', result)\nprint('Sum:', sum(result))",
        expectedOutput: ""
      },
      {
        id: "a2e3", title: "Custom Iterator Class", difficulty: "hard",
        description: "สร้าง class Countdown iterator ที่นับถอยหลังจาก n ไปถึง 0",
        starterCode: "class Countdown:\n    def __init__(self, start):\n        self.current = start\n    \n    def __iter__(self):\n        return self\n    \n    def __next__(self):\n        if self.current < 0:\n            raise StopIteration\n        value = self.current\n        self.current -= 1\n        return value\n\n# ใช้งาน\ncountdown = Countdown(5)\nfor n in countdown:\n    print(n, end=' ')\nprint('🚀 ปล่อยจรวด!')\n\n# ใช้ list()\nprint(list(Countdown(3)))",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "class Countdown:\n    def __init__(self, start):\n        self.current = start\n    def __iter__(self):\n        return self\n    def __next__(self):\n        if self.current < 0:\n            raise StopIteration\n        value = self.current\n        self.current -= 1\n        return value\ncountdown = Countdown(5)\nfor n in countdown:\n    print(n, end=' ')\nprint('🚀 ปล่อยจรวด!')\nprint(list(Countdown(3)))",
        expectedOutput: ""
      }
    ]
  },
  {
    id: "a3", level: "advanced", order: 3,
    title: "Data Structures", icon: "🏗️", duration: "50 นาที",
    description: "โครงสร้างข้อมูลที่สำคัญ: Stack, Queue, Linked List, Binary Tree",
    theory: `
<h2>Stack — Last In, First Out (LIFO)</h2>
<div class="code-example">
<pre><code>class Stack:
    def __init__(self):
        self._data = []
    
    def push(self, item):
        self._data.append(item)
    
    def pop(self):
        if self.is_empty():
            raise IndexError("Stack ว่าง!")
        return self._data.pop()
    
    def peek(self):
        return self._data[-1]
    
    def is_empty(self):
        return len(self._data) == 0
    
    def __len__(self):
        return len(self._data)

# ตัวอย่าง: ตรวจสอบวงเล็บ
def check_brackets(text):
    stack = Stack()
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in text:
        if ch in '([{':
            stack.push(ch)
        elif ch in ')]}':
            if stack.is_empty() or stack.pop() != pairs[ch]:
                return False
    return stack.is_empty()

print(check_brackets("(a + b) * [c - d]"))  # True
print(check_brackets("((a + b)"))            # False</code></pre>
</div>`,
    exercises: [
      {
        id: "a3e1", title: "Queue Implementation", difficulty: "hard",
        description: "สร้าง Queue class (FIFO) ด้วย linked list และใช้จำลองคิวธนาคาร",
        starterCode: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass Queue:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n        self.size = 0\n    \n    def enqueue(self, item):\n        node = Node(item)\n        if self.tail:\n            self.tail.next = node\n        self.tail = node\n        if not self.head:\n            self.head = node\n        self.size += 1\n    \n    def dequeue(self):\n        if not self.head:\n            raise IndexError('Queue ว่าง')\n        data = self.head.data\n        self.head = self.head.next\n        if not self.head:\n            self.tail = None\n        self.size -= 1\n        return data\n    \n    def peek(self):\n        return self.head.data if self.head else None\n\n# จำลองคิวธนาคาร\nbank_queue = Queue()\ncustomers = ['สมชาย', 'มาลี', 'วิชัย', 'สุดา']\n\nfor c in customers:\n    bank_queue.enqueue(c)\n    print(f'{c} เข้าคิว')\n\nprint('\\nให้บริการ:')\nwhile bank_queue.size > 0:\n    customer = bank_queue.dequeue()\n    print(f'บริการ {customer} ✓')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\nclass Queue:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n        self.size = 0\n    def enqueue(self, item):\n        node = Node(item)\n        if self.tail:\n            self.tail.next = node\n        self.tail = node\n        if not self.head:\n            self.head = node\n        self.size += 1\n    def dequeue(self):\n        if not self.head:\n            raise IndexError('Queue ว่าง')\n        data = self.head.data\n        self.head = self.head.next\n        if not self.head:\n            self.tail = None\n        self.size -= 1\n        return data\n    def peek(self):\n        return self.head.data if self.head else None\nbank_queue = Queue()\ncustomers = ['สมชาย', 'มาลี', 'วิชัย', 'สุดา']\nfor c in customers:\n    bank_queue.enqueue(c)\n    print(f'{c} เข้าคิว')\nprint('\\nให้บริการ:')\nwhile bank_queue.size > 0:\n    customer = bank_queue.dequeue()\n    print(f'บริการ {customer} ✓')",
        expectedOutput: ""
      },
      {
        id: "a3e2", title: "Binary Search Tree", difficulty: "hard",
        description: "สร้าง BST ที่ insert, search, และ in-order traversal ได้",
        starterCode: "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, val):\n        self.root = self._insert(self.root, val)\n    \n    def _insert(self, node, val):\n        if not node:\n            return TreeNode(val)\n        if val < node.val:\n            node.left = self._insert(node.left, val)\n        elif val > node.val:\n            node.right = self._insert(node.right, val)\n        return node\n    \n    def search(self, val):\n        return self._search(self.root, val)\n    \n    def _search(self, node, val):\n        if not node:\n            return False\n        if val == node.val:\n            return True\n        if val < node.val:\n            return self._search(node.left, val)\n        return self._search(node.right, val)\n    \n    def inorder(self):\n        result = []\n        def traverse(node):\n            if node:\n                traverse(node.left)\n                result.append(node.val)\n                traverse(node.right)\n        traverse(self.root)\n        return result\n\nbst = BST()\nfor val in [5, 3, 7, 1, 4, 6, 8]:\n    bst.insert(val)\n\nprint('In-order (เรียงลำดับ):', bst.inorder())\nprint('ค้นหา 4:', bst.search(4))\nprint('ค้นหา 9:', bst.search(9))",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run ดูผลลัพธ์!",
        solution: "class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None\nclass BST:\n    def __init__(self):\n        self.root = None\n    def insert(self, val):\n        self.root = self._insert(self.root, val)\n    def _insert(self, node, val):\n        if not node:\n            return TreeNode(val)\n        if val < node.val:\n            node.left = self._insert(node.left, val)\n        elif val > node.val:\n            node.right = self._insert(node.right, val)\n        return node\n    def search(self, val):\n        return self._search(self.root, val)\n    def _search(self, node, val):\n        if not node:\n            return False\n        if val == node.val:\n            return True\n        if val < node.val:\n            return self._search(node.left, val)\n        return self._search(node.right, val)\n    def inorder(self):\n        result = []\n        def traverse(node):\n            if node:\n                traverse(node.left)\n                result.append(node.val)\n                traverse(node.right)\n        traverse(self.root)\n        return result\nbst = BST()\nfor val in [5, 3, 7, 1, 4, 6, 8]:\n    bst.insert(val)\nprint('In-order (เรียงลำดับ):', bst.inorder())\nprint('ค้นหา 4:', bst.search(4))\nprint('ค้นหา 9:', bst.search(9))",
        expectedOutput: ""
      },
      {
        id: "a3e3", title: "Sorting Algorithms", difficulty: "hard",
        description: "เปรียบเทียบ Bubble Sort, Merge Sort, Quick Sort ทั้งความถูกต้องและเวลา",
        starterCode: "import time\nimport random\n\ndef bubble_sort(arr):\n    arr = arr.copy()\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    return result + left[i:] + right[j:]\n\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    mid = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + mid + quick_sort(right)\n\ndata = random.sample(range(1000), 500)\n\nfor name, func in [('Bubble Sort', bubble_sort), ('Merge Sort', merge_sort), ('Quick Sort', quick_sort)]:\n    start = time.time()\n    result = func(data)\n    elapsed = time.time() - start\n    print(f'{name}: {elapsed:.4f}s (ถูกต้อง: {result == sorted(data)})')",
        hint: "โค้ดนี้สมบูรณ์แล้ว ลอง Run เพื่อเห็นความต่างของประสิทธิภาพ!",
        solution: "import time\nimport random\ndef bubble_sort(arr):\n    arr = arr.copy()\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    return result + left[i:] + right[j:]\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    mid = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + mid + quick_sort(right)\ndata = random.sample(range(1000), 500)\nfor name, func in [('Bubble Sort', bubble_sort), ('Merge Sort', merge_sort), ('Quick Sort', quick_sort)]:\n    start = time.time()\n    result = func(data)\n    elapsed = time.time() - start\n    print(f'{name}: {elapsed:.4f}s (ถูกต้อง: {result == sorted(data)})')",
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
    elementary:   { label: 'ระดับประถม',  color: '#f472b6', icon: '🌸', description: 'สนุกกับ Python ตั้งแต่เริ่มต้น' },
    beginner:     { label: 'ผู้เริ่มต้น', color: '#10b981', icon: '🌱', description: 'เรียนพื้นฐาน Python ครบถ้วน' },
    intermediate: { label: 'ระดับกลาง',  color: '#3b82f6', icon: '🚀', description: 'OOP, Modules, Error Handling' },
    advanced:     { label: 'ระดับสูง',   color: '#8b5cf6', icon: '⚡', description: 'Decorators, Generators, Algorithms' }
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
    description: 'เรียน Python พื้นฐานถึงขั้นกลาง',
    levels: ['elementary', 'beginner']
  },
  high: {
    label: '🚀 มัธยมปลาย (ม.4–ม.6)',
    description: 'เนื้อหาครบทุกระดับ รวมถึงการเขียนโปรแกรมขั้นสูง',
    levels: ['elementary', 'beginner', 'intermediate', 'advanced']
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
