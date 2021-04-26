const db = require('../models/db.js');
const Discussions = require('../models/DiscModel.js');
const Courses = require ('../models/ClassModel.js');

const classController = {
	getClass: function (req, res) {
        var c = req.params.classID;
        var query = {
        	classID: c
        };

        db.findOne(Courses, query, null, function (result) {
            res.render(Courses, result);
        });
    },

    getDiscussions: function (req, res) {
    	var c = req.params.classID;
        var query = {
        	classID: c
        };

        var classInfo;
        var results;
        
        db.findOne (Courses, query, null, function (classInfo) {
        	classInfo = classInfo;
        });

        db.findMany (Discussions, query, null, function (err, result) {
            results = result;
        });

        res.render('discussions', classInfo, results);
    }
}

module.exports = classController;