var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    classname: {
        type: String,
        required: true
    },
    coursecode: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    classtimeA: {
        type: String,
        required: true
    },
    classdayA: {
        type: Date,
        required: true
    },
    classtimeB: {
        type: String,
        required: true
    },
    classdayB: {
        type: Date,
        required: true
    },
    classList : {
        type : [String],
        required: false
    }
});

module.exports = mongoose.model('Class', ClassSchema);