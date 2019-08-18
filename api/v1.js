/**
 * This is the index file of the api which
 * will be pointing all the available routes in the api
 */
const express = require('express');
const router = express.Router();

// auth route
router.use('/auth', require('./auth'));

// To Do: Point to all available route in the API

module.exports = router;
