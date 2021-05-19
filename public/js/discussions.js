$(document).ready (function ()
{
        function edit_comment ()
        {
          $(".editcontainer").css ("display", "none");
          var URL = window.location.href + (" #div_" + commentID) ;

          $.post($("#origEditDiv").attr ("name"), 
            {
              edit_txt : $("#edit_text").val (),
              commentID : $("#commentID").val ()
            }, function (result) {
              $('#div_' + commentID).load (result);
          })
        }
        
        // $(".editcontainer").on ("click", ".Editcmt_btn", edit_comment);

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