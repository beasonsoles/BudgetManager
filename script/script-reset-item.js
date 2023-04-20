if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}
if ((maximum_expense_counter = localStorage.getItem("maximum_expense_counter")) == undefined) {
    maximum_expense_counter = 0;
}
let today = new Date().toISOString().slice(0, 10);
/* Reset the budget when the reset period is over*/
for (var i = 0; i < maximum_budget_counter; i++) {
    var curr_budget_text = localStorage.getItem("budget"+(i+1).toString());
    var curr_budget_json = JSON.parse(curr_budget_text);
    var diff = Math.abs(new Date(today) - new Date(curr_budget_json.last_reset));
    if (curr_budget_json) {
        switch(curr_budget_json.reset_period) {
            case "Daily":
                if (is_daily(diff)) {
                    break;
                }
                
            case "Weekly":
                if (is_weekly(diff)) {
                    break;
                }
            case "Monthly":
                if (is_monthly(diff)) {
                    break;
                }
            case "Quarterly":
                if (is_quarterly(diff)) {
                    break;
                }
            case "Yearly":
                if (is_yearly(diff)) {
                    break;
                }
            case "Custom Date":
                break;
            default: 
                break;
        }
    }
}
/* Reset the expense when the reset period is over*/ 


/* Check how long it's been since the creation date*/
function is_daily(diff) {
    var diff_in_days = diff/(1000 * 60 * 60 * 24);
    if(diff_in_days > 0) {
        return;
    }
}

function is_weekly(diff) {

}

function is_monthly(diff) {

}

function is_quarterly(diff) {

}

function is_yearly(diff) {

}