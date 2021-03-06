const db = require('../models/db.js');

const errorController = {

    get401: function (req, res, next) {
        var err = new Error('You are not logged in!');
        err.status = 401;
        next(err);
    },

    get403: function (req, res, next) {
        var err = new Error('You are not allowed to access this page!');
        err.status = 403;
        next(err);
    },

    get404: function (req, res, next) {
        var err = new Error('Page not found.');
        err.status = 404;
        next(err);
    }
}

module.exports = errorController;