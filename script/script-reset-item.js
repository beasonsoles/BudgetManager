if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}
if ((maximum_expense_counter = localStorage.getItem("maximum_expense_counter")) == undefined) {
    maximum_expense_counter = 0;
}
if ((expense_counter = localStorage.getItem("expense_counter")) == undefined) {
    expense_counter = 0;
}
let today = new Date().toISOString().slice(0, 10);

/* Reset the budget when the reset period is over*/
for (var i = 0; i < maximum_budget_counter; i++) {
    var current_budget_json = JSON.parse(localStorage.getItem("budget"+(i+1).toString()));
    if (current_budget_json) {
        switch(current_budget_json.reset_period) {
            case "Daily":
                if (elapsed_time_since_reset(1, current_budget_json)) {
                    reset_budget(current_budget_json, i+1);
                    break;
                }
            case "Weekly":
                if (elapsed_time_since_reset(7, current_budget_json)) {
                    reset_budget(current_budget_json, i+1);
                    break;
                }
            case "Monthly":
                if (elapsed_time_since_reset(30, current_budget_json)) {
                    reset_budget(current_budget_json, i+1);
                    break;
                }
            case "Quarterly":
                if (elapsed_time_since_reset(90, current_budget_json)) {
                    reset_budget(current_budget_json, i+1);
                    break;
                }
            case "Yearly":
                if (elapsed_time_since_reset(365, current_budget_json)) {
                    reset_budget(current_budget_json, i+1);
                    break;
                }
            case "Custom Date":
                var a = ('0'+current_budget_json.reset_date).slice(-2);
                if (today.slice(-2) == ('0'+current_budget_json.reset_date).slice(-2)) {
                    reset_budget(current_budget_json, i+1);
                    break;
                } else { break; }
            default: 
                break;
        }
    }
}

/* Reset the expense when the reset period is over*/ 
for (var i=0; i < maximum_expense_counter; i++) {
    var current_expense_json = JSON.parse(localStorage.getItem("expense"+(i+1).toString()));
    if (current_expense_json) {
        switch(current_expense_json.reset_period) {
            case "Daily":
                if (elapsed_time_since_reset(1, current_expense_json)) {
                    reset_expense(current_expense_json, i+1);
                    break;
                }
            case "Weekly":
                if (elapsed_time_since_reset(7, current_expense_json)) {
                    reset_expense(current_expense_json, i+1);
                    break;
                }
            case "Monthly":
                if (elapsed_time_since_reset(30, current_expense_json)) {
                    reset_expense(current_expense_json, i+1);
                    break;
                }
            case "Quarterly":
                if (elapsed_time_since_reset(90, current_expense_json)) {
                    reset_expense(current_expense_json, i+1);
                    break;
                }
            case "Yearly":
                if (elapsed_time_since_reset(365, current_expense_json)) {
                    reset_expense(current_expense_json, i+1);
                    break;
                }
            case "Custom Date":
                if (today.slice(-2) == ('0'+current_expense_json.reset_date).slice(-2)) {
                    reset_expense(current_expense_json, i+1);
                    break;
                } else { break; }
            default: 
                break;
        }
    }
}


/* Check how long it's been since the last reset date*/
function elapsed_time_since_reset(offset, curr_json) {
    if (new Date(curr_json.last_reset)/(1000*24*60*60) + offset == new Date(today)/(1000*24*60*60)) { // reset has to be done today
        return true;
    }
    else {
        //reset has already been done today
        return false; // do not reset again
    }
}

/* To reset the last reset date and the amount left of the budget */
function reset_budget(current_budget_json, current_budget_index) {
    current_budget_json.last_reset = today; // set the last_reset key to today
    current_budget_json.amount_left = current_budget_json.amount; // reset the budget amount left to original budget amount
    localStorage.setItem("budget"+current_budget_index.toString(), JSON.stringify(current_budget_json)); // update budget
    //delete the expenses associated with the budget
    for (var i=0; i < maximum_expense_counter; i++) {
        var current_expense_json = JSON.parse(localStorage.getItem("expense"+(i+1).toString()));
        if (current_expense_json && current_expense_json.budget_name == current_budget_json.name) {
            localStorage.removeItem("expense"+(i+1).toString());
            expense_counter--;
            localStorage.setItem("expense_counter", expense_counter);
        }
    }
    location.reload();
}

function reset_expense(current_expense_json, current_expense_index) {
    current_expense_json.last_reset = today; // set the last_reset key to today
    localStorage.setItem("expense"+current_expense_index.toString(), JSON.stringify(current_expense_json)); // update expense
    for (var i = 0; i < maximum_budget_counter; i++) { // look for the budget to which the expense belongs
        var current_budget_json = JSON.parse(localStorage.getItem("budget"+(i+1).toString()));
        if (current_budget_json && current_expense_json.budget_name == current_budget_json.name) {
            current_budget_json.amount_left = (parseFloat(current_budget_json.amount_left) - parseFloat(current_expense_json.amount)).toFixed(2); // subtract expense amount from amount left in the budget
            localStorage.setItem("budget"+(i+1).toString(), JSON.stringify(current_budget_json)); // update budget
        }
    }
    location.reload();
}