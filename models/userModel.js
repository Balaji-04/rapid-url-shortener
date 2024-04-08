const mongoose = require('mongoose');
const getHash = require('./../utilities/hasher');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name.'],
        lowercase: true
    },
    email: {
        type: String,
        unique: [true, 'User already exists.'],
        required: true,
        validate: [validator.isEmail, 'User didn\'t provide a valid email.']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 8
    },
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user",
        select: false
    },
    apiKey: {
        type: String,
        unique: true
    },
    createdAt: {
        type: String, 
        default: new Date().toISOString(),
        select: false
    },
});

userSchema.methods.convertToJSON = function(){
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    delete obj.createdAt;
    return obj;
};

userSchema.pre("save",async function(next){
    if (!this.password) return;
    if (!this.apiKey) {
        this.apiKey = getHash(String(this.email + Date.now()));
    }
    this.password = getHash(String(this.password));

    next();
});

// userSchema.pre('findOneAndUpdate', async function(next){
//     if (!this.password) return;
//     this.password = getHash(String(this.email + this.password + Date.now()));
//     next();
// });

userSchema.methods.checkPassword = function(DBpassword,currPass){
    const hashed = getHash(currPass);
    return DBpassword === hashed;
}

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;