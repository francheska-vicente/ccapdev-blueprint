const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    postSignUp: function (req, res) {
        var user = {
            fName: req.body.fName,
            lName: req.body.lName,
            email:  req.body.email,
            username: req.body.username,
            password: req.body.password,
            uni:  req.body.school
        };

        db.insertOne(User, user, function(flag) {
            if(flag) {
                res.redirect('/register-success?fName=' + user.fName +'&lName=' + user.lName);
            }
        });
    }
}

module.exports = signupController;