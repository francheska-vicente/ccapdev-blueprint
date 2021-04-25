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
            uni:  req.body.school
        };

        db.insertOne(User, user, function(flag) {
            if(flag) {
                res.redirect('/success?fName=' + user.fName +'&lName=' + user.lName + '&username=' + user.username);
            }
        });
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;