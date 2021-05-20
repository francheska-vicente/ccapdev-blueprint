const successController = {
    getSuccessReg: function (req, res) {
        var details = {
            fName: req.query.fName,
            lName: req.query.lName,
            username: req.query.username
        };

        res.render('success-reg', details);
    },
    getSuccessDel: function (req, res) {
        res.render('success-del');
    }
}

module.exports = successController;