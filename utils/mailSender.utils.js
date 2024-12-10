const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL_HOST, MAIL_USER, MAIL_PASS } = process.env;

const mailSender = async (
  email,
  title,
  body,
  from = "StudyNotion - by Mantra Gor"
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: from,
      to: email,
      subject: title,
      html: body,
    });
    return info;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mailSender;
