$(document).ready (function ()
{
  // creating comment threads
  var URL = $("#main_content").attr ("name");
  var commentRoute = URL + 'comments';
  // var temp = URL;
  // var notesID = temp.split ("/")[4];
  
  // $.get (commentRoute, null, function (result) {
  //   console.log (notesID);
  //   if (Array.isArray(result.comments) && result.comments.length)
  //   {
  //     var parentID = notesID;
  //     var arr = result.comments;
  //     var user = result.current_user;

  //     while (Array.isArray(arr) && arr.length)
  //     {
  //       var elem = arr.shift ();
  //       parentID = elem.parentID;
  //       create_node (parentID, elem, user);

  //       parentID = elem.commentID;
  //       while (arr.some (temp => temp.parentID == parentID) == 'true')
  //       {
  //         var temp = arr.find (element => element.parentID == parentID);
  //         var index = arr.indexOf (temp);
  //         arr.splice (index, 1);
  //         arr.unshift (temp);
  //       }
  //     }
  //   }
  // });

  function create_node (parentID, elem, user)
  {
    // assigning the values that the user entered
    var commentVal =  elem.content;
    var fName = elem.fName;
    var lName = elem.lName;
    var username = elem.username;

    // creating the HTML elements
    var commentNode = $("<h6/>").html (commentVal);
    commentNode.attr ("class", "comment_content");
    commentNode.attr ("id", elem.commentID);
    var innerDiv = $("<div/>");
    innerDiv.attr ("id", "com_div_" + elem.commentID);
    innerDiv.append (commentNode);

    var nameNode = $("<h5/>").html (fName + " " + lName);
    var commentDiv = $("#origCommentDiv").clone ();

    commentDiv.prepend (innerDiv);
    commentDiv.prepend (nameNode);
    commentDiv.append ($("<br/><hr/>"));
    commentDiv.attr ("id", "div_" + elem.commentID);
    commentDiv.attr ("class", "commentDiv");
    commentDiv.attr ("name", URL + elem.commentID);

    var commentButton  = commentDiv.find ("#comment_btn");
    commentButton.attr ("id", "cbtn_" + elem.commentID);
    commentButton.click (comment_func);

    if (user == elem.username)
    {
      console.log (user + " " + elem.username);
      var editButton = commentDiv.find ("#edit_btn");
      editButton.attr ("id", "ebtn_" + elem.commentID);
      editButton.click (edit_func);

      var delButton = commentDiv.find ("#delete_btn");
      delButton.attr ("id", "dbtn_" + elem.commentID);
      delButton.click (delete_func);
    }
    else
    {
      var delButton = commentDiv.find ("#delete_btn");
      delButton.remove ();
      var editButton = commentDiv.find ("#edit_btn");
      editButton.remove ();
    }

    if (notesID == parentID)
      $("#comment").append (commentDiv);
    else
    {
      $("#div_" + parentID).append (commentDiv);
      commentDiv.css ("width", "90%");
      commentDiv.css ("margin-left", "10%");
    }

    commentDiv.css ("display", "block");
  }


  /* MODIFYING COMMENTS */
  // deleting comments
  $(".dlt_btn").click (function () {
    var commentID = $(this).attr ("id").substring (5, $(this).attr ("id").length);

    var route = URL;
    route = route + commentID + "/delete";

    var route = URL + " #comment";
    
    $.post(route, {commentID : commentID}, function (result) {
      $("#div_" + commentID).empty ();
      $("#div_" + commentID).remove ();
    });
  });

  // editing comments
  $("#edit_com").submit (function (e) {
    e.preventDefault ();
    $(".editcontainer").css ("display", "none");
    var commentID = $("#commentID").val ();
    $.post($("#origEditDiv").attr ("name"), 
      {
        edit_txt : $("#edit_text").val (),
        commentID : $("#commentID").val ()
      }, function (result) {
        $('#' + commentID).html (result.content);
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
    container.attr ("name", commentDiv);

    
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
      }, function (comment, status) {
        if(status == 'success')
        {
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
          innerDiv.attr ("id", "com_div_" + comment.commentID);
          innerDiv.append (commentNode);

          var nameNode = $("<h5/>").html (fName + " " + lName);
          var commentDiv = $("#origCommentDiv").clone ();

          commentDiv.prepend (innerDiv);
          commentDiv.prepend (nameNode);
          commentDiv.append ($("<br/><hr/>"));
          commentDiv.attr ("id", "div_" + comment.commentID);
          commentDiv.attr ("class", "commentDiv");
          commentDiv.attr ("name", URL + comment.commentID);

          var commentButton  = commentDiv.find ("#comment_btn");
          commentButton.attr ("id", "cbtn_" + comment.commentID);
          commentButton.click (comment_func);

          var editButton = commentDiv.find ("#edit_btn");
          editButton.attr ("id", "ebtn_" + comment.commentID);
          editButton.click (edit_func);

          var delButton = commentDiv.find ("#delete_btn");
          delButton.attr ("id", "dbtn_" + comment.commentID);
          delButton.click (delete_func);

          if (notesID == comment.parentID)
            $("#comment").append (commentDiv);
          else
          {
            $("#div_" + comment.parentID).append (commentDiv);
            commentDiv.css ("width", "90%");
            commentDiv.css ("margin-left", "10%");
          }
          commentDiv.css ("display", "block");
          $(".createcontainer").css ("display", "none");
          $("#new_comment").val ("")
        }
    });
  });

  // adding click events to buttons 
  function comment_func ()
  {
    var commentDiv =  $(this).closest(".commentDiv").attr ("name") + "/comment";
    var container = $("#createDiv");
    $(".containers").css ("display", "none");
    container.css ("display", "block");
    container.attr ("name", commentDiv);

    
    var btn_id = $(this).attr ("id");
    var commentID = btn_id.substring (5, btn_id.length);
    $("#c_commentID").val (commentID);
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
    route = route.substring (32, route.length) + "/" + commentID + "/delete";

    var URL = window.location.href + " #comment";
    
    $.post(route, {commentID : commentID}, function (result) {
      $("#div_" + commentID).empty ();
      $("#div_" + commentID).remove ();
    })
  }

  /* MODIFYING DISCUSSION */
  // setting the value of the edit container of the discussion to the discussion value
  $("#main_edit_text").val ($("#main_content").html ());

  // showing the containers
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

  // adding a comment
  $("#comment_disc").submit (function (e) {
    e.preventDefault ();
      var route = route + "/comment";

      $.post(route, {main_comment_text : $("#commentbox_disc").val ()}, function (comment, status) {
        if(status == 'success')
        {
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
          innerDiv.attr ("id", "com_div_" + comment.commentID);
          innerDiv.append (commentNode);

          var nameNode = $("<h5/>").html (fName + " " + lName);
          var commentDiv = $("#origCommentDiv").clone ();

          commentDiv.prepend (innerDiv);
          commentDiv.prepend (nameNode);
          commentDiv.append ($("<br/><hr/>"));
          commentDiv.attr ("id", "div_" + comment.commentID);
          commentDiv.attr ("class", "commentDiv");
          commentDiv.attr ("name", route + comment.commentID);

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
          $("#commentbox_disc").val ("")
        }
      });
  });

  $("#edit_disc").submit (function (e) {
    e.preventDefault ();
      var route = URL;
      var temp = URL;
          temp = temp + "edit";

      $.post (URL, {main_edit_text : $("#main_edit_text").val ()}, function (result) {
        $("#main_content").load (route + " #main_content");
      });
  });
});