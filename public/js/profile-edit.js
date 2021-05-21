$(document).ready(function () {
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

    function checkIfValidContactNo(username, errorfield) {
        if (!validator.isMobilePhone(str, 'en-PH'))
            setInvalid($('#username'), 'Invalid PH phone number.', errorfield);
        else setValid($('#username'), errorfield);
    }

    $('#username').keyup(function () {
        var username = validator.trim($('#username').val());
        checkIfValidUsername($('#username'), $('#usernameError'));
        checkIfFilled();
    });
});
