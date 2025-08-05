const { instance } = require("../config/razorpay.config.js");
const Course = require("../models/Courses.model.js");
const User = require("../models/User.model.js");
const mailSender = require("../utils/mailSender.utils.js");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const {
  courseEnrollmentSuccess,
} = require("../emails/templates/coursePurchaseSuccess.email.js");
const {
  paymentSuccess,
} = require("../emails/templates/paymentSuccess.email.js");
const { log } = require("console");

// capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const { userId } = req.user;

    if (!courses) {
      return res.status(400).json({
        success: false,
        message: "Courses are required",
      });
    }

    if (courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Courses are required",
      });
    }

    let totalAmount = 0;

    for (const courseID of courses) {
      let course;
      try {
        course = await Course.findById(courseID);
        if (!course)
          return res.status(404).json({
            success: false,
            message: "Course not found.",
          });

        // if the course is already purchased by the student then do not add
        const uid = new mongoose.Types.ObjectId(userId);
        const isAlreadyPurchased = course.studentsEnrolled.some((studentID) =>
          studentID.equals(uid)
        );
        if (isAlreadyPurchased) {
          return res.status(400).json({
            success: false,
            message: `You have already purchased the course: ${course.title}`,
          });
        }

        totalAmount += course.price;
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong while fetching courses of your order.",
          error: error.message,
        });
      }
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courses: courses,
        userId: userId,
      },
    };

    const paymentResponse = await instance.orders.create(options);
    return res.status(200).json({
      success: true,
      message: "Order Created Successfully",
      paymentResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating your order",
      error: error.message,
    });
  }
};

// verify signature
exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body?.courses;
    const userId = req.user?.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Razorpay order ID, payment ID, and signature are required",
      });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expedtedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expedtedSignature === razorpay_signature) {
      // Signature is valid, proceed with enrollment
      await enrollStudents(courses, userId, res);
      return res.status(200).json({
        success: true,
        message: "Payment verified and enrolled successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying the payment",
      error: error.message,
    });
  }
};

// send mail to the user for successful payment
exports.sendPaymentSuccessMail = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, amount } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Order ID, Payment ID, Amount, and User ID are required",
      });
    }

    const enrolledStudent = await User.findById(userId);

    if (!enrolledStudent) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // mail the user for successfull payment
    const title = "Congratulations! Your payment is successfull.";
    const studentName =
      enrolledStudent.firstName + " " + enrolledStudent.lastName;
    const body = paymentSuccess(
      studentName,
      razorpay_order_id,
      razorpay_payment_id,
      amount
    );
    await mailSender(enrolledStudent.email, title, body);

    // return the success response
    return res.status(200).json({
      success: true,
      message: "Payment success mail sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send payment success mail",
      error: error.message,
    });
  }
};

const enrollStudents = async (courses, userID, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // validate data
    if (!courses || !userID) {
      return res.status(404).json({
        success: false,
        message: "Courses and User ID are required",
      });
    }

    const enrolledStudent = await User.findById(userID).session(session);
    if (!enrolledStudent) {
      throw new Error("Student not found");
    }

    const successfullyEnrolledCourses = [];

    for (const courseID of courses) {
      const enrolledCourse = await Course.findById(courseID).session(session);
      if (!enrolledCourse) {
        throw new Error("Course not found");
      }

      const isAlreadyPurchased = enrolledCourse.studentsEnrolled.some(
        (studentID) => studentID.equals(userID)
      );

      if (isAlreadyPurchased) {
        console.log("Already enrolled:", enrolledCourse.title);
        continue;
      }

      // update user and course
      enrolledStudent.courses.push(courseID);
      enrolledCourse.studentsEnrolled.push(userID);

      await enrolledCourse.save({ session });
      successfullyEnrolledCourses.push(enrolledCourse);
    }

    await enrolledStudent.save({ session });

    // All done, now commit
    await session.commitTransaction();
    session.endSession();

    // Now send emails
    for (const course of successfullyEnrolledCourses) {
      const title = "Congratulations on Your Enrollment!";
      const name = enrolledStudent.firstName + " " + enrolledStudent.lastName;
      const body = courseEnrollmentSuccess(name, course.title);
      await mailSender(enrolledStudent.email, title, body);
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error enrolling student:", error);
    throw new Error("Failed to enroll students");
  }
};
