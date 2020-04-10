
const hideMenu = function () {
  let hidenElement = false;
  $("#input-drop-form").hide(500);
  $("#input-drop-form").attr("disabled", "true")
  $("#plus").click(function () {
    if (!hidenElement) {
      $("#drop-menu").attr("disabled", "true")
      $("#input-drop-form").removeAttr("disabled")
      $("#input-drop-form").show(500)
      $("#drop-menu").hide(500);
      hidenElement = true
    } else {
      $("#input-drop-form").attr("disabled", "true")
      $("#drop-menu").removeAttr("disabled")
      $("#input-drop-form").hide(500)
      $("#drop-menu").show(500)
      hidenElement = false;
    }
  })
};

$(document).ready(function () {
  hideMenu()

  });
