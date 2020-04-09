$(document).ready(function () {
  let hidenElement = false;
  $("#drop-form").hide(500);

  $("#plus").click(function () {
    if (!hidenElement) {
      $("#drop-form").show(500)
      hidenElement = true
    } else {
      $("#drop-form").hide(500)
      hidenElement = false;
    }
  })

});


