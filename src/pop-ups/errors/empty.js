if (navigator.language == "pl") {
  document.getElementById("heading").innerHTML = `Wypełnij wszystkie pola!`;
  document.getElementById("button-text").innerHTML = `Spóbuj ponownie`;
} else {
  document.getElementById("heading").innerHTML = `Fill in all fields!`;
  document.getElementById("button-text").innerHTML = `Try again`;
}

function signIn() {
  location.href = "../../register/register.html";
}
