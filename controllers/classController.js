const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');

const classController = {

	getDashboard: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // get user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var classes = user.classes;

                // get user's classes from db
                db.findMany (Course, {classID : {$in : classes}}, '', function (result) {
                    var temp = {results : result}
                    res.render('dashboard', temp);
                });
            });
        }  
    },

	getClass: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // get class from db
    		db.findOne(Course, {classID: req.params.classID}, null, function (course) {

                // error 404 if class does not exist
    			if(!course) res.redirect('/error/404');
                else {

                    // get user from db
                    db.findOne(User, {username: req.session.username}, '', function (user) {

                        // error 403 if user not part of class
                        if(course.classlist.indexOf(user.username) == -1) res.redirect('/error/403');
                        else res.render('class', course);
                    });
                }
    		});
        }
	},

	getClassList: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // get class from db
            db.findOne(Course, {classID: req.params.classID}, null, function (course) {

                // error 404 if class does not exist
                if(!course) res.redirect('/error/404');
                else {

                    // get user from db
                    db.findOne(User, {username: req.session.username}, '', function (user) {

                        // error 403 if user not part of class
                        if(course.classlist.indexOf(user.username) == -1) res.redirect('/error/403');
                        else {

                            // get students enrolled in course from db
                            db.findMany(User, {username : {$in : course.classlist}}, '', function (users) {
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