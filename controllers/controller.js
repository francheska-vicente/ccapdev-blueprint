const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Course = require('../models/ClassModel.js');
var user;

const controller = {
    getSplash: function (req, res) {
        res.render('splash');
    },

    getSignUp: function (req, res) {
        res.render('register');
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

    getYourProfile: function (req, res) {
        res.render('profile', user);
    },

    getEditProfile: function (req, res) {
        res.render('editprofile', user);
    },

    getDelProfile: function (req, res) {
        res.render('profile', user);
    },

    getYourSchedule: function (req, res) {
        res.render('schedule', user);
    },

    getUserProfile: function (req, res) {
        var user = {
            username: req.body.username,
        };

        db.findOne(User, user, '', function (result) {
            res.render('userprofile', result);
        });
    },

    getUserSchedule: function (req, res) {
        var user = {
            username: req.body.username,
        };

        db.findOne(User, user, '', function (result) {
            res.render('userschedule', result);
        });
    },

    getDashboard: function (req, res) {
        var classIDs = ['123'];
        db.findMany(Course, {classID : {$in : classIDs}}, '', function (result) {
            res.render('dashboard', result);
        });
    }
}

module.exports = controller;