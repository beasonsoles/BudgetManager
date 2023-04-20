let form = document.getElementById("new-budget");
if ((budget_counter = localStorage.getItem("budget_counter")) == undefined) {
    budget_counter = 0;
}

if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}

//JSON that stores the amount, category and reset period of the budget created 
let budget_json = {
    "name": "",
    "amount": "",
    "category": "",
    "reset_period": "",
    "reset_date": "",
    "last_reset": ""
}

/* Displays the text custom date number input if "Custom Date" is selected from drop-down */
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


/* Save the budget */
form.addEventListener("submit", function(e) {
    e.preventDefault();
    var budget_name = document.getElementById("budgetnametext").value;
    //check that the budget name doesn't already exist
    if (get_budget_json(budget_name)) {
        alert("That budget name already exists. \nPlease choose a different name for your budget");
        return;
    }
    var budget_amount = document.getElementById("budgetquantity").value;
    var category = document.getElementById("categories");
    var budget_category = category.options[category.selectedIndex].text;
    var reset_period = document.getElementById("resetperiod");
    var budget_reset_period = reset_period.options[reset_period.selectedIndex].text;
    var reset_date = document.getElementById("resetdate").value;
    budget_counter++;
    maximum_budget_counter++;
    localStorage.setItem("budget_counter", budget_counter);
    localStorage.setItem("maximum_budget_counter", maximum_budget_counter);
    budget_json.name = budget_name;
    budget_json.amount = budget_amount;
    budget_json.category = budget_category;
    budget_json.reset_period = budget_reset_period;
    budget_json.reset_date = reset_date;
    budget_json.last_reset = new Date().toISOString().slice(0, 10);
    var json_text = JSON.stringify(budget_json);
    localStorage.setItem("budget"+maximum_budget_counter.toString(), json_text);
    alert("Your budget has been saved");
    form.reset();
    localStorage.setItem("selected_category", budget_category);
    window.open("category.html", "_self");
});

/* To prevent the user from saving the budget if the Save button is not pressed */
form.addEventListener("keydown", function(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
    }
});

function get_budget_json(budget_name) {
    for (var i=0; i < maximum_budget_counter; i++) {
        var curr_budget_text = localStorage.getItem("budget"+(i+1).toString());
        var curr_budget_json = JSON.parse(curr_budget_text);
        if (curr_budget_json && budget_name == curr_budget_json.name) {
            //budget already exists
            return true;
        }
    }
}