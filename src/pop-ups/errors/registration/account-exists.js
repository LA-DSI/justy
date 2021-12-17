if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Konto już istnieje!`;
  document.getElementById("button-text").innerHTML = `Spóbuj ponownie`;
} else {
  document.getElementById("heading").innerHTML = `Account already exists!`;
  document.getElementById("button-text").innerHTML = `Try again`;
}

function signIn() {
  location.href = "../../../register/register.html";
}
