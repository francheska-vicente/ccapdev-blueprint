var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
    classID : {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    fName : {
        type: String,
        required: true
    },

    lName : {
        type: String,
        required: true
    },
    
    // the direct parent of the comment
    parentID: {
        type: String,
        required: true
    },

    // the discID or notesID 
    mainID: {
        type: String,
        required: true
    },

    commentID : {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date : {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Comments', CommentsSchema);