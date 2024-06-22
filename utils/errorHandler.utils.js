function JoiErrorHandler(error) {
  return {
    success: false,
    message: error.details[0].message,
  };
}

module.exports = JoiErrorHandler;
