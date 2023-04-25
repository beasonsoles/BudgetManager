//--------------------------------FIX submit------------------------------------------
let selected_budget_name = localStorage.getItem("selected_budget");
let curr_budget_json = null;
let curr_budget_index = 0;
if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}

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
// look for the corresponding budget in the database
[curr_budget_json, curr_budget_index] = get_budget_json(selected_budget_name);
if (curr_budget_json) {
    document.form.budgetnametext.value = curr_budget_json.name;
    document.form.budgetquantity.value = curr_budget_json.amount;
    document.getElementById("info-category").innerHTML += curr_budget_json.category;
    document.getElementById("info-reset-period").innerHTML += curr_budget_json.reset_period;
    if (curr_budget_json.reset_date != "") {
        document.form.resetdate.value = curr_budget_json.reset_date;
    }
}

/* Save the changes to the budget */ 
let form = document.getElementById("edit-budget");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (curr_budget_json) {
        curr_budget_json.name = document.form.budgetnametext.value;
        curr_budget_json.amount = document.form.budgetquantity.value;
        curr_budget_json.amount_left = document.form.budgetquantity.value;
        if (document.form.categories.options[categories.selectedIndex].value != "keepcurrent") {
            curr_budget_json.category = document.form.categories.options[categories.selectedIndex].text;
        }
        if (document.form.resetperiod.options[resetperiod.selectedIndex].value != "keepcurrent") {
            curr_budget_json.reset_period = document.form.resetperiod.options[resetperiod.selectedIndex].text;
        }
        if (document.form.resetdate) {
            curr_budget_json.reset_date = document.form.resetdate.value;
        }
        localStorage.setItem("budget"+curr_budget_index.toString(), JSON.stringify(curr_budget_json));
        alert("Your changes have been saved");
        window.open("category.html", "_self");
    }
});

form.addEventListener("reset", function(e) {
    window.open("category.html", "_self");
});

function get_budget_json(selected_budget_name) {
    for (var i=0; i < maximum_budget_counter; i++) {
        var curr_budget_json = JSON.parse(localStorage.getItem("budget"+(i+1).toString()));
        var curr_budget_index = i+1;
        if (curr_budget_json && selected_budget_name == curr_budget_json.name) {
            return [curr_budget_json, curr_budget_index];
        }
    }
}