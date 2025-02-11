// Checks if user is authenticated/logged in

const jwt = require('jsonwebtoken');
const util = require('util');
const { AppError } = require('../services/errorHandler');
const { asyncHandler } = require('../services/errorHandler');
const User = require('../models/usersModel');

jwt.verify = util.promisify(jwt.verify);

// Check if a user is logged in with valid token
exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  // Split the token from the sample "Bearer TokenHere"
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  )
    return next(
      new AppError(
        'Missing/Invalid Authorization header with Bearer Token',
        400
      )
    );
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return next(new AppError('Invalid/No token', 401));
  const decodedToken = await jwt.verify(
    token,
    process.env.JWT_SECRET_ACCESS_TOKEN
  );
  if (!decodedToken) return next(new AppError('Invalid/No token', 401));
  const user = await User.findById(decodedToken.userId);
  if (!user) return next(new AppError('Invalid/No token', 401));
  req.user = decodedToken.userId;
  return next();
});
