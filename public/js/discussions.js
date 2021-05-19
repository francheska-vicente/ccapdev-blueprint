$(document).ready (function ()
{
  /* MODIFYING COMMENTS */
  // editing comments
  $("#edit_com").submit (function (e) {
    e.preventDefault ();
    $(".editcontainer").css ("display", "none");
    var URL = window.location.href + (" #div_" + $("#commentID").val ());
    $.post($("#origEditDiv").attr ("name"), 
      {
        edit_txt : $("#edit_text").val (),
        commentID : $("#commentID").val ()
      }, function (result) {
          $('#div_' + $("#commentID").val ()).load (URL);
    })
  });
  
  // making the edit container  visible
  $(".edt_btn").click (function ()
  {
   var btn_id = $(this).attr ("id");
   var commentID = btn_id.substring (5, btn_id.length);
   $(".containers").css ("display", "none");
   $(".editcontainer").css ("display", "block");
   $(".edit_txt").val ($("#" + commentID).html ());
   $("#origEditDiv").attr ("name", $("#div_" + commentID).attr ("name") + "edit");
   $("#commentID").val (commentID);
  });

  // commenting on a comment
  // making the create comment container visible
  $(".cmt_btn").click (function ()
  {
    var commentDiv =  $(this).closest(".commentDiv").attr ("name") + "comment";
    var container = $("#createDiv");
    $(".containers").css ("display", "none");
    container.css ("display", "block");
    container.children ().attr ("name", commentDiv);
    

    var btn_id = $(this).attr ("id");
    var commentID = btn_id.substring (5, btn_id.length);
    $("#c_commentID").val (commentID);
  });

  // sends the information to the database
  $("#new_com").submit (function (e) {
    e.preventDefault ();
    $(".createcontainer").css ("display", "none");
    $.post($("#createDiv").attr ("name"), 
      {
        comment_text : $("#new_comment").val ()
      }, function (data, status) {
        if(status == ‘success’)
        {
          var commentVal =  comment.content;
          var fName = comment.fName;
          var lName = comment.lName;
        }
    });
  });

  /* MODIFYING DISCUSSION */
  // setting the value of the edit container of the discussion to the discussion value
  $("#main_txt").val ($(".main_cmt").html ());

  $("#main_edit_button").click (function () {
    $(".main_cmt").html ($("#main_txt").val ());
    $("#main_edit_container").css ("display", "none");
  });

  $("#main_edit_btn").click (function () {
    $(".containers").css ("display", "none");
    $("#main_edit_container").css ("display", "block");
  });

  $("#main_comment_btn").click (function () {
    $(".containers").css ("display", "none");
    $("#main_CreateDiv").css ("display", "block");
  });

});