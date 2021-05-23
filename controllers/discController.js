const db = require('../models/db.js');
const controller = require('../controllers/controller.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');
const Comment = require ('../models/CommentModel.js');

const { validationResult } = require('express-validator');

const discController = {
    getDiscussions: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {
        
            // gets user from db
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) res.redirect('/error/403');
            }); 

            var c = req.params.classID;
            var coursecode;
            var classID;

            // gets course from db, stores coursecode + classID into variables
            db.findOne (Course, {classID: c}, null, function (result) {
                if(result == null) res.redirect('/error/404');
                coursecode = result.coursecode;
                classID = result.classID;

                // gets class's discussions from db
                db.findMany (Discussion, {classID: c}, null, function (result) {
                    var temp = {
                        coursecode: coursecode, 
                        classID: classID, 
                        results: result
                    }
                    
                    res.render('discussions-list', temp);
                });  
            }); 
        }
    },

    getAddDiscussion : function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {
            var a = req.params.classID;
            db.findOne(Course, {classID : a}, null, function (result) {
                res.render ('discussions-add', result);
            });
        }
    },

    postAddDiscussion : function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {
            var errors = validationResult(req);

            if (!errors.isEmpty()) 
            {
                errors = errors.errors;
                var details = {};
                
                for(i = 0; i < errors.length; i++)
                    details[errors[i].param + 'Error'] = errors[i].msg;
                
                res.render('discussions-add', details);
            }
            else
            {
                db.findOne (User, {username: req.session.username}, null, function (user) {
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
            }); 
            }   
        }
    },

    getDiscussionPost: function (req, res) {
        
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {
                var coursecode;
                var c = req.params.classID;
                var b = req.params.discID;
                var content, title, author, fName, lName, loggedIn = user.username;
                var comments;
                db.findOne (Course, {classID : c}, null, function (classInfo) {
                    coursecode = classInfo.coursecode;

                    db.findOne (Discussion, {discID : b}, null, function (discInfo) {
                        if (discInfo != undefined)
                        {
                            content = discInfo.content;
                            title = discInfo.title;
                            author = discInfo.username;
                            fName = discInfo.fName;
                            lName = discInfo.lName;
                        }

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
                    });
                });

            });
        }
    },

     getDiscussionComments : function (req, res) {
        var d = req.params.discID;
        var a = req.params.classID;
        console.log ("hello");
        db.findMany (Comment, {mainID: d}, null, function (result) {
            var temp =  {
                comments : result,
                current_user : req.session.username
            }
            console.log (temp.comments.length);
            res.send (temp);
        });
    },

    editDiscussionPost: function (req, res) {
        var d = req.params.discID;
        
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            }); 

            db.findOne (Discussion, {discID : d}, null, function (discInfo) {
                discInfo.content = req.body.main_edit_text;

                db.updateOne (Discussion, {discID : d}, discInfo, function (result) {
                    res.send (result);
                });
            });
        }
    },

    deleteDiscussionPost : function (req, res) {
        var d = req.params.discID;
        var a = req.params.classID;

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            }); 
            
            db.deleteOne (Discussion, {discID : d}, function (result) {
                db.deleteMany (Comment, {mainID: d}, function (result) {
                    res.redirect ('/classes/' + a + '/discussions/');
                });
            });
        }
    }, 

    addCommentToDiscussion: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {
                var d = req.params.discID;
                var c = req.params.classID;

                var fName = user.fName;
                var lName = user.lName;
                var username = user.username;
                var id = db.getObjectID();
                console.log (req.body.main_comment_text);

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
                    var num = result.numOfComments;
                    num++;
                    result.numOfComments = num;
                    db.updateOne (Discussion, {discID : d}, result, function (result) {
                    });
                });

                db.insertOne (Comment, comment, function (discInfo) {
                    res.send (comment);
                });
            });
        }
    },

    editCommentOfDiscussion : function (req, res) {
        var commentID = req.params.commentID;
        var classID = req.params.classID;
        var discID = req.params.discID;
        
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            }); 
            
            db.findOne (Comment, {commentID : commentID}, null, function (comment) {
                comment.content = req.body.edit_txt;
                
                db.updateOne (Comment, {commentID : commentID}, comment, function (result) {
                    db.findOne (Comment, {commentID : commentID}, comment, function (updated) {
                        res.send (comment);
                    });
                });
            });
        } 
    },

    addCommentToComment : function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            
            console.log (req.session.username);
            db.findOne (User, {username: req.session.username}, null, function (user) {
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
                console.log ("comment: " + comment);
                db.findOne (Discussion, {discID: d}, {}, function (result) {
                    var num = result.numOfComments;
                    num++;
                    result.numOfComments = num;
                    db.updateOne (Discussion, {discID: d}, result, function (result) {

                    });
                });

                db.insertOne (Comment, comment, function (discInfo) {
                    res.send (comment);
                });
            });
        }
    },

    deleteCommentOfComment : function (req, res) {
        var c = req.params.commentID;
        var a = req.params.classID;
        var d = req.params.discID;

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            }); 
            console.log ("hellloooooo");
            db.findOne (Discussion, {discID : d}, null, function (discInfo) {
                db.deleteOne (Comment, {commentID : c}, function (result) {
                    var num = discInfo.numOfComments;
                    num--; 
                    db.deleteMany (Comment, {parentID : c}, function (result) {
                        num = num - result;
                        discInfo.numOfComments = num;
                         db.updateOne (Discussion, {discID : d}, discInfo, function (result) {
                            res.send (result);
                        });
                    })
                });
            });
        }
    }
}

module.exports = discController;
