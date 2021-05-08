const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const loginController = {

    getLogin: function (req, res) {
        res.render('login');
    },

    postLogin: function (req, res) {
        var query = {
            username: req.body.username,
            password: req.body.password
        };

        db.findOne(User, query, '', function(result) {
            if(result){
                req.session.username = result.username;
                req.session.password = result.password;
                res.redirect('/home');
            }
        });
    }
}

module.exports = loginController;