$(document).ready(function () {
  let hidenElement = false;
  $("#drop-form").hide(300)

  $("#plus").click(function (){
    if (!hidenElement) {
    $("#drop-form").show(300)
    hidenElement = true;
  } else {
    $("#drop-form").hide(200)
    hidenElement = false;
  }
  }

});


