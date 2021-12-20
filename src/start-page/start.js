const { ipcRenderer } = require("electron");

if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Witaj w`;
  document.getElementById("login-text").innerHTML = `Logowanie`;
  document.getElementById("registration-text").innerHTML = `Rejestracja`;
  document.getElementById("exit-text").innerHTML = `Wyjdź`;
} else {
  document.getElementById("heading").innerHTML = `Welcome in`;
  document.getElementById("login-text").innerHTML = `Sign in`;
  document.getElementById("registration-text").innerHTML = `Sign up`;
  document.getElementById("exit-text").innerHTML = `Exit`;
}

let year = new Date().getFullYear()
document.getElementById("year").innerHTML = year;

function signIn() {
  document.getElementById("app").classList.add("slideOutDown")
  document.getElementById("app").animationPlayState = "running"
  sleep(400).then(() => {
    location.href = "../login/login.html";
  })
}

function signUp() {
  document.getElementById("app").classList.add("slideOutDown")
  document.getElementById("app").animationPlayState = "running"
  sleep(400).then(() => {
    location.href = "../register/register.html";
  })
}

function exit() {
  ipcRenderer.send("exit");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
