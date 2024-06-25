const Joi = require("joi");
const { descriptionSchema } = require("./General.validation");

const createRatingAndReviewSchema = Joi.object({
  courseID: Joi.string().required(),
  rating: Joi.number().min(0).max(5).required(),
  review: descriptionSchema,
});

module.exports = { createRatingAndReviewSchema };
