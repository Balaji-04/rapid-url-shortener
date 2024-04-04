const express = require('express');
const authController = require('./../controllers/authController');
const encodeController = require('./../controllers/encodeController');
//const userRoute = require('./userRoute');

const router = express.Router();

router.post('/', authController.validateURL ,encodeController);
//router.use('/users', userRoute);

module.exports = router;