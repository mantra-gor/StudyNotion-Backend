const jwt = require("jsonwebtoken");

exports.generateTokens = (user) => {
  const accessTokenPayload = {
    email: user.email,
    id: user._id,
    accountType: user.accountType,
    isDeleted: user.isDeleted,
  };

  const refreshTokenPayload = {
    id: user._id,
  };

  // generating tokens
  const accessToken = jwt.sign(
    accessTokenPayload,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    refreshTokenPayload,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
};
