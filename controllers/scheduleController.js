const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');

const scheduleController = {

    getYourSchedule: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                res.render('schedule', user);
            });
        }  
    },

    getCreateClass: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                res.render('class-new', user);
            });
        }  
    },

    postCreateClass: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var classes = user.classes;
                console.log(classes)
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
                        course.classID = db.getObjectID();
                        course.classlist = [req.session.username];
                        db.insertOne(Course, course, function(flag) {
                            classes.push(course.classID);
                            db.updateOne(User, {username: req.session.username}, {classes: classes}, function(result) {
                                res.redirect('/classes/' + course.classID + '/home');
                            });
                        });
                    }
                });
            });
        }    
    },

    getSearchClass: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                res.render('class-search', user);
            });
        }  
    },

    postSearchClass: function (req, res) {
        var search = req.body.search;
        res.redirect('/class/search/results?class=' + search);
    },

    getSearchClassResults: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var query = req.query.search;
                db.findMany (Course, {$or:[{classname: query},{coursecode:query}]}, '', function (result) {
                    var temp = {
                        results : result,
                        user : user
                    }
                    res.render('class-search-results', temp);
                });
            });
        }
    },

    postAddClass: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var c = req.params.classID;
                user.classes.push (c);
                db.updateOne (User, {username : user.username}, user, function (result) {
                    res.redirect('/schedule/search');
                });
            });
        }  
    },

    getDeleteClass: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var classes = user.classes;
                db.findMany (Course, {classID : {$in : classes}}, '', function (result) {
                    var temp = {
                        results : result,
                        user : user
                    }
                    res.render('class-drop', temp);
                });
            });
        }
    },

    postDeleteClass: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var coursecode = req.body.drop;
                var index = classes.indexOf(coursecode);
                if (index > -1) classes.splice(index, 1);

                db.updateOne(User, {username: user.username}, {classes : user.classes}, function(result) {
                    res.redirect('/classes/dashboard');
                });
            });
        }
    }
}

module.exports = scheduleController;