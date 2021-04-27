const db = require('../models/db.js');
const User = require('../models/UserModel.js');
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
        db.findOne(Course, {classID: req.params.classID}, null, function (resultC) {
            db.findMany(User, {username : {$in : resultC.classlist}}, '', function (resultU) {
                var result = {
                    users : resultU,
                    coursecode : resultC.coursecode,
                    classID : resultC.classID
                }
                res.render('classlist', result);
            });
        });
    },

    getDiscussions: function (req, res) {
    	var c = req.params.classID;
    
        var coursecode;
        var classID;
       
        db.findOne (Course, {classID: c}, null, function (result) {
            coursecode = result.coursecode;
            classID = result.classID;
        }); 
       
        db.findMany (Discussion, {classID: c}, null, function (result) {
            var temp = {
                coursecode: coursecode, 
                classID: coursecode, 
                results: result
            }
           res.render('discussions', temp);
        });  
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