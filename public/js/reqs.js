$(document).ready (function () {
          $(".edt_btn").click (function ()
          {
            var btn_id = $(this).attr ("id");
            var reqID = btn_id.substring (5, btn_id.length);
            
            $(".editcontainer").css ("display", "block");

            $(".form").attr ("action", $(this).closest (".req-list").attr ("name"));
            var temp = $("#" + reqID + "req-type").html ();
            temp = temp.split ("|");
            var type = temp  [0];
            
            $("#type").val (type);
            $("#desc_txt").val ($("#" + reqID + "req-details").html ());
          });
        });