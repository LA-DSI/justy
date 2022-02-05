if (navigator.language === "pl") {
  document.getElementById("logout-text").innerHTML = `Wyloguj się`;
} else {
  document.getElementById("logout-text").innerHTML = `Sign out`;
}

function preventDefault(e) {
  e.preventDefault();
}

let supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get() {
        supportsPassive = true;
        return supportsPassive;
      },
    })
  );
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
let scrollBars;

function disableScroll() {
  scrollBars = false;
  window.addEventListener(wheelEvent, preventDefault, wheelOpt);
}

function enableScroll() {
  scrollBars = true;
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
}

function settings() {
  document.getElementById("settings").classList.remove("slideOutLeftSettings");
  document.getElementById("settings").classList.add("slideInLeftSettings");
  if (scrollBars === false) {
    disableScroll();
  } else if (scrollBars === true) {
    enableScroll();
  }
  document.getElementById("settings-open").classList.toggle("no-display");
  document.getElementById("settings-close").classList.toggle("no-display");
  document.getElementById("settings").classList.toggle("no-display");
  document.body.classList.toggle("hide-scroll");
  document.getElementById("todo-section").classList.toggle("settings-opacity");
  document
    .getElementById("search-bar-container")
    .classList.toggle("settings-opacity");
  document.querySelector(".search-icon").classList.toggle("settings-opacity");
  document.querySelector("h1").classList.toggle("settings-opacity");
  document
    .querySelector(".add-refresh-container")
    .classList.toggle("settings-opacity");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function closeSettings() {
  document.getElementById("settings").classList.remove("slideInLeftSettings");
  document.getElementById("settings").classList.add("slideOutLeftSettings");
  document.getElementById("settings").animationPlayState = "running";
  sleep(200).then(() => {
    settings();
  });
}

const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();

function time() {
  if (hours < 10) {
    document.getElementById("hours").innerHTML = `0${hours}`;
  } else {
    document.getElementById("hours").innerHTML = `${hours}`;
  }
  if (minutes < 10) {
    document.getElementById("minutes").innerHTML = `0${minutes}`;
  } else {
    document.getElementById("minutes").innerHTML = `${minutes}`;
  }
}

setInterval(() => time(), 1000);

document.getElementById("hours").innerHTML = `${hours}`;
document.getElementById("minutes").innerHTML = `${minutes}`;
