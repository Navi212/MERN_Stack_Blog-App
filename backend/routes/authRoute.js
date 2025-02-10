// Api route for Authentication
const express = require('express');

const router = express.Router();

// Register and Login controllers
const { registerUser, loginUser } = require('../controllers/authController');

// Routes for POST requests
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
