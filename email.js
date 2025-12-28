const express = require('express')
const nodemailer = require('nodemailer')
require("dotenv").config()
const app = express()
const crypto = require('crypto');
const transport =nodemailer.createTransport({
  host: 'smtp.gmail.com',         
  port: 465,
  secure: true,
  auth: {
    user: process.env.EmailTo,
    pass: process.env.Passkey, 
  },
});
app.get('/',(req,res)=>{
  const password = crypto.randomBytes(4).toString('hex');
  res.send(`Your password is ${password}`)
})
app.get('/sendEmail',async(req,res)=>{
     let email=({
      from:'zstyles053@gmail.com',
      to:"zayyanzia153@gmail.com",
      subject:'Thanks For Sign in',
      text:`Hi Dear,

Welcome back to Shopie !

We're excited to have you again join our community. Your account has been successfully login, and you're now ready to explore everything we have to offer.

If you have any questions or need help, feel free to reply to this email.
`
});
transport.sendMail(email,(err,info)=>{
  if(err){
   res.send("Error Occur!")
  }
  else{
    res.send("successfully sent!")
  }
})
})
app.listen(3001,()=>{
  console.log('Running on port 3001');
})