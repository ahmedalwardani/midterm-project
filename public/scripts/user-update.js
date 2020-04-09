$(document).ready(() => {

  $(".update-user-info").on("click", function(e) {
    e.preventDefault();
    const name = $("[name*='new-name']").val();
    const email = $("[name*='new-email']").val();
    const password = $("[name*='currentpassword']").val();
    const newPassword = $("[name*='new-password']").val();
    const confirmNewPassword = $("[name*='confirm-new-password']").val();
    console.log(name, email, password);

    // if (password === confirm password) {

    // } else {

    // }
    // AJAX GET request
    //   $.ajax({method: "PUT",
    //     url: "/user",
    //     data: {name, email, password, newPassword, confirmNewPassword}
    //   })
    //     .then((resp) => {
    //       // On request success call render function
    //       console.log(resp);
    //     }).catch(err => {
    //       console.log(err);
    //     });
    // });




  });

  $(".delete-account").on("click", function(e) {
    e.preventDefault();
    console.log("clicekd");
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

// update-user-info
// delete-account

// $.ajax({
//   method: "PUT",
//   url: "/user",
//   data: {
//     name,
//     email,
//     password
//   }
// })
//   .then(resp => console.log(resp));
