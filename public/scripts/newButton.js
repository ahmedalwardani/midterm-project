
const hideMenu = function () {
  let hidenElement = false;
  $("#drop-form").hide(500);

  $("#plus").click(function () {
    if (!hidenElement) {
      $("#drop-form").show(500)
      hidenElement = true
      $("#drop-menu").hide(500);
    } else {
      $("#drop-form").hide(500)
      $("#drop-menu").show(500)
      hidenElement = false;
    }
  })
};

$(document).ready(function () {
  hideMenu()

  });
