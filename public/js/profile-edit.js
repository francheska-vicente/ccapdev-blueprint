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
    
});
