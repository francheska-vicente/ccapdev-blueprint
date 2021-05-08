const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const profileController = {

    getYourProfile: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var d = new Date(user.bday);
                var datestring = ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "-" + d.getFullYear();
                user.bday = datestring;
                res.render('profile-view', user);
            });
        }  
    },

    getEditProfile: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var d = new Date(user.bday);
                var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
                user.bday = datestring;
                res.render('profile-edit', user);
            });
        }  
    },

    postEditProfile: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                var update = user;
                if (req.body.username != '') update.username = req.body.username;
                if (req.body.contact_no != '') update.phone = req.body.contact_no;
                if (req.body.bday != '') update.bday = req.body.bday;
                if (req.body.degree != '') update.degree = req.body.degree;
                if (req.body.bio != '') update.bio = req.body.bio;
                if (req.body.n_password != '') update.password = req.body.n_password;
                if (req.body.o_password == user.password) {
                    db.updateOne(User, {username: user.username}, update, function(result) {
                        res.redirect('/profile');
                    });
                }
            });
        }  
    },

    getDelProfile: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                res.render('profile-del', user);
            });
        }  
    },

    postDelProfile: function (req, res) {
        if(!req.session.username) res.redirect('/error/401');
        else {
            db.findOne(User, {username: req.session.username}, '', function (user) {
                if(user.password == req.body.password && user.password == req.body.c_password) {
                    db.deleteOne(User, {username: user.username}, function(flag) {
                        if(flag) {
                            res.redirect('/profile-deletion-success');
                        }
                    });
                }
            });
        } 
    }
}

module.exports = profileController;