$(document).ready(function () {

    function setInvalid(field, errormsg) {
        field.css('background-color', '#FFB0B0');
        $('#error').text(errormsg);
        $('#signup_button').attr("disabled", true);
    }

    function setValid(field) {
        field.css('background-color', '#FFFFFF');
        $('#error').text('');
        $('#signup_button').attr("disabled", false);
    }

    function checkIfFilled() {

        var fName = validator.trim($('#fName').val());
        var lName = validator.trim($('#lName').val());
        var email = validator.trim($('#email').val());
        var username = validator.trim($('#username').val());
        var password = validator.trim($('#password').val());
        var school = validator.trim($('#school').val());

        if (validator.isEmpty(fName) || validator.isEmpty(lName) || 
            validator.isEmpty(email) || validator.isEmpty(username) ||
            validator.isEmpty(password) || validator.isEmpty(school))
            return false;
        return true;
    }

    function checkIfValidName(field, name) {
        if (!validator.isAlpha(name.replace(" ", '').replace(".", '').replace("-", '').replace("ñ", '')))
            setInvalid(field, 'Invalid input. Use valid characters only.');
        else setValid(field);
    }

    function checkIfValidUsername(username) {
        if (!validator.isAlphanumeric(username.replace("-", '').replace("_", '').replace(".", '')))
            setInvalid($('#username'), 'Invalid username. Use Alphanumeric characters (A-Z, 0-9), dash (-), period, and underscore (_) only.');
        else if (!validator.isLength(username, {min: 12, max: 20})) 
            setInvalid($('#username'), 'Invalid username. Minimum of 12 characters and maximum of 20 characters.');
        else $.get('/getCheckUsername', {username: username}, function (result) {
            if(result.username == username) 
                setInvalid($('#username'), 'Username is taken!');
            else setValid($('#username'));
        });
    }

    function checkIfValidEmail(email) {
        if (!validator.isEmail(email)) 
            setInvalid($('#email'), 'Invalid email. Please use a valid format.');
        else {
            validator.normalizeEmail(email);
            $.get('/getCheckEmail', {email: email}, function (result) {

                if(result.email == email) 
                    setInvalid($('#email'), 'Email is taken!');
                else setValid($('#email'));
            });
        }
    }

    function checkIfValidPassword(password) {
        if (!validator.isAscii(password))
            setInvalid($('#password'), 'Invalid password. Use ASCII characters only.');
        else if (!validator.isLength(password, {min: 12, max: 20}))
            setInvalid($('#password'), 'Invalid password. Minimum of 12 characters and maximum of 20 characters.');
        else if (!validator.isStrongPassword(password)) 
            setInvalid($('#password'), 'Weak password. Password should have at least one uppercase letter, one lowercase letter, and one number.');
        else setValid($('#password'));
    }

    function checkIfPasswordMatch(password, passwordc) {
        if (password != passwordc)
            setInvalid($('#c_password'), 'Passwords do not match.');
        else setValid($('#c_password'));
    }

    $('#fName').keyup(function () {
        var fName = validator.trim($('#fName').val());
        checkIfValidName($('#fName'), fName);
    });

    $('#lName').keyup(function () {
        var lName = validator.trim($('#lName').val());
        checkIfValidName($('#lName'), lName);
    });

    $('#username').keyup(function () {
        var username = validator.trim($('#username').val());
        checkIfValidUsername(username);
    });

    $('#email').keyup(function () {
        var email = validator.trim($('#email').val());
        checkIfValidEmail(email);
    });

    $('#password').keyup(function () {
        var password = validator.trim($('#password').val());
        checkIfValidPassword(password);
    });

    $('#c_password').keyup(function () {
        var password = validator.trim($('#password').val());
        var passwordc = validator.trim($('#c_password').val());
        checkIfValidPassword(password, passwordc);
    });

    $('#school').keyup(function () {
        var school = validator.trim($('#school').val());
        checkIfValidName($('#school'), school);
    });
    
    $('#signup_button').click(function () {
        var name = $('#name').val();
        var refno = $('#refno').val();
        var amount = $('#amount').val();

        if (!$('#name').val() || !$('#refno').val() || !$('#amount').val()) {
            $('#error').text('Fill up all fields');
        }
        else {
            var temp = {
                name: name,
                refno: refno,
                amount: amount
            };
            $.get('/add', temp, function (result) {
                $('#cards').load('/ #cards');
                $('#name').val("");
                $('#refno').val("");
                $('#amount').val("");
                $('#error').text("");
            });
        }

    });
});
