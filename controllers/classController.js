const db = require('../models/db.js');
const Discussion = require('../models/DiscModel.js');
const Course = require ('../models/ClassModel.js');

const classController = {
	getClass: function (req, res) {
        var c = req.params.classID;
        var query = {
        	classID: c
        };

        db.findOne(Course, query, null, function (result) {
            res.render(Course, result);
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
    }
}

module.exports = classController;