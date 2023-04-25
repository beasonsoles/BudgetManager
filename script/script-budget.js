document.addEventListener("load", function(){
    location.reload();
});

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

/* Display budget info from localStorage */
for (var i = 0; i < maximum_budget_counter; i++) {
    var budget_text = localStorage.getItem("budget"+(i+1).toString());
    current_budget = JSON.parse(budget_text);
    if (current_budget && current_budget.name == current_budget_name) {
        document.getElementById("budget-name").innerHTML = current_budget.name;
        document.getElementById("budget-amount").innerHTML = "$"+parseFloat(current_budget.amount).toFixed(2);
        display_amount_left(current_budget);
        //update_budget_amount_left(current_budget, i+1);
        document.getElementById("budget-category").innerHTML = current_budget.category;
        if (current_budget.reset_date != "") {
            var budget_reset_period = "Day "+current_budget.reset_date + " of each month";
        }
        else {
            var budget_reset_period = current_budget.reset_period;
        }
        document.getElementById("budget-reset-period").innerHTML = budget_reset_period;
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
            if (expense_json.reset_period == "Custom Date") {
                var expense_reset_period = "Day "+ expense_json.reset_date + " of each month";
            }
            else {
                var expense_reset_period = expense_json.reset_period;
            }
            add_expense(expense_name, expense_amount, expense_reset_period);
        }
    }
}

/* Alert the user if 80% of the budget has been expended and include how much time is left*/
if (parseFloat(document.getElementById("budget-amount-left").innerHTML.split("$")[1]) < (parseFloat(document.getElementById("budget-amount").innerHTML.split("$")[1]) * 0.2) || document.getElementById("budget-amount-left").innerHTML[0] == "-") {
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
    amount.innerHTML = "-$"+parseFloat(expense_amount).toFixed(2);
    reset_period.innerHTML = "Resets: "+expense_reset_period;
}

/* To redirect the user to the expense creation page*/
let create_expense_button = document.getElementById("create-expense");
create_expense_button.addEventListener("click", function() {
    window.open("new-expense.html", "_self");
});

async function alertUser() {
    var time_left = get_time_left(current_budget_name);
    if (time_left != undefined) {
        setTimeout(function() {alert("More than 80% of Budget expended. \n"+time_left)}, 100);
    } else {
        setTimeout(function() {alert("More than 80% of Budget expended")}, 100);
    }
        
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
            var [curr_expense_json, curr_expense_index] = get_expense_json(expense.firstChild.nextSibling.nextSibling.innerHTML, current_budget_name);
            // find the budget to which the expense belongs and update the amount left
            var [curr_budget_json, curr_budget_index] = get_budget_json(curr_expense_json.budget_name);
            var new_amount_left = (parseFloat(curr_budget_json.amount_left) + parseFloat(curr_expense_json.amount)).toFixed(2);
            if (parseFloat(new_amount_left) > parseFloat(curr_budget_json.amount)) { curr_budget_json.amount_left = curr_budget_json.amount; }
            else { curr_budget_json.amount_left = new_amount_left; }
            localStorage.setItem("budget"+curr_budget_index.toString(), JSON.stringify(curr_budget_json));
            display_amount_left(curr_budget_json);
            //delete the expense
            localStorage.removeItem("expense"+curr_expense_index.toString());
            expense_counter--;
            localStorage.setItem("expense_counter", expense_counter);
            expense.remove();
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

function display_amount_left(current_budget) {
    if (parseFloat(current_budget.amount_left) >= 0) {
        document.getElementById("budget-amount-left").innerHTML = "$"+parseFloat(current_budget.amount_left).toFixed(2);
    }
    else {
        document.getElementById("budget-amount-left").innerHTML = "-$"+Math.abs(parseFloat(current_budget.amount_left)).toFixed(2);
    }
}

function get_time_left(budget_name) {
    var curr_date = new Date().toISOString().slice(0, 10);
    var [budget_json, _] = get_budget_json(budget_name);
    var conversion = (1000*24*60*60);
    if (curr_date == budget_json.last_reset) { // user has spent the whole budget in the first day
        switch (budget_json.reset_period) {
            case "Daily": return "Budget will be reset tomorrow";
            case "Weekly": return "Budget will be reset in 1 week";
            case "Monthly": // same as "Custom Date"
            case "Custom Date": return "Budget will be reset in 1 month";
            case "Quarterly": return "Budget will be reset in 3 months";
            case "Yearly": return "Budget will be reset in 1 year";
            default: break;
        }
    }
    else {
        switch (budget_json.reset_period) {
            case "Daily": return "Budget will be reset tomorrow";
            case "Weekly": return "Budget will be reset in " + Math.abs(7 - new Date(curr_date)/conversion + new Date(budget_json.last_reset)/conversion) + " day(s)";
            case "Monthly": return "Budget will be reset in " + Math.abs(30 - new Date(curr_date)/conversion + new Date(budget_json.last_reset)/conversion) + " day(s)";
            case "Quarterly": return "Budget will be reset in " + Math.abs(90 - new Date(curr_date)/conversion + new Date(budget_json.last_reset)/conversion) + " day(s)";
            case "Yearly": return "Budget will be reset in " + Math.abs(365 - new Date(curr_date)/conversion + new Date(budget_json.last_reset)/conversion) + " day(s)";
            case "Custom Date":
                var curr_date_day = parseInt(curr_date.slice(-2));
                var reset_date_day = parseInt(budget_json.reset_date);
                if (curr_date_day < reset_date_day) { // budget has not been reset yet
                    return "Budget will be reset in " + (reset_date_day - curr_date_day).toString() + " day(s)";
                } 
                else if (curr_date_day > reset_date_day) { // budget has already been reset
                    return "Budget will be reset in " + (30 - curr_date_day + reset_date_day).toString() + " day(s)";
                } // "equal to" condition is taken care of in the first switch statement
            default: break;
        }
    }
}