const db = require('../models/db.js');

const controller = {
    getSplash: function (req, res) {
        res.render('splash');
    },

    getHome: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('home', result);
        });
    },

    getSignUp: function (req, res) {
        res.render('register');
    },

    getLogin: function (req, res) {
        res.render('login');
    },

    getYourProfile: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('profile', result);
        });
    },
    
    getYourSchedule: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('schedule', result);
        });
    },

    getUserProfile: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('userprofile', result);
        });
    },

    getUserSchedule: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('userschedule', result);
        });
    },

    getDashboard: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('dashboard', result);
        });
    }
}

module.exports = controller;