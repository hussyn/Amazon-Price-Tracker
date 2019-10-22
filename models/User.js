const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    //give different access rights if admin or not
    isAdmin: { type: Boolean, default: false }
});

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin }, //TODO: will include more info
        process.env.PRIVATE_KEY
    );
    return token;
};

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(3)
            .max(255)
            .required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
