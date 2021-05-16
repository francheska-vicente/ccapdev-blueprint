const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');

const userController = {

    getUserProfile: function (req, res) {
        db.findOne(User, {username: req.params.username}, '', function (user) {
            if(user) {
                if(user.bday) {
                    var d = new Date(user.bday);
                    var datestring = ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "-" + d.getFullYear();
                    user.bday = datestring;
                }
                
                if(user.username == req.session.username) res.redirect('/profile');
                else res.render('userprofile', user);
            }
            else res.redirect('/error/404');
        });
    },

    getUserSchedule: function (req, res) {
        db.findOne(User, {username: req.params.username}, '', function (user) {
            if(user) {
                if(user.username == req.session.username) res.redirect('/schedule');
                else res.render('userschedule', user);
            }
            else res.redirect('/error/404');
        });
    }
}

module.exports = userController;