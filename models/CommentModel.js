var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
    classID : {
        type: String,
        required: true
    },

    userID: {
        type: String,
        required: true
    },
    
    parentID: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date : {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Comments', CommentsSchema);