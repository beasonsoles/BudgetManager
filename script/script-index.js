/*Inform the user that signing in is necessary to access the app */
let sign_up = document.getElementById("sign-up");
let log_in = document.getElementById("log-in");
let home = document.getElementById("option1");
let budgets = document.getElementById("option2");
let playlist = document.getElementById("option3");
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
    alert("Log in or sign up to access your budgets");
});

playlist.addEventListener("click", function() {
    alert("Log in or sign up to create an expense");
});

settings.addEventListener("click", function() {
  alert("Log in or sign up to access the settings");
});

ad.addEventListener("click", function() {
    window.open("sign-up-form.html", "_self");
});