const parseResponse = require('./../utilities/parseResponse');
const jwt = require('jsonwebtoken');
const catchASync = require('./../utilities/catchAsync');
const UserModel = require('./../models/userModel');
const validator =require('validator');


const protectAndVerify = catchASync(async function(req,res, next){
    if (!req.headers.authorization && !req.headers.authorization.startsWith('Bearer')){
        return res.status(400).json(parseResponse('error', 'No auth bearer'));
    }
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET);

    const payload = jwt.decode(token);
    //console.log(payload);
    let userPrev = await UserModel.findOne({ _id : payload.id });
    if (!userPrev) {
        res.status(400).json(parseResponse('error', 'user does not exist'));
    }
    req.id = payload.id;
    next();
});


const validateURL = async (req,res,next) => {
    if (req.body.longURL && !validator.isURL(req.body.longURL)){
        res.status(400).json( parseResponse('error', 'Please provide a valid URL'));
        return;
    }
    req.valid = true;
    next();
};


module.exports = {protectAndVerify,validateURL};