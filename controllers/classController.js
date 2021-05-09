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
                    var temp = {results : result}
                    res.render('dashboard', temp);
                });
            });
        }  
    },

	getClass: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
    		db.findOne(Course, {classID: req.params.classID}, null, function (course) {
    			if(!course) res.redirect('/error/404');
                else {
                    db.findOne(User, {username: req.session.username}, '', function (user) {
                        if(course.classlist.indexOf(user.username) == -1) res.redirect('/error/403');
                        else res.render('class', course);
                    });
                }
    		});
        }
	},

	getClassList: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(Course, {classID: req.params.classID}, null, function (course) {
                if(!course) res.redirect('/error/404');
                else {
                    db.findOne(User, {username: req.session.username}, '', function (user) {
                        if(course.classlist.indexOf("user.username") == -1) res.redirect('/error/403');
                        else {
                            db.findMany(User, {username : {$in : resultC.classlist}}, '', function (users) {
                                var result = {
                                    users : users,
                                    coursecode : course.coursecode,
                                    classID : course.classID
                                }
                                res.render('classlist', result);
                            });
                        } 
                    });
                }
            });
        }
	}
}

module.exports = classController;