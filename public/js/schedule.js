$(document).ready(function () {
    var times = [
        '00:00', '00:15', '00:30', '00:45',
        '01:00', '01:15', '01:30', '01:45',
        '02:00', '02:15', '02:30', '02:45',
        '03:00', '03:15', '03:30', '03:45',
        '04:00', '04:15', '04:30', '04:45',
        '05:00', '05:15', '05:30', '05:45',
        '06:00', '06:15', '06:30', '06:45',
        '07:00', '07:15', '07:30', '07:45',
        '08:00', '08:15', '08:30', '08:45',
        '09:00', '09:15', '09:30', '09:45',
        '10:00', '10:15', '10:30', '10:45',
        '11:00', '11:15', '11:30', '11:45',
        '12:00', '12:15', '12:30', '12:45',
        '13:00', '13:15', '13:30', '13:45',
        '14:00', '14:15', '14:30', '14:45',
        '15:00', '15:15', '15:30', '15:45',
        '16:00', '16:15', '16:30', '16:45',
        '17:00', '17:15', '17:30', '17:45',
        '18:00', '18:15', '18:30', '18:45',
        '19:00', '19:15', '19:30', '19:45',
        '20:00', '20:15', '20:30', '20:45',
        '21:00', '21:15', '21:30', '21:45',
        '22:00', '22:15', '22:30', '22:45',
        '23:00', '23:15', '23:30', '23:45',
        '00:00'
    ];

    var days = ['Sunday', 'Monday', 'Tuesday', 
        'Wednesday','Thursday', 'Friday', 'Saturday'];

    var numrows = 96;
    var numcols = 7;
    var username = $('.username').attr('id');

    function countRowSpan(start, end) {
        var timeStart = new Date("01/01/2021 " + start);
        var timeEnd = new Date("01/01/2021 " + end);
        return (timeEnd - timeStart) / 60 / 1000 / 15;
    }

    function checkIfInClass(currtime, currday, result) {
        for(let k = 0; k<result.length; k++) {
            if(currday === result[k].classdayA) {
                var timeCurr = new Date("01/01/2021 " + currtime);
                var timeStart = new Date("01/01/2021 " + result[k].start_classtimeA);
                var timeEnd = new Date("01/01/2021 " + result[k].end_classtimeA);

                if (timeStart < timeCurr && timeEnd > timeCurr)
                    return true;
            }
            if(currday === result[k].classdayB) {
                var timeCurr = new Date("01/01/2021 " + currtime);
                var timeStart = new Date("01/01/2021 " + result[k].start_classtimeB);
                var timeEnd = new Date("01/01/2021 " + result[k].end_classtimeB);

                if (timeStart < timeCurr && timeEnd > timeCurr)
                    return true;
            }
        }
        return false;
    }

    function countClasses(result) {
        var ctr = 0;
        for(let k = 0; k < result.length; k++) {
            if (result[k].classdayB != '') ctr+=2;
            else ctr+=1;
        }
        return ctr;
    }

    $.get('/getClasses', {username:username}, function (result) {
        if(result) {
            var noClassYet = true;
            var totalclass = countClasses(result);
            var currclass = 0;

            // loop per row
            for(let i = 0; i < numrows; i++) {
                var str = '<tr>';
                str = str + '<td>' + times[i] + " - " + times[i+1] + '</td>';

                // loop per col
                for(let j = 0; j < numcols; j++) {
                    var noClassAdded = true;

                    //loop thru result
                    for(let k = 0; k < result.length; k++) {
                        if(times[i] === result[k].start_classtimeA && days[j] === result[k].classdayA) {
                            var rowspan = countRowSpan(result[k].start_classtimeA, result[k].end_classtimeA);
                            str = str + '<td class="classtime" rowspan="' + rowspan + '">' +
                                            result[k].coursecode + '<br>' + 
                                            result[k].start_classtimeA + ' - ' +
                                            result[k].end_classtimeA +
                                        '</td>';
                            noClassAdded = false;
                            currclass++;
                        }
                        if(times[i] === result[k].start_classtimeB && days[j] === result[k].classdayB) {
                            var rowspan = countRowSpan(result[k].start_classtimeB, result[k].end_classtimeB);
                            str = str + '<td class="classtime" rowspan="' + rowspan + '">' +
                                            result[k].coursecode + '<br>' + 
                                            result[k].start_classtimeB + ' - ' +
                                            result[k].end_classtimeB +
                                        '</td>';
                            noClassAdded = false;
                            currclass++;
                        }
                    }

                    if (noClassAdded && !checkIfInClass(times[i], days[j], result)) 
                        str = str + '<td></td>';

                }

                str = str + '</tr>';

                // check if no class in row
                strcmp = '<tr><td>' + times[i] + " - " + times[i+1] + '</td>' +
                            '<td></td><td></td><td></td><td></td><td></td><td></td><td></td>' + '</tr>';
                
                // removes rows before first class and last class
                if (!((noClassYet || currclass >= totalclass) && str == strcmp)) {
                    $('#sched').append(str);
                    noClassYet = false;
                }
            }
        }
    });
});
