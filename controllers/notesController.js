const db = require('../models/db.js');
const controller = require('../controllers/controller.js');

const User = require('../models/UserModel.js');
const Discussion = require('../models/DiscModel.js');
const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');
const Comment = require ('../models/CommentModel.js');
const Reqs = require ('../models/ReqsModel.js');

const notesController = {

	getNotes : function (req, res) {

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            }); 

    		var c = req.params.classID;
    		var query = {
    			classID: c
    		};

    		var classInfo;
    		var results;

    		db.findOne (Course, query, null, function (classInfo) {
                if(classInfo == null) res.redirect('/error/404');
    			classInfo = classInfo;

    			db.findMany (Note, query, null, function (result) {

    				var temp = {
    					coursecode : classInfo.coursecode,
    					classID : c,
    					result : result
    				}
    				
    				res.render('notes', temp);
    			});
    		});
        }
	}, 

	getAddNotes : function (req, res) {
		var c = req.params.classID;

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            }); 

            db.findOne (Course, {classID : c}, null, function (classInfo) {
                res.render ('add_notes', classInfo);
            });
        }
	},

	postAddNotes : function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var c = req.params.classID;
                var content = req.body.paragraph_text;
                var title = req.body.title;
                var notesID = db.getObjectID();
                var username = user.username;
                var fName = user.fName;
                var lName = user.lName;

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
            });
        }
    },

    getNotesPost : function (req, res) {
        var c = req.params.classID;
        var b = req.params.notesID;

        var coursecode;
        var content, title, author, fName, lName;

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            }); 

            db.findOne (Course, {classID : c}, null, function (classInfo) {
                coursecode = classInfo.coursecode;
                db.findOne (Note, {notesID : b}, null, function (notesInfo) {
                    if (notesInfo != undefined)
                    {
                        content = notesInfo.content;
                        title = notesInfo.title;
                        author = notesInfo.username;
                        fName = notesInfo.fName;
                        lName = notesInfo.lName;
                    }

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
                            currentUser : req.session.username,
                        }

                        res.render('notes-post', temp);
                    });
                });
            });
        }
    },

    editNotesPost : function (req, res) {
		var d = req.params.notesID;
		var a = req.params.classID;

		db.findOne (Note, {notesID : d}, null, function (notes) {
			notes.content = req.body.main_notes_text;

			db.updateOne (Note, {notesID : d}, notes, function (result) {
				res.redirect ('/classes/' + a + '/notebook/' + d)
			})
		});
	},

	deleteNotesPost : function (req, res) {
		var d = req.params.notesID;
		var a = req.params.classID;

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            });

            db.deleteOne (Note, {notesID : d}, function (result) {
                db.deleteMany (Comment, {mainID: d}, function (result) {
                    res.redirect ('/classes/' + a + '/notebook/');
                });
            })
        }
	},

	editCommentOfNotes : function (req, res) {
		var commentID = req.params.commentID;
        var classID = req.params.classID;
        var notesID = req.params.notesID;

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            });
            db.findOne (Comment, {commentID : commentID}, null, function (comment) {
                comment.content = req.body.edit_text;

                db.updateOne (Comment, {commentID : commentID}, comment, function (result) {
                    res.redirect ('/classes/' + classID + '/notebook/' + notesID);
                });
            });
        }
	},

	addCommentToNotes: function (req, res) {
        var d = req.params.notesID;
        var c = req.params.classID;

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
                else
                {
                    var id = db.getObjectID();

                    var comment = {
                        classID : c,
                        username: user.username, 
                        fName : user.fName,
                        lName : user.lName, 
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
                }
            }); 
        }  
    },

    addCommentToComment: function (req, res) {
        var d = req.params.notesID;
        var c = req.params.classID;
        var p = req.params.commentID;

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');

                var fName = user.fName;
                var lName = user.lName;
                var username = user.username;
                var id = db.getObjectID();
                
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
            }); 

            
        }
    },

	deleteCommentOfComment : function (req, res) {
		var c = req.params.commentID;
		var a = req.params.classID;
		var d = req.params.notesID;

        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne (User, {username: req.session.username}, null, function (user) {

                // error 403 if user not part of class
                if(!user.classes.includes(req.params.classID)) 
                    res.redirect('/error/403');
            }); 

            db.findOne (Note, {notesID : d}, null, function (notesInfo) {
                db.deleteOne (Comment, {commentID : c}, function (result) {
                    notesInfo.numOfComments = notesInfo.numOfComments - 1;
                    db.updateOne (Note, {notesID : d}, notesInfo, function (result) {
                        res.redirect ('/classes/' + a + '/notebook/' + d);
                    });
                });
            });
        }
	}
}

module.exports = notesController;