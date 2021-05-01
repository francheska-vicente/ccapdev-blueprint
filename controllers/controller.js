const mongoose = require('mongoose');
const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Discussion = require('../models/DiscModel.js');
const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');
const Comment = require ('../models/CommentModel.js');
const Reqs = require ('../models/ReqsModel.js');
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
        res.render('profile-view', user);
    },

    getEditProfile: function (req, res) {
        res.render('profile-edit', user);
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
        res.render('profile-del', user);
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
        res.render('class-new', user);
    },

    postAddClass: function (req, res) {
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
        res.render('class-search', user);
    },

    postSearchClass: function (req, res) {
        res.redirect('/class/search/results?class=' + fName);
    },

    getSearchClassResults: function (req, res) {
        var queryName = {classname: req.params.class};
        var queryCode = {coursecode: req.params.class};

        db.findMany (Course, {classID : queryName}, '', function (result) {
            var temp = {
                results : result,
                user : user
            }
            res.render('class-drop', temp);
        });

        res.render('class-search', user);
    },

    getDeleteClass: function (req, res) {
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
        db.findMany (Course, {classID : {$in : classes}}, '', function (result) {
            var temp = {
                results : result
            }
            res.render('dashboard', temp);
        });
    },

    getDiscussionPost: function (req, res) {
        var c = req.params.classID;
        var b = req.params.discID;

        var coursecode, temp = user;
        var content, title, author, fName, lName, loggedIn = temp.username;

        var comments;

        db.findOne (Course, {classID : c}, null, function (classInfo) {
            coursecode = classInfo.coursecode;
        });

        db.findOne (Discussion, {discID : b}, null, function (discInfo) {
            if (discInfo != undefined)
            {
                content = discInfo.content;
                title = discInfo.title;
                author = discInfo.username;
                fName = discInfo.fName;
                lName = discInfo.lName;
            }
        });

        db.findMany (Comment, {mainID: b}, null, function (result) {
            var disc = {
                content: content,
                title: title,
                username : author,
                discID : b,
                lName : lName,
                fName : fName,
            }

            var temp = {
                coursecode: coursecode,
                disc : disc,
                comments : result, 
                classID: c,
                currentUser : loggedIn
            }

            res.render('discussion-post', temp);
        });
    },

    addCommentToDiscussion: function (req, res) {
        var d = req.params.discID;
        var c = req.params.classID;

        var fName = user.fName;
        var lName = user.lName;
        var username = user.username;
        var id = db.getObjectID();


        var comment = {
            classID : c,
            username: username, 
            fName : fName,
            lName : lName, 
            parentID : d, 
            mainID : d, 
            content : req.body.main_comment_text,
            commentID: id
        };

        db.findOne (Discussion, {discID: d}, {}, function (result) {
            result.numOfComments = result.numOfComments + 1;

            db.updateOne (Discussion, {}, result, function (result) {
            });
        });

        db.insertOne (Comment, comment, function (discInfo) {
            res.redirect ('/classes/' + c + '/discussions/' + d);
        });

    },

    addCommentToComment : function (req, res) {
        var d = req.params.discID;
        var c = req.params.classID;
        var p = req.params.commentID;

        var fName = user.fName;
        var lName = user.lName;
        var username = user.username;
        var id = db.getObjectID();
        console.log (req.body.comment_text);
        

        var comment = {
            classID : c,
            username : username,
            fName : fName,
            lName : lName,
            parentID : p,
            mainID : d,
            commentID : id,
            content : req.body.comment_text
        };

        db.findOne (Discussion, {discID: d}, {}, function (result) {
            result.numOfComments = result.numOfComments + 1;

            db.updateOne (Discussion, {}, result, function (result) {
            });
        });

        db.insertOne (Comment, comment, function (discInfo) {
            res.redirect ('/classes/' + c + '/discussions/' + d);
        });
    },

    postAddDiscussion : function (req, res) {
        
        var c = req.params.classID;
        var id = db.getObjectID();
        var fName = user.fName;
        var lName = user.lName;
        var username = user.username;

        var discussion = {
            classID : c,
            username : username,
            fName : fName,
            lName : lName,
            discID : id,
            title : req.body.title,
            content: req.body.new_paragraph_text,
            numOfComments : 0, 
        };

        db.insertOne (Discussion, discussion, function (result) {
            res.redirect ('/classes/' + c + '/discussions');
        });
    },

    postAddNotes : function (req, res) {
        var temp = user;
        var c = req.params.classID;
        var content = req.body.paragraph_text;
        var title = req.body.title;
        var notesID = db.getObjectID();
        var username = temp.username;
        var fName = temp.fName;
        var lName = temp.lName;

        var notes = {
            classID : c,
            username : username,
            notesID : notesID,
            content : content,
            title : title,
            numOfComments : 0,
            fName : fName,
            lName : lName
        };

        db.insertOne (Note, notes, function (result) {
            res.redirect ('/classes/' + c + '/notebook');
        });
    },

    getNotesPost : function (req, res) {
        var c = req.params.classID;
        var b = req.params.notesID;

        var coursecode;
        var content, title, author, fName, lName;

        try
        {
            var loggedIn = user.username;
        } catch (error) {}

        db.findOne (Course, {classID : c}, null, function (classInfo) {
            coursecode = classInfo.coursecode;
        });

        db.findOne (Note, {notesID : b}, null, function (notesInfo) {
            if (notesInfo != undefined)
            {
                content = notesInfo.content;
                title = notesInfo.title;
                author = notesInfo.username;
                fName = notesInfo.fName;
                lName = notesInfo.lName;
            }
        });

        db.findMany (Comment, {mainID: b}, null, function (result) {
            var notes = {
                content: content,
                title: title,
                username : author,
                notesID : b,
                lName : lName,
                fName : fName
            }

            var temp = {
                coursecode: coursecode,
                notes : notes,
                comments : result, 
                classID: c,
                currentUser : loggedIn,
            }

            res.render('notes-post', temp);
        });
    },

    addCommentToNotes: function (req, res) {
        var d = req.params.notesID;
        var c = req.params.classID;

        var fName = user.fName;
        var lName = user.lName;
        var username = user.username;
        var id = db.getObjectID();


        var comment = {
            classID : c,
            username: username, 
            fName : fName,
            lName : lName, 
            parentID : d, 
            mainID : d, 
            content : req.body.main_comment_text,
            commentID: id
        };

        db.findOne (Note, {notesID: d}, {}, function (result) {
            result.numOfComments = result.numOfComments + 1;

            db.updateOne (Note, {}, result, function (result) {
            });
        });

        db.insertOne (Comment, comment, function (discInfo) {
            res.redirect ('/classes/' + c + '/notebook/' + d);
        });
    },

    addCommentToCommentNotes: function (req, res) {
        var d = req.params.notesID;
        var c = req.params.classID;
        var p = req.params.commentID;

        var fName = user.fName;
        var lName = user.lName;
        var username = user.username;
        var id = db.getObjectID();
        console.log (req.body.comment_text);
        console.log ("hello");
        var comment = {
            classID : c,
            username : username,
            fName : fName,
            lName : lName,
            parentID : p,
            mainID : d,
            commentID : id,
            content : req.body.comment_text
        };

        db.findOne (Note, {notesID: d}, {}, function (result) {
            result.numOfComments = result.numOfComments + 1;

            db.updateOne (Note, {}, result, function (result) {
            });
        });

        db.insertOne (Comment, comment, function (notesInfo) {
            res.redirect ('/classes/' + c + '/notebook/' + d);
        });
    },

    postAddReqs : function (req, res) {
        var c = req.params.classID;
        var id = db.getObjectID();
        var fName = user.fName;
        var lName = user.lName;
        var username = user.username;

        var reqs = {
            classID : c,
            username : username,
            fName : fName,
            lName : lName,
            reqID : id,
            title : req.body.title,
            desc: req.body.paragraph_text,
            deadline: req.body.deadline,
            typeOfReq: req.body.type, 
        };

        db.insertOne (Reqs, reqs, function (result) {
            
            res.redirect ('/classes/' + c + '/requirements');
        });
    }
}

module.exports = controller;