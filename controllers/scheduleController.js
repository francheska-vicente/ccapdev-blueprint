const db = require('../models/db.js');
const controller = require('../controllers/controller.js');
const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');

const scheduleController = {

   getYourSchedule: function (req, res) {
        var user = controller.getLoggedInUser();
        res.render('schedule', user);
    },

    getCreateClass: function (req, res) {
        var user = controller.getLoggedInUser();
        res.render('class-new', user);
    },

    postCreateClass: function (req, res) {
        var user = controller.getLoggedInUser();
        var u = user.username;
        var course = {
            classname : req.body.classname,
            coursecode : req.body.coursecode,
            professor : req.body.professor,
            classtimeA : req.body.classtimeA,
            classdayA : req.body.classdayA,
            classtimeB : req.body.classtimeB,
            classdayB : req.body.classdayB
        }

        db.findOne(Course, course, '', function(flag) {
            if(!flag) {
                db.count (Course, {}, function (result) {
                    course.classID = db.getObjectID();
                    course.classlist = [u];
                    db.insertOne(Course, course, function(flag) {
                        var classes = user.classes;
                        classes.push(course.classID);
                        db.updateOne(User, {username: user.username}, classes, function(result) {
                            res.redirect('/classes/' + course.classID + '/home');
                        });
                    });
                });
            }
        });
    },

    getSearchClass: function (req, res) {
        var user = controller.getLoggedInUser();
        res.render('class-search', user);
    },

    postSearchClass: function (req, res) {
        var search = req.body.search;
        res.redirect('/class/search/results?class=' + search);
    },

    getSearchClassResults: function (req, res) {
        var query = req.params.class;

        db.findMany (Course, {$or:[{classname: query},{coursecode:query}]}, '', function (result) {
            var temp = {
                results : result,
                user : user
            }
            res.render('class-search', temp);
        });
        
    },

    postAddClass: function (req, res) {
        var user = controller.getLoggedInUser();
        var search = req.body.search;
        res.redirect('/class/search/results?class=' + search);
    },

    getDeleteClass: function (req, res) {
        var user = controller.getLoggedInUser();
        var classes = user.classes;
        db.findMany (Course, {classID : {$in : classes}}, '', function (result) {
            var temp = {
                results : result,
                user : user
            }
            res.render('class-drop', temp);
        });
    },

    postDeleteClass: function (req, res) {
        var user = controller.getLoggedInUser();
        var coursecode = req.body.drop;
        var classes = user.classes;
        var index = classes.indexOf(coursecode);
        if (index > -1) {
            classes.splice(index, 1);
        }

        var update = {
            classes : classes
        }

        db.updateOne(User, {username: user.username}, update, function(result) {
                res.redirect('/classes/dashboard');
            });
    }
}

module.exports = scheduleController;