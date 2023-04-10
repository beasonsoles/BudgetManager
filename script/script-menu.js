/* Redirect the user depending on the option chosen from the menu */
let home = document.getElementById("option1");
let budgets = document.getElementById("option2");
let new_budget = document.getElementById("option3");
let settings = document.getElementById("option4");

home.addEventListener("click", function() {
    window.open("home.html", "_self");
});

budgets.addEventListener("click", function() {
    window.open("budgets.html", "_self");
});

new_budget.addEventListener("click", function() {
    window.open("new-expense.html", "_self");
});

settings.addEventListener("click", function() {
    var popup = document.getElementById("change-theme");
    popup.classList.toggle("show-popup-theme");
});
