const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');

const userController = {

    getUserProfile: function (req, res) {
        db.findOne(User, {username: req.params.username}, '', function (result) {
            if(result) {
                if(result.username == req.session.username) res.redirect('/profile');
                else res.render('userprofile', result);
            }
            else res.redirect('/error/404');
        });
    },

    getUserSchedule: function (req, res) {
        db.findOne(User, {username: req.params.username}, '', function (result) {
            if(result) {
                if(result.username == req.session.username) res.redirect('/schedule');
                else res.render('userschedule', result);
            }
            else res.redirect('/error/404');
        });
    }
}

module.exports = userController;