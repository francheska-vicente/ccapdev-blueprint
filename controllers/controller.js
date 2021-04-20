const db = require('../models/db.js');

const controller = {

    getProfile: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('profile', result);
        });
    },

    getHome: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('home', result);
        });
    },

    getYourSchedule: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('schedule', result);
        });
    },

    getDashboard: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('dashboard', result);
        });
    },

    getUser: function (req, res) {
        var u = req.params.username;
        var query = {username: u};

        db.findOne('profiles', query, function (result) {
            res.render('user', result);
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