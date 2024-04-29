const { response } = require("express");
const { instance } = require("../config/razorpay.config.js");
const Course = require("../models/Courses.model.js");
const User = require("../models/User.model.js");
const mailSender = require("../utils/mailSender.utils.js");

// capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
  try {
    // get course id and user id
    const { courseID } = req.body;
    const { userID } = req.user;

    // validate course id and user id
    if (!(courseID || userID)) {
      return res.status(400).json({
        success: false,
        message: "Course ID and User ID are required",
      });
    }

    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found in database",
      });
    }

    // user already paid for the same course
    const user = await User.findById(userID);
    const isAlreadyPurchased = user.courses.find(
      (course) => course._id == courseID
    );
    if (isAlreadyPurchased) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this course",
      });
    }

    // order create
    const amount = course.amount;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseID,
        userID,
      },
    };

    const paymentResponse = await instance.orders.create(options);

    // return response
    return res.status(200).json({
      success: true,
      message: "Order Created Successfully",
      courseName: course.title,
      courseDescription: course.description,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating your order",
    });
  }
};

// verify signature
exports.verifySignature = async (req, res) => {
  try {
    const webHookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256", webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest === signature) {
      console.log("Payment is authorized");
      const { courseID, userID } = req.body.payload.payment.entity.notes;

      try {
        // find the course and enroll the student to the course
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseID },
          {
            $push: {
              studentsEnrolled: userID,
            },
          },
          { new: true }
        );
        if (!enrolledCourse) {
          return res.status(500).json({
            success: false,
            message: "Something went wrong! Bad Gateway",
          });
        }

        // update the student schema
        const enrolledStudent = await User.findOneAndUpdate(
          { _id: userID },
          {
            $push: {
              courses: courseID,
            },
          },
          { new: true }
        );

        // send mail to the user for successful enrollment in course
        const emailResponse = mailSender(
          enrolledStudent.email,
          "Congratulations on Your Enrollment!",
          `
           <p>Dear ${enrolledStudent.firstName},</p>
           <p>We are delighted to congratulate you on successfully enrolling in your chosen course at StudyNotion!</p>
           <p>Your dedication to furthering your education and skills is truly inspiring, and we are excited to have you join our community of learners. 
           StudyNotion is committed to providing top-notch education and resources to help students like you achieve their academic and professional goals.</p>
           <p>If you have any questions or need assistance, please feel free to reach out to us. We are here to support you every step of the way.</p>
           <p>Congratulations once again on taking this important step in your educational journey. We look forward to seeing you excel in your studies at 
           StudyNotion!</p>
           <p>Best regards,<br>StudyNotion Team</p>
          `
        );
        return res.status(200).json({
          success: true,
          message: "Signature verified successfully",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed signature verification",
          error: error.message,
        });
      }
    } else {
      // when signature does not match
      return res.status(403).json({
        success: true,
        message: "Signature does not match",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verification of signature",
      error: error.message,
    });
  }
};
