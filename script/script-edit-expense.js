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

/* Displays the Custom Date number input if "Custom Date" is selected from drop-down */
var dropdown = document.getElementById("resetperiod");
var resetDate = document.getElementById("resetdate");
var custom_header = document.getElementById("resetCustomHeader")
dropdown.addEventListener("change", function() 
{
  // Check if the selected option is "Custom Date"
  if (dropdown.value === "custom-date") {
    custom_header.style.display = "inline-block"; // Display the header for the custom reset date
    resetDate.style.display = "inline-block";  // Display the number input for the custom reset date
  } else {
    custom_header.style.display = "none"; // Hide the number input for the custom reset date
    resetDate.style.display = "none"; // Hide the number input for the custom reset date
  }
});

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
    [curr_expense_json, curr_expense_index] = get_expense_json(selected_expense_name);
    if (curr_expense_json) {
        document.form.expensenametext.value = curr_expense_json.name;
        document.form.editexpensequantity.value = curr_expense_json.amount;
        document.getElementById("info-budget").innerHTML += curr_expense_json.budget_name;
        document.getElementById("info-reset-period").innerHTML += curr_expense_json.reset_period;
        if (curr_expense_json.reset_date != "") {
            document.form.resetdate.value = curr_expense_json.reset_date;
        }
    }
}

/* To create a new option in the drop-down menu */
function new_budget_option(budget_name) {
    var option = document.createElement("option"); // create the option element
    option.value = budget_name; // add the value attribute to the element
    user_budgets.appendChild(option); // create the structure by using appendChild
    option.innerHTML = budget_name; // give a value to the element
} 

/* Save the changes to the expense */ 
let form = document.getElementById("edit-expense");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (curr_expense_json) {
        var previous_amount = curr_expense_json.amount; //store previous amount of the expense
        var previous_budget_name = curr_expense_json.budget_name; //store previous budget to which the expense belongs
        curr_expense_json.name = document.form.expensenametext.value;
        curr_expense_json.amount = document.form.editexpensequantity.value;
        var selected_budget = document.form.userbudgets.options[userbudgets.selectedIndex];
        if (selected_budget.value != "keepcurrent") {
            curr_expense_json.budget_name = selected_budget.text;
        }
        if (document.form.resetperiod.options[resetperiod.selectedIndex].value != "keepcurrent") {
            curr_expense_json.reset_period = document.form.resetperiod.options[resetperiod.selectedIndex].text;
        }
        if (document.form.resetdate) {
            curr_expense_json.reset_date = document.form.resetdate.value;
        }
        localStorage.setItem("expense"+curr_expense_index.toString(), JSON.stringify(curr_expense_json));
        // if the budget name has been changed, change the amount left of both the previous and the new budget the expense belongs to
        if (selected_budget.value != "keepcurrent") { // budget name has been changed
            var [new_budget_json, new_budget_index] = get_budget_json(selected_budget.text); // get the new budget from localStorage
            var [previous_budget_json, previous_budget_index] = get_budget_json(previous_budget_name); // get the previous budget from localStorage
            // update the amount left of the previous budget by adding the amount of the expense that will be moved to the new budget
            previous_budget_json.amount_left = (parseFloat(previous_budget_json.amount_left) + parseFloat(previous_amount)).toFixed(2); 
            localStorage.setItem("budget"+previous_budget_index.toString(), JSON.stringify(previous_budget_json)); //save the changes to localStorage
            // update the amount left of the new budget by subtracting the amount of the new expense
            new_budget_json.amount_left = (parseFloat(new_budget_json.amount_left) - parseFloat(curr_expense_json.amount)).toFixed(2);
        }
        else { // budget name has not been changed
            var [new_budget_json, new_budget_index] = get_budget_json(localStorage.getItem("selected_budget")); // get the new budget from localStorage
            // update the amount left of the previous budget by subtracting the new amount of the expense and subtracting the previous amount of the expense (if it has not been changed, amount left stays the same)
            new_budget_json.amount_left = (parseFloat(new_budget_json.amount_left) - parseFloat(curr_expense_json.amount) + parseFloat(previous_amount)).toFixed(2);
        }
        localStorage.setItem("budget"+new_budget_index.toString(), JSON.stringify(new_budget_json)); //save the changes to localStorage
        alert("Your changes have been saved");
        window.open("budget.html", "_self");
    }
});

form.addEventListener("reset", function(e) {
    window.open("category.html", "_self");
});

function get_expense_json(selected_expense_name) {
    for (var i=0; i < maximum_expense_counter; i++) {
        var curr_expense_json = JSON.parse(localStorage.getItem("expense"+(i+1).toString()));
        if (curr_expense_json && selected_expense_name == curr_expense_json.name) {
            return [curr_expense_json, i+1];
        }
    }
}

function get_budget_json(budget_name) { //look for the budget with the specified name
    for (var i=0; i < maximum_budget_counter; i++) {
        var curr_budget_json = JSON.parse(localStorage.getItem("budget"+(i+1).toString()));
        if (curr_budget_json && budget_name == curr_budget_json.name) {
            return [curr_budget_json, i+1];
        }
    }
}