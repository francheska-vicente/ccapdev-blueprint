const db = require('../models/db.js');
const Discussion = require('../models/DiscModel.js');
const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');

const classController = {
	getClass: function (req, res) {
        var c = req.params.classID;
        var query = {
        	classID: c
        };

        db.findOne(Course, query, null, function (result) {
            res.render('class', result);
        });
    },

    getClassList: function (req, res) {
        var c = req.params.classID;
        var query = {
            classID: c
        };

        var course;
        db.findOne(Course, query, null, function (result) {
            course = result;
        });

        var userIDs = course.classlist;
        db.findMany(Course, {username : {$in : userIDs}}, '', function (result) {
            var temp = {
                results : result
            }
            res.render('classlist', temp);
        });
    },

    getDiscussions: function (req, res) {
    	var c = req.params.classID;
        var query = {
        	classID: c
        };

        var classInfo;
        var results;
        
        db.findOne (Course, query, null, function (classInfo) {
        	classInfo = classInfo;
        });

        db.findMany (Discussion, query, null, function (err, result) {
            results = result;
        });

        res.render('discussions', classInfo, results);
    },

    getDiscussionsPost: function (req, res) {
        var c = req.params.classID;
        var query = {
            classID: c
        };

        var classInfo;
        var results;
        
        db.findOne (Course, query, null, function (classInfo) {
            classInfo = classInfo;
        });

        db.findMany (Discussion, query, null, function (err, result) {
            results = result;
        });

        res.render('discussions-post', classInfo, results);
    },

    getReqs: function (req, res) {
        var c = req.params.classID;
        var query = {
            classID: c
        };

        db.findOne(Course, query, null, function (result) {
            res.render('reqs', result);
        });
    },

    getNotes : function (req, res) {
        var c = req.params.classID;
        var query = {
            classID: c
        };

        var classInfo;
        var results;
        
        db.findOne (Course, query, null, function (classInfo) {
            classInfo = classInfo;
        });

        db.findMany (Note, query, null, function (err, result) {
            results = result;
        });

        res.render('notes', classInfo, results);
    }
}

module.exports = classController;