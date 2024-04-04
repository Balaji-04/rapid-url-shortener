const parseResponse = require('./../utilities/parseResponse');
const UserModel = require('./../models/userModel');
const getHash = require('./../utilities/hasher');
const jwt = require('jsonwebtoken');

const catchASync = require('./../utilities/catchAsync');

const getAllUsers = catchASync(async function(req,res){
    let accessingUser = await UserModel.findById(req.id).select('+role');
    accessingUser = accessingUser.convertToJSON();
    if (accessingUser.role !== 'admin'){
        return res.status(403).json(parseResponse('error', 'not enough access rights'));
    }
    let user = await UserModel.find();
    user = user.map((value) => {
        return value.convertToJSON();
    });
    res.status(200).json( parseResponse('success', {
        usersCount: user.length,
        users: user
    }));
});

const createUser = catchASync(async function(req,res){
    const name = req.body.name.toLowerCase();
    const email = req.body.email;
    const pass = req.body.password;

    if (!name || !email || !pass){
        res.status(400).json( parseResponse('error', 'parameter missing'));
        return;
    }
    
    let user = await UserModel.create({
        name: name,
        email: email,
        password: pass
    });

    user = await user.convertToJSON();
    let token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json( parseResponse('success', {token, user}));
});

const updateUser = catchASync(async function(req,res){
    if (!req.body){
        res.status(400).json(parseResponse('error', 'parameter missing'));
        return;
    }
    if (req.body.role){
        delete req.body.role;
    }
    let userPrev = await UserModel.findOne({ _id : req.id });
    // if (!userPrev) {
    //     res.status(400).json(parseResponse('error', 'user does not exist'));
    // }
    //userPrev = userPrev.convertToJSON();
    let email = userPrev.email;

    if (req.body.email) {
        email = req.body.email;
    }
    if (req.body.password){
        req.body.password = getHash(String(req.body.password));
    }
    let user = await UserModel.findOneAndUpdate({
        _id: req.id
    }, req.body, {
        runValidators:true,
        new: true
    });
    user = user.convertToJSON();
    res.status(200).json( parseResponse('success', user));
});

const getUser = catchASync(async function(req,res){
    let user = await UserModel.findById(req.id);
    user = user.convertToJSON();
    res.status(200).json(parseResponse('success',user));
});

const login = catchASync(async function(req, res, next){
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json(parseResponse('error', 'please provide email and password.'));
    }

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user.checkPassword(user.password, password)){
        return res.status(400).json( parseResponse('error', 'Invalid userName or Password') );
    }
    
    let token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    return res.status(200).json(parseResponse('success', {token}));
});

module.exports = {getAllUsers, createUser, updateUser, getUser, login};