$(document).ready(function () {

    $('#passwordError').text('Please fill out all fields to delete your profile.');
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

    function checkIfPasswordFilled() {
        var password = validator.trim($('#password').val());
        if (validator.isEmpty(password)) {
            $('#passwordError').text('Please enter your password to delete your profile.');
            $('#edit_button').attr("disabled", true);
        }
        else setValid($('#password'), $('#passwordError'));
    }

    $('#password').keyup(function () {
        checkIfPasswordFilled();
    });
});
