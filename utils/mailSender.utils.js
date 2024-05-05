const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (
  email,
  title,
  body,
  from = "StudyNotion - by Mantra Gor"
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: from,
      to: email,
      subject: title,
      html: body,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailSender;
