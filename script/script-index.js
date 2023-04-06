/* Para avisar al usuario que debe sign-in sesión para acceder a las funciones del menu */
let sign_up = document.getElementById("sign-up");
let log_in = document.getElementById("sign-in");
let home = document.getElementById("option1");
let budgets = document.getElementById("option2");
let playlist = document.getElementById("option3");
let favoritos = document.getElementById("option4");
let settings = document.getElementById("option4");
let ad = document.getElementById("go-to-sign-up");

sign_up.addEventListener("click", function() {
    window.open("sign-up-form.html", "_self");
});

log_in.addEventListener("click", function() {
    window.open("log-in-form.html", "_self");
});

home.addEventListener("click", function() {
    window.open("index.html", "_self");  // clicking on "home" keeps the user in the main webpage
});

budgets.addEventListener("click", function() {
    alert("Sign in or sign up to access your...");
});

playlist.addEventListener("click", function() {
    alert("Sign in or sign up to access your...");
});

favoritos.addEventListener("click", function() {
    alert("Sign in or sign up to access your...");
});

settings.addEventListener("click", function() {
  alert("Sign in or sign up to access your...");
});

ad.addEventListener("click", function() {
    window.open("sign-up-form.html", "_self");
});