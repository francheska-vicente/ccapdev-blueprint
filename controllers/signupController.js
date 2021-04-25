const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('register');
    },

    postSignUp: function (req, res) {
        var fName = req.body.first_name;
        var lName = req.body.last_name;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var school = req.body.school;

        var user = {
            fName: fName,
            lName: lName,
            email: email,
            username: email,
            password: password,
            school: school
        }

        db.insertOne(User, user, function(flag) {
            if(flag) {
                res.redirect('/success?username=' + username);
            }
        });
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;