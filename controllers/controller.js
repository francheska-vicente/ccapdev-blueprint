const mongoose = require('mongoose');
const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const Course = require ('../models/ClassModel.js');
const Note = require ('../models/NotesModel.js');
const Comment = require ('../models/CommentModel.js');
const Reqs = require ('../models/ReqsModel.js');
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
        res.render('home', user);
    },

    getSearch : function (req, res) {
        var search = req.query.search_val;
        console.log (search);
        db.findMany (User, {$or: [
                {username: search.toLowerCase ()},
                {fName: search.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')},
                {lName: search.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')}
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