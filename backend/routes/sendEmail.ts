// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// import express from 'express';

// dotenv.config();
// const router = express.Router();

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, // use TLS
//   auth: {
//     user: 'areebakhan1454771@gmail.com',
//     pass: 'areeba@9876', // make sure this is an app password
//   },
// });

// router.post('/', async (req, res) => {
//   const { to, subject, text } = req.body;

//   try {
//     const info = await transporter.sendMail({
//       from: '"Areeba Farhan" <areebakhan1454771@gmail.com>',
//       to,
//       subject,
//       text,
//     });

//     console.log('✅ Email sent:', info.messageId);
//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('❌ Email error:', error);
//     res.status(500).json({ message: 'Failed to send email', error });
//   }
// });

// export default router;

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Areeba Farhan" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log('✅ Email sent:', info.messageId);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Email error:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

export default router;
