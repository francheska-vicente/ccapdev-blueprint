$(document).ready(function () {
    var times = [
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
        '18:00'];

    var days = ['Sunday', 'Monday', 'Tuesday', 
        'Wednesday','Thursday', 'Friday', 'Saturday'];

    var numrows = 48;
    var numcols = 7;

    function countRowSpan(start, end) {
        var timeStart = new Date("01/01/2021 " + start);
        var timeEnd = new Date("01/01/2021 " + end);

        var difference = timeEnd - timeStart;
        return difference / 60 / 1000 / 15;
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

    function removeCols(result) {
        var arr = []
        for(let k = 0; k < result.length; k++) {
            arr.push(result[k].classdayA);
            arr.push(result[k].classdayB);
        }

        for(j in days) 
            if(!arr.includes(days[j])) {
                console.log('removed ' + days[j])
                // remove here
                // $('table tr').find('td:eq('+j+1+'),th:eq('+j+1+')').remove();
            }
    }

    $.get('/getClasses', function (result) {
        if(result) {
            // loop per row
            var noClassYet = true;
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
                        }
                        if(times[i] === result[k].start_classtimeB && days[j] === result[k].classdayB) {
                            var rowspan = countRowSpan(result[k].start_classtimeB, result[k].end_classtimeB);
                            str = str + '<td class="classtime" rowspan="' + rowspan + '">' +
                                            result[k].coursecode + '<br>' + 
                                            result[k].start_classtimeB + ' - ' +
                                            result[k].end_classtimeB +
                                        '</td>';
                            noClassAdded = false;
                        }
                    }

                    if (noClassAdded && !checkIfInClass(times[i], days[j], result)) 
                        str = str + '<td></td>';

                }

                str = str + '</tr>';
                strcmp = '<tr><td>' + times[i] + " - " + times[i+1] + '</td>' +
                            '<td></td><td></td><td></td><td></td><td></td><td></td><td></td>' + '</tr>';
                if (!(noClassYet && str == strcmp)) {
                    $('#sched').append(str);
                    noClassYet = false;
                }
            }
            removeCols(result);
        }
    });
});
