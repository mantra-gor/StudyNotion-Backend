const RatingsAndReview = require("../models/RatingsAndReviews.model.js");
const Course = require("../models/Courses.model.js");
const { USER_ROLES } = require("../config/constants.js");
const JoiErrorHandler = require("../utils/errorHandler.utils.js");
const {
  createRatingAndReviewSchema,
} = require("../validations/RatingAndReview.validation.js");
const { idSchema } = require("../validations/General.validation.js");

// create rating
exports.createRatingAndReview = async (req, res) => {
  try {
    // Validate data using Joi
    const { error, value } = createRatingAndReviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // fetch data
    const { courseID, rating, review } = value;
    const userId = req.user.id;

    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // check is user is enrolled or not
    if (!course.studentsEnrolled.includes(userId)) {
      return res.status(403).json({
        success: false,
        message:
          "Only enrolled students are allowed to write rating and review.",
      });
    }
    // we can also find by this method below
    /* // TODO: Testing Required
      const isStudentEnrolled = await Course.findOne({
        _id: courseID,
        studentsEnrolled: { $elemMatch: { $eq: userId } },
      });

      if (!isStudentEnrolled) {
        return res.status(403).json({
          success: false,
          message:
            "Only enrolled students are allowed to write rating and review.",
        });
      }
    */

    // check is user is writing the review for first time only
    const isAlreadyReviewed = await RatingsAndReview.findOne({
      user: userId,
      course: courseID,
    });
    if (isAlreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "You have already rated and reviewed this course",
      });
    }

    // create rating and review
    const newRatingAndReview = await RatingsAndReview.create({
      user: userId,
      course: courseID,
      rating: rating,
      review: review,
    });

    // update the course schema with this rating and review
    await Course.findByIdAndUpdate(courseID, {
      $push: {
        ratingsAndReviews: newRatingAndReview._id,
      },
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "You have successfully reviewed and rated a course.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while rating and reviewing the course",
      error: error.message,
    });
  }
};

// average rating
exports.getAverageRating = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = idSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // get the data
    const { courseID } = value;

    // get the average of rating
    const course = await Course.findById(courseID).populate(
      "ratingsAndReviews"
    );

    const ratingsAndReviewsArray = course.ratingsAndReviews;

    let sum = 0;
    let averageRating = 0;

    // check weather length of ratingsAndReviewsArray is not equal to zero
    if (ratingsAndReviewsArray.length === 0) {
      averageRating = 0;
    } else {
      ratingsAndReviewsArray.forEach((item) => {
        sum += item.rating;
      });
      averageRating = sum / ratingsAndReviewsArray.length;
    }

    // getting the average of ratings by aggregation pipeline
    const averageOfRating = await RatingsAndReview.aggregate([
      {
        $group: {
          _id: "$courseID",
          averageRating: {
            $avg: "$rating",
          },
        },
      },
    ]);

    // return response
    return res.status(200).json({
      success: true,
      message: "Average rating calculated successfully",
      data: averageRating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting average rating",
      error: error.message,
    });
  }
};

// get all rating and reviews based on course
exports.getRatingsAndReviews = async (req, res) => {
  try {
    // validate the data using Joi
    const { error, value } = idSchema.validate(req.body);
    if (error) {
      return res.status(400).json(JoiErrorHandler(error));
    }

    // get the data
    const { courseID } = value;

    // get data from database
    const course = await Course.findById(courseID).populate(
      "ratingsAndReviews"
    );
    const ratingsAndReviews = course.ratingsAndReviews;

    // return response
    return res.status(200).json({
      success: true,
      message: "Fetched ratings ans reviews based on course",
      data: ratingsAndReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting rating and reviews",
      error: error.message,
    });
  }
};

// get all rating
exports.getAllRatingsAndReviews = async (req, res) => {
  try {
    // get all data from database
    const allRatingsAndReviews = await RatingsAndReview.find({
      rating: true,
      review: true,
      user: true,
      course: true,
    })
      .sort({ rating: 1 })
      .populate({
        path: "User",
        select: "firstName lastName avatar email",
      })
      .populate({
        path: "Course",
        select: "title",
      })
      .exec();
    // return response
    return res.status(200).json({
      success: true,
      message: "Fetched all ratings and reviews successfully",
      data: allRatingsAndReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting all rating and reviews",
      error: error.message,
    });
  }
};
