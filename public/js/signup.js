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

    function checkIfValidUsername(username) {

        if (!validator.isAlphanumeric(username.replace("-", '').replace("_", ''))) {
            $('#username').css('background-color', '#FFB0B0');
            $('#error').text('Invalid username. Use Alphanumeric characters (A-Z, 0-9), dash (-), and underscore (_) only.');
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

    $('#username').keyup(function () {

        var username = validator.trim($('#username').val());
        checkIfValidUsername(username);
    });

    $('#email').keyup(function () {

        var email = $('#email').val();
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
    });
});