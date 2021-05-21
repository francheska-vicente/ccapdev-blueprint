const bcrypt = require('bcrypt');
const saltRounds = 10;
const { validationResult } = require('express-validator');

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

                var notif = null;
                if (req.query.editsuccess == 'true') var notif = 'You have successfully edited your profile!';
                else if (req.query.editsuccess == 'false') var notif = 'Editing of profile unsuccessful.';
                else if (req.query.deletesuccess == 'false') var notif = 'Deletion of profile unsuccessful.';

                var temp = {user : user, notif : notif};
                    
                res.render('profile-view', temp);
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
                    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
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

            var errors = validationResult(req);

            if (!errors.isEmpty()) 
            {
                errors = errors.errors;
                var details = {};
                
                for(i = 0; i < errors.length; i++)
                    details[errors[i].param + 'Error'] = errors[i].msg;
                
                res.render('profile-edit', details);
            }
            else
            {
                // gets user from db
                db.findOne(User, {username: req.session.username}, '', function (user) 
                {
                    // hashes password
                    bcrypt.hash(req.body.n_password, saltRounds, function(err, hash) 
                    {
                        // checks if password matches user's password
                        bcrypt.compare(req.body.password, user.password, function(err, equal) 
                        {
                            if(equal) 
                            {
                                // creates updated user object
                                var update = user;
                                if (req.body.username != '') update.username = req.body.username;
                                if (req.body.contact_no != '') update.phone = req.body.contact_no;
                                if (req.body.bday != '') update.bday = req.body.bday;
                                if (req.body.degree != '') update.degree = req.body.degree;
                                if (req.body.bio != '') update.bio = req.body.bio;
                                if (req.body.n_password != '') update.password = hash;

                                console.log(req.body.password)
                                console.log(user.password)


                                // updates user in db
                                db.updateOne(User, {username: user.username}, update, function(flag) 
                                {
                                    if(flag) res.redirect('/profile?editsuccess=true');
                                    else res.redirect('/profile?editsuccess=false');
                                });
                            }
                            else 
                            {
                                var temp = {user : user, error : 'Incorrect password. Please try again.'};
                                res.render('profile-edit', temp);
                            }
                        });
                    });
                });
            } 
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
                if (req.body.c_password == req.body.password) {
                    // checks if passwords match user's password 
                    bcrypt.compare(req.body.password, user.password, function(err, equal) {
                        if(equal) {
                            // deletes user from db
                            db.deleteOne(User, {username: user.username}, function(flag) {
                                if(flag) {
                                    req.session.destroy(function(err) {
                                        if(err) throw err;
                                        res.redirect('/profile-deletion-success');
                                    });
                                }
                                else res.redirect('/profile?deletesuccess=false');
                            });
                        }
                        else {
                            var temp = {user : user, notif : 'Incorrect password. Please try again.'};
                            res.render('profile-del', temp);
                        }
                    });
                }
                else {
                    var temp = {user : user, notif : 'Incorrect password. Please try again.'};
                    res.render('profile-del', temp);
                }
            });
        } 
    }
}

module.exports = profileController;