var mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
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
    
    notesID: {
        type: String,
        required: true
    },

    title : {
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
    },

    numOfComments : {
        type: Number,
        required : true
    }
});

module.exports = mongoose.model('Note', NotesSchema);