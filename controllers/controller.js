const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Discussion = require('../models/DiscModel.js');
const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');
const Comment = require ('../models/CommentModel.js');
var user;

const controller = {
    getSplash: function (req, res) {
        res.render('splash');
    },

    getSignUp: function (req, res) {
        res.render('register');
    },

    getLogin: function (req, res) {
        res.render('login');
    },

    postLogin: function (req, res) {
        var query = {
            username: req.body.username,
            password: req.body.password
        };

        db.findOne(User, query, '', function(flag) {
            if(flag){
                user = flag;
                res.redirect('/home');
            }
        });
    },

    getHome: function (req, res) {
        res.render('home', user);
    },

    getYourProfile: function (req, res) {
        res.render('profile', user);
    },

    getEditProfile: function (req, res) {
        res.render('editprofile', user);
    },

    postEditProfile: function (req, res) {
        var update = user;

        if (req.body.username != '') update.username = req.body.username;
        if (req.body.contact_no != '') update.phone = req.body.contact_no;
        if (req.body.bday != '') update.bday = req.body.bday;
        if (req.body.degree != '') update.degree = req.body.degree;
        if (req.body.bio != '') update.bio = req.body.bio;
        if (req.body.n_password != '') update.password = req.body.n_password;

        if (req.body.o_password == user.password) {
            db.updateOne(User, {username: user.username}, update, function(result) {
                res.redirect('/profile');
            });
        }
    },

    getDelProfile: function (req, res) {
        res.render('deleteprofile', user);
    },

    postDelProfile: function (req, res) {
        if (user.password == req.body.password && user.password == req.body.c_password) {
            db.deleteOne(User, {username: user.username}, function(flag) {
                if(flag) {
                    res.redirect('/profile-deletion-success');
                }
            });
        }
    },

    getYourSchedule: function (req, res) {
        res.render('schedule', user);
    },

    getAddClass: function (req, res) {
        res.render('newclass', user);
    },

    postAddClass: function (req, res) {
        var u = user.username;
        var id;
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
                    course.classID = id;
                    course.classlist = [u];
                    db.insertOne(Course, course, function(flag) {
                        res.redirect('/classes/' + course.classID + '/home');
                    });
                });
            }
        });
    },

    getSearchClass: function (req, res) {
        res.render('searchclass', user);
    },

    getDeleteClass: function (req, res) {
        res.render('schedule', user);
    },

    getUserProfile: function (req, res) {
        db.findOne(User, {username: req.params.username}, '', function (result) {
            res.render('userprofile', result);
        });
    },

    getUserSchedule: function (req, res) {
        db.findOne(User, {username: req.params.username}, '', function (result) {
            res.render('userschedule', result);
        });
    },

    getDashboard: function (req, res) {
        var classes = user.classes;
        db.findMany(Course, {classID : {$in : classes}}, '', function (result) {
            var temp = {
                results : result
            }
            res.render('dashboard', temp);
        });
    },

    addCommentDiscussions: function (req, res) {
        var d = req.params.discID;
        var c = req.params.classID;

        var fName = user.fName;
        var lName = user.lName;
        var username = user.username;
        
        
        db.count (Comment, {}, function (result) {
            if (result < 10)
                result = "0" + (result + 1);

            var comment = {
                classID : c,
                username: username, 
                fName : fName,
                lName : lName, 
                parentID : d, 
                mainID : d, 
                content : req.body.main_comment_text,
                commentID: ("com" + result)
            };

            db.findOne (Discussion, {discID: d}, {}, function (result) {
                result.numOfComments = result.numOfComments + 1;

                db.updateOne (Discussion, {}, result, function (result) {
                });
            });

            db.insertOne (Comment, comment, function (discInfo) {
                res.redirect ('/classes/' + c + '/discussions/' + d);
            });
        });
    },

    addComment : function (req, res) {
        var d = req.params.discID;
        var c = req.params.classID;
        var p = req.params.commentID;

        var fName = user.fName;
        var lName = user.lName;
        var username = user.username;
        console.log (req.body.comment_text);
        console.log ("hello 0 ");
        db.count (Comment, {}, function (result) {
            if (result < 10)
                result = "0" + (result + 1);
            console.log ("hello 1");
            var comment = {
                classID : c,
                username : username,
                fName : fName,
                lName : lName,
                parentID : p,
                mainID : d,
                commentID : ("com" + result),
                content : req.body.comment_text
            };
            
            db.findOne (Discussion, {discID: d}, {}, function (result) {
                result.numOfComments = result.numOfComments + 1;

                db.updateOne (Discussion, {}, result, function (result) {
                });
            });
            console.log ("hello 3");
            db.insertOne (Comment, comment, function (discInfo) {
                res.redirect ('/classes/' + c + '/discussions/' + d);
            });
        });
    },

    addNewDisc : function (req, res) {
        console.log ('heheheheh');
        var c = req.params.classID;
        
        db.count (Discussion, {}, function (result) {
            if (result < 10)
                result = "0" + (result + 1);

            var fName = user.fName;
            var lName = user.lName;
            var username = user.username;

            var discussion = {
                classID : c,
                username : username,
                fName : fName,
                lName : lName,
                discID : ("disc" + result),
                title : req.body.title,
                content: req.body.new_paragraph_text,
                numOfComments : 0, 
            };

            db.insertOne (Discussion, discussion, function (result) {
                res.render ('/classes/' + c + '/discussions');
            });
        });
    }
}

module.exports = controller;