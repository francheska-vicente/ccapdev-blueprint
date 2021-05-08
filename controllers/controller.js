const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');

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
            res.redirect('/splash');
        else {
            db.findOne(User, {username: req.session.username}, '', function (result) {
                var details = {flag: false, result: result};
                res.render('home', result);
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
    },

    getUserProfile: function (req, res) {
        db.findOne(User, {username: req.params.username}, '', function (result) {
            if(result) res.render('userprofile', result);
            else res.redirect('/error/404');
        });
    },

    getUserSchedule: function (req, res) {
        db.findOne(User, {username: req.params.username}, '', function (result) {
            if(result) res.render('userschedule', result);
            else res.redirect('/error/404');
        });
    },
}

module.exports = controller;