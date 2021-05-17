const db = require('../models/db.js');
const {Calendar} = require('calendar');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');
const Reqs = require ('../models/ReqsModel.js');


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const homeController = {

    getLastDay: function(month, year) {
        if (month == 4 || month == 6 || month == 9 || month == 11)
            return 30;
        else if (month == 2) {
            if (year % 100 == 0 && year % 400 == 0)
                return 29;
            else 
                return 28;
        }
        else return 31;
    },

    getHome: function (req, res) {
        if(!req.session.username)
            res.redirect('/');
        else {
            db.findOne(User, {username: req.session.username}, '', function (result) {
                var classes = result.classes;

                var today = new Date();
                var year = "" + today.getFullYear();
                var month = "" + today.getMonth() + 1;
                var day = homeController.getLastDay(month, year);

                var start = today.toISOString();
                var end =  new Date (year - 3, month - 1, day);
                var end = end.toISOString();

                var cal = new Calendar();
                var days = cal.monthDays(today.getFullYear(), today.getMonth());
               
                db.findMany (Reqs, {$and: [{classID  : {$in : classes}},
                                           {deadline : {$gte : start, 
                                                        $lt  : end}}
                                           ]}, null, function (result1) {
                    var temp = {
                        result : result,
                        reqs : result1,
                        month: monthNames[today.getMonth()],
                        days: days,
                        year: today.getFullYear()
                    };

                    res.render('home', temp);
                });
            });
        }
    },

    getReqsDates: function(req, res) {
        if(!req.session.username)
            res.redirect('/');
        else {
            db.findOne(User, {username: req.session.username}, '', function (result) {
                var classes = result.classes;

                var today = new Date();
                var year = "" + today.getFullYear();
                var month = "" + today.getMonth() + 1;
                var day = homeController.getLastDay(month, year);

                var start = today.toISOString();
                var end =  new Date (year - 3, month - 1, day);
                var end = end.toISOString();
               
                db.findMany (Reqs, {$and: [{classID  : {$in : classes}},
                                           {deadline : {$gte : start, 
                                                        $lt  : end}}
                                           ]}, null, function (result1) {

                    res.send(result1);
                });
            });
        }
    }
}

module.exports = homeController;