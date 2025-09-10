const nodemailer = require('nodemailer');

module.exports.sendMail = async (email, subject, content) => {
  const secure = process.env.EMAIL_SECURE === "true";

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: content
  };

  return transporter.sendMail(mailOptions);
};
