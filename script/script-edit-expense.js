let selected_expense_name = localStorage.getItem("selected_expense");
let curr_expense_json = null;
let curr_expense_index = 0;
let user_budgets = document.getElementById("userbudgets");

if ((maximum_expense_counter = localStorage.getItem("maximum_expense_counter")) == undefined) {
    maximum_expense_counter = 0;
}
if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}
show_expense_values();

/* Show current values */
function show_expense_values() {
    /* To show the names of the budgets created by the user in the drop-down menu */
    for (var i = 0; i < maximum_budget_counter; i++) {
        var budget_text = localStorage.getItem("budget"+(i+1).toString());
        var budget_json = JSON.parse(budget_text);
        if (budget_json) {
            new_budget_option(budget_json.name);
        }
    }
    var results = get_expense_json(selected_expense_name);
    if (results) {
        curr_expense_json = results[0];
        curr_expense_index = results[1];
        document.form.expensenametext.value = curr_expense_json.name;
        document.form.expensequantity.value = curr_expense_json.amount;
        document.form.userbudgets.options[0].text = curr_expense_json.budget_name;
        document.form.resetperiod.options[0].text = curr_expense_json.reset_period;
    }
}

/* To create a new option in the drop-down menu */
function new_budget_option(budget_name) {
    // create the option element
    var option = document.createElement("option");
    // add the value attribute to the element
    option.value = budget_name;
    // create the structure by using appendChild
    user_budgets.appendChild(option);
    // give a value to the element
    option.innerHTML = budget_name;
} 

/* Save the changes to the expense */ 
let form = document.getElementById("edit-expense");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (curr_expense_json) {
        curr_expense_json.name = document.form.expensenametext.value;
        curr_expense_json.amount = document.form.expensequantity.value;
        curr_expense_json.budget_name = document.form.userbudgets.options[0].text;
        curr_expense_json.reset_period = document.form.resetperiod.options[0].text;
        localStorage.setItem("expense"+curr_expense_index.toString(), JSON.stringify(curr_expense_json));
        alert("Your changes have been saved");
        window.open("budget.html", "_self");
    }
});

form.addEventListener("reset", function(e) {
    window.open("category.html", "_self");
});

function get_expense_json(selected_expense_name) {
    for (var i=0; i < maximum_expense_counter; i++) {
        var curr_expense_text = localStorage.getItem("expense"+(i+1).toString());
        var curr_expense_json = JSON.parse(curr_expense_text);
        var curr_expense_index = i+1;
        if (curr_expense_json && selected_expense_name == curr_expense_json.name) {
            return [curr_expense_json, curr_expense_index];
        }
    }
}