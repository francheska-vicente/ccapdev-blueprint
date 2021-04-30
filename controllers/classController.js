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
		console.log ("hello");
		db.findOne (Course, {classID : c}, null, function (classInfo) {
			res.render ('add_notes', classInfo);
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
            db.deleteMany (Comment, {mainID: d}, function (result) {
                res.redirect ('/classes/' + a + '/discussions/');
            });
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