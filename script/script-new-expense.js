let form = document.getElementById("new-expense");
if ((expense_counter = localStorage.getItem("expense_counter")) == undefined) {
    expense_counter = 0;
}

//JSON that stores the amount, category and reset period of the expense created 
let expense_json = {
    "amount": "",
    "category": "",
    "reset_period": ""
}

/* Save the expense */
form.addEventListener("submit", function(e) {
    e.preventDefault();
    var expense_amount = document.getElementById("expense-quantity").value;
    var category = document.getElementById("categories");
    var expense_category = category.options[category.selectedIndex].text;
    var reset_period = document.getElementById("reset-period");
    var expense_reset_period = reset_period.options[reset_period.selectedIndex].text;
    expense_counter++;
    localStorage.setItem("expense_counter", expense_counter);
    expense_json.amount = expense_amount;
    expense_json.category = expense_category;
    expense_json.reset_period = expense_reset_period;
    var json_text = JSON.stringify(expense_json);
    localStorage.setItem("expense"+expense_counter.toString(), json_text);
    alert("Your expense has been saved");
    form.reset();
});

/* To prevent the user from saving the expense if the Save button is not pressed */
form.addEventListener("keydown", function(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
    }
});