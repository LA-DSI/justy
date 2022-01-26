const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Logowanie`;
  document.getElementById("login").placeholder = `Login lub Email`;
  document.getElementById("password").placeholder = `Hasło`;
  document.getElementById("login-button").innerHTML = `Zaloguj`;
  document.getElementById("forgot-button").innerHTML = `Zapomniałem hasła`
  document.getElementById("forgot-text").innerHTML = `W celu zmiany hasła,<br> prosimy o kontakt:`
  document.getElementById("popup-empty").innerHTML = `Wypełnij wszystkie pola!`;
  document.getElementById("popup-no-account").innerHTML = `Nie ma takiego konta!`;
  document.getElementById("popup-connection").innerHTML = `Coś poszło nie tak!`;
  document.getElementById("button-text-again").innerHTML = `Spróbuj ponownie`;
} else {
  document.getElementById("heading").innerHTML = `Sign in`;
  document.getElementById("login").placeholder = `Login or Email`;
  document.getElementById("password").placeholder = `Password`;
  document.getElementById("login-button").innerHTML = `Log in`;
  document.getElementById("forgot-button").innerHTML = `Forgot password`
  document.getElementById("forgot-text").innerHTML = `To change your password, please contact our support:`
  document.getElementById("popup-empty").innerHTML = `Fill in all fields!`;
  document.getElementById("popup-no-account").innerHTML = `There is no such account!`;
  document.getElementById("popup-connection").innerHTML = `Something went wrong!`;
  document.getElementById("button-text-again").innerHTML = `Try again`;
}

let year = new Date().getFullYear()
document.getElementById("year").innerHTML = year;

function exit() {
  document.getElementById("card-container").classList.add("slideOutRight")
  document.getElementById("card-container").animationPlayState = "running"
  sleep(400).then(() => {
    location.href = "../start-page/start.html";
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    document.getElementById("loading").style.display = "flex";
    document.getElementById("card").style.display = "none";
    await fetch("https://justy-backend.herokuapp.com/auth/login", {
      method: "post",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const json = await response.json();
          fs.writeFileSync(
            path.join(__dirname, "..", "..", "preferences.json"),
            JSON.stringify(json, null, 2)
          );
          ipcRenderer.send("load-dashboard");
        } else if (response.status == 404) {
          document.getElementById("loading").style.display = "none";
          document.getElementById("card-container").style.display = "none";
          document.body.style.height = "100vh";
          document.getElementById("popup-no-account").style.display = "block";
          document.getElementById("wrong-icon").style.display = "block";
          document.getElementById("button-text-again").style.display = "block";
          document.getElementById("popup").style.display = "flex";
        } else {
          document.getElementById("loading").style.display = "none";
          document.getElementById("card-container").style.display = "none";
          document.body.style.height = "100vh";
          document.getElementById("popup-connection").style.display = "block";
          document.getElementById("wrong-icon").style.display = "block";
          document.getElementById("button-text-again").style.display = "block";
          document.getElementById("popup").style.display = "flex";
        }
      })
      .catch((reason) => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("card-container").style.display = "none";
        document.body.style.height = "100vh";
        document.getElementById("popup-connection").style.display = "block";
        document.getElementById("wrong-icon").style.display = "block";
        document.getElementById("button-text-again").style.display = "block";
        document.getElementById("popup").style.display = "flex";
      });
  } else {
    document.getElementById("loading").style.display = "none";
    document.getElementById("card-container").style.display = "none";
    document.body.style.height = "100vh";
    document.getElementById("popup-empty").style.display = "block";
    document.getElementById("wrong-icon").style.display = "block";
    document.getElementById("button-text-again").style.display = "block";
    document.getElementById("popup").style.display = "flex";
  }
}

function forgotPassword() {
  if(document.getElementById("forgot").classList.contains("no-display")) {
    document.getElementById("forgot").classList.remove("no-display")
    document.getElementById("forgot").classList.remove("flipOutY")
    document.getElementById("forgot").classList.add("flipInY")
    sleep(1200).then(() => {
      document.getElementById("forgot").classList.remove("flipInY")
      VanillaTilt.init(document.getElementById("forgot"), {
        reverse: false,
        max: 25,
        speed: 1000,
        scale: 1.03,
        glare: true,
        axis: "y",
        "max-glare": 0.2,
        easing: "cubic-bezier(.03,.98,.52,.99)"
      })
    })
  } else {
    document.getElementById("forgot").classList.remove("flipInY")
    document.getElementById("forgot").classList.add("flipOutY")
    document.getElementById("forgot").animationPlayState = "running"
    sleep(1200).then(() => {
      document.getElementById("forgot").classList.add("no-display")
    })
  }
}

function loginPopupAgain() {
  location.href = "./login.html";
}
