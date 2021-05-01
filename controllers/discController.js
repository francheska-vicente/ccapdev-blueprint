const db = require('../models/db.js');
const Discussion = require('../models/DiscModel.js');

const discController = {
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
}

module.exports = discController;