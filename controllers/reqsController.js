const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Reqs = require ('../models/ReqsModel.js');

const reqsController = {

    getSignUp: function (req, res) {
        res.render('register');
    },
    
    postSignUp: function (req, res) {
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

module.exports = reqsController;