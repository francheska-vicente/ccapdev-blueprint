$(document).ready (function ()
{
        function edit_comment ()
        {
          var form = $(this).closest(".editcontainer").find (".container");
          var edit_box = form.children ();
          var commentVal = edit_box.val ();
          
          $(this).closest (".commentDiv").children (".comment_content").html (commentVal);
          console.log ($(this).closest (".commentDiv").children (".comment_content").html ());
          $(".editcontainer").css ("display", "none");

          $.get( $("#edit_com").attr ("name"), transaction, function (result) {
                if (result != null)
                    $('#comment').load('/ #comment');
          })
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
          $("#edit_com").attr ("name", $("#div_" + commentID).attr ("name") + "edit");
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