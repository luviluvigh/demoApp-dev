const express = require('express');
const router = express.Router();
// import require modules
const {
	signupWithEmailPassword,
	loginEmailPassword,
	loginWithPhoneNumber
} = require('../services/authentication');

/**
 * register with email and password handler
 * returns user id and email
 */
router.post('/signup/email', (req, res, next) => {
	signupWithEmailPassword(req, res, next);
});

/**
 * login with email and password handler
 * returns token
 */
router.post('/login', (req, res, next) => {
	loginEmailPassword(req, res, next);
});

/**
 * signup with phone number
 * OTP
 * return ToDo: yet to verify which stack to use
 */
router.post('/signup/phonenumber', (req, res, next) => {
	// To Do: implement phone number authentication
	loginWithPhoneNumber(res, res, next);
});

module.exports = router;
