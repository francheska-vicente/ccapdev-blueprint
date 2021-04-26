var mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
    classID : {
        type: String,
        required: true
    },

    userID: {
        type: String,
        required: true
    },
    
    notesID: {
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

module.exports = mongoose.model('Notes', NotesSchema);