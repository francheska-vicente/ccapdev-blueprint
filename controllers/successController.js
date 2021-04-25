const successController = {
    getSuccess: function (req, res) {
        var details = {
            fName: req.query.fName,
            lName: req.query.lName,
            username: req.query.username
        };

        res.render('success', details);
    }
}

module.exports = successController;