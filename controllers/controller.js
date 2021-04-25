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
    },

    getClass: function (req, res) {
        var c = req.params.coursecode;
        var query = {coursecode: c};

        db.findOne('classes', query, function (result) {
            res.render('class', result);
        });
    }
}

module.exports = controller;