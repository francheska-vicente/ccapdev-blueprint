const db = require('../models/db.js');
const Discussion = require('../models/DiscModel.js');
const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');
const Comment = require ('../models/CommentModel.js');

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
    
        var coursecode;
       
        db.findOne (Course, {classID: c}, null, function (result) {
            coursecode = result.coursecode;
        }); 
       
        db.findMany (Discussion, {classID: c}, null, function (result) {
            var temp = {
                coursecode: coursecode, 
                results: result
            }
            
           res.render('discussions', temp);
        });  
    },

    getDiscussionsPost: function (req, res) {
        var c = req.params.discID;
        
        var discInfo;
        var results;
        
        db.findOne (Discussion, {discID: c}, null, function (result) {
            discInfo = result;
        });

        db.findMany (Comment, {mainID: c}, null, function (result) {
            var temp = {
               discInfo: discInfo, 
               results: result
            }
            res.render('discussions-post', temp);
        });
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