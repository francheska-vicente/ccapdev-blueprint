const mongoose = require('mongoose');
const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');

var user;

const controller = {
    getLoggedInUser : function () {
        if (user != null)
            return user;
    },

    getSplash: function (req, res) {
        res.render('splash');
    },

    getLogin: function (req, res) {
        res.render('login');
    },

    postLogin: function (req, res) {
        var query = {
            username: req.body.username,
            password: req.body.password
        };

        db.findOne(User, query, '', function(flag) {
            if(flag){
                user = flag;
                res.redirect('/home');
            }
        });
    },

    getHome: function (req, res) {
        var start = Date.now;
        var month = Date.now.getMonth ();

        console.log (month);

        var lastday = function (y,m) {
            return  new Date (y, m +1, 0).getDate();
        }

        var day = lastday (Date.now.getYear (), month);

        var date = new Date (Date.now.getYear ());

        db.findOne (Reqs, {$and : [
                {classID : {"$in" : user.classes}},
                {deadline : { $gte : Date.now,
                              $lt  : "Sun May 30 20:40:36 +0000 2010"}}
                ]},
            null, function (results) {
                res.render('home', user);
            });

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
            res.render('userprofile', result);
        });
    },

    getUserSchedule: function (req, res) {
        db.findOne(User, {username: req.params.username}, '', function (result) {
            res.render('userschedule', result);
        });
    },
}

module.exports = controller;