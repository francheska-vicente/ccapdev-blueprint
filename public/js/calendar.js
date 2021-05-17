$(document).ready(function () {
    var taskdays = [];
    var today = (new Date()).getDate();
    $.get('/getReqsDates', function (result) {
        if(result) {
            for(var j in result) {
                var d = new Date(result[j].deadline);
                taskdays.push(d.getDate());
            }
        }
        $('.cal-table tr').each(function() {
            for (let j = 0; j < 7; j++) {
                if($(this.cells[j]).text() == 'Sunday') j=7;
                if (parseInt($(this.cells[j]).text()) == today) 
                    $(this.cells[j]).addClass('today');

                if($(this.cells[j]).text() == '0') {
                    $(this.cells[j]).text('');
                    $(this.cells[j]).addClass('not-month');
                }

                else if (taskdays.includes(parseInt($(this.cells[j]).text()))){
                    $(this.cells[j]).addClass('with-task');
                }
                else {
                    $(this.cells[j]).addClass('in-month');
                }
            }
        });
    });
});
