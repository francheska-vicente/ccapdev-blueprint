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

    postEditProfile: function (req, res) {
        var update = {
            username: req.body.username,
            phone: req.body.contact_no,
            bday:  req.body.bday,
            degree:  req.body.degree,
            bio:  req.body.bio,
            password:  req.body.n_password,
        };

        db.updateOne(User, {username: user.username}, update, function(result) {
            res.redirect('/profile');
        });
    },

    getDelProfile: function (req, res) {
        res.render('profile', user);
    },

    postDelProfile: function (req, res) {
        var user = {
            username: req.body.username,
        };

        db.deleteOne(User, user, function(flag) {
            if(flag) {
                res.redirect('/success?fName=' + user.fName +'&lName=' + user.lName + '&username=' + user.username);
            }
        });
    },

    getYourSchedule: function (req, res) {
        res.render('schedule', user);
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

    getDashboard: function (req, res) {
        db.findMany(Course, {classID : {$in : user.classes}}, '', function (result) {
            var temp = {
                results : result
            }
            res.render('dashboard', temp);
        });
    }
}

module.exports = controller;