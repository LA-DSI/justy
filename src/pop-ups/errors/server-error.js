if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Błąd serwera!`;
  document.getElementById("button-text").innerHTML = `Spóbuj ponownie`;
} else {
  document.getElementById("heading").innerHTML = `Server error!`;
  document.getElementById("button-text").innerHTML = `Try again`;
}

function signIn() {
  location.href = "../../register/register.html";
}
