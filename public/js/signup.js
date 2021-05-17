$(document).ready(function () {

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
        if (!validator.isAlpha(name.replace(" ", '').replace(".", '').replace("-", '').replace("ñ", ''))) {
            field.css('background-color', '#FFB0B0');
            $('#error').text('Invalid name. Use valid characters only.');
        }
        else {
            field.css('background-color', '#FFFFFF');
            $('#error').text('');
        }
    }

    function checkIfValidUsername(username) {
        if (!validator.isAlphanumeric(username.replace("-", '').replace("_", '').replace(".", ''))) {
            $('#username').css('background-color', '#FFB0B0');
            $('#error').text('Invalid username. Use Alphanumeric characters (A-Z, 0-9), dash (-), period, and underscore (_) only.');
        }

        else {
            if (!validator.isLength(username, {min: 12, max: 20})) {
                $('#username').css('background-color', '#FFB0B0');
                $('#error').text('Invalid username. Minimum of 12 characters and maximum of 20 characters.');
            }
            else {
                $.get('/getCheckUsername', {username: username}, function (result) {

                    if(result.username == username) {
                        $('#username').css('background-color', '#FFB0B0');
                        $('#error').text('Username is taken!');
                    }
                    else {
                        $('#username').css('background-color', '#FFFFFF');
                        $('#error').text('');
                    }
                });
            }
        }
    }

    function checkIfValidEmail(email) {

        if (!validator.isEmail(email)) {
            $('#email').css('background-color', '#FFB0B0');
            $('#error').text('Invalid email. Please use a valid format.');
        }

        else {
            validator.normalizeEmail(email);
            $.get('/getCheckEmail', {email: email}, function (result) {

                if(result.email == email) {
                    $('#email').css('background-color', '#FFB0B0');
                    $('#error').text('Email is taken!');
                }
                else {
                    $('#email').css('background-color', '#FFFFFF');
                    $('#error').text('');
                }
            });
        }
    }

    function checkIfValidPassword(password) {

        if (!validator.isAscii(password)) {
            $('#password').css('background-color', '#FFB0B0');
            $('#error').text('Invalid password. Use ASCII characters only.');
        }

        else {
            if (!validator.isLength(password, {min: 12, max: 20})) {
                $('#password').css('background-color', '#FFB0B0');
                $('#error').text('Invalid password. Password should have at least one uppercase letter, one lowercase letter, and one number.');
            }

            else {
                if (!validator.isStrongPassword(password)) {
                    $('#password').css('background-color', '#FFB0B0');
                    $('#error').text('Weak password. Password should have at least one uppercase letter, one lowercase letter, and one number.');
                }

                else {
                    $.get('/getCheckEmail', {email: email}, function (result) {

                        if(result.email == email) {
                            $('#email').css('background-color', '#FFB0B0');
                            $('#error').text('Email is taken!');
                        }
                        else {
                            $('#email').css('background-color', '#FFFFFF');
                            $('#error').text('');
                        }
                    });
                }
            }
        }
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
});
