const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Discussion = require('../models/DiscModel.js');
const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');
const Comment = require ('../models/CommentModel.js');

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

	getDiscussions: function (req, res) {
		var c = req.params.classID;

		var coursecode;
		var classID;

		db.findOne (Course, {classID: c}, null, function (result) {
			console.log (result);
			coursecode = result.coursecode;
			classID = result.classID;
		}); 

		db.findMany (Discussion, {classID: c}, null, function (result) {
			var temp = {
				coursecode: coursecode, 
				classID: classID, 
				results: result
			}
			console.log (result);
			res.render('discussions-list', temp);
		});  
	},

	getDiscussionPost: function (req, res) {
		var c = req.params.classID;
		var b = req.params.discID;

		var coursecode;
		var content, title, author, fName, lName;

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
				classID: c
			}

			res.render('discussion-post', temp);
		});
	},

	getReqs: function (req, res) {
		var c = req.params.classID;
		var query = {
			classID: c
		};

		db.findOne(Course, query, null, function (result) {
			res.render('reqs', result);
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
		});

		db.findMany (Note, query, null, function (err, result) {
			results = result;
		});

		res.render('notes', classInfo, results);
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

	editDiscussionPost: function (req, res) {
		var d = req.params.discID;
		console.log ("mama bakit d2");
		db.findOne (Discussion, {discID : d}, null, function (discInfo) {
			discInfo.content = req.body.main_discussion_text;

			db.updateOne (Discussion, {discID : d}, discInfo, function (result) {
				res.redirect ('/classes/' + discInfo.classID + '/discussions/' + d);
			});
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
	},

	deleteDiscussionPost : function (req, res) {
		var d = req.params.discID;
		var a = req.params.classID;

		db.deleteOne (Discussion, {discID : d}, function (result) {
			res.redirect ('/classes/' + a + '/discussions/');
		})
	}, 

	getAddDiscussion : function (req, res) {
		var a = req.params.classID;
		console.log ("hello");
		db.findOne(Course, {classID : a}, null, function (result) {
			console.log (result);
			res.render ('discussions-add', result);
		});
	}
}

module.exports = classController;