/* Display budget info */
let current_budget_name = localStorage.getItem("selected_budget");
let current_budget = null;
if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}
if ((maximum_expense_counter = localStorage.getItem("maximum_expense_counter")) == undefined) {
    maximum_expense_counter = 0;
}
if ((expense_counter = localStorage.getItem("expense_counter")) == undefined) {
    expense_counter = 0;
}

for (var i = 0; i < maximum_budget_counter; i++) {
    var budget_text = localStorage.getItem("budget"+(i+1).toString());
    current_budget = JSON.parse(budget_text);
    if (current_budget && current_budget.name == current_budget_name) {
        document.getElementById("budget-name").innerHTML = current_budget.name;
        document.getElementById("budget-amount").innerHTML = "$"+current_budget.amount;
        update_budget_amount_left(current_budget);
        document.getElementById("budget-category").innerHTML = current_budget.category;
        document.getElementById("budget-reset-period").innerHTML = current_budget.reset_period;
        get_expenses(current_budget_name);
        break;
    }
}

/* Display expenses related to the budget */
function get_expenses(current_budget_name) {
    for (var i = 0; i < maximum_expense_counter; i++) {
        var expense_text = localStorage.getItem("expense"+(i+1).toString());
        var expense_json = JSON.parse(expense_text);
        if (expense_json && expense_json.budget_name == current_budget_name) {
            var expense_name = expense_json.name;
            var expense_amount = expense_json.amount;
            var expense_reset_period = expense_json.reset_period;
            add_expense(expense_name, expense_amount, expense_reset_period);
        }
    }
}

/* Alert the user if 80% of the budget has been expended */
if (parseInt(document.getElementById("budget-amount-left").innerHTML.substring(1)) < (parseInt(document.getElementById("budget-amount").innerHTML.substring(1)) * 0.2)) {
    alertUser();
}

/* To create an expense */
function add_expense(expense_name, expense_amount, expense_reset_period) {
    var expense_container = document.getElementById("your-expenses");
    // create the elements of the expense
    var expense = document.createElement("div");
    var name = document.createElement("h2");
    var amount = document.createElement("h2");
    var reset_period = document.createElement("h4");
    var edit_expense = document.createElement("div");
    var edit_expense_img = document.createElement("img");
    var delete_expense = document.createElement("div");
    var delete_expense_img = document.createElement("img");
    var n_line = document.createElement("br");
    var h_line = document.createElement("hr");
    // add classes to each of the new elements
    expense.classList.add("expense");
    name.classList.add("name");
    amount.classList.add("amount");
    reset_period.classList.add("reset-period");
    edit_expense.classList.add("edit-expense");
    edit_expense_img.classList.add("edit-expense-img");
    delete_expense.classList.add("delete-expense");
    delete_expense_img.classList.add("delete-expense-img");
    // create the structure by using appendChild
    expense_container.appendChild(expense);
    expense.appendChild(edit_expense);
    expense.appendChild(delete_expense);
    edit_expense.appendChild(edit_expense_img);
    delete_expense.appendChild(delete_expense_img);
    expense.appendChild(name);
    expense.appendChild(h_line);
    expense.appendChild(amount);
    expense.appendChild(reset_period);
    expense_container.appendChild(n_line);
    // give values to the elements
    edit_expense_img.src = "images/edit.png";
    delete_expense_img.src = "images/delete.png";
    name.innerHTML = expense_name;
    amount.innerHTML = "-$"+expense_amount;
    reset_period.innerHTML = "Resets: "+expense_reset_period;
}

/* Update budget amount left each time an expense is added or deleted */
function update_budget_amount_left(current_budget) {
    var expenses_total = current_budget.amount;
    for (var i = 0; i < maximum_expense_counter; i++) {
        var expense_text = localStorage.getItem("expense"+(i+1).toString());
        var expense_json = JSON.parse(expense_text);
        if (expense_json && expense_json.budget_name == current_budget.name) {
            expenses_total -= expense_json.amount;
        }
    }
    if (expenses_total > 0) {
        document.getElementById("budget-amount-left").innerHTML = "$"+expenses_total;
    }
    else {
        document.getElementById("budget-amount-left").innerHTML = "-$"+Math.abs(expenses_total);
    }
}

/* To redirect the user to the expense creation page*/
let create_expense_button = document.getElementById("create-expense");
create_expense_button.addEventListener("click", function() {
    window.open("new-expense.html", "_self");
});

async function alertUser() {
    setTimeout(function() {alert("80% of Budget Expended")}, 100);
}

/* To let the user edit the expense */
let edit_button_list = document.querySelectorAll(".edit-expense");
edit_button_list.forEach(function(edit_button) {
    // change the image of the edit button when user hovers over it
    edit_button.addEventListener("mouseover", function() {
        edit_button.firstChild.src = "images/edit_full.png";
    });
    edit_button.addEventListener("mouseout", function() {
        edit_button.firstChild.src = "images/edit.png";
    });
    // redirect the user to the expense edition page 
    edit_button.addEventListener("click", function() {
        var selected_expense = edit_button.parentElement.lastChild.previousSibling.previousSibling.innerHTML;
        localStorage.setItem("selected_expense", selected_expense);
        window.open("edit-expense.html", "_self");
    });
});

/* To let the user delete the expense */
let delete_button_list = document.querySelectorAll(".delete-expense");
delete_button_list.forEach(function(delete_button) {
    // change the image of the delete button when user hovers over it
    delete_button.addEventListener("mouseover", function() {
        delete_button.firstChild.src = "images/delete_full.png";
    });
    delete_button.addEventListener("mouseout", function() {
        delete_button.firstChild.src = "images/delete.png";
    });
    // redirect the user to the expense deletion page
    delete_button.addEventListener("click", function() {
        var response = confirm("Are you sure you want to delete this expense?");
        if (response) {
            // get the expense the user clicked on
            var expense = delete_button.parentElement;
            // find the expense in local storage and delete it
            for (var i=0; i < maximum_expense_counter; i++) {
                var curr_expense_text = localStorage.getItem("expense"+(i+1).toString());
                var curr_expense_json = JSON.parse(curr_expense_text);
                if (curr_expense_json && expense.firstChild.nextSibling.nextSibling.innerHTML == curr_expense_json.name) {
                    localStorage.removeItem("expense"+(i+1).toString());
                    expense_counter--;
                    localStorage.setItem("expense_counter", expense_counter);
                    expense.remove();
                    update_budget_amount_left(current_budget);
                }
            }
        }
    });
});