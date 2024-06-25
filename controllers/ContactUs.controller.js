const { contactUs } = require("../emails/templates/contactUs.email.js");
const {
  contactUsResponse,
} = require("../emails/templates/contactUsResponse.email.js");
const ContactUsRecords = require("../models/ContactUsRecord.model.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const mailSender = require("../utils/mailSender.utils.js");
const { contactUsSchema } = require("../validations/ContactUs.validation.js");

exports.contactUs = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = contactUsSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // get the data
    const { firstName, lastName, email, phoneNo, message } = value;

    // store the response to database
    const newInquiry = await ContactUsRecords.create({
      firstName,
      lastName,
      email,
      phoneNo,
      message,
    });

    // send this mail to organization's mail id
    if (newInquiry) {
      const orgEmail = process.env.MAIL_USER;
      const title = `You received a new inquiry from ${firstName}`;
      const body = contactUs(
        email,
        firstName,
        lastName,
        phoneNo,
        message,
        newInquiry
      );
      const from = email;

      const mailToOrgResponse = await mailSender(orgEmail, title, body, from);

      // send a mail to user that your mail is received successfully
      if (mailToOrgResponse) {
        const usrEmail = email;
        const title = `Your mail received to StudyNotion, Thank you for contacting us.`;
        const name = firstName + " " + lastName;
        const body = contactUsResponse(name);

        const mailToUserResponse = await mailSender(usrEmail, title, body);

        // return response
        if (mailToUserResponse) {
          return res.status(200).json({
            success: true,
            message: "Mail sent successfully",
            data: {
              recordID: newInquiry._id,
            },
          });
        } else {
          return res.status(500).json({
            success: false,
            message:
              "Failed to send you mail response. Please try again later.",
          });
        }
      } else {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error, Unable to send mail to StudyNotion.",
        });
      }
    } else {
      return res.status(500).json({
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
