$(document).ready(function () {
    var start_classtimeA = '';
    var end_classtimeA = '';
    var start_classtimeB = '';
    var end_classtimeB = '';
    var dayA = $('#classdayA').val();

    checkIfTimeFilled(start_classtimeA, end_classtimeA, $('#classdayAError'), 'Time for Day 1 must not be empty.', 'A');
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

    function checkIfValidTime(day) {
        if(day == 'A') {
            var start = new Date("01/01/2021 " + $('#start_classtimeA').val());
            var end = new Date("01/01/2021 " +$('#end_classtimeA').val());
            if(end-start>0) {
                $('#start_classtimeA').css('background-color', '#FFFFFF');
                $('#end_classtimeA').css('background-color', '#FFFFFF');
                $('#start_classtimeAError').text('');
                $('#create_button').attr("disabled", false);
            }
            else {
                $('#start_classtimeA').css('background-color', '#FFB0B0');
                $('#end_classtimeA').css('background-color', '#FFB0B0');
                $('#start_classtimeAError').text('Invalid time.');
                $('#create_button').attr("disabled", true);
            }
        }
        else {
            var start = new Date("01/01/2021 " + $('#start_classtimeB').val());
            var end = new Date("01/01/2021 " + $('#end_classtimeB').val());
            if(end-start>0) {
                $('#start_classtimeB').css('background-color', '#FFFFFF');
                $('#end_classtimeB').css('background-color', '#FFFFFF');
                $('#start_classtimeBError').text('');
                $('#create_button').attr("disabled", false);
            }
            else {
                $('#start_classtimeB').css('background-color', '#FFB0B0');
                $('#end_classtimeB').css('background-color', '#FFB0B0');
                $('#start_classtimeBError').text('Invalid time.');
                $('#create_button').attr("disabled", true);
            }
        }
    }

    function checkIfTimeFilled(start, end, errorfield, errormsg, day) {
        if (validator.isEmpty(start) || validator.isEmpty(end)) {
            errorfield.text(errormsg);
            $('#create_button').attr("disabled", true);
        }
        else { 
            errorfield.text('');
            $('#create_button').attr("disabled", false);
            checkIfValidTime(day);
        }
    }

    function checkIfAllFilled() {
        var classname = validator.trim($('#classname').val());
        var coursecode = validator.trim($('#coursecode').val());
        var professor = validator.trim($('#professor').val());

        if (validator.isEmpty(classname) || validator.isEmpty(coursecode) ||
            validator.isEmpty(professor) || validator.isEmpty(start_classtimeA) || 
            validator.isEmpty(end_classtimeA)) {
            $('#classnameError').text('Required fields must be filled.');
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

    $('#start_classtimeA').timepicker({
        step : 15,
        timeFormat : 'H:i',
        forceRoundTime : true
    }).on('changeTime', function(e) {
        start_classtimeA = $(this).val();
        checkIfTimeFilled(start_classtimeA, end_classtimeA, $('#classdayAError'), 'Time for Day 1 must not be empty.', 'A');
        checkIfAllFilled();
    });

    $('#end_classtimeA').timepicker({
        step : 15,
        timeFormat : 'H:i',
        forceRoundTime : true
    }).on('changeTime', function(e) {
        end_classtimeA = $(this).val();
        checkIfTimeFilled(start_classtimeA, end_classtimeA, $('#classdayAError'), 'Time for Day 1 must not be empty.', 'A');
        checkIfAllFilled();
    });

    $('#classdayA').change(function () {
        dayA = $('#classdayA').val();
        checkIfTimeFilled(start_classtimeA, end_classtimeA, $('#classdayAError'), 'Time for Day 1 must not be empty.', 'A');
        checkIfAllFilled();
    });

    $('#classdayB').change(function () {
        var dayB = $('#classdayB').val();
        if (dayB != '')
            checkIfTimeFilled(start_classtimeB, end_classtimeB, $('#classdayBError'), 'Time for Day 2 must not be empty.', 'B');
        checkIfAllFilled();
    });

    $('#start_classtimeB').timepicker({
        step : 15,
        timeFormat : 'H:i',
        forceRoundTime : true
    }).on('changeTime', function(e) {
        start_classtimeB = $(this).val();
        checkIfTimeFilled(start_classtimeB, end_classtimeB, $('#classdayBError'), 'Time for Day 2 must not be empty.', 'B');
        checkIfAllFilled();
    });

    $('#end_classtimeB').timepicker({
        step : 15,
        timeFormat : 'H:i',
        forceRoundTime : true
    }).on('changeTime', function(e) {
        end_classtimeB = $(this).val();
        checkIfTimeFilled(start_classtimeB, end_classtimeB, $('#classdayBError'), 'Time for Day 2 must not be empty.', 'B');
        checkIfAllFilled();
    });
});
