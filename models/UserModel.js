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
        required: true
    },
    username: {
        type: String,
        required: true
    }
    bday: {
        type: Date,
        required: true
    }
    phone: {
        type: String,
        required: true
    }
    uni: {
        type: String,
        required: true
    }
    degree: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);