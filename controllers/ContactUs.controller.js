const ContactUsRecords = require("../models/ContactUsRecord.model.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const mailSender = require("../utils/mailSender.utils.js");

exports.contactUs = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = contactUsSchema.validate(req.body);
    if (error) {
      return res.statue(400).json(JoiErrorHandler(error));
    }
    // get the data
    const { firstName, lastName, email, phoneNumber, message } = value;

    // store the response to database
    const newInquiry = await ContactUsRecords.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    // send this mail to organization's mail id
    if (newInquiry) {
      const email = "gor.mantra4171@gmail.com";
      const title = `You received a new inquiry from ${firstName}`;
      const body = `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p> <br /> <br /> <br />
        <p>Database Entry ID: ${newInquiry._id}</p>
      `;
      const from = email;

      const mailToOrgResponse = await mailSender(email, title, body, from);

      // send a mail to user that your mail is received successfully
      if (mailToOrgResponse) {
        const email = email;
        const title = `Your received to SThank You for Contacting StudyNotion`;
        const body = `
          <p>Dear ${lastName},</p>
          <p>Thank you for contacting StudyNotion. Your message is important to us, and we appreciate the time you took to reach out.</p>
          <p>We have received your message and will get back to you shortly. Our team is dedicated to providing you with the best possible service, and we are working hard to address your inquiry as quickly as possible.</p>
          <p>If you have any urgent questions or concerns, please feel free to contact us directly at <a href="mailto:contact@studynotion.com">contact@studynotion.com</a>.</p>
          <p>Thank you again for choosing StudyNotion. We look forward to assisting you.</p>
          <p>Best regards,<br> The StudyNotion Team</p>
        `;

        const mailToUserResponse = await mailSender(email, title, body);

        // return response
        if (mailToUserResponse) {
          return res(200).json({
            success: true,
            message: "Mail sent successfully",
            data: {
              recordID: newInquiry._id,
            },
          });
        } else {
          return res(500).json({
            success: false,
            message:
              "Failed to send you mail response. Please try again later.",
          });
        }
      } else {
        return res(500).json({
          success: false,
          message: "Internal Server Error, Unable to send mail to StudyNotion.",
        });
      }
    } else {
      return res(500).json({
        success: false,
        message: "Something went wrong! Unable to proceed with your request.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Can't send mail to StudyNotion",
      error: error.message,
    });
  }
};
