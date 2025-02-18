// Api route for Authentication
const express = require('express');

const router = express.Router();

// Register and Login controllers
const {
  registerUser,
  loginUser,
  updateUserRole,
} = require('../controllers/authController');

const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAuthorized } = require('../middlewares/isAuthorized');
const {
  validateInputs,
  userSchema,
} = require('../middlewares/validators/inputValidator');

// Routes for POST requests
router.post('/login', loginUser);
router.post('/register', registerUser);

// Routes for PUT requests
// Update user Role (only SuperAdmins)
router.put(
  '/update',
  isAuthenticated,
  isAuthorized(['SuperAdmin']),
  validateInputs('PUT', userSchema),
  updateUserRole
);

module.exports = router;
