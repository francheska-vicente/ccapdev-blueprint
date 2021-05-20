$(document).ready(function () {
    checkIfFilled();
    function setInvalid(field, errormsg, errorfield) {
        field.css('background-color', '#FFB0B0');
        errorfield.text(errormsg);
        $('#signup_button').attr("disabled", true);
    }

    function setValid(field, errorfield) {
        field.css('background-color', '#FFFFFF');
        errorfield.text('');
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

    function checkIfValidName(field, name, errorfield) {
        if (!validator.isAlpha(name.replaceAll(" ", '').replaceAll(".", '').replaceAll("-", '').replaceAll("ñ", '')))
            setInvalid(field, 'Invalid input. Use valid characters only.', errorfield);
        else setValid(field, errorfield);
    }

    function checkIfValidUsername(username, errorfield) {
        if (!validator.isAlphanumeric(username.replaceAll("-", '').replaceAll("_", '').replaceAll(".", '')))
            setInvalid($('#username'), 'Invalid username. Use Alphanumeric characters (A-Z, 0-9), dash (-), period, and underscore (_) only.', errorfield);
        else if (!validator.isLength(username, {min: 12, max: 20})) 
            setInvalid($('#username'), 'Invalid username. Minimum of 12 characters and maximum of 20 characters.', errorfield);
        else $.get('/getCheckUsername', {username: username}, function (result) {
            if(result.username == username) 
                setInvalid($('#username'), 'Username is taken!', errorfield);
            else setValid($('#username'), errorfield);
        });
    }

    function checkIfValidEmail(email, errorfield) {
        if (!validator.isEmail(email)) 
            setInvalid($('#email'), 'Invalid email. Please use a valid format.', errorfield);
        else {
            validator.normalizeEmail(email);
            $.get('/getCheckEmail', {email: email}, function (result) {

                if(result.email == email) 
                    setInvalid($('#email'), 'Email is taken!', errorfield);
                else setValid($('#email'), errorfield);
            });
        }
    }

    function checkIfValidPassword(password, passwordc, errorfield) {
        console.log(validator.isStrongPassword(password))
        if (!validator.isAscii(password))
            setInvalid($('#password'), 'Invalid password. Use ASCII characters only.', errorfield);
        else if (!validator.isLength(password, {min: 12, max: 20}))
            setInvalid($('#password'), 'Invalid password. Minimum of 12 characters and maximum of 20 characters.', errorfield);
        else if (!validator.isStrongPassword(password)) 
            setInvalid($('#password'), 'Weak password. Password should have at least one uppercase letter, one lowercase letter, one number, and one symbol.', errorfield);
        else if (password != passwordc) {
            setInvalid($('#c_password'), 'Passwords do not match.', errorfield);
            setInvalid($('#password'), 'Passwords do not match.', errorfield);
        }
        else {
            setValid($('#password'), errorfield);
            setValid($('#c_password'), errorfield);
        }
    }

    

    $('#fName').keyup(function () {
        var fName = validator.trim($('#fName').val());
        checkIfValidName($('#fName'), fName, $('#fNameError'));
        checkIfFilled();
    });

    $('#lName').keyup(function () {
        var lName = validator.trim($('#lName').val());
        checkIfValidName($('#lName'), lName, $('#lNameError'));
        checkIfFilled();
    });

    $('#username').keyup(function () {
        var username = validator.trim($('#username').val());
        checkIfValidUsername(username, $('#usernameError'));
        checkIfFilled();
    });

    $('#email').keyup(function () {
        var email = validator.trim($('#email').val());
        checkIfValidEmail(email, $('#emailError'));
        checkIfFilled();
    });

    $('#password').keyup(function () {
        var password = validator.trim($('#password').val());
        var passwordc = validator.trim($('#c_password').val());
        checkIfValidPassword(password, passwordc, $('#passwordError'));
        checkIfFilled();
    });

    $('#c_password').keyup(function () {
        var password = validator.trim($('#password').val());
        var passwordc = validator.trim($('#c_password').val());
        checkIfValidPassword(password, passwordc, $('#passwordError'));
        checkIfFilled();
    });

    $('#school').keyup(function () {
        var school = validator.trim($('#school').val());
        checkIfValidName($('#school'), school,$('#schoolError'));
        checkIfFilled();
    });
});
