const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');

const scheduleController = {

    getYourSchedule: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var result = {
                    classes : user.classes
                }

                res.render('schedule', result);
            });
        }  
    },

    getClasses: function(req, res) {
        var username = req.query.username;
        if(!username) username = req.session.username;
        
        db.findOne(User, {username: username}, '', function (user) {
            db.findMany (Course, {classID : {$in : user.classes}}, '', function (result) {
                res.send(result);
            });
        });
    },

    getCreateClass: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {
                res.render('class-new', user);
            });
        }  
    },

    postCreateClass: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {

                // creates class object
                var classes = user.classes;

                var search = req.body.classname;
                var arr = search.split (' ');

                for (var i = 0; i < arr.length; i++)
                {
                    arr [i] = arr [i].toLowerCase ();
                    arr [i] = arr [i].charAt (0).toUpperCase () + arr [i].substring (1, arr [i].length);

                    if (i > 0)
                        arr [i] = arr [i - 1] + " " + arr [i];
                }

                var course = {
                    classname : arr[arr.length - 1],
                    coursecode : req.body.coursecode.toUpperCase (),
                    professor : req.body.professor,
                    start_classtimeA : req.body.start_classtimeA,
                    end_classtimeA : req.body.end_classtimeA,
                    classdayA : req.body.classdayA,
                    start_classtimeB : req.body.start_classtimeB,
                    end_classtimeB : req.body.end_classtimeB,
                    classdayB : req.body.classdayB
                }
                
                // checks if class alrerady exists
                db.findOne(Course, course, '', function(flag) {
                    if(!flag) {
                        course.classID = db.getObjectID();
                        course.classlist = [req.session.username];

                        // creates class and adds user as part of class
                        db.insertOne(Course, course, function(flag) {
                            classes.push(course.classID);

                            // updates user's classes
                            db.updateOne(User, {username: req.session.username}, {classes: classes}, function(result) {
                                res.redirect('/classes/' + course.classID + '/home');
                            });
                        });
                    }
                    // add else here (if class exists)
                });
            });
        }    
    },

    getSearchClass: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else res.render('class-search');
    },

    postSearchClass: function (req, res) {

        // gets user input from search bar
        var search = req.body.search;
        
        res.redirect('/class/search/results?class=' + search);
    },

    getSearchClassResults: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {

                // gets query from url
                var queryCode = req.query.search.toUpperCase ();

                var queryName = req.query.search;
                var arr = queryName.split (' ');

                for (var i = 0; i < arr.length; i++)
                {
                    arr [i] = arr [i].toLowerCase ();
                    arr [i] = arr [i].charAt (0).toUpperCase () + arr [i].substring (1, arr [i].length);

                    if (i > 0)
                        arr [i] = arr [i - 1] + " " + arr [i];
                }

                // gets classes that meet the given parameters
                db.findMany (Course, {$or:[{classname: arr [arr.length - 1]},{coursecode:queryCode}]}, '', function (result) {
                    var temp = {
                        results : result,
                        user : user
                    }
                    console.log (result);
                    res.render('class-search-results', temp);
                });
            });
        }
    },

    postAddClass: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {
                db.findOne(Course, {classID: req.params.classID}, '', function (course) {

                    // adds class to user's classes
                    user.classes.push (course.classID);
                    // adds user to class's classlist
                    course.classlist.push (user.username);

                    db.updateOne (Course, {classID : course.classID}, course, function (flag) {
                        if(flag) {
                            db.updateOne (User, {username : user.username}, user, function (flag) {
                                if(flag) res.redirect('/classes/dashboard?addsuccess=true');
                                else res.redirect('/classes/dashboard?addsuccess=false');
                            });
                        }
                        else res.redirect('/classes/dashboard?addsuccess=false');
                    });
                });
            });
        }  
    },

    getDeleteClass: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var classes = user.classes;

                // gets user's classes from db
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

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {

                // gets coursecode of class to drop, removes from user's classes
                var coursecode = req.body.drop;
                var index = user.classes.indexOf(coursecode);
                if (index > -1) user.classes.splice(index, 1);

                // updates user in db
                db.updateOne(User, {username: user.username}, {classes : user.classes}, function (flag) {
                    if(flag) res.redirect('/classes/dashboard?removesuccess=true');
                    else res.redirect('/classes/dashboard?removesuccess=false');
                });
            });
        }
    }
}

module.exports = scheduleController;