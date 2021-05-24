$(document).ready(function () {

    $('#error').text('Please fill out all fields to delete your profile.');
    $('#confirm_button').attr("disabled", true);

    function setInvalid(field, errormsg, errorfield) {
        field.css('background-color', '#FFB0B0');
        errorfield.text(errormsg);
        $('#confirm_button').attr("disabled", true);
    }

    function setValid(field, errorfield) {
        field.css('background-color', '#FFFFFF');
        errorfield.text('');
        $('#confirm_button').attr("disabled", false);
    }

    function checkIfFilled(field, errormsg, errorfield) {
        var password = validator.trim(field.val());
        if (validator.isEmpty(password)) 
            setInvalid(field, errormsg, errorfield);
        else setValid(field, errorfield);
    }

    $('#password').keyup(function () {
        checkIfPasswordFilled($('#password'), 'Please enter your password to delete your profile.', $('#passwordError'));
    });

    $('#c_password').keyup(function () {
        checkIfPasswordFilled($('#c_password'), 'Please confirm your password to delete your profile.', $('#c_passwordError'));
    });
});
