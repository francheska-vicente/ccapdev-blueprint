const { validationResult } = require('express-validator');

const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: function (req, res) {
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

        console.log ("heheh " + errors);
        if (!errors.isEmpty()) 
        {
            errors = errors.errors;
            var details = {};
            
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;
            console.log ("Mali repa bro");
            res.render('signup', details);
        }
        else 
        {
            var user = {
                fName: req.body.fName.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' '),
                lName: req.body.lName.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' '),
                email:  req.body.email,
                username: req.body.username.toLowerCase (),
                password: req.body.password,
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
        }  
    }
}

module.exports = signupController;