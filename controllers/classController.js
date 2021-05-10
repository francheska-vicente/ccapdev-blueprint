const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');

const classController = {

	getDashboard: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gest user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var classes = user.classes;

                // get user's classes from db
                db.findMany (Course, {classID : {$in : classes}}, '', function (result) {

                    // checks for notifications
                    var notif = null;
                    if (req.query.addsuccess == 'true') var notif = 'You have successfully enrolled in the class!';
                    else if (req.query.addsuccess == 'false') var notif = 'Enrollment unsuccessful.'; 
                    else if (req.query.removesuccess == 'true') var notif = 'You have successfully dropped the class!';
                    else if (req.query.removesuccess == 'false') var notif = 'Dropping unsuccessful.'; 

                    var temp = {results : result, notif : notif};
                    res.render('dashboard', temp);
                });
            });
        }  
    },

	getClass: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets class from db
    		db.findOne(Course, {classID: req.params.classID}, null, function (course) {

                // error 404 if class does not exist
    			if(!course) res.redirect('/error/404');
                else {

                    // gets user from db
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

            // gets class from db
            db.findOne(Course, {classID: req.params.classID}, null, function (course) {

                // error 404 if class does not exist
                if(!course) res.redirect('/error/404');
                else {

                    // get users from db
                    db.findOne(User, {username: req.session.username}, '', function (user) {

                        // error 403 if user not part of class
                        if(course.classlist.indexOf(user.username) == -1) res.redirect('/error/403');
                        else {

                            // gets students enrolled in course from db
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