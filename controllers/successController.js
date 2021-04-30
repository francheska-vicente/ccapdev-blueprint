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
    },
    getSuccessDrop: function (req, res) {
        res.render('success-drop');
        var details = {
            fName: req.query.fName,
            lName: req.query.lName,
            username: req.query.username
        };
    }
}

module.exports = successController;