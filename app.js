const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const app = express();

// ===== MIDDLEWARE =====
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // สำหรับ logo.png

// ===== PATH USERS FILE =====
const usersPath = path.join(__dirname, "auth", "users.json");

// ===== HELPER: READ USERS =====
function getUsers() {
  if (!fs.existsSync(usersPath)) {
    return [];
  }
  const data = fs.readFileSync(usersPath, "utf8");
  return JSON.parse(data);
}

// ===== LOGIN PAGE =====
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>Login | ป.รุ่งเรือง พีเอสพีเอส</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6f8;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .box {
      background: #fff;
      padding: 30px;
      width: 100%;
      max-width: 380px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,.1);
    }
    .logo {
      display: block;
      margin: 0 auto 15px;
      max-width: 120px;
    }
    h1 {
      text-align: center;
      color: #0b3c5d;
      margin-bottom: 5px;
      font-size: 22px;
    }
    h2 {
      text-align: center;
      font-size: 14px;
      color: #f5a623;
      margin-bottom: 20px;
    }
    input {
      width: 100%;
      padding: 12px;
      margin-bottom: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #0b3c5d;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #092f49;
    }
    .error {
      color: red;
      text-align: center;
      margin-bottom: 10px;
    }
    .footer {
      text-align: center;
      margin-top: 15px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="box">
    <img src="/logo.png" alt="logo" class="logo">
    <h1>ป.รุ่งเรือง พีเอสพีเอส</h1>
    <h2>P.RUNGRUANG PSPS CO., LTD.</h2>

    <form method="POST" action="/login">
      <input type="email" name="email" placeholder="Email" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">เข้าสู่ระบบ</button>
    </form>

    <div class="footer">
      ระบบบริหารงานก่อสร้าง
    </div>
  </div>
</body>
</html>
`);
});

// ===== LOGIN PROCESS =====
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.send(`
        <p style="color:red">ไม่พบผู้ใช้</p>
        <a href="/">กลับไปหน้า Login</a>
      `);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.send(`
        <p style="color:red">รหัสผ่านไม่ถูกต้อง</p>
        <a href="/">กลับไปหน้า Login</a>
      `);
    }

    // ===== LOGIN SUCCESS =====
    res.send(`
      <h2>ยินดีต้อนรับ ${user.name}</h2>
      <p>Role: ${user.role}</p>
      <p style="color:green">Login สำเร็จ ✅</p>
      <a href="/">ออกจากระบบ</a>
    `);

  } catch (err) {
    console.error(err);
    res.status(500).send("เกิดข้อผิดพลาดของระบบ");
  }
});

// ===== START SERVER =====
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
