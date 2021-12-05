function exit() {
    location.href = "../start-page/start.html"
}

document.getElementById("login").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      document.getElementById("password").focus()
    }
});

document.getElementById("password").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      signIn();
    }
});

function passwordVisibility() {
    var input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
      document.getElementById("not-visible").style.display = "none"
      document.getElementById("visible").style.display = "block"
    } else {
      input.type = "password";
      document.getElementById("visible").style.display = "none"
      document.getElementById("not-visible").style.display = "block"
    }
}

function signIn() {
    let login = document.getElementById("login").value
    let password = document.getElementById("password").value

    console.log(login+password)
}