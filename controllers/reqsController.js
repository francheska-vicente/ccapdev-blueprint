const db = require('../models/db.js');
const controller = require('../controllers/controller.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');
const Reqs = require ('../models/ReqsModel.js');

const reqsController = {

    getReqs: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else
        {
            var c = req.params.classID;
            var query = {
                classID: c
            };

            db.findOne(Course, query, null, function (result) {

                if(result == null) res.redirect('/error/404');

                db.findMany (Reqs, query, null, function (reqs) {
                    var temp = {
                        result : reqs,
                        classID : c,
                        coursecode: result.coursecode
                    };

                    res.render('reqs', temp);
                });

            });
        }
    },

    getAddReqs : function (req, res) {
        var c = req.params.classID;

        db.findOne(Course, {classID : c}, null, function (result) {
            if(result == null) res.redirect('/error/404');
            res.render ('requirements-add', result);
        });
    },

    postAddReqs : function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        
        var c = req.params.classID;
        var id = db.getObjectID();
        var username = req.session.username;
        var fName, lName;

        db.findOne (User, {username: username}, null, function (result) {
            fName = result.fName;
            lName = result.lName;
        });

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
    }
}

module.exports = reqsController;