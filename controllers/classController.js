const db = require('../models/db.js');

const classController = {
	getClass: function (req, res) {
        var c = req.params.coursecode;
        var query = {coursecode: c};

        db.findOne('Class', query, function (result) {
            res.render('Class', result);
        });
    },

    getDiscussions: function (req, res) {
    	var c = req.params.coursecode;
        var query = {
        	coursecode: c
        };

        db.findMany ('Discussions', query, function (result) {
            res.render('Discussions', result);
        });
    }
}

module.exports = classController;