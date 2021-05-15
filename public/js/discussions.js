$(document).ready (function ()
{
        $("#main_txt").val ($(".main_cmt").html ());

        function comment_func ()
        {
          $(this).closest(".commentDiv").find (".createcontainer").css ("display", "block");
        }

        function edit_func ()
        {
          var div = $(this).closest(".commentDiv");
          var content = div.children (".comment_content").html ();

          var container = div.find (".editcontainer");
          container.find (".container").children ().val (content);
          container.css ("display", "block");
        }

        function post_comment ()
        {
        
            var form = $(this).closest(".createcontainer").find (".container");
            var comment_box = form.children ();
            var commentVal =  comment_box.val ();
            var numOfComments = $(".commentDiv").length;
            
            var commentNode = $("<h6/>").html (commentVal);
            commentNode.attr ("class", "comment_content");
            var nameNode = $("<h5/>").html ("Harry Potter");
            var commentDiv = $("#origCommentDiv").clone ();
            
            commentDiv.prepend (commentNode);
            commentDiv.prepend (nameNode);
            commentDiv.append ($("<br/><hr/>"));
            commentDiv.attr ("id", "commentDiv" + numOfComments);
            commentDiv.attr ("class", "commentDiv");

            var commentButton  = commentDiv.find ("#comment_btn");
            commentButton.attr ("id", "comment_btn" + numOfComments);
            commentButton.click (comment_func);

            var editButton = commentDiv.find ("#edit_btn");
            editButton.attr ("id", "edit_btn" + numOfComments);
            editButton.click (edit_func);

            var delButton = commentDiv.find ("#delete_btn");
            delButton.attr ("id", "delete_btn" + numOfComments);
            delButton.click (delete_func);

            var createC = $("#origCreateDiv").clone ();
            createC.attr ("id", "createcontainer" + numOfComments);
            createC.find ("#comment_button").attr ("id", "comment_button" + numOfComments).click (post_comment);
            createC.find (".container").children ().val ("");

            var editC = $("#origEditDiv").clone ();
            editC.attr ("id", "editcontainer" + numOfComments);
            editC.find ("#edit_button").attr ("id", "edit_button" + numOfComments).click (edit_comment);

            commentDiv.append (createC);
            commentDiv.append (editC);

            $(".main").append (commentDiv);
            commentDiv.css ("display", "block");
            $(".createcontainer").css ("display", "none");
            comment_box.val ("");
        }

        function edit_comment ()
        {
          var form = $(this).closest(".editcontainer").find (".container");
          var edit_box = form.children ();
          var commentVal = edit_box.val ();
          
          $(this).closest (".commentDiv").children (".comment_content").html (commentVal);
          
          $(".editcontainer").css ("display", "none");
        }

        $(".createcontainer").on ("click", ".Addcmt_btn", post_comment);

        $(".editcontainer").on ("click", ".Editcmt_btn", edit_comment);

        $(".cmt_btn").click (function ()
        {
          var commentDiv =  $(this).closest(".commentDiv").attr ("name") + "comment";
          var container = $("#createDiv");
          $(".containers").css ("display", "none");
          container.css ("display", "block");
          container.children ().attr ("action", commentDiv);
        });

        $(".edt_btn").click (function ()
        {
          var btn_id = $(this).attr ("id");
          var commentID = btn_id.substring (5, btn_id.length);
          $(".containers").css ("display", "none");
          $(".editcontainer").css ("display", "block");
          $(".edit_txt").val ($("#" + commentID).html ());
          $("#edit_com").attr ("action", $("#div_" + commentID).attr ("name") + "edit");
        });

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