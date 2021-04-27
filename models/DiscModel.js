var mongoose = require('mongoose');

var DiscSchema = new mongoose.Schema({
    classID : {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },
    
    discID: {
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
        required: true
    }
});

module.exports = mongoose.model('Discussion', DiscSchema);