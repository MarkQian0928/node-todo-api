
const mongoose = require('mongoose');
const validator = require('validator');

//unique: true 代表了property email does not have the same value as anyother documents in the collection
//validate: --> 去mongoose custom validate查， 要用到third party library, validate npm
var User = mongoose.model('User',{
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
    tokens:[{
        access: {
            type: String,
            required: true
        },
        token: {
            type:String,
            required: true
        }
    }]
});

module.exports = {User};
