var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bday: {
        type: Date,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    uni: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: false
    },
    classes: {
        type: [String],
        required: false
    },
    picfilename: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('User', UserSchema);