if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Nie ma takiego konta!`;
  document.getElementById("button-text").innerHTML = `Spóbuj ponownie`;
} else {
  document.getElementById("heading").innerHTML = `There is no such account!`;
  document.getElementById("button-text").innerHTML = `Try again`;
}

function signIn() {
  location.href = "../../../login/login.html";
}
