if (navigator.language == "pl") {
  document.getElementById("search-bar").placeholder = `Szukaj TODO`;
  document.getElementById("hi").innerHTML = `Cześć`;
  document.getElementById("text-add").innerHTML = `Dodaj nowe zadanie!`;
} else {
  document.getElementById("search-bar").placeholder = `Search for TODO`;
  document.getElementById("hi").innerHTML = `Hi`;
  document.getElementById("text-add").innerHTML = `Add new task!`;
}

const preferences = require("../../preferences.json");
document.getElementById("name").innerHTML = preferences.user.firstname;
loadTodos();

function search() {
  let searchInput = document.getElementById("search-bar");

  if (searchInput.style.display === "inline-block") {
    document.getElementById("search-bar").classList = "slideOutRight";
    document.getElementById("search-bar").animationPlayState = "running";
    sleep(400).then(() => {
      searchInput.style.display = "none";
    });
  } else {
    document.getElementById("search-bar").classList = "slideInRight";
    searchInput.style.display = "inline-block";
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

if (!document.getElementById("name").innerHTML) {
  document.getElementById("hi").style.fontWeight = 500;
}

async function loadTodos() {
  await fetch("https://justy-backend.herokuapp.com/todos", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + preferences.token,
    },
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json().then(function (json) {
          const todos = JSON.parse(json.list);
          for (const todo of todos) {
            console.log(todo)
          }
        });
      } else {
        console.log("something went wrong");
      }
    })
    .catch((reason) => {
      console.log("something went wrong");
    });
}
