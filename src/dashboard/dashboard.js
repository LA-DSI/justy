if (navigator.language == "pl") {
  document.getElementById("search-bar").placeholder = `Szukaj TODO`
  document.getElementById("hi").innerHTML = `Cześć`;
  document.getElementById("text-add").innerHTML = `Dodaj nowe zadanie!`;
} else {
  document.getElementById("search-bar").placeholder = `Search for TODO`
  document.getElementById("hi").innerHTML = `Hi`;
  document.getElementById("text-add").innerHTML = `Add new task!`;
}

function search() {
  let searchInput = document.getElementById("search-bar");

  if (searchInput.style.display === "inline-block") {
    document.getElementById("search-bar").classList = "slideOutRight"
    document.getElementById("search-bar").animationPlayState = "running"
    sleep(400).then(() => {
        searchInput.style.display = "none";
    })
  } else {
    document.getElementById("search-bar").classList = "slideInRight";
    searchInput.style.display = "inline-block";
  }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const preferences = require("../../preferences.json");
document.getElementById("name").innerHTML = preferences.user.firstname;

if (!document.getElementById("name").innerHTML) {
  document.getElementById("hi").style.fontWeight = 500;
}
