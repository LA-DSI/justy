const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Logowanie`;
  document.getElementById("login").placeholder = `Login lub Email`;
  document.getElementById("password").placeholder = `Hasło`;
  document.getElementById("login-button").innerHTML = `Zaloguj`;
} else {
  document.getElementById("heading").innerHTML = `Sign in`;
  document.getElementById("login").placeholder = `Login or Email`;
  document.getElementById("password").placeholder = `Password`;
  document.getElementById("login-button").innerHTML = `Log in`;
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
    signIn();
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

async function signIn() {
  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;

  if (login && password) {
    await fetch("https://justy-backend.herokuapp.com/auth/login", {
      method: "post",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(async (response) => {
      if (response.ok) {
        const json = await response.json();
        fs.writeFileSync(
          path.join(__dirname, "..", "..", "preferences.json"),
          JSON.stringify(json, null, 2)
        );
        ipcRenderer.send("load-dashboard");
      } else {
        console.log("login error");
        // Pop-up - Error
      }
    });
  } else {
    console.log("empty");
    // Pop-up - Error
  }
}
