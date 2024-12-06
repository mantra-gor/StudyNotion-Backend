const AWS = require("aws-sdk");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

// Configure AWS
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

/*
 * Get an instance of any AWS service dynamically.
 * @param {string} serviceName - The name of the AWS service (e.g., "S3", "SES").
 * @returns {object} - An instance of the requested AWS service.
 */
const getAwsService = (serviceName) => {
  if (!AWS[serviceName]) {
    throw new Error(`AWS Service ${serviceName} is not available.`);
  }
  return new AWS[serviceName]();
};

module.exports = getAwsService;
