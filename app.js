const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ระบบบริหารงานก่อสร้าง | ป.รุ่งเรือง พีเอสพีเอส</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f6f8;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .login-box {
          background: #fff;
          padding: 30px;
          width: 100%;
          max-width: 380px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,.1);
        }
        h1 {
          text-align: center;
          color: #0b3c5d;
          margin-bottom: 5px;
        }
        h2 {
          text-align: center;
          font-size: 14px;
          color: #f5a623;
          margin-bottom: 25px;
        }
        input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          width: 100%;
          padding: 12px;
          background: #0b3c5d;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
        }
        .footer {
          text-align: center;
          margin-top: 15px;
          font-size: 13px;
        }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h1>ป.รุ่งเรือง พีเอสพีเอส</h1>
        <h2>P.RUNGRUANG PSPS CO., LTD.</h2>
        <form>
          <input type="email" placeholder="Email" required>
          <input type="password" placeholder="Password" required>
          <button type="submit">เข้าสู่ระบบ</button>
        </form>
        <div class="footer">
          © ระบบบริหารงานก่อสร้าง
        </div>
      </div>
    </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
