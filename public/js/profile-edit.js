$(document).ready(function () {

    $('#passwordError').text('Please enter your password to edit your profile.');
    $('#edit_button').attr("disabled", true);

    function setInvalid(field, errormsg, errorfield) {
        field.css('background-color', '#FFB0B0');
        errorfield.text(errormsg);
        $('#edit_button').attr("disabled", true);
    }

    function setValid(field, errorfield) {
        field.css('background-color', '#FFFFFF');
        errorfield.text('');
        $('#edit_button').attr("disabled", false);
    }

    function checkIfValidUsername(username) {
        if (!validator.isAlphanumeric(username.replaceAll("-", '').replaceAll("_", '').replaceAll(".", '')))
            setInvalid($('#username'), 'Invalid username. Use Alphanumeric characters (A-Z, 0-9), dash (-), period, and underscore (_) only.', $('#usernameError'));
        else if (!validator.isLength(username, {min: 12, max: 20})) 
            setInvalid($('#username'), 'Invalid username. Minimum of 12 characters and maximum of 20 characters.', $('#usernameError'));
        else $.get('/getCheckNewUsername', {username: username}, function (result) {
            if(result.username == username) 
                setInvalid($('#username'), 'Username is taken!', $('#usernameError'));
            else setValid($('#username'), $('#usernameError'));
        });
    }

    function checkIfValidContactNo(contact_no) {
        if (!validator.isMobilePhone(contact_no, 'en-PH'))
            setInvalid($('#contact_no'), 'Invalid PH phone number.', $('#contact_noError'));
        else setValid($('#contact_no'), $('#contact_noError'));
    }

    function checkIfValidDegree(degree) {
        if (!validator.isAlpha(degree.replaceAll(" ", '').replaceAll(".", '').replaceAll("-", '').replaceAll("ñ", '')))
            setInvalid($('#degree'), 'Invalid degree. Use valid characters only.', $('#degreeError'));
        else setValid($('#degree'), $('#degreeError'));
    }

    function checkIfValidBio(bio) {
        if (!validator.isAscii(bio))
            setInvalid($('#bio'), 'Invalid bio. Use valid characters only.', $('#bioError'));
        else if (!validator.isLength(bio, {min: 0, max: 100}))
            setInvalid($('#bio'), 'Invalid bio. Maximum of 100 characters.', $('#bioError'));
        else setValid($('#bio'), $('#bioError'));
    }

    function checkIfValidPassword(password) {
        if (!validator.isAscii(password))
            setInvalid($('#n_password'), 'Invalid password. Use ASCII characters only.', $('#n_passwordError'));
        else if (!validator.isLength(password, {min: 12, max: 20}))
            setInvalid($('#n_password'), 'Invalid password. Minimum of 12 characters and maximum of 20 characters.', $('#n_passwordError'));
        else if (!validator.isStrongPassword(password)) 
            setInvalid($('#n_password'), 'Weak password. Password should have at least one uppercase letter, one lowercase letter, one number, and one symbol.', $('#n_passwordError'));
        else setValid($('#n_password'), $('#n_passwordError'));
    }

    function checkIfPasswordFilled() {
        var password = validator.trim($('#password').val());
        if (validator.isEmpty(password)) {
            $('#passwordError').text('Please enter your password to edit your profile.');
            $('#edit_button').attr("disabled", true);
        }
        else setValid($('#password'), $('#passwordError'));
    }

    $('#username').keyup(function () {
        var username = validator.trim($('#username').val());
        checkIfValidUsername(username);
        checkIfPasswordFilled();
    });

    $('#contact_no').keyup(function () {
        var contact_no = validator.trim($('#contact_no').val());
        if(contact_no) checkIfValidContactNo(contact_no);
        checkIfPasswordFilled();
    });

    $('#degree').keyup(function () {
        var degree = validator.trim($('#degree').val());
        if(degree) checkIfValidDegree(degree);
        checkIfPasswordFilled();
    });

    $('#bio').keyup(function () {
        var bio = validator.trim($('#bio').val());
        if(bio) checkIfValidBio(bio);
        checkIfPasswordFilled();
    });

    $('#n_password').keyup(function () {
        var password = validator.trim($('#n_password').val());
        if(password) checkIfValidPassword(password);
        checkIfPasswordFilled();
    });

    $('#password').keyup(function () {
        checkIfPasswordFilled();
    });
});
