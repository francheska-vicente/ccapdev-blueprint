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
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', NotesSchema);