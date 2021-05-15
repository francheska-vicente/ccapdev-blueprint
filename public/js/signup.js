$(document).ready(function () {

    $('#username').keyup(function () {

        var username = $('#username').val();

        if(username) {
            $('#username').css('background-color', '#FFB0B0');
            $('#error').text('Username is taken!');
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