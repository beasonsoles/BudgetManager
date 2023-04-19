let selected_budget_name = localStorage.getItem("selected_budget");
let curr_budget_json = null;
let curr_budget_index = 0;
if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}
/* Show current values */
// look for the corresponding budget in the database
let results = get_budget_json(selected_budget_name); 
if (results) {
    curr_budget_json = results[0];
    curr_budget_index = results[1];
    document.form.budgetnametext.value = curr_budget_json.name;
    document.form.budgetquantity.value = curr_budget_json.amount;
    document.form.categories.options[0].text = curr_budget_json.category;
    document.form.resetperiod.options[0].text = curr_budget_json.reset_period;
}

/* Save the changes to the budget */ 
let form = document.getElementById("edit-budget");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (curr_budget_json) {
        curr_budget_json.name = document.form.budgetnametext.value;
        curr_budget_json.amount = document.form.budgetquantity.value;
        //----------- Automobile option is being deleted (add at the bottom)---------
        curr_budget_json.category = document.form.categories.options[0].text;
        curr_budget_json.reset_period = document.form.resetperiod.options[0].text;
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
        var curr_budget_text = localStorage.getItem("budget"+(i+1).toString());
        var curr_budget_json = JSON.parse(curr_budget_text);
        var curr_budget_index = i+1;
        if (curr_budget_json && selected_budget_name == curr_budget_json.name) {
            return [curr_budget_json, curr_budget_index];
        }
    }
}