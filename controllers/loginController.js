const bcrypt = require('bcrypt');

const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const loginController = {

    getLogin: function (req, res) {
        res.render('login');
    },

    postLogin: function (req, res) {
        db.findOne(User, {username: req.body.username}, '', function(result) {
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