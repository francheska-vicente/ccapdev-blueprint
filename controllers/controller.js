const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');
const Reqs = require ('../models/ReqsModel.js');

const controller = {
    getSplash: function (req, res) {
        if(req.session.username) 
            res.redirect('/home');
        else {
            var details = {flag: false};
            res.render('splash');
        }
    },

    getHome: function (req, res) {
        if(!req.session.username)
            res.redirect('/');
        else {
            db.findOne(User, {username: req.session.username}, '', function (result) {
                var details = {flag: false, result: result};
                var classes = result.classes;

                var today = new Date ();
                var year = "" + today.getFullYear ();
                var month = "" + today.getMonth () + 1;
                var day = 31;

                var start = today.toISOString();


                if (month == 4 || month == 6 || month == 9 || month == 11)
                    day = 30;
                else if (month == 2)
                {
                    if (year % 100 == 0 && year % 400 == 0)
                        day = 29;
                    else 
                        day = 28;
                }

                var end =  new Date (year, month - 1, day, 23, 59, 59);

                var end = end.toISOString();

                db.findMany (Reqs, {$and: [{classID  : {$in : classes}},
                                           {deadline : {$gte : start, 
                                                        $lt  : end}}
                                           ]}, null, function (result1) {
                    var temp = {
                        result : result,
                        reqs : result1
                    };

                    res.render('home', temp);
                });       
            });
        }
    },

    getSearch : function (req, res) {
        var search = req.query.search_val;
        var arr = search.split (' ');

        for (var i = 0; i < arr.length; i++)
        {
            arr [i] = arr [i].toLowerCase ();
            arr [i] = arr [i].charAt (0).toUpperCase () + arr [i].substring (1, arr [i].length);

            if (i > 0)
                arr [i] = arr [i - 1] + " " + arr [i];
        }
        
        db.findMany (User, {$or: [
                {username: search.toLowerCase ()},
                {fName: arr [arr.length - 1]},
                {lName: arr [arr.length - 1]},
                {fName : {"$in": arr}},
                {lName : {"$in": arr}}
        ]}, null, function (result) {
                var temp = {
                    result : result,
                    search_val : search
                }

                res.render ('search-users', temp);
        });
    }
}

module.exports = controller;