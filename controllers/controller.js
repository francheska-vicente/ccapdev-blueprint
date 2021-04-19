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
    }
}


module.exports = controller;