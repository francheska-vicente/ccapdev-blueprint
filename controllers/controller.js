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
        var classes = [];
        // for (let j = 0; j < user.classes.length; j++) {
        //     var c = {
        //         classID: user.classes[j]
        //     }
        //     console.log(c.classID);
        //     db.findOne(Course, c, '', function (result) {
        //         classes.push(result);
        //         console.log("0 " + result.classname)
        //         console.log("1 " + classes[0].classname)
        //     });
        // }

        var result = {
            classname: "rawr",
            coursecode: "CCAPDEV",
            classID: "1234"
        }

        classes.push(result);

        // result = {
        //     classname: "rawr2",
        //     coursecode: "CCAPDEV2",
        //     classID: "4321"
        // }

        // classes.push(result);

        res.render('dashboard', result);
    }
}

module.exports = controller;