$(document).ready(function () {
    $('.ui-timepicker-list').timepicker({
        step : 15,
        timeFormat : 'H:i'
    });


    checkIfAllFilled();
    function setInvalid(field, errormsg, errorfield) {
        field.css('background-color', '#FFB0B0');
        errorfield.text(errormsg);
        $('#create_button').attr("disabled", true);
    }

    function setValid(field, errorfield) {
        field.css('background-color', '#FFFFFF');
        errorfield.text('');
        $('#create_button').attr("disabled", false);
    }

    function checkIfAllFilled() {
        var classname = validator.trim($('#classname').val());
        var coursecode = validator.trim($('#coursecode').val());
        var professor = validator.trim($('#professor').val());

        if (validator.isEmpty(classname) || validator.isEmpty(coursecode) ||
            validator.isEmpty(professor)) {
            $('#error').text('Required fields must be filled.');
            $('#create_button').attr("disabled", true);
        }
            
        else { 
            $('#error').text('');
            $('#create_button').attr("disabled", false);
        }
    }

    function checkIfValidName(field, name, errorfield) {
        if (!validator.isAlphanumeric(name.replaceAll(" ", '').replaceAll(".", '').replaceAll("-", '').replaceAll("ñ", '')))
            setInvalid(field, 'Invalid input. Use valid characters only.', errorfield);
        else setValid(field, errorfield);
    }

    $('#classname').keyup(function () {
        var classname = validator.trim($('#classname').val());
        checkIfValidName($('#classname'), classname, $('#classnameError'));
        checkIfAllFilled();
    });

    $('#coursecode').keyup(function () {
        var coursecode = validator.trim($('#coursecode').val());
        checkIfValidName($('#coursecode'), coursecode, $('#coursecodeError'));
        checkIfAllFilled();
    });

    $('#professor').keyup(function () {
        var professor = validator.trim($('#professor').val());
        checkIfValidName($('#professor'), professor, $('#professorError'));
        checkIfAllFilled();
    });
});
