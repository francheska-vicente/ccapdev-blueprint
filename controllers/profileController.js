const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const profileController = {

    getYourProfile: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {

                // changes mongoose date into javascript date
                if(user.bday) {
                    var d = new Date(user.bday);
                    var datestring = ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "-" + d.getFullYear();
                    user.bday = datestring; 
                }
                res.render('profile-view', user);
            });
        }  
    },

    getEditProfile: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {

                // changes mongoose date into javascript date
                if(user.bday) {
                    var d = new Date(user.bday);
                    var datestring = ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + "-" + d.getFullYear();
                    user.bday = datestring; 
                }
                res.render('profile-edit', user);
            });
        }  
    },

    postEditProfile: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {

                // creates updated user object
                var update = user;
                if (req.body.username != '') update.username = req.body.username;
                if (req.body.contact_no != '') update.phone = req.body.contact_no;
                if (req.body.bday != '') update.bday = req.body.bday;
                if (req.body.degree != '') update.degree = req.body.degree;
                if (req.body.bio != '') update.bio = req.body.bio;
                if (req.body.n_password != '') update.password = req.body.n_password;

                // checks if password matches user's password
                if (req.body.o_password == user.password) {

                    // updates user in db
                    db.updateOne(User, {username: user.username}, update, function(result) {
                        res.redirect('/profile');
                    });
                }
            });
        }  
    },

    getDelProfile: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {
                res.render('profile-del', user);
            });
        }  
    },

    postDelProfile: function (req, res) {

        // error 401 if not logged in
        if(!req.session.username) res.redirect('/error/401');
        else {

            // gets user from db
            db.findOne(User, {username: req.session.username}, '', function (user) {

                // checks if both passwords match user's password
                if(user.password == req.body.password && user.password == req.body.c_password) {

                    // deletes user from db
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