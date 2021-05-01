const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('register');
    },
    
    postSignUp: function (req, res) {
        var user = {
            fName: req.body.fName,
            lName: req.body.lName,
            email:  req.body.email,
            username: req.body.username,
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

module.exports = signupController;