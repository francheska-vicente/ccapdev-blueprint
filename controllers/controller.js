const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },


    getProfile: function (req, res) {

        // gets the parameter `username` from the URL
        var u = req.params.username;

        /*
            creates an object `query`
            which assigns the value of the variable `u` to field `username`
        */
        var query = {username: u};

        /*
            calls the function findOne()
            defined in the `database` object in `../models/db.js`
            this function searches the collection `profiles`
            based on the value set in object `query`
            the third parameter is a callback function
            this called when the database returns a value
            saved in variable `result`
        */
        db.findOne('profiles', query, function (result) {

            /*
                renders `../views/profile.hbs`
                with the values in variable `results`
            */
            res.render('profile', result);
        });
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = controller;