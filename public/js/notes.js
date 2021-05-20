$(document).ready (function ()
{
  // adding click events to buttons 
  function comment_func ()
  {
    $(".createcontainer").css ("display", "block");
  }

  function edit_func ()
  {
    var btn_id = $(this).attr ("id");
    var commentID = btn_id.substring (5, btn_id.length);
    $(".containers").css ("display", "none");
    $("#origEditDiv").css ("display", "block");
    $(".edit_txt").val ($("#" + commentID).html ());

    $("#origEditDiv").attr ("name", $("#div_" + commentID).attr ("name") + "/edit");
    $("#commentID").val (commentID);
  }

  function delete_func ()
  {
    var commentID = $(this).attr ("id").substring (5, $(this).attr ("id").length);

    var route = window.location.href;
    route = route.substring (21, route.length) + "/" + commentID + "/delete";

    var URL = window.location.href + " #comment";
    
    $.post(route, {commentID : commentID}, function (result) {
      $("#div_" + commentID).empty ();
      $("#div_" + commentID).remove ();
    })
  }

  /* MODIFYING DISCUSSION */
  // setting the value of the edit container of the notes to the notes value
  $("#main_txt").val ($(".main_cmt").html ());

  $("#main_edit_button").click (function () {
    $(".main_cmt").html ($("#main_txt").val ());
    $("#main_edit_container").css ("display", "none");
  });

  // showing the containers
  $("#main_edit_btn").click (function () {
    $(".containers").css ("display", "none");
    $("#main_edit_container").css ("display", "block");
  });

  $("#main_comment_btn").click (function () {
    $(".containers").css ("display", "none");
    $("#main_CreateDiv").css ("display", "block");
  });

  $("#comment_notes").submit (function (e) {
    e.preventDefault ();
      var URL = window.location.href;
          URL = URL.substring (21, URL.length) + "/comment";
      console.log (URL);
    $.post(URL, {main_notes_text : $("#main_comment_text").val ()}, function (comment, status) {
      console.log (status);
      if(status == 'success')
        {
          console.log ("hehe");
          // assigning the values that the user entered
          var commentVal =  comment.content;
          var fName = comment.fName;
          var lName = comment.lName;
          var username = comment.username;

          // creating the HTML elements
          var commentNode = $("<h6/>").html (commentVal);
          commentNode.attr ("class", "comment_content");
          commentNode.attr ("id", comment.commentID);
          var innerDiv = $("<div/>");
          innerDiv.attr ("name", "com_div_" + comment.commentID);
          innerDiv.append (commentNode);

          var nameNode = $("<h5/>").html (fName + " " + lName);
          var commentDiv = $("#origCommentDiv").clone ();

          commentDiv.prepend (innerDiv);
          commentDiv.prepend (nameNode);
          commentDiv.append ($("<br/><hr/>"));
          commentDiv.attr ("id", "div_" + comment.commentID);
          commentDiv.attr ("class", "commentDiv");
          
          var URL = window.location.href;
          URL = URL.substring (21, URL.length);
          commentDiv.attr ("name", URL + "/" + comment.commentID);

          var commentButton  = commentDiv.find ("#comment_btn");
          commentButton.attr ("id", "cbtn_" + comment.commentID);
          commentButton.click (comment_func);

          var editButton = commentDiv.find ("#edit_btn");
          editButton.attr ("id", "ebtn_" + comment.commentID);
          editButton.click (edit_func);

          var delButton = commentDiv.find ("#delete_btn");
          delButton.attr ("id", "dbtn_" + comment.commentID);
          delButton.click (delete_func);

          $("#comment").append (commentDiv);
          commentDiv.css ("display", "block");
          $("#main_CreateDiv").css ("display", "none");
          $("#main_comment_text").val ("")
        }
    });
  });
});