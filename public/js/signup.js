$(document).ready(function () {
    checkIfFilled();
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
        var username = validator.trim($('#username').val());
        var email = validator.trim($('#email').val());
        var password = validator.trim($('#password').val());
        var passwordc = validator.trim($('#c_password').val());
        var school = validator.trim($('#school').val());

        if (validator.isEmpty(fName) || validator.isEmpty(lName) ||
            validator.isEmpty(username) || validator.isEmpty(email) ||
            validator.isEmpty(password) || validator.isEmpty(passwordc) ||
            validator.isEmpty(school)) {
            $('#error').text('All fields must be filled.');
            $('#signup_button').attr("disabled", true);
        }
            
        else { 
            $('#error').text('');
            $('#signup_button').attr("disabled", false);
        }
    }

    function checkIfValidName(field, name) {
        if (!validator.isAlpha(name.replaceAll(" ", '').replaceAll(".", '').replaceAll("-", '').replaceAll("ñ", '')))
            setInvalid(field, 'Invalid input. Use valid characters only.');
        else setValid(field);
    }

    function checkIfValidUsername(username) {
        if (!validator.isAlphanumeric(username.replaceAll("-", '').replaceAll("_", '').replaceAll(".", '')))
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
        console.log(validator.isStrongPassword(password))
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
        checkIfFilled();
    });

    $('#lName').keyup(function () {
        var lName = validator.trim($('#lName').val());
        checkIfValidName($('#lName'), lName);
        checkIfFilled();
    });

    $('#username').keyup(function () {
        var username = validator.trim($('#username').val());
        checkIfValidUsername(username);
        checkIfFilled();
    });

    $('#email').keyup(function () {
        var email = validator.trim($('#email').val());
        checkIfValidEmail(email);
        checkIfFilled();
    });

    $('#password').keyup(function () {
        var password = validator.trim($('#password').val());
        checkIfValidPassword(password);
        checkIfFilled();
    });

    $('#c_password').keyup(function () {
        var password = validator.trim($('#password').val());
        var passwordc = validator.trim($('#c_password').val());
        checkIfValidPassword(password, passwordc);
        checkIfFilled();
    });

    $('#school').keyup(function () {
        var school = validator.trim($('#school').val());
        checkIfValidName($('#school'), school);
        checkIfFilled();
    });
});
