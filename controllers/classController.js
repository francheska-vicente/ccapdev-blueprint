const db = require('../models/db.js');
const Discussions = require('../models/DiscModel.js');

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
        console.log ("updated");
        db.findMany (Discussions, query, null, function (err, result) {
            res.render('Discussions', result);
        });
    }
}

module.exports = classController;