var mongoose = require('mongoose');

var ReqsSchema = new mongoose.Schema({
    classID : {
        type: String,
        required: true
    },

    username: {
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
        required: true,
        default: Date.now
    },

    deadline : {
        type: Date,
        required: true
    },

    reqID : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Requirement', ReqsSchema);