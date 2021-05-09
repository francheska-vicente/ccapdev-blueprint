const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const logoutController = {
    getLogout: function (req, res) {
        req.session.destroy(function(err) {
            if(err) throw err;
            res.redirect('/');
        });
    }
}

module.exports = logoutController;