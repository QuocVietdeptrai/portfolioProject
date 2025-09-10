const Contact = require('../models/contact');
const { sendMail } = require("../helpers/mailHelper");

exports.getContact = (req, res) => {
  res.render('contact', { title: 'Contact' });
};

module.exports.sendMessage = async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const { name, email, title, message } = req.body;

    // Lưu vào MongoDB
    const newContact = new Contact({
      name,
      email,
      title,
      message,
      createdAt: new Date()
    });
    await newContact.save();

    // Gửi email
    const mailContent = `
      <h2>Bạn nhận được tin nhắn mới từ Website Portfolio</h2>
      <p><strong>Tên:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Tiêu đề:</strong> ${title}</p>
      <p><strong>Nội dung:</strong> ${message}</p>
    `;

    await sendMail(process.env.EMAIL_USER, `Liên hệ mới: ${title}`, mailContent);

    return res.json({
      code: "success"
    });

  } catch (error) {
    console.error(error);
    return res.json({
      code: "error",
      message: "Đã có lỗi xảy ra khi gửi tin nhắn."
    });
  }
};
