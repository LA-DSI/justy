const { ipcRenderer } = require("electron");
const { copyFileSync } = require("original-fs");

const isMac = process.platform === "darwin"

if (navigator.language == "pl") {
  document.getElementById("search-bar").placeholder = `Szukaj TODO`;
  document.getElementById("hi").innerHTML = `Cześć`;
  document.getElementById("text-add").innerHTML = `Dodaj nowe zadanie!`;
  document.getElementById("title-main-done").innerHTML = `ZROBIONE`;
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
  document.getElementById("title-main-done").innerHTML = `DONE`;
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
if(preferences.user.team_member == true) {
  document.getElementById("ff-icon").style.display = "flex"
}
document.getElementById("name").innerHTML = preferences.user.firstname;
checkBearer();

async function checkBearer() {
  await fetch("https://justy-backend.herokuapp.com/", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + preferences.token,
    },
  })
   .then(async (response) => {
     if(response.ok) {
      const json = await response.json()
      if(json.user) {
        loadTodos()
      } else {
        location.href = "../start-page/start.html"
      }
     } else {
      loadTodos()
     }
   })
    .catch((reason) => {
      loadTodos()
    })
}

function searchBar() {
  document.getElementById("title").classList.remove("margin-3rem")
  shortcuts()
  let searchInput = document.getElementById("search-bar");

  var input = document.getElementById("search-bar")
  var filter = input.value.toUpperCase()
  var ul = document.getElementById("todos-container")
  var li = ul.getElementsByClassName("todo-wrapper")
  var a, i, txtValue
  for(i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerHTML
    if(txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ""
    } else {
      li[i].style.display = ""
    }
  }

  var input = document.getElementById("search-bar")
  var filter = input.value.toUpperCase()
  var ul = document.getElementById("todos-done-container")
  var li = ul.getElementsByClassName("todo-wrapper")
  var a, i, txtValue
  for(i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerHTML
    if(txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ""
    } else {
      li[i].style.display = ""
    }
  }

  if (searchInput.style.display === "inline-block") {
    document.getElementById("search-bar").classList = "slideOutRight";
    document.getElementById("search-bar").animationPlayState = "running";
    sleep(400).then(() => {
      document.getElementById("search-bar").value = ""
      searchInput.style.display = "none";
    });
  } else {
    document.getElementById("search-bar").classList = "slideInRight";
    searchInput.style.display = "inline-block";
    sleep(800).then(() => {
      document.getElementById("search-bar").focus()
      window.onkeydown = function(e)  {
        if(e.keyCode == 27) {
          sleep(100).then(() => {
            searchBar()
            shortcuts()
          })
        }
      }
    })
  }
}

function search() {
  var input = document.getElementById("search-bar")
  var filter = input.value.toUpperCase()
  var ul = document.getElementById("todos-container")
  var li = ul.getElementsByClassName("todo-wrapper")
  var a, i, txtValue
  var count;
  for(i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerHTML
    if(txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ""
      count = 0+i;
    } else {
      li[i].style.display = "none"
    }
  }
  if(count == null) {
    document.getElementById("title").classList.add("margin-3rem")
  } else {
    document.getElementById("title").classList.remove("margin-3rem")
  }
}

function searchDone() {
  var input = document.getElementById("search-bar")
  var filter = input.value.toUpperCase()
  var ul = document.getElementById("todos-done-container")
  var li = ul.getElementsByClassName("todo-wrapper")
  var a, i, txtValue
  for(i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerHTML
    if(txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ""
    } else {
      li[i].style.display = "none"
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

if (!document.getElementById("name").innerHTML) {
  document.getElementById("hi").style.fontWeight = 500;
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
          let isDone = false
          for (const todo of todos) {
            let todoWrapper = document.createElement("div");
            todoWrapper.id = "todo-wrapper";
            todoWrapper.classList = "todo-wrapper drop-shadow";
            if (todo.done == true) {
              isDone = true;
              document.getElementById("todos-done-container").appendChild(todoWrapper);
            } else {
              document.getElementById("todos-container").appendChild(todoWrapper);
            }

            if (todo.done == false) {
              document.getElementById("title").style.display = "flex";
            }

            let todoMain = document.createElement("div");
            todoMain.classList = "todo-main text-shadow";
            todoMain.id = `todo-main-${todo.id}`
            if (todo.category == "important") {
              todoMain.innerHTML = `<div class="todo-icon-container flex-col" onclick="reverseDone('${todo.id}', ${todo.done})"><svg width="28" height="28" class="todo-icon drop-shadow" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="12" stroke="#fd5fec" stroke-width="4"/></svg></div><div class="todo-text-container"><p class="todo-text" id="todo-text">${todo.title}</p></div>`;
            } else if (todo.done == true) {
              todoMain.innerHTML = `<div class="todo-icon-container flex-col" onclick="reverseDone('${todo.id}', ${todo.done})"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" class="todo-icon todo-done-icon lightBlue drop-shadow" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg></div><div class="todo-text-container"><p class="todo-text todo-text-done lightBlue" id="todo-text">${todo.title}</p></div>`;
              todoMain.children[0].classList.add("delete-hover-after")
            } else {
              todoMain.innerHTML = `<div class="todo-icon-container flex-col" onclick="reverseDone('${todo.id}', ${todo.done})"><svg width="28" height="28" class="todo-icon drop-shadow" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="12" stroke="#5ff5f7" stroke-width="4"/></svg></div><div class="todo-text-container"><p class="todo-text" id="todo-text">${todo.title}</p></div>`;
            }

            if (todo.category == "important" && todo.done == true) {
              todoMain.innerHTML = `<div class="todo-icon-container flex-col" onclick="reverseDone('${todo.id}', ${todo.done})"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" onclick="markAsTODO('${todo.id}')" class="todo-icon todo-done-icon lightBlue drop-shadow" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg></div><div class="todo-text-container"><p class="todo-text todo-text-done lightBlue" id="todo-text">${todo.title}</p></div>`;
              todoMain.children[0].classList.add("delete-hover-after")
            }

            if(todo.endDate - new Date().getTime() < 0) {
              if(todo.category == "important") {
                todoMain.style.color = "#fd5fec"
              } else {
                todoMain.style.color = "#5ff5f7"
              }
            }

            todoMain.children[1].onclick = function() {
              if (document.querySelector(".todo-desc") && !document.getElementById(`todo-desc-${todo.id}`)) {
                document.querySelectorAll(".todo-desc").forEach(e => e.remove())
                document.querySelectorAll(".todo-wrapper").forEach(e => e.style.height = "55px")
              }
              if(document.getElementById(`todo-desc-${todo.id}`)) {
                document.getElementById(`todo-desc-${todo.id}`).classList.add("slideOutUpDesc")
                document.getElementById(`todo-desc-${todo.id}`).animationPlayState = "running"
                sleep(300).then(() => {
                  todoWrapper.removeChild(document.getElementById(`todo-desc-${todo.id}`))
                  todoWrapper.style.height = "55px"
                })
              } else {
                todoWrapper.style.height = "197px"
                let todoDesc = document.createElement("div")
                todoDesc.classList = "todo-desc flex-col slideInDownDesc"
                todoDesc.id = `todo-desc-${todo.id}`
                let date = new Date(todo.endDate).toLocaleDateString(navigator.language, {hour: '2-digit', minute:'2-digit'})
                if(!todo.description == "") {
                  todoDesc.innerHTML = `<div class="flex-row drop-shadow" style="margin-bottom:1rem;width:100%;"><div class="desc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" class="lightBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div><textarea readonly id="text-area-${todo.id}" class="desc-text" rows="1">${todo.description}</textarea></div><div class="flex-row drop-shadow"><div class="desc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" class="lightBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div><p class="desc-text white">${date}</p></div>`
                } else {
                  todoDesc.innerHTML = `<div class="flex-row drop-shadow"><div class="desc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" class="lightBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div><p class="desc-text white">${date}</p></div>`
                }
                todoWrapper.appendChild(todoDesc)
                if(!todo.description == "") {
                  if(document.getElementById(`text-area-${todo.id}`).innerHTML.length < 19) {
                    document.getElementById(`text-area-${todo.id}`).cols = (document.getElementById(`text-area-${todo.id}`).innerHTML.length/2)+2
                    document.getElementById(`text-area-${todo.id}`).style.paddingBottom = 0
                    document.getElementById(`text-area-${todo.id}`).style.paddingRight = 0
                  } else if(document.getElementById(`text-area-${todo.id}`).innerHTML.length > 19) {
                    document.getElementById(`text-area-${todo.id}`).rows = 2
                    document.getElementById(`text-area-${todo.id}`).style.paddingBottom = 0
                  }
                }
                sleep(400).then(() => {
                  todoDesc.classList.remove("slideInDownDesc")
                })
                VanillaTilt.init(todoDesc, {
                  reverse: false,
                  max: 30,
                  speed: 1000,
                  scale: 1.03,
                  glare: true,
                  axis: "y",
                  "max-glare": 0.2,
                  easing: "cubic-bezier(.03,.98,.52,.99)"
                })
                if(todoSettings.classList.contains("settings-shown-circle")) {
                  closeProperties(`${todo.id}`)
                }
              }
            }
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
              if(window.settingsOpen) {
                closeProperties(window.settingsOpen)
              }
              window.settingsOpen = todo.id;
              document.querySelectorAll(".todo-desc").forEach(e => e.remove())
              document.querySelectorAll(".todo-wrapper").forEach(e => e.style.height = "55px")
              todoSettings.onclick = () => {}
            };
          }
          if(isDone == true) {
            document.getElementById("done").style.display = "block";
          } else {
            document.getElementById("done").style.display = "none";
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
  window.settingsOpen = null
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
      if(window.settingsOpen) {
        closeProperties(window.settingsOpen)
      }
      window.settingsOpen = idTodo;
      document.querySelectorAll(".todo-desc").forEach(e => e.remove())
      document.querySelectorAll(".todo-wrapper").forEach(e => e.style.height = "55px")
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

document.getElementById("title-edit").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault()
  }
});

function shortcuts() {
  if(isMac) {
    window.onkeydown = function(e)  {
      if(e.keyCode == 70 && e.metaKey) {
        sleep(200).then(() => {
          searchBar()
        })
      }
      if(e.keyCode == 82 && e.metaKey) {
        refresh()
      }
    }
  } else {
    window.onkeydown = function(e)  {
      if(e.keyCode == 70 && e.ctrlKey) {
        sleep(200).then(() => {
          searchBar()
        })
      }
      if(e.keyCode == 82 && e.ctrlKey) {
        refresh()
      }
    }
  }
}
shortcuts()

function editTask(idTodo) {
  document.getElementById("edit").style.display = "flex"
  document.querySelector(".app").style.opacity = "0.1"
  document.getElementById("edit-icon-popup").classList.remove("no-display")
  document.getElementById("add-icon-popup").classList.add("no-display")
  document.getElementById("tr-done").classList.remove("no-display")
  if(navigator.language == "pl") {
    document.getElementById("edit-text").innerHTML = "Edytuj zadanie!"
    document.getElementById("edit-button").innerHTML = "Zapisz"
    document.getElementById("title-edit").placeholder = "Wprowadź tytuł"
    document.getElementById("desc-edit").placeholder = "Wprowadź opis"
  } else {
    document.getElementById("text-add").innerHTML = `Edit task!`;
    document.getElementById("edit-button").innerHTML = "Save"
    document.getElementById("title-edit").placeholder = "Enter title"
    document.getElementById("desc-edit").placeholder = "Enter description"
  }
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
      let date1 = new Date(todo.endDate)
      let tzoffset = (new Date()).getTimezoneOffset() * 60000;
      let date = (new Date(date1 - tzoffset)).toISOString().slice(0, -1);
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

    if(!title || !endDate) {
      document.getElementById("todos-wrapper").style.display = "none"
      document.getElementById("edit").style.display = "none"
      document.querySelector(".app").style.opacity = "1"
      if(navigator.language == "pl") {
        document.getElementById("error-text").innerHTML = "Wprowadź tytuł i datę!"
      } else {
        document.getElementById("error-text").innerHTML = "Enter a title and date!"
      }
      document.getElementById("error").style.display = "flex"
      return
    }

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

function addTodo() {
  document.getElementById("edit").style.display = "flex"
  document.querySelector(".app").style.opacity = "0.1"
  document.getElementById("edit-icon-popup").classList.add("no-display")
  document.getElementById("add-icon-popup").classList.remove("no-display")
  document.getElementById("tr-done").classList.add("no-display")
  document.getElementById("title-edit").value = null
  document.getElementById("desc-edit").value = null
  document.getElementById("category-edit").checked = false
  document.getElementById("date-edit").value = null
  if(navigator.language == "pl") {
    document.getElementById("edit-text").innerHTML = "Dodaj nowe zadanie!"
    document.getElementById("edit-button").innerHTML = "Dodaj"
    document.getElementById("title-edit").placeholder = "Wprowadź tytuł"
    document.getElementById("desc-edit").placeholder = "Wprowadź opis"
  } else {
    document.getElementById("text-add").innerHTML = `Add new task!`;
    document.getElementById("edit-button").innerHTML = "Add"
    document.getElementById("title-edit").placeholder = "Enter title"
    document.getElementById("desc-edit").placeholder = "Enter description"
  }
  document.getElementById("edit-button").onclick = async function() {
    let dateEdit = new Date(document.getElementById("date-edit").value)
    let categoryEdit
    if(document.getElementById("category-edit").checked == true) {
      categoryEdit = "important";
    } else {
      categoryEdit = "";
    }

    const title = document.getElementById("title-edit").value
    const description = document.getElementById("desc-edit").value
    const category = categoryEdit
    const endDate = dateEdit.getTime()

    if(!title || !endDate) {
      document.getElementById("todos-wrapper").style.display = "none"
      document.getElementById("edit").style.display = "none"
      document.querySelector(".app").style.opacity = "1"
      if(navigator.language == "pl") {
        document.getElementById("error-text").innerHTML = "Wprowadź tytuł i datę!"
      } else {
        document.getElementById("error-text").innerHTML = "Enter a title and date!"
      }
      document.getElementById("error").style.display = "flex"
      return
    }

    if(endDate < new Date()) {
      document.getElementById("todos-wrapper").style.display = "none"
      document.getElementById("edit").style.display = "none"
      document.querySelector(".app").style.opacity = "1"
      if(navigator.language == "pl") {
        document.getElementById("error-text").innerHTML = "Data musi być z przyszłości!"
      } else {
        document.getElementById("error-text").innerHTML = "Date must be from the future!"
      }
      document.getElementById("error").style.display = "flex"
      return
    }

    await fetch("https://justy-backend.herokuapp.com/todos", {
      method: "post",
      body: JSON.stringify({ title, description, category, endDate }),
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

async function reverseDone(item_id, done) {
  done = !done
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

function dropDownToDo() {
  document.getElementById("todos-container").classList.toggle("no-display")
  document.getElementById("title").classList.toggle("margin-3rem")
  document.getElementById("stripe-icon-up1").classList.toggle("no-display")
  document.getElementById("stripe-icon-up2").classList.toggle("no-display")
  document.getElementById("stripe-icon-down1").classList.toggle("no-display")
  document.getElementById("stripe-icon-down2").classList.toggle("no-display")
}

function dropDownDone() {
  document.getElementById("todos-done-container").classList.toggle("no-display")
  document.getElementById("stripe-icon-done-up1").classList.toggle("no-display")
  document.getElementById("stripe-icon-done-up2").classList.toggle("no-display")
  document.getElementById("stripe-icon-done-down1").classList.toggle("no-display")
  document.getElementById("stripe-icon-done-down2").classList.toggle("no-display")
}
