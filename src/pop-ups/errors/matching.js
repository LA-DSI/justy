if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Hasła nie pasują do siebie!`;
  document.getElementById("button-text").innerHTML = `Spóbuj ponownie`;
} else {
  document.getElementById("heading").innerHTML = `The passwords don't match!`;
  document.getElementById("button-text").innerHTML = `Try again`;
}

function signIn() {
  location.href = "../../register/register.html";
}
