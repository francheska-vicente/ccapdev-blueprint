const bcrypt = require('bcrypt');
const saltRounds = 10;
const { validationResult } = require('express-validator');

const path = require('path')

const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Course = require ('../models/ClassModel.js');
const Discussion = require('../models/DiscModel.js');
const Comment = require ('../models/CommentModel.js');

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

                var temp = {user : user}
                res.render('profile-edit', temp);
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
                            if(equal) {
                                // creates updated user object
                                var update = user;
                                if (req.body.username != '') update.username = req.body.username;
                                if (req.body.contact_no != '') update.phone = req.body.contact_no;
                                if (req.body.bday != '') update.bday = req.body.bday;
                                if (req.body.degree != '') update.degree = req.body.degree;
                                if (req.body.bio != '') update.bio = req.body.bio;
                                if (req.body.n_password != '') update.password = hash;

                                // updates user in db
                                db.updateOne(User, {username: req.session.username}, update, function(flag) {
                                    if(flag) res.redirect('/profile?editsuccess=true');
                                    else res.redirect('/profile?editsuccess=false');
                                });
                            }
                            else {
                                var temp = {user : user, error : 'Incorrect password. Please try again.'};
                                res.render('profile-edit', temp);
                            }
                        });
                    });
                });
            } 
        }  
    },

    postEditProfilePic: function (req, res) {
        db.findOne(User, {username: req.session.username}, '', function (user) {
            db.updateOne(User, user, {picfilename: user.username + path.extname(req.file.originalname)}, function (data) { 
                res.redirect('/profile');
            });
        });
    },

    getCheckNewUsername: function (req, res) {
        var username = req.query.username;
        db.findOne(User, {username: username}, 'username', function (result) {
            if(result && req.session.username != result.username)
                res.send(result);
            else res.send(false);
        });
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
                            var query = {$pull:{classlist: {$in: [user.username]}}};

                            // removes user from classes 
                            db.updateMany(Course, {}, query, function(flag) {

                                // removes all discussions by user
                                db.deleteMany (Discussion, {username: user.username}, function (result) {

                                    // removes all comments by user
                                    db.deleteMany (Comment, {username: user.username}, function (result) {

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
                                    })
                                })
                            });
                        }
                        else {
                            var temp = {user : user, passwordError : 'Incorrect password. Please try again.'};
                            res.render('profile-del', temp);
                        }
                    });
                }
                else {
                    var temp = {user : user, passwordError : 'Incorrect password. Please try again.'};
                    res.render('profile-del', temp);
                }
            });
        } 
    }
}

module.exports = profileController;