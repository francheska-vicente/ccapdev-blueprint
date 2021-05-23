$(document).ready (function () {
  $(".dlt_btn").click (function () {
    var btn_id = $(this).attr ("id");
    var reqID = btn_id.substring (5, btn_id.length);

    var temp1 = $("#div_" + reqID).attr ("name");
    var URL = temp1.substring (0, temp1.length - 4);
    var temp = URL + "delete";

    $.post(temp, null, function (result) {
      $("#div_" + reqID).empty ();
      $("#div_" + reqID).remove ();
    })
  });
  
  $(".edt_btn").click (function () {
    var btn_id = $(this).attr ("id");
    var reqID = btn_id.substring (5, btn_id.length);
            
    $(".editcontainer").css ("display", "block");

    $(".form").attr ("name", reqID);
    var temp = $("#" + reqID + "req-type").html ();
    temp = temp.split ("|");
    var type = temp  [0];
    
    $("#req_type").val (type);
    $("#desc_txt").val ($("#" + reqID + "req-details").html ());
    temp = temp [1].split (" ");
    var month = 11, m = temp [3];
    if (m == 'Jan')
      month = 0;
    else if (m == 'Feb')
      month = 1;
    else if (m == 'Mar')
      month = 2;
    else if (m == 'Apr')
      month = 3;
    else if (m == 'May')
      month = 4;
    else if (m == 'Jun' || m == 'June')
      month = 5;
    else if (m == 'Jul' || m == 'July')
      month = 6;
    else if (m == 'Aug')
      month = 7;
    else if (m == 'Sep' || m == 'Sept')
      month = 8;
    else if (m == 'Oct')
      month = 9;
    else if (m == 'Nov')
      month = 10;
    
    month = month + 1;

    if (month >= 10)
      month = "" + month;
    else
      month = "0" + month;

    var day = parseInt (temp [4]);
    var year = parseInt (temp [5]);
    var time = temp [6].split (":");
    
    // var date = new Date (year, month, day, time [0], time [1], time [2]);
    $("#deadline").val (year + "-" + month + "-" + day + 'T' + time [0] + ':' + time [1]);
  });

  $("#edit_form").submit (function (e) {
    e.preventDefault ();
    var reqID = $(".form").attr ("name");
    var temp = $("#div_" + reqID).attr ("name");

    var URL = temp.substring (0, temp.length - 5);
    URL = URL + " #info_" + reqID;
    
    $(".editcontainer").css ("display", "none");
    
    $.post (temp, 
      {
        deadline: $("#deadline").val (), 
        paragraph_text: $("#desc_txt").val (), 
        type: $("#req_type").val ()
      }, function (result) {
        result.deadline = result.deadline.split("T")
        $("#" + reqID + "req-type").html ($("#req_type").val () + " | Due " + result.deadline[0]);
        $("#" + reqID + "req-details").html ($("#desc_txt").val ());
      });
  });
});