const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//signup
router.post('/signup', userController.signupUser);

// login
router.post('/login', userController.login);

module.exports = router;
