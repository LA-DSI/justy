if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Rejestracja`;
  document.getElementById("login").placeholder = `Login lub Email`;
  document.getElementById("password").placeholder = `Hasło`;
  document.getElementById("register-button").innerHTML = `Zarejestruj`;
} else {
  document.getElementById("heading").innerHTML = `Sign up`;
  document.getElementById("login").placeholder = `Login or Email`;
  document.getElementById("password").placeholder = `Password`;
  document.getElementById("register-button").innerHTML = `Register`;
}

function exit() {
  location.href = "../start-page/start.html";
}

document.getElementById("login").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("password").focus();
  }
});

document.getElementById("password").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    signUp();
  }
});

function passwordVisibility() {
  var input = document.getElementById("password");
  if (input.type === "password") {
    input.type = "text";
    document.getElementById("not-visible").style.display = "none";
    document.getElementById("visible").style.display = "block";
  } else {
    input.type = "password";
    document.getElementById("visible").style.display = "none";
    document.getElementById("not-visible").style.display = "block";
  }
}

function signUp() {
  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;

  console.log(login + password);
}
