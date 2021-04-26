const db = require('../models/db.js');

const classController = {
	getClass: function (req, res) {
        var c = req.params.coursecode;
        var query = {coursecode: c};

        db.findOne('classes', query, function (result) {
            res.render('class', result);
        });
    },

    getDiscussions: function (req, res) {
    	var c = req.params.coursecode;
        var query = {coursecode: c};
    }
}

module.exports = classController;