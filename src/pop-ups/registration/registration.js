if (navigator.language == "pl") {
    document.getElementById("heading").innerHTML = `Rejestracja przebiegła pomyślnie!`;
    document.getElementById("button-text").innerHTML = `Zaloguj się`;
} else {
    document.getElementById("heading").innerHTML = `Registration was successful!`;
    document.getElementById("button-text").innerHTML = `Sign in`;
}

function signIn() {
    location.href = "../../login/login.html";
}