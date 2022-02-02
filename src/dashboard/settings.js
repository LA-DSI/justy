if(navigator.language == "pl") {
  document.getElementById("logout-text").innerHTML = `Wyloguj się`
} else {
  document.getElementById("logout-text").innerHTML = `Sign out`
}

function preventDefault(e) {
  e.preventDefault();
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
var scrollBars

function disableScroll() {
  scrollBars = false
  window.addEventListener(wheelEvent, preventDefault, wheelOpt);
}

function enableScroll() {
  scrollBars = true;
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
}

function settings() {
    document.getElementById("settings").classList.remove("slideOutLeftSettings")
    document.getElementById("settings").classList.add("slideInLeftSettings")
    if(scrollBars == false) {
        disableScroll()
    } else if(scrollBars == true) {
        enableScroll()
    }
    document.getElementById("settings-open").classList.toggle("no-display")
    document.getElementById("settings-close").classList.toggle("no-display")
    document.getElementById("settings").classList.toggle("no-display")
    document.body.classList.toggle("hide-scroll")
    document.getElementById("todo-section").classList.toggle("settings-opacity")
    document.getElementById("search-bar-container").classList.toggle("settings-opacity")
    document.querySelector(".search-icon").classList.toggle("settings-opacity")
    document.querySelector("h1").classList.toggle("settings-opacity")
    document.querySelector(".add-refresh-container").classList.toggle("settings-opacity")
}

function closeSettings() {
    document.getElementById("settings").classList.remove("slideInLeftSettings")
    document.getElementById("settings").classList.add("slideOutLeftSettings")
    document.getElementById("settings").animationPlayState = "running"
    sleep(200).then(() => {
        settings()
    })
}

setInterval (() => time(), 1000);

function time() {
  let date = new Date()
  document.getElementById("hours").innerHTML = `${date.getHours()}`
  document.getElementById("minutes").innerHTML = `${date.getMinutes()}`
}

let date = new Date()
document.getElementById("hours").innerHTML = `${date.getHours()}`
document.getElementById("minutes").innerHTML = `${date.getMinutes()}`