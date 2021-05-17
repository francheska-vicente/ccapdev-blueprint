const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const controller = {
    getSplash: function (req, res) {
        if(req.session.username) 
            res.redirect('/home');
        else {
            var details = {flag: false};
            res.render('splash');
        }
    },

    getSearch : function (req, res) {
        var search = req.query.search_val;
        var arr = search.split (' ');

        for (var i = 0; i < arr.length; i++)
        {
            arr [i] = arr [i].toLowerCase ();
            arr [i] = arr [i].charAt (0).toUpperCase () + arr [i].substring (1, arr [i].length);

            if (i > 0)
                arr [i] = arr [i - 1] + " " + arr [i];
        }
        
        db.findMany (User, {$or: [
                {username: search.toLowerCase ()},
                {fName: arr [arr.length - 1]},
                {lName: arr [arr.length - 1]},
                {fName : {"$in": arr}},
                {lName : {"$in": arr}}
        ]}, null, function (result) {
                var temp = {
                    result : result,
                    search_val : search
                }

                res.render ('search-users', temp);
        });
    }
}

module.exports = controller;