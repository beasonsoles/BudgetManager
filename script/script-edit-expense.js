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
    var results = get_expense_json(selected_expense_name);
    if (results) {
        curr_expense_json = results[0];
        curr_expense_index = results[1];
        document.form.expensenametext.value = curr_expense_json.name;
        document.form.expensequantity.value = curr_expense_json.amount;
        document.getElementById("info-budget").innerHTML += curr_expense_json.budget_name;
        document.getElementById("info-reset-period").innerHTML += curr_expense_json.reset_period;
        //document.form.userbudgets.options[userbudgets.selectedIndex].text = curr_expense_json.budget_name;
        //document.form.resetperiod.options[resetperiod.selectedIndex].text = curr_expense_json.reset_period;
        if (curr_expense_json.reset_date != "") {
            document.form.resetdate.value = curr_expense_json.reset_date;
        }
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
        var previous_amount = curr_expense_json.amount;
        curr_expense_json.name = document.form.expensenametext.value;
        curr_expense_json.amount = document.form.expensequantity.value;
        if (document.form.userbudgets.options[userbudgets.selectedIndex].value != "keepcurrent") {
            curr_expense_json.budget_name = document.form.userbudgets.options[userbudgets.selectedIndex].text;
        }
        if (document.form.resetperiod.options[resetperiod.selectedIndex].value != "keepcurrent") {
            curr_expense_json.reset_period = document.form.resetperiod.options[resetperiod.selectedIndex].text;
        }
        if (document.form.resetdate) {
            curr_expense_json.reset_date = document.form.resetdate.value;
        }
        localStorage.setItem("expense"+curr_expense_index.toString(), JSON.stringify(curr_expense_json));
        var results = get_budget_json(curr_expense_json.budget_name);
        var budget_json = results[0];
        var budget_json_index = results[1];
        var new_amount_left = (parseFloat(budget_json.amount_left) - parseFloat(curr_expense_json.amount) + parseFloat(previous_amount)).toFixed(2);
        if (new_amount_left > budget_json.amount) { budget_json.amount_left = budget_json.amount; }
        else { budget_json.amount_left = new_amount_left; }
        localStorage.setItem("budget"+budget_json_index.toString(), JSON.stringify(budget_json));
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

function get_budget_json(budget_name) { //look for the budget with the specified name
    for (var i=0; i < maximum_budget_counter; i++) {
        var curr_budget_text = localStorage.getItem("budget"+(i+1).toString());
        var curr_budget_json = JSON.parse(curr_budget_text);
        if (curr_budget_json && budget_name == curr_budget_json.name) {
            return [curr_budget_json, i+1];
        }
    }
}