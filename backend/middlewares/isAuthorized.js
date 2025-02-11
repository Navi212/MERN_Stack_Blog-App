// Checks if user is authorized

const jwt = require('jsonwebtoken');
const util = require('util');

jwt.verify = util.promisify(jwt.verify);
const { asyncHandler, AppError } = require('../services/errorHandler');
const User = require('../models/usersModel');

jwt.verify = util.promisify(jwt.verify);

exports.isAuthorized = (allowedRoles = []) =>
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user);
    if (!allowedRoles.includes(user.role))
      return next(new AppError('Access denied', 403));
    req.userId = req.user;
    return next();
  });
