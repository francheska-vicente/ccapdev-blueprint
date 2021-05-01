const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Discussion = require('../models/DiscModel.js');
const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');
const Comment = require ('../models/CommentModel.js');
const Reqs = require ('../models/ReqsModel.js');

const classController = {
	getClass: function (req, res) {
		var c = req.params.classID;
		var query = {
			classID: c
		};

		db.findOne(Course, query, null, function (result) {
			res.render('class', result);
		});
	},

	getClassList: function (req, res) {
		db.findOne(Course, {classID: req.params.classID}, null, function (resultC) {
			db.findMany(User, {username : {$in : resultC.classlist}}, '', function (resultU) {
				var result = {
					users : resultU,
					coursecode : resultC.coursecode,
					classID : resultC.classID
				}
				res.render('classlist', result);
			});
		});
	},

	getReqs: function (req, res) {
		var c = req.params.classID;
		var query = {
			classID: c
		};

		db.findOne(Course, query, null, function (result) {
			db.findMany (Reqs, query, null, function (reqs) {
				var temp = {
					result : reqs,
					classID : c,
					coursecode: result.coursecode
				};

				res.render('reqs', temp);
			});
		});
	},

	getAddReqs : function (req, res) {
		var c = req.params.classID;

		db.findOne(Course, {classID : c}, null, function (result) {
			res.render ('requirements-add', result);
		});
	},

	editReqsPost : function (req, res) {
		var d = req.params.reqID;
		var a = req.params.classID;

		db.findOne (Reqs, {reqID : d}, null, function (reqs) {
			if (req.body.deadline != "")
				reqs.deadline = req.body.deadline;

			reqs.typeOfReq = req.body.type;
			reqs.desc = req.body.paragraph_text;

			db.updateOne (Reqs, {reqID : d}, reqs, function (result) {
				res.redirect ('/classes/' + a + '/requirements/');
			})
		});
	}, 

	deleteReqsPost : function (req, res) {
		var d = req.params.reqID;
		var a = req.params.classID;

		db.deleteOne (Reqs, {reqID : d}, function (reqs) {
			res.redirect ('/classes/' + a + '/requirements/');
		});
	},

	getNotes : function (req, res) {
		var c = req.params.classID;
		var query = {
			classID: c
		};

		var classInfo;
		var results;

		db.findOne (Course, query, null, function (classInfo) {
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
	}, 

	getAddNotes : function (req, res) {
		var c = req.params.classID;
		db.findOne (Course, {classID : c}, null, function (classInfo) {
			res.render ('add_notes', classInfo);
		});
	},

	deleteNotesPost : function (req, res) {
		var d = req.params.notesID;
		var a = req.params.classID;

		db.deleteOne (Note, {notesID : d}, function (result) {
            db.deleteMany (Comment, {mainID: d}, function (result) {
                res.redirect ('/classes/' + a + '/notebook/');
            });
		})
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

	editCommentOfNotes : function (req, res) {
		var commentID = req.params.commentID;
        var classID = req.params.classID;
        var notesID = req.params.notesID;

        db.findOne (Comment, {commentID : commentID}, null, function (comment) {
            comment.content = req.body.edit_text;

            db.updateOne (Comment, {commentID : commentID}, comment, function (result) {
                res.redirect ('/classes/' + classID + '/notebook/' + notesID);
            });
        });
	},

	deleteCommentOfCommentNotes : function (req, res) {
		var c = req.params.commentID;
		var a = req.params.classID;
		var d = req.params.notesID;

		db.findOne (Note, {notesID : d}, null, function (notesInfo) {
			db.deleteOne (Comment, {commentID : c}, function (result) {
				notesInfo.numOfComments = notesInfo.numOfComments - 1;
				db.updateOne (Note, {notesID : d}, notesInfo, function (result) {
					res.redirect ('/classes/' + a + '/notebook/' + d);
				});
			});
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

module.exports = classController;