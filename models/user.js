const mongoose = require('mongoose');
const Joi = require('joi');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLenght : 5,
        maxLenght : 15
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        minLenght : 5,
        maxLenght : 15
    },
    phone : {
        type : Number,
        required : true,
        min : 10
    },
    password : {
        type : String,
        required : true,
        minLenght : 6,
        maxLenght : 8
    },
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    var schema = Joi.object({
        name : Joi.string().required(),
        username : Joi.string().required(),
        email : Joi.string().required().email(),
        phone : Joi.number().required(),
        password : Joi.string().min(6).max(14).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;