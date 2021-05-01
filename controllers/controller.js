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
    getLoggedInUser : function () {
        if (user != null)
            return user;
    },

    getSplash: function (req, res) {
        res.render('splash');
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



    getSearch : function (req, res) {
        var search = req.query.search_val;
        var arr = search.split (' ');

        for (var i = 0; i < arr.length; i++)
        {
            arr [i] = arr [i].toLowerCase ();
            arr [i] = arr [i].charAt (0).toUpperCase () + arr [i].substring (1, arr [i].length);

            if (i > 0)
                arr [i] = arr [i - 1] + arr [i];
        }

        db.findMany (User, {$or: [
                {username: search.toLowerCase ()},
                {fName: arr [arr.length - 1]},
                {lName: arr [arr.length - 1]},
                {$eq: [arr [arr.length - 1], {$concat: [$fName, $lName]}]}
            ]}, null, function (result) {
                var temp = {
                    result : result,
                    search_val : search
                }

                res.render ('search-users', temp);
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