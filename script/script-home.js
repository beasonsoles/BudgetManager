/* Show all budgets and redirect the user to the budget creation page*/
let budgets_home = document.querySelectorAll(".budget");
let new_budget_button = document.querySelector("#create-budget-image");

budgets_home.forEach(budget => {
    budget.style.display = "block";
});

new_budget_button.addEventListener("click", function() {
    window.open("new-budget.html", "_self");
});