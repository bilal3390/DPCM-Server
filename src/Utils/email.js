const nodemailer = require('nodemailer');

// Create a nodemailer transporter using Outlook.com SMTP credentials
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'dpcm.222@outlook.com',
    pass: 'svdpyynhpgseixur',
  },
});

// Function to send a password reset email using Outlook.com
const sendPasswordResetEmail = async (email, resetToken, subject, text) => {
  try {
    const mailOptions = {
      from: 'dpcm.222@outlook.com',
      to: email,
      subject: subject,
      text: text,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = {
  sendPasswordResetEmail,
};