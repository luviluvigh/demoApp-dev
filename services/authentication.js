const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// import from other modules
const config = require('../config/config');
const User = require('../models/Users');
const {emailPasswordChecker} = require('./_helpers');

const key = config.JWT_SECRET_KEY;

/**
 * signup or register using email and password
 * encrypt password using bcrypt
 * return the user
 * signupWithEmailPassword
 */
const signupWithEmailPassword = async (req, res, next) => {
	const {email, password, confirmPassword} = req.body;

	// checker helper
	emailPasswordChecker(email, password, confirmPassword, res);

	try {
		// check if email already exist
		const oldUser = await User.findOne({email});

		if (oldUser) {
			return res.status(401).json({
				message: 'Email already exist'
			});
		}

		// hash the password
		const hashPassword = await bcrypt.hash(password, 12);

		if (hashPassword) {
			const newUser = new User({
				email,
				password: hashPassword
			});

			// save the user into the db
			const user = await newUser.save();

			return res.status(201).json({
				message: 'User was created',
				userId: user.id,
				email: user.email
			});
		}
	} catch (error) {
		res.status(500).json({
			error
		});
	}
};

/**
 * login using phone number
 * To Do: use a third party services
 * logins in user and register user as well
 * loginWithPhoneNumber
 * TODO: chose between firebase or build our own system
 */
// TO DO: decide on with third party API to use or build our own logic
const loginWithPhoneNumber = async (req, res, next) => {
	// TO DO: decide on with third party API to use or build our own logic
};

/**
 * login with email and password
 * use jwt to sign a token
 * returns user id and token
 * loginEmailPassword
 */
const loginEmailPassword = async (req, res, next) => {
	const {email, password} = req.body;

	// checker helper
	emailPasswordChecker(email, password, res);

	try {
		// find user by the email
		const userExist = await User.findOne({email});

		if (!userExist) {
			return res.status(401).json({
				message: 'Authentication failed'
			});
		}

		// compare password
		const passwordMatch = await bcrypt.compare(password, userExist.password);

		if (!passwordMatch) {
			return res.status(401).json({
				message: 'Authentication failed'
			});
		}

		// jwt signing
		const token = await jwt.sign(
			{
				userId: userExist.id,
				email: userExist.email
			},
			key
		);

		return res.status(200).json({
			message: 'Authentication success',
			token
		});
	} catch (error) {
		res.status(500).json({
			error
		});
	}
};

module.exports = {
	signupWithEmailPassword,
	loginEmailPassword,
	loginWithPhoneNumber
};
