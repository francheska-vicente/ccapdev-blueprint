$(document).ready (function ()
{
        function edit_comment ()
        {
          
          $(".editcontainer").css ("display", "none");
          console.log ('1 little 2 little 3');
          var URL = window.location.href;

          setTimeout(() => { console.log ($("#origEditDiv").attr ("name"));
           console.log (URL); }, 10000);
          $.post($("#origEditDiv").attr ("name"), 
            {
              edit_txt : $("#edit_text").val (),
              commentID : $("#commentID").val ()
            }, function (result) {
              $("#comment").load (URL + " #comment");
          })
          
          setTimeout(() => { console.log ($("#origEditDiv").attr ("name"));
           console.log (URL); }, 10000);
          
        }
        
        $(".editcontainer").on ("click", ".Editcmt_btn", edit_comment);

        $(".edt_btn").click (function ()
        {
          console.log ('mamamammama');
          var btn_id = $(this).attr ("id");
          var commentID = btn_id.substring (5, btn_id.length);
          $(".containers").css ("display", "none");
          $(".editcontainer").css ("display", "block");
          $(".edit_txt").val ($("#" + commentID).html ());
          $("#origEditDiv").attr ("name", $("#div_" + commentID).attr ("name") + "edit");
          $("#commentID").val (commentID);
          console.log ($("#origEditDiv").attr ("name"));
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