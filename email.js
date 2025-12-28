const express = require('express');
const nodemailer = require('nodemailer');
require("dotenv").config();
const crypto = require('crypto');

const app = express();

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify SMTP (VERY IMPORTANT)
transport.verify((err) => {
  if (err) console.log("SMTP ERROR:", err);
  else console.log("SMTP READY ✅");
});

app.get('/', (req, res) => {
  const password = crypto.randomBytes(4).toString('hex');
  res.send(`Your password is ${password}`);
});

app.get('/sendEmail', async (req, res) => {
  const email = {
    from: `"Shopie" <${process.env.EMAIL}>`,
    to: "zayyanzia153@gmail.com",
    subject: 'Thanks For Sign in',
    text: `Hi Dear,

Welcome back to Shopie!

Your account has been successfully logged in.
`
  };

  transport.sendMail(email, (err, info) => {
    if (err) {
      console.log("EMAIL ERROR:", err);
      return res.status(500).send(err.message);
    }
    res.send("Successfully sent!");
  });
});

app.listen(3001, () => {
  console.log('Running on port 3001');
});
