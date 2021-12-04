const { ipcRenderer } = require('electron')

if (navigator.language == "pl") {
    document.getElementById("heading").innerHTML = `Witaj w`
    document.getElementById("login-text").innerHTML = `Logowanie`
    document.getElementById("registration-text").innerHTML = `Rejestracja`
    document.getElementById("exit-text").innerHTML = `Wyjdź`
} else {
    document.getElementById("heading").innerHTML = `Welcome in`
    document.getElementById("login-text").innerHTML = `Sign in`
    document.getElementById("registration-text").innerHTML = `Sign up`
    document.getElementById("exit-text").innerHTML = `Exit`
}

function signIn() {
    console.log("Login")
}

function signUp() {
    console.log("Registration")
}

function exit() {
    ipcRenderer.send("exit")
}