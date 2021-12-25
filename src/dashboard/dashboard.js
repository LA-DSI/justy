if (navigator.language == "pl") {
  document.getElementById("search-bar").placeholder = `Szukaj TODO`;
  document.getElementById("hi").innerHTML = `Cześć`;
  document.getElementById("text-add").innerHTML = `Dodaj nowe zadanie!`;
  document.getElementById("done-text").innerHTML = `ZROBIONE`
} else {
  document.getElementById("search-bar").placeholder = `Search for TODO`;
  document.getElementById("hi").innerHTML = `Hi`;
  document.getElementById("text-add").innerHTML = `Add new task!`;
  document.getElementById("done-text").innerHTML = `DONE`
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

function addTodo() {
  if(document.getElementById("add-container").style.display == "flex") {
    document.getElementById("add-container").classList.add("slideOutRight")
    document.getElementById("add-container").animationPlayState = "running";
    sleep(400).then(() => {
      document.getElementById("add-container").style.display = "none"
    })
  } else {
    document.getElementById("add-container").classList.remove("slideOutRight")
    document.getElementById("add-container").style.display = "flex"
  }
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
        document.getElementById("loading").style.display = "none"
        return response.json().then(function (json) {
          const todos = JSON.parse(json.list);
          for (const todo of todos) {
            let todoWrapper = document.createElement("div");
            todoWrapper.id = "todo-wrapper"
            todoWrapper.classList = "todo-wrapper drop-shadow"
            if(todo.done == true) {
              document.getElementById("done").style.display = "block"
              document.getElementById("todos-done-container").appendChild(todoWrapper)
            } else {
              document.getElementById("done").style.display = "none"
              document.getElementById("todos-container").appendChild(todoWrapper)
            }

            if(todo.done == false) {
              document.getElementById("title").style.display = "flex"
            }

            let todoMain = document.createElement("div");
            todoMain.classList = "todo-main text-shadow"
            if(todo.category == "important") {
              todoMain.innerHTML = `<svg width="28" height="28" class="todo-icon drop-shadow" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="12" stroke="#fd5fec" stroke-width="4"/></svg><p class="todo-text" id="todo-text">${todo.title}</p>`;
            } else if (todo.done == true) {
              todoMain.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" class="todo-icon lightBlue drop-shadow" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg><p class="todo-text todo-text-done lightBlue" id="todo-text">${todo.title}</p>`;
            } else {
              todoMain.innerHTML = `<svg width="28" height="28" class="todo-icon drop-shadow" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="12" stroke="#5ff5f7" stroke-width="4"/></svg><p class="todo-text" id="todo-text">${todo.title}</p>`;
            }

            if(todo.category == "important" && todo.done == true) {
              todoMain.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" class="todo-icon lightBlue drop-shadow" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg><p class="todo-text todo-text-done lightBlue" id="todo-text">${todo.title}</p>`;
            }
            todoWrapper.appendChild(todoMain)

            let todoSettings = document.createElement("div");
            todoSettings.classList = "todo-circle";
            todoSettings.id = "todo-circle"
            todoSettings.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" onclick="openProperties()" width="55" height="55" class="dots-icon lightBlue drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>`
            todoWrapper.appendChild(todoSettings)
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

function openProperties() {
  const settingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" class="dots-icon lightBlue drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>`
  const settingsIcons = `<img src="../../assets/icons/edit.svg" class="edit drop-shadow" onclick="edit()"><img src="../../assets/icons/delete.svg" class="delete drop-shadow" onclick="delete()"><img src="../../assets/icons/exit.svg" class="exit drop-shadow" onclick="closeProperties()">`
  document.getElementById("todo-circle").previousSibling.style.width = "58%"
  document.getElementById("todo-circle").style.width = "35%"
  if(document.getElementById("todo-circle").innerHTML == settingsIcons) {
    document.getElementById("todo-circle").innerHTML = settingsIcon
    document.getElementById("todo-circle").style.cursor = "pointer"
  } else {
    document.getElementById("todo-circle").innerHTML = settingsIcons
    document.getElementById("todo-circle").style.cursor = "default"
  }
}

function closeProperties() {
  document.getElementById("todo-circle").previousSibling.style.width = "81%"
  document.getElementById("todo-circle").style.width = "55px"
  document.getElementById("todo-circle").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" onclick="openProperties()" width="55" height="55" class="dots-icon lightBlue drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>`
  document.getElementById("todo-circle").style.cursor = "pointer";
}

function editTodo() {
  console.log("edit");
}

function deleteTodo() {
  console.log("delete");
}