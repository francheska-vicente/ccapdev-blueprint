const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');
const Discussion = require('../models/DiscModel.js');
const Comment = require ('../models/CommentModel.js');

const discController = {
    getDiscussions: function (req, res) {
        var user = controller.getLoggedInUser();
        if(user == null) res.redirect('/error/401');
        db.findOne (User, {username: user.username}, null, function (result) {
            if(!user.classes.includes(req.params.classID)) res.redirect('/error/403');
        }); 

        var c = req.params.classID;
        var coursecode;
        var classID;

        db.findOne (Course, {classID: c}, null, function (result) {
            coursecode = result.coursecode;
            classID = result.classID;
        }); 

        db.findMany (Discussion, {classID: c}, null, function (result) {
            var temp = {
                coursecode: coursecode, 
                classID: classID, 
                results: result
            }
            
            res.render('discussions-list', temp);
        });  
    },

    getAddDiscussion : function (req, res) {
        var a = req.params.classID;
        db.findOne(Course, {classID : a}, null, function (result) {
            res.render ('discussions-add', result);
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

    editDiscussionPost: function (req, res) {
        var d = req.params.discID;
        
        db.findOne (Discussion, {discID : d}, null, function (discInfo) {
            discInfo.content = req.body.main_discussion_text;

            db.updateOne (Discussion, {discID : d}, discInfo, function (result) {
                res.redirect ('/classes/' + discInfo.classID + '/discussions/' + d);
            });
        });
    },

    deleteDiscussionPost : function (req, res) {
        var d = req.params.discID;
        var a = req.params.classID;

        db.deleteOne (Discussion, {discID : d}, function (result) {
            db.deleteMany (Comment, {mainID: d}, function (result) {
                res.redirect ('/classes/' + a + '/discussions/');
            });
        })
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

    editCommentOfDiscussion : function (req, res) {
        var commentID = req.params.commentID;
        var classID = req.params.classID;
        var discID = req.params.discID;

        db.findOne (Comment, {commentID : commentID}, null, function (comment) {
            comment.content = req.body.edit_text;

            db.updateOne (Comment, {commentID : commentID}, comment, function (result) {
                res.redirect ('/classes/' + classID + '/discussions/' + discID);
            });
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

    deleteCommentOfComment : function (req, res) {
        var c = req.params.commentID;
        var a = req.params.classID;
        var d = req.params.discID;

        db.findOne (Discussion, {discID : d}, null, function (discInfo) {
            db.deleteOne (Comment, {commentID : c}, function (result) {
                discInfo.numOfComments = discInfo.numOfComments - 1;
                db.updateOne (Discussion, {discID : d}, discInfo, function (result) {
                    res.redirect ('/classes/' + a + '/discussions/' + d);
                });
            });
        });
    }
}

module.exports = discController;