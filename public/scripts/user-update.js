$(document).ready(() => {

  $(".update-user-info").on("click", function(e) {
    e.preventDefault();
    const name = $("[name*='new-name']").val();
    const email = $("[name*='new-email']").val();
    const password = $("[name*='current-password']").val();
    const newPassword = $("[name*='new-password']").val();
    const confirmNewPassword = $("[name*='confirm-new-password']").val();

    if (newPassword === confirmNewPassword && name.length !== 0 && email.length !== 0 & password.length !== 0 && newPassword.length !== 0 && confirmNewPassword.length !== 0) {
      $.ajax({method: "POST",
        url: "/user",
        data: {name, email, password, newPassword, confirmNewPassword}
      })
        .then((resp) => {
          console.log(resp);
          window.location.replace("/");
        }).catch(err => {
          console.log(err);
        });
    }
  });


  $(".delete-account").on("click", function(e) {
    e.preventDefault();
    console.log("clicked");
    $.ajax({
      method: "DELETE",
      url: "/user",
    })
      .then((resp) => {
        console.log(resp);

        window.location.replace("/");

      }).catch(err => {
        console.log(err);
      });
  });
});



