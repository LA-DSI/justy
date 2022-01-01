const { ipcRenderer } = require("electron");

if (navigator.language == "pl") {
  document.getElementById("search-bar").placeholder = `Szukaj TODO`;
  document.getElementById("hi").innerHTML = `Cześć`;
  document.getElementById("text-add").innerHTML = `Dodaj nowe zadanie!`;
  document.getElementById("done-text").innerHTML = `ZROBIONE`;
  document.getElementById("error-text").innerHTML = `Coś poszło nie tak!`;
  document.getElementById("error-button-text").innerHTML = `Spróbuj ponownie`;
  document.getElementById("warning-text").innerHTML = "Jesteś pewny?"
  document.getElementById("delete-button").innerHTML = "Tak, usuń"
  document.getElementById("edit-text").innerHTML = "Edytuj zadanie!"
  document.getElementById("title-edit-text").innerHTML = "Tytuł"
  document.getElementById("desc-edit-text").innerHTML = "Opis"
  document.getElementById("category-edit-text").innerHTML = "Ważne?"
  document.getElementById("done-edit-text").innerHTML = "Zrobione?"
  document.getElementById("edit-button").innerHTML = "Zapisz"
} else {
  document.getElementById("search-bar").placeholder = `Search for TODO`;
  document.getElementById("hi").innerHTML = `Hi`;
  document.getElementById("text-add").innerHTML = `Add new task!`;
  document.getElementById("done-text").innerHTML = `DONE`;
  document.getElementById("error-text").innerHTML = `Something went wrong!`;
  document.getElementById("error-button-text").innerHTML = `Try again`;
  document.getElementById("warning-text").innerHTML = "Are you sure?"
  document.getElementById("delete-button").innerHTML = "Yes, delete"
  document.getElementById("edit-text").innerHTML = "Edit task!"
  document.getElementById("title-edit-text").innerHTML = "Title"
  document.getElementById("desc-edit-text").innerHTML = "Description"
  document.getElementById("category-edit-text").innerHTML = "Important?"
  document.getElementById("done-edit-text").innerHTML = "Done?"
  document.getElementById("edit-button").innerHTML = "Save"
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
  if (document.getElementById("add-container").style.display == "flex") {
    document.getElementById("add-container").classList.add("slideOutRight");
    document.getElementById("add-container").animationPlayState = "running";
    sleep(400).then(() => {
      document.getElementById("add-container").style.display = "none";
    });
  } else {
    document.getElementById("add-container").classList.remove("slideOutRight");
    document.getElementById("add-container").style.display = "flex";
  }
}

function refresh() {
  ipcRenderer.send("reload-app")
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
        document.getElementById("loading").style.display = "none";
        document.getElementById("error").style.display = "none"
        return response.json().then(function (json) {
          const todos = JSON.parse(json.list);
          window.todos = todos;
          for (const todo of todos) {
            let todoWrapper = document.createElement("div");
            todoWrapper.id = "todo-wrapper";
            todoWrapper.classList = "todo-wrapper drop-shadow";
            if (todo.done == true) {
              document.getElementById("done").style.display = "block";
              document.getElementById("todos-done-container").appendChild(todoWrapper);
            } else {
              document.getElementById("done").style.display = "none";
              document.getElementById("todos-container").appendChild(todoWrapper);
            }

            if (todo.done == false) {
              document.getElementById("title").style.display = "flex";
            }

            let todoMain = document.createElement("div");
            todoMain.classList = "todo-main text-shadow";
            todoMain.id = `todo-main-${todo.id}`
            if (todo.category == "important") {
              todoMain.innerHTML = `<div class="todo-icon-container flex-col" onclick="markAsDone('${todo.id}')"></div><svg width="28" height="28" class="todo-icon drop-shadow" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="12" stroke="#fd5fec" stroke-width="4"/></svg></div<<div class="todo-text-container"><p class="todo-text" id="todo-text">${todo.title}</p></div>`;
            } else if (todo.done == true) {
              todoMain.innerHTML = `<div class="todo-icon-container flex-col" onclick="markAsTODO('${todo.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" class="todo-icon lightBlue drop-shadow" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg></div><div class="todo-text-container"><p class="todo-text todo-text-done lightBlue" id="todo-text">${todo.title}</p></div>`;
              todoMain.children[0].classList.add("delete-hover-after")
            } else {
              todoMain.innerHTML = `<div class="todo-icon-container flex-col" onclick="markAsDone('${todo.id}')"><svg width="28" height="28" class="todo-icon drop-shadow" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="12" stroke="#5ff5f7" stroke-width="4"/></svg></div><div class="todo-text-container"><p class="todo-text" id="todo-text">${todo.title}</p></div>`;
            }

            if (todo.category == "important" && todo.done == true) {
              todoMain.innerHTML = `<div class="todo-icon-container flex-col" onclick="markAsTODO('${todo.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" onclick="markAsTODO('${todo.id}')" class="todo-icon lightBlue drop-shadow" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg></div><div class="todo-text-container"><p class="todo-text todo-text-done lightBlue" id="todo-text">${todo.title}</p></div>`;
              todoMain.children[0].classList.add("delete-hover-after")
            }

            if(todo.endDate - new Date().getTime() < 0) {
              if(todo.category == "important") {
                todoMain.style.color = "#fd5fec"
              } else {
                todoMain.style.color = "#5ff5f7"
              }
            }

            todoMain.children[1].onclick = function () {
              todoWrapper.classList.toggle("todo-wrapper-focused");
              todoMain.classList.toggle("todo-main-focused");
              todoSettings.classList.toggle("todo-circle-focused");
            };
            todoWrapper.appendChild(todoMain);

            let todoSettings = document.createElement("div");
            todoSettings.classList = "todo-circle";
            todoSettings.id = "todo-circle";
            todoSettings.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" id="dots-icon-${todo.id}" class="dots-icon lightBlue drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg><div id="settings-buttons-${todo.id}" class="flex-row no-display" style="width:100%;height:100%"><img src="../../assets/icons/edit.svg" onclick="editTask('${todo.id}')" class="edit drop-shadow"><img src="../../assets/icons/delete.svg" onclick="deleteTask('${todo.id}')" class="delete drop-shadow"><img src="../../assets/icons/exit.svg" onclick="closeProperties('${todo.id}')" class="exit drop-shadow"></div>`;
            todoWrapper.appendChild(todoSettings);
            todoSettings.onclick = function () {
              document.getElementById(`settings-buttons-${todo.id}`).classList.toggle("no-display");
              document.getElementById(`dots-icon-${todo.id}`).classList.toggle("no-display");
              todoSettings.classList.toggle("settings-shown-circle");
              todoSettings.previousSibling.classList.toggle("settings-shown-main");
              todoSettings.onclick = () => {}
            };
          }
        });
      } else {
        document.getElementById("loading").style.display = "none"
        document.getElementById("error").style.display = "flex"
        document.getElementById("todos-wrapper").style.display = "none"
      }
    })
    .catch((reason) => {
      document.getElementById("loading").style.display = "none"
      document.getElementById("error").style.display = "flex"
      document.getElementById("todos-wrapper").style.display = "none"
    });
}

function closeProperties(idTodo) {
  const todoMain = document.getElementById(`todo-main-${idTodo}`)
  const todoSettings = todoMain.nextSibling;
  document.getElementById(`settings-buttons-${idTodo}`).classList.toggle("no-display");
  document.getElementById(`dots-icon-${idTodo}`).classList.toggle("no-display");
  todoMain.classList.toggle("settings-shown-main")
  todoSettings.classList.toggle("settings-shown-circle");
  sleep(200).then(()=>{
    todoSettings.onclick = function () {
      document.getElementById(`settings-buttons-${idTodo}`).classList.toggle("no-display");
      document.getElementById(`dots-icon-${idTodo}`).classList.toggle("no-display");
      todoSettings.classList.toggle("settings-shown-circle");
      todoSettings.previousSibling.classList.toggle("settings-shown-main");
      todoSettings.onclick = () => {};
    };
  })
}

function deleteTask(idTodo) {
  document.getElementById("warning").style.display = "flex"
  document.querySelector(".app").style.opacity = "0.1"
  document.getElementById("delete-button").onclick = async function() {
    let item_id = idTodo
    await fetch("https://justy-backend.herokuapp.com/todos", {
      method: "delete",
      body: JSON.stringify({ item_id }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + preferences.token,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          ipcRenderer.send("reload-app")
        } else {
          document.getElementById("warning").style.display = "none"
          document.querySelector(".app").style.opacity = "1"
          document.getElementById("error").style.display = "flex"
          document.getElementById("todos-wrapper").style.display = "none"
        }
      })
      .catch((reason) => {
        document.getElementById("warning").style.display = "none"
        document.querySelector(".app").style.opacity = "1"
        document.getElementById("error").style.display = "flex"
        document.getElementById("todos-wrapper").style.display = "none"
      })
    }
}

function deleteExit() {
  document.getElementById("warning").style.display = "none"
  document.querySelector(".app").style.opacity = "1"
}

function editTask(idTodo) {
  document.getElementById("edit").style.display = "flex"
  document.querySelector(".app").style.opacity = "0.1"
  for(const todo of window.todos) {
    if(todo.id == idTodo) {
      document.getElementById("title-edit").value = todo.title
      document.getElementById("desc-edit").value = todo.description
      if(todo.category == "important") {
        document.getElementById("category-edit").checked = true
      } else {
        document.getElementById("category-edit").checked = false
      }
      if(document.getElementById("desc-edit").value.length < 19) {
        document.getElementById("desc-edit").rows = 1;
      } else if(document.getElementById("desc-edit").value.length > 19) {
        document.getElementById("desc-edit").rows = 2;
      } else if(document.getElementById("desc-edit").value.length > 38) {
        document.getElementById("desc-edit").rows = 3;
      }
      let date = new Date(todo.endDate).toISOString()
      document.getElementById("date-edit").value = date.slice(0,16);
      if(todo.done == true) {
        document.getElementById("done-edit").checked = true
      } else {
        document.getElementById("done-edit").checked = false
      }
      break
    }
  }

  document.getElementById("edit-button").onclick = async function() {
    let dateEdit = new Date(document.getElementById("date-edit").value)
    let categoryEdit
    if(document.getElementById("category-edit").checked == true) {
      categoryEdit = "important";
    } else {
      categoryEdit = "";
    }

    const item_id = idTodo
    const title = document.getElementById("title-edit").value
    const description = document.getElementById("desc-edit").value
    const category = categoryEdit
    const endDate = dateEdit.getTime()
    const done = document.getElementById("done-edit").checked

    await fetch("https://justy-backend.herokuapp.com/todos/edit", {
      method: "post",
      body: JSON.stringify({ item_id, title, description, category, endDate, done }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + preferences.token,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          ipcRenderer.send("reload-app")
        } else {
          document.getElementById("edit").style.display = "none"
          document.querySelector(".app").style.opacity = "1"
          document.getElementById("error").style.display = "flex"
          document.getElementById("todos-wrapper").style.display = "none"
        }
      })
      .catch((reason) => {
        document.getElementById("edit").style.display = "none"
        document.querySelector(".app").style.opacity = "1"
        document.getElementById("error").style.display = "flex"
        document.getElementById("todos-wrapper").style.display = "none"
      })
  }
}

function editExit() {
  document.getElementById("edit").style.display = "none"
  document.querySelector(".app").style.opacity = "1"
}

async function markAsDone(item_id) {
  const done = true;
  await fetch("https://justy-backend.herokuapp.com/todos/edit", {
    method: "post",
    body: JSON.stringify({ item_id, done }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + preferences.token,
    },
  })
  .then(async (response) => {
    if (response.ok) {
      ipcRenderer.send("reload-app")
    } else {
      document.getElementById("edit").style.display = "none"
      document.querySelector(".app").style.opacity = "1"
      document.getElementById("error").style.display = "flex"
      document.getElementById("todos-wrapper").style.display = "none"
    }
  })
  .catch((reason) => {
    document.getElementById("edit").style.display = "none"
    document.querySelector(".app").style.opacity = "1"
    document.getElementById("error").style.display = "flex"
    document.getElementById("todos-wrapper").style.display = "none"
  })
}

async function markAsTODO(item_id) {
  const done = false;
  await fetch("https://justy-backend.herokuapp.com/todos/edit", {
    method: "post",
    body: JSON.stringify({ item_id, done }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + preferences.token,
    },
  })
  .then(async (response) => {
    if (response.ok) {
      ipcRenderer.send("reload-app")
    } else {
      document.getElementById("edit").style.display = "none"
      document.querySelector(".app").style.opacity = "1"
      document.getElementById("error").style.display = "flex"
      document.getElementById("todos-wrapper").style.display = "none"
    }
  })
  .catch((reason) => {
    document.getElementById("edit").style.display = "none"
    document.querySelector(".app").style.opacity = "1"
    document.getElementById("error").style.display = "flex"
    document.getElementById("todos-wrapper").style.display = "none"
  })
}