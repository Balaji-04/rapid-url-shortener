const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

//middleware to check fields in req;


router.get('/get', authController.protectAndVerify, userController.getUser).post('/signup', userController.createUser).patch('/',authController.protectAndVerify, userController.updateUser);
router.get('/all', authController.protectAndVerify,userController.getAllUsers).post('/login',userController.login);

module.exports = router;