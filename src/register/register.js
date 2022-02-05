if (navigator.language === "pl") {
  document.getElementById("heading").innerHTML = `Rejestracja`;
  document.getElementById("name").placeholder = `Imię`;
  document.getElementById("password").placeholder = `Hasło`;
  document.getElementById("repeat-password").placeholder = `Potwierdź hasło`;
  document.getElementById("register-button").innerHTML = `Zarejestruj`;
  document.getElementById(
    "popup-ok"
  ).innerHTML = `Rejestracja przebiegła pomyślnie!`;
  document.getElementById("popup-connection").innerHTML = `Coś poszło nie tak!`;
  document.getElementById(
    "popup-account-exists"
  ).innerHTML = `Konto już istnieje!`;
  document.getElementById(
    "popup-matching"
  ).innerHTML = `Hasła nie pasują do siebie!`;
  document.getElementById("popup-empty").innerHTML = `Wypełnij wszystkie pola!`;
  document.getElementById("button-text-ok").innerHTML = `Zaloguj się`;
  document.getElementById("button-text-again").innerHTML = `Spróbuj ponownie`;
} else {
  document.getElementById("heading").innerHTML = `Sign up`;
  document.getElementById("name").placeholder = `Name`;
  document.getElementById("password").placeholder = `Password`;
  document.getElementById("repeat-password").placeholder = `Confirm password`;
  document.getElementById("register-button").innerHTML = `Register`;
  document.getElementById(
    "popup-ok"
  ).innerHTML = `Registration was successful!`;
  document.getElementById(
    "popup-connection"
  ).innerHTML = `Something went wrong!`;
  document.getElementById(
    "popup-account-exists"
  ).innerHTML = `Account already exists!`;
  document.getElementById(
    "popup-matching"
  ).innerHTML = `The passwords don't match!`;
  document.getElementById("popup-empty").innerHTML = `Fill in all fields!`;
  document.getElementById("button-text-ok").innerHTML = `Sign in`;
  document.getElementById("button-text-again").innerHTML = `Try again`;
}

const year = new Date().getFullYear();
document.getElementById("year").innerHTML = year;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function exit() {
  document.getElementById("card-container").classList.add("slideOutLeft");
  document.getElementById("card-container").animationPlayState = "running";
  sleep(400).then(() => {
    location.href = "../start-page/start.html";
  });
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

async function signUp() {
  const name = document.getElementById("name").value;
  const login = document.getElementById("login").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("repeat-password").value;

  if (name && login && email && password && confirmPassword) {
    if (password === confirmPassword) {
      document.getElementById("loading").style.display = "flex";
      document.getElementById("card").style.display = "none";
      await fetch("https://justy-backend.herokuapp.com/auth/register", {
        method: "post",
        body: JSON.stringify({ name, login, email, password }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(async (response) => {
          if (response.ok) {
            document.getElementById("loading").style.display = "none";
            document.getElementById("card-container").style.display = "none";
            document.body.style.height = "100vh";
            document.getElementById("popup-ok").style.display = "block";
            document.getElementById("ok-icon").style.display = "block";
            document.getElementById("button-wrong").style.display = "none";
            document.getElementById("button-ok").style.display = "block";
            document.getElementById("button-text-ok").style.display = "block";
            document.getElementById("popup").style.display = "flex";
          } else if (response.status === 409) {
            document.getElementById("loading").style.display = "none";
            document.getElementById("card-container").style.display = "none";
            document.body.style.height = "100vh";
            document.getElementById("popup-account-exists").style.display =
              "block";
            document.getElementById("wrong-icon").style.display = "block";
            document.getElementById("button-ok").style.display = "none";
            document.getElementById("button-wrong").style.display = "block";
            document.getElementById("button-text-again").style.display =
              "block";
            document.getElementById("popup").style.display = "flex";
          } else {
            document.getElementById("loading").style.display = "none";
            document.getElementById("card-container").style.display = "none";
            document.body.style.height = "100vh";
            document.getElementById("popup-connection").style.display = "block";
            document.getElementById("wrong-icon").style.display = "block";
            document.getElementById("button-ok").style.display = "none";
            document.getElementById("button-wrong").style.display = "block";
            document.getElementById("button-text-again").style.display =
              "block";
            document.getElementById("popup").style.display = "flex";
          }
        })
        .catch((reason) => {
          document.getElementById("loading").style.display = "none";
          document.getElementById("card-container").style.display = "none";
          document.body.style.height = "100vh";
          document.getElementById("popup-connection").style.display = "block";
          document.getElementById("wrong-icon").style.display = "block";
          document.getElementById("button-ok").style.display = "none";
          document.getElementById("button-wrong").style.display = "block";
          document.getElementById("button-text-again").style.display = "block";
          document.getElementById("popup").style.display = "flex";
        });
    } else {
      document.getElementById("loading").style.display = "none";
      document.getElementById("card-container").style.display = "none";
      document.body.style.height = "100vh";
      document.getElementById("popup-matching").style.display = "block";
      document.getElementById("wrong-icon").style.display = "block";
      document.getElementById("button-ok").style.display = "none";
      document.getElementById("button-wrong").style.display = "block";
      document.getElementById("button-text-again").style.display = "block";
      document.getElementById("popup").style.display = "flex";
    }
  } else {
    document.getElementById("loading").style.display = "none";
    document.getElementById("card-container").style.display = "none";
    document.body.style.height = "100vh";
    document.getElementById("popup-empty").style.display = "block";
    document.getElementById("wrong-icon").style.display = "block";
    document.getElementById("button-ok").style.display = "none";
    document.getElementById("button-wrong").style.display = "block";
    document.getElementById("button-text-again").style.display = "block";
    document.getElementById("popup").style.display = "flex";
  }
}

document
  .getElementById("repeat-password")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      signUp();
    }
  });

function passwordVisibility() {
  const input = document.getElementById("password");
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

function confirmPassword() {
  // eslint-disable-next-line eqeqeq
  if (document.getElementById("repeat-password").value == "") {
    document.getElementById("icon-ok").style.display = "none";
    document.getElementById("icon-no").style.display = "none";
    document.getElementById("icon-start").style.display = "block";
  }

  if (
    document.getElementById("password").value !== "" &&
    document.getElementById("repeat-password").value !== ""
  ) {
    if (
      document.getElementById("password").value ===
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

setInterval(() => confirmPassword(), 1000);

function registerPopupOk() {
  location.href = "../login/login.html";
}

function registerPopupAgain() {
  location.href = "./register.html";
}
