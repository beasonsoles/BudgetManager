/* Display budget info */
let current_budget_index = localStorage.getItem("current_budget");
let current_budget_text = localStorage.getItem("budget"+current_budget_index);
let current_budget = JSON.parse(current_budget_text);
document.getElementById("budget-name").innerHTML = current_budget.name;
document.getElementById("budget-amount").innerHTML = "$"+current_budget.amount;
document.getElementById("budget-category").innerHTML = current_budget.category;
document.getElementById("budget-reset-period").innerHTML = current_budget.reset_period;

/* Display expenses related to the budget */
let expense_container = document.getElementById("your-expenses");
let expenses_total = current_budget.amount;
if ((expense_counter = localStorage.getItem("expense_counter")) == undefined) {
    expense_counter = 0;
}

for (var i = 0; i < expense_counter; i++) {
    var expense_text = localStorage.getItem("expense"+(i+1).toString());
    var expense_json = JSON.parse(expense_text);
    if (expense_json.budget_name == current_budget.name) {
        var expense_name = expense_json.name;
        var expense_amount = expense_json.amount;
        var expense_reset_period = expense_json.reset_period;
        expenses_total -= expense_json.amount;
        add_expense(expense_name, expense_amount, expense_reset_period);
    }
}

document.getElementById("budget-amount-left").innerHTML = "$"+expenses_total;


/* To create an expense */
function add_expense(expense_name, expense_amount, expense_reset_period) {
    // create the elements of the expense
    var expense = document.createElement("div");
    var name = document.createElement("h2");
    var amount = document.createElement("h2");
    var reset_period = document.createElement("h4");
    var n_line = document.createElement("br");
    var h_line = document.createElement("hr");
    // add classes to each of the new elements
    expense.classList.add("expense");
    name.classList.add("name");
    amount.classList.add("amount");
    reset_period.classList.add("reset-period");
    // create the structure by using appendChild
    expense_container.appendChild(expense);
    expense.appendChild(name);
    expense.appendChild(h_line);
    expense.appendChild(amount);
    expense.appendChild(reset_period);
    expense_container.appendChild(n_line);
    // give values to the elements
    name.innerHTML = expense_name;
    amount.innerHTML = "-$"+expense_amount;
    reset_period.innerHTML = "Resets: "+expense_reset_period;
} 

/* To redirect the user to the expense creation page*/
let create_expense_button = document.getElementById("create-expense");
create_expense_button.addEventListener("click", function() {
    window.open("new-expense.html", "_self");
});