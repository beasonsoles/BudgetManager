let form = document.getElementById("new-budget");
if ((budget_counter = localStorage.getItem("budget_counter")) == undefined) {
    budget_counter = 0;
}

//JSON that stores the amount, category and reset period of the budget created 
let budget_json = {
    "name": "",
    "amount": "",
    "category": "",
    "reset_period": ""
}

/* Save the budget */
form.addEventListener("submit", function(e) {
    e.preventDefault();
    var budget_name = document.getElementById("budget-name-text").value;
    var budget_amount = document.getElementById("budget-quantity").value;
    var category = document.getElementById("categories");
    var budget_category = category.options[category.selectedIndex].text;
    var reset_period = document.getElementById("reset-period");
    var budget_reset_period = reset_period.options[reset_period.selectedIndex].text;
    budget_counter++;
    localStorage.setItem("budget_counter", budget_counter);
    budget_json.name = budget_name;
    budget_json.amount = budget_amount;
    budget_json.category = budget_category;
    budget_json.reset_period = budget_reset_period;
    var json_text = JSON.stringify(budget_json);
    localStorage.setItem("budget"+budget_counter.toString(), json_text);
    alert("Your budget has been saved");
    form.reset();
});

/* To prevent the user from saving the budget if the Save button is not pressed */
form.addEventListener("keydown", function(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
    }
});