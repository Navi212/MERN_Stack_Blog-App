// Register and Login controller for users
const util = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppError, asyncHandler } = require('../services/errorHandler');
const User = require('../models/usersModel');

jwt.sign = util.promisify(jwt.sign);
bcrypt.compare = util.promisify(bcrypt.compare);
bcrypt.hash = util.promisify(bcrypt.hash);

// Register user
exports.registerUser = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    country,
    state,
    address,
  } = req.body;
  // console.log(req.body); // Testing mocked value in unittest
  // console.log('Values for email, password = ', email, password);
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !country ||
    !state ||
    !address
  )
    return next(new AppError('Required fields missing', 400));
  const userExists = await User.findOne({ email });
  // console.log('userExists = ', userExists); // Testing mocked value in unittest

  if (userExists) return next(new AppError('User already exists', 422));

  const hashedPswd = await bcrypt.hash(password, 10);
  // console.log('Password = ', hashedPswd); //Testing mocked value in unittest
  if (!hashedPswd)
    return next(new AppError('Error occured hashing password', 500));
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPswd,
    phone,
    country,
    state,
    address,
  });
  if (user) {
    // console.log('user = ', user); // Testing mocked value in unittest
    return res.status(201).json({ success: true, message: 'User created' });
  }
  return next(new AppError('Error occurred creating user', 500));
});

// Login user
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log('Req.body=> ', req.body); // Testing mocked value in unittest

  if (!email || !password)
    return next(new AppError('Required fields missing', 400));

  const userExists = await User.findOne({ email }).select('+password');
  // console.log('User details from DB=> ', userExists); // Testing mocked value in unittest
  if (!userExists) return next(new AppError('Invalid user account', 404));

  const passwordMatch = await bcrypt.compare(password, userExists.password);
  // console.log('User password compare=> ', passwordMatch); // Testing mocked value in unittest
  if (!passwordMatch) return next(new AppError('Invalid user account', 404));

  const token = await jwt.sign(
    { userId: userExists._id },
    process.env.JWT_SECRET_ACCESS_TOKEN,
    {
      expiresIn: '24h',
    }
  );
  // console.log('token=> ', token); // Testing mocked value in unittest
  if (!token) return next(new AppError('Error signing token', 500));
  // console.log('User logged in successfully. Token: ', token);
  return res.status(200).json({ success: true, token });
});

// Update user Role *****Have not been unit tested yet******
exports.updateUserRole = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { role } = req.body;
  const allowedRoles = ['Admin', 'Moderator', 'User'];

  if (!allowedRoles.includes(role))
    return next(new AppError('Role is not allowed', 400));

  const updatedUser = await User.findByIdAndUpdate(userId, { role });
  if (!updatedUser)
    return next(new AppError('Error occured updating user', 500));

  return res.status(200).json({ success: true, message: 'Role updated' });
});
