var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
    classname: {
        type: String,
        required: true
    },
    classID : {
        type: String,
        required: false
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
        type: String,
        required: true
    },
    classtimeB: {
        type: String,
        required: false
    },
    classdayB: {
        type: String,
        required: false
    },
    classlist : {
        type : [String],
        required: false
    }
});

module.exports = mongoose.model('Course', CourseSchema);