if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Rejestracja`;
  document.getElementById("name").placeholder = `Imię`;
  document.getElementById("password").placeholder = `Hasło`;
  document.getElementById("repeat-password").placeholder = `Potwierdź hasło`;
  document.getElementById("register-button").innerHTML = `Zarejestruj`;
} else {
  document.getElementById("heading").innerHTML = `Sign up`;
  document.getElementById("name").placeholder = `Name`;
  document.getElementById("password").placeholder = `Password`;
  document.getElementById("repeat-password").placeholder = `Confirm password`;
  document.getElementById("register-button").innerHTML = `Register`;
}

function exit() {
  location.href = "../start-page/start.html";
}

document.getElementById("name").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("login").focus();
  }
});

document.getElementById("login").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("email").focus();
  }
});

document.getElementById("email").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("password").focus();
  }
});

document.getElementById("password").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("repeat-password").focus();
  }
});

document
  .getElementById("repeat-password")
  .addEventListener("keypress", function (e) {
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

setInterval(() => confirmPassword(), 1000);

function confirmPassword() {
  if (document.getElementById("repeat-password").value == "") {
    document.getElementById("icon-ok").style.display = "none";
    document.getElementById("icon-no").style.display = "none";
    document.getElementById("icon-start").style.display = "block";
  }

  if (
    document.getElementById("password").value != "" &&
    document.getElementById("repeat-password").value != ""
  ) {
    if (
      document.getElementById("password").value ==
      document.getElementById("repeat-password").value
    ) {
      document.getElementById("icon-start").style.display = "none";
      document.getElementById("icon-no").style.display = "none";
      document.getElementById("icon-ok").style.display = "block";
    } else {
      document.getElementById("icon-start").style.display = "none";
      document.getElementById("icon-ok").style.display = "none";
      document.getElementById("icon-no").style.display = "block";
    }
  }
}

async function signUp() {
  let name = document.getElementById("name").value;
  let login = document.getElementById("login").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("repeat-password").value;

  if (name && login && email && password && confirmPassword) {
    if (password == confirmPassword) {
      document.getElementById("loading").style.display = "flex";
      document.getElementById("card").style.display = "none";
      await fetch("https://justy-backend.herokuapp.com/auth/register", {
        method: "post",
        body: JSON.stringify({ name, login, email, password }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(async (response) => {
        if (response.status == 409) {
          location.href = "../pop-ups/errors/registration/account-exists.html";
        }
        if (response.ok) {
          //location.href = "../pop-ups/registration/registration.html";
        } else {
          location.href = "../pop-ups/errors/registration/server-error.html";
        }
      });
    } else {
      location.href = "../pop-ups/errors/registration/matching.html";
    }
  } else {
    location.href = "../pop-ups/errors/registration/empty.html";
  }
}
