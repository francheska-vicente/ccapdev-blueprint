const db = require('../models/db.js');
const Discussions = require('../models/DiscModel.js');

const classController = {
	getClass: function (req, res) {
        var c = req.params.classID;
        var query = {
        	classID: c
        };

        db.findOne('Class', query, function (result) {
            res.render('Class', result);
        });
    },

    getDiscussions: function (req, res) {
    	var c = req.params.classID;
        var query = {
        	classID: c
        };

        db.findMany (Discussions, query, null, function (err, result) {
            res.render('discussions', result);
        });

        db.count (Discussions, query, function (err, result) {
        	res.render('discussions', result);
        });
    }
}

module.exports = classController;