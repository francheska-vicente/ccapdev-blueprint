var mongoose = require('mongoose');

var ReqsSchema = new mongoose.Schema({
    classID : {
        type: String,
        required: true
    },

    userID: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    typeOfReq : {
        type: String,
        required: true
    },

    postDate : {
        type: Date,
        required: true
    },

    deadline : {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Requirement', ReqsSchema);