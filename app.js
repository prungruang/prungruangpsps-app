const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));

const usersPath = path.join(__dirname, "auth/users.json");

// หน้า Login
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>Login | ป.รุ่งเรือง พีเอสพีเอส</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body{font-family:Arial;background:#f4f6f8;display:flex;justify-content:center;align-items:center;height:100vh}
.box{background:#fff;padding:30px;width:100%;max-width:380px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,.1)}
h1{text-align:center;color:#0b3c5d;margin-bottom:5px}
h2{text-align:center;font-size:14px;color:#f5a623;margin-bottom:20px}
input,button{width:100%;padding:12px;margin-bottom:12px}
button{background:#0b3c5d;color:#fff;border:none}
.error{color:red;text-align:center}
</style>
</head>
<body>
<div class="box">
<h1>ป.รุ่งเรือง พีเอสพีเอส</h1>
<h2>P.RUNGRUANG PSPS CO., LTD.</h2>
<form method="POST" action="/login">
<input type="email" name="email" placeholder="Email" required>
<input type="password" name="password" placeholder="Password" required>
<button type="submit">เข้าสู่ระบบ</button>
</form>
</div>
</body>
</html>
`);
});

// ตรวจสอบ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.send("<p>ไม่พบผู้ใช้</p><a href='/'>กลับ</a>");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.send("<p>รหัสผ่านไม่ถูกต้อง</p><a href='/'>กลับ</a>");
  }

  res.send(`
    <h2>ยินดีต้อนรับ ${user.name}</h2>
    <p>Role: ${user.role}</p>
    <p>Login สำเร็จ ✅</p>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on", port));
