if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}

/* Show all expenses and redirect the user to the budget creation page*/
let new_budget_button = document.querySelector("#create-budget-image");

new_budget_button.addEventListener("click", function() {
    window.open("new-budget.html", "_self");
});

let expense_container = document.getElementById("all-your-expenses");
if ((expense_counter = localStorage.getItem("expense_counter")) == undefined) {
    expense_counter = 0;
}
if ((maximum_expense_counter = localStorage.getItem("maximum_expense_counter")) == undefined) {
    maximum_expense_counter = 0;
}

display_total();

function display_total() {
    var budgets_total = 0; // will store the total budgeted amount
    var amount_left_total = 0; // will store the total amount left after all the expenses
    // add up all budgets and show it on the homepage
    for (var i=0; i < maximum_budget_counter; i++) {
        var budget_json = JSON.parse(localStorage.getItem("budget"+(i+1).toString()));
        if (budget_json) {
            budgets_total += parseFloat(budget_json.amount);
            amount_left_total += parseFloat(budget_json.amount_left);
        }
    }
    document.getElementById("total-amount").innerHTML = "$" + parseFloat(budgets_total).toFixed(2);
    if (amount_left_total >= 0) {
        document.getElementById("total-amount-left").innerHTML = "$" + parseFloat(amount_left_total).toFixed(2);
    } else {
        document.getElementById("total-amount-left").innerHTML = "-$" + Math.abs(parseFloat(amount_left_total)).toFixed(2);
    } 
}

/* To display the expenses created with their budget */
for (var i = 0; i < maximum_expense_counter; i++) {
        var expense_json = JSON.parse(localStorage.getItem("expense"+(i+1).toString()));
        if (expense_json) {
            var expense_name = expense_json.name;
            var expense_amount = expense_json.amount;
            var expense_budget_name = expense_json.budget_name;
            if (expense_json.reset_period == "Custom Date") {
                var expense_reset_period = "Day "+expense_json.reset_date + " of each month";
            }
            else {
                var expense_reset_period = expense_json.reset_period;
            }
            add_expense(expense_name, expense_amount, expense_budget_name, expense_reset_period);
        }
}

/* To create an expense */
function add_expense(expense_name, expense_amount, expense_budget_name, expense_reset_period) {
    // create the elements of the expense
    var expense = document.createElement("div");
    var name = document.createElement("h2");
    var amount = document.createElement("h2");
    var budget_name = document.createElement("h2");
    var reset_period = document.createElement("h2");
    var edit_expense = document.createElement("div");
    var edit_expense_img = document.createElement("img");
    var delete_expense = document.createElement("div");
    var delete_expense_img = document.createElement("img");
    var n_line = document.createElement("br");
    // add classes to each of the new elements
    expense.classList.add("expense-home");
    name.classList.add("name");
    amount.classList.add("expense-amount-home");
    budget_name.classList.add("budget-name-home");
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
    expense.appendChild(amount);
    expense.appendChild(budget_name);
    expense.appendChild(reset_period);
    expense_container.appendChild(n_line);
    // give values to the elements
    edit_expense_img.src = "images/edit.png";
    delete_expense_img.src = "images/delete.png";
    name.innerHTML = expense_name;
    amount.innerHTML = "-$"+parseFloat(expense_amount).toFixed(2);
    budget_name.innerHTML = expense_budget_name;
    reset_period.innerHTML = "Resets: "+expense_reset_period;
} 

/* To redirect the user to the expense creation page*/
let create_expense_button = document.getElementById("create-expense-button");
create_expense_button.addEventListener("click", function() {
    window.open("new-expense.html", "_self");
});

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
        var selected_expense = edit_button.parentElement.firstChild.nextSibling.nextSibling.innerHTML;
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
    delete_button.addEventListener("click", function() {
        var response = confirm("Are you sure you want to delete this expense?");
        if (response) {
            // get the expense the user clicked on
            var expense = delete_button.parentElement;
            // find the expense in local storage, update the amount left of the budget, and delete it
            var [curr_expense_json, curr_expense_index] = get_expense_json(expense.firstChild.nextSibling.nextSibling.innerHTML, expense.lastChild.previousSibling.innerHTML);
            // find the budget to which the expense belongs and update the amount left
            var [curr_budget_json, curr_budget_index] = get_budget_json(curr_expense_json.budget_name);
            var new_amount_left = (parseFloat(curr_budget_json.amount_left) + parseFloat(curr_expense_json.amount)).toFixed(2);
            if (parseFloat(new_amount_left) > parseFloat(curr_budget_json.amount)) { curr_budget_json.amount_left = curr_budget_json.amount; }
            else { curr_budget_json.amount_left = new_amount_left; }
            localStorage.setItem("budget"+curr_budget_index.toString(), JSON.stringify(curr_budget_json));
            //delete the expense
            localStorage.removeItem("expense"+curr_expense_index.toString());
            expense_counter--;
            localStorage.setItem("expense_counter", expense_counter);
            expense.remove();
            display_total();
        }
    });
});

function get_budget_json(budget_name) { //look for the budget with the specified name
    for (var i=0; i < maximum_budget_counter; i++) {
        var curr_budget_json = JSON.parse(localStorage.getItem("budget"+(i+1).toString()));
        if (curr_budget_json && budget_name == curr_budget_json.name) {
            return [curr_budget_json, i+1];
        }
    }
}

function get_expense_json(expense_name, budget_name) {
    for (var i=0; i < maximum_expense_counter; i++) {
        var curr_expense_json = JSON.parse(localStorage.getItem("expense"+(i+1).toString()));
        if (curr_expense_json && expense_name == curr_expense_json.name && budget_name == curr_expense_json.budget_name) {
            return [curr_expense_json, i+1];
        }
    }
}


