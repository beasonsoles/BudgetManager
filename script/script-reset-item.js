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
    var curr_budget_text = localStorage.getItem("budget"+(i+1).toString());
    var curr_budget_json = JSON.parse(curr_budget_text);
    if (curr_budget_json) {
        switch(curr_budget_json.reset_period) {
            case "Daily":
                elapsed_time_since_reset(1, curr_budget_json, i+1);
                break;
            case "Weekly":
                elapsed_time_since_reset(7, curr_budget_json, i+1);
                break;
            case "Monthly":
                elapsed_time_since_reset(30, curr_budget_json, i+1);
                break;
            case "Quarterly":
                elapsed_time_since_reset(90, curr_budget_json, i+1);
                break;
            case "Yearly":
                elapsed_time_since_reset(365, curr_budget_json, i+1);
                break;
            case "Custom Date":
                var a = ('0'+curr_budget_json.reset_date).slice(-2);
                if (today.slice(-2) == ('0'+curr_budget_json.reset_date).slice(-2)) {
                    reset_budget(curr_budget_json, i+1);
                    break;
                } else { break; }
            default: 
                break;
        }
    }
}

/* Reset the expense when the reset period is over*/ 





/* Check how long it's been since the last reset date*/
function elapsed_time_since_reset(offset, curr_budget_json, curr_budget_index) {
    if (new Date(curr_budget_json.last_reset)/(1000*24*60*60) + offset == new Date(today)/(1000*24*60*60)) { // reset has to be done today
        reset_budget(curr_budget_json, curr_budget_index);
    }
    else {
        //reset has already been done today
        return; // do not reset again
    }
}

/* To reset the last reset date and the amount left of the budget */
function reset_budget(curr_budget_json, curr_budget_index) {
    curr_budget_json.last_reset = today; // set the last_reset key to today
    curr_budget_json.amount_left = curr_budget_json.amount; // reset the budget amount left to original budget amount
    localStorage.setItem("budget"+curr_budget_index.toString(), JSON.stringify(curr_budget_json)); // update budget
    //delete the expenses associated with the budget
    for (var i=0; i < maximum_expense_counter; i++) {
        var curr_expense_text = localStorage.getItem("expense"+(i+1).toString());
        var curr_expense_json = JSON.parse(curr_expense_text);
        if (curr_expense_json && curr_expense_json.budget_name == curr_budget_json.name) {
            localStorage.removeItem("expense"+(i+1).toString());
            expense_counter--;
            localStorage.setItem("expense_counter", expense_counter);
        }
    }
    location.reload();
}