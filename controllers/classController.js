const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');
const Discussion = require('../models/DiscModel.js');
const Note = require ('../models/NotesModel.js');
const Reqs = require ('../models/ReqsModel.js');
const Comment = require ('../models/CommentModel.js');

const classController = {

	getDashboard: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var classes = user.classes;
                db.findMany (Course, {classID : {$in : classes}}, '', function (result) {
                    var temp = {
                        results : result
                    }
                    res.render('dashboard', temp);
                });
            });
        }  
    },

	getClass: function (req, res) {
		db.findOne(Course, {classID: req.params.classID}, null, function (result) {
			if(result == null) res.redirect('/error/404');
			res.render('class', result);
		});
	},

	getClassList: function (req, res) {
		db.findOne(Course, {classID: req.params.classID}, null, function (resultC) {
			if(resultC == null) res.redirect('/error/404');
			db.findMany(User, {username : {$in : resultC.classlist}}, '', function (resultU) {
				var result = {
					users : resultU,
					coursecode : resultC.coursecode,
					classID : resultC.classID
				}
				res.render('classlist', result);
			});
		});
	}
}

module.exports = classController;