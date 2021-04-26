const db = require('../models/db.js');
const User = require('../models/UserModel.js');
var log;

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
        log = {
            username: req.body.username,
            password: req.body.password
        };

        var query = log;

        db.findOne(User, query, '', function(flag) {
            if(flag){
                res.redirect('/home');
            }
        });
    },

    getHome: function (req, res) {
        var query = log;

        db.findOne(User, query, '', function (result) {
            res.render('home', result);
        });
    },

    getYourProfile: function (req, res) {
        var query = log;

        db.findOne(User, query, '', function (result) {
            res.render('profile', result);
        });
    },

    getEditProfile: function (req, res) {
        var query = log;

        db.findOne(User, query, '', function (result) {
            res.render('editprofile', result);
        });
    },

    getYourProfile: function (req, res) {
        var query = log;

        db.findOne(User, query, '', function (result) {
            res.render('profile', result);
        });
    },

    getYourSchedule: function (req, res) {
        var query = log;

        db.findOne(User, query, '', function (result) {
            res.render('schedule', result);
        });
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
        var query = log;

        db.findOne(User, query, '', function (result) {
            res.render('dashboard', result);
        });
    }
}

module.exports = controller;