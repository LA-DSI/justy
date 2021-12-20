if (navigator.language == "pl") {
  document.getElementById("hi").innerHTML = `Cześć`;
} else {
  document.getElementById("hi").innerHTML = `Hi`;
}

function search() {
  let searchInput = document.getElementById("search-bar");

  if (searchInput.style.display === "inline-block") {
    document.getElementById("search-bar").classList = "slideOutRight"
    document.getElementById("search-bar").animationPlayState = "running"
    sleep(1000).then(() => {
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
