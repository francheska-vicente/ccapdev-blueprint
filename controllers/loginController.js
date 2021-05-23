const bcrypt = require('bcrypt');

const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const loginController = {

    getLogin: function (req, res) {
        if(req.session.username) 
            res.redirect('/home');
        else
            res.render('login');
    },

    postLogin: function (req, res) {
        var username = req.body.username;
        username = username.toLowerCase ();
        // console.log ("this be my username: " + username);
        db.findOne(User, {username: username}, '', function(result) {
            if(result){
                bcrypt.compare(req.body.password, result.password, function(err, equal) {
                    if(equal) {
                        req.session.username = result.username;
                        req.session.password = result.password;
                        res.redirect('/home');
                    }

                    else {
                        var details = {error: 'Username and/or password is incorrect.'}
                        res.render('login', details);
                    }
                });
            }
            else {
                var details = {error: 'Username and/or password is incorrect.'}
                res.render('login', details);
            }
        });
    }
}

module.exports = loginController;