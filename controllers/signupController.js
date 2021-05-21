const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: function (req, res) {
        if(req.session.username) 
            res.redirect('/home');
        else
            res.render('register');
    },

    getCheckUsername: function (req, res) {
        var username = req.query.username;
        db.findOne(User, {username: username}, 'username', function (result) {
            res.send(result);
        });
    },

    getCheckEmail: function (req, res) {
        var email = req.query.email;
        db.findOne(User, {email: email}, 'email', function (result) {
            res.send(result);
        });
    },
    
    postSignUp: function (req, res) {
        
        var errors = validationResult(req);

        if (!errors.isEmpty()) 
        {
            errors = errors.errors;
            var details = {};
            
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
            
            res.render('register', details);
        }
        else 
        {   
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                var user = {
                    fName: req.body.fName.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' '),
                    lName: req.body.lName.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' '),
                    email:  req.body.email,
                    username: req.body.username.toLowerCase(),
                    password: hash,
                    uni:  req.body.school,
                    bday: '',
                    phone: '',
                    degree: '',
                    bio: '',
                    classes: []
                };
                
                db.insertOne(User, user, function(flag) {
                    if(flag) {
                        res.redirect('/register-success?fName=' + user.fName +'&lName=' + user.lName);
                    }
                });
            });
        }  
    }
}

module.exports = signupController;