/* Display the budgets created within each category */
let budget_container = document.getElementById("your-budgets");
if ((budget_counter = localStorage.getItem("budget_counter")) == undefined) {
    budget_counter = 0;
}
let selected_category = localStorage.getItem("selected_category");
document.getElementsByClassName("category-budgets")[0].innerHTML = selected_category +" Budgets";


for (var i = 0; i < budget_counter; i++) {
    var budget_text = localStorage.getItem("budget"+(i+1).toString());
    var budget_json = JSON.parse(budget_text);
    if (budget_json.category == selected_category) {
        var budget_name = budget_json.name;
        var budget_amount = budget_json.amount;
        var budget_category = budget_json.category;
        var budget_reset_period = budget_json.reset_period;
        add_budget(budget_name, budget_amount, budget_reset_period);
    }
}

/* To create a budget */
function add_budget(budget_name, budget_amount, budget_reset_period) {
    // create the elements of the budget
    var budget = document.createElement("div");
    var name = document.createElement("h2");
    var amount = document.createElement("h2");
    var reset_period = document.createElement("h2");
    var n_line = document.createElement("br");
    // add classes to each of the new elements
    budget.classList.add("budget");
    name.classList.add("name");
    amount.classList.add("amount");
    reset_period.classList.add("reset-period");
    // create the structure by using appendChild
    budget_container.appendChild(budget);
    budget.appendChild(name);
    budget.appendChild(amount);
    budget.appendChild(reset_period);
    budget_container.appendChild(n_line);
    // give values to the elements
    name.innerHTML = budget_name;
    amount.innerHTML = "$"+budget_amount;
    reset_period.innerHTML = "Resets: "+budget_reset_period;
} 

let budgets_created = document.querySelectorAll(".budget");
/* To show the expenses associated to each budget */
budgets_created.forEach(function(budget) {
    budget.addEventListener("click", function() {
        // to keep track of which budget the user clicked on
        for (var j=0; j < budget_counter; j++) {
            var curr_budget_text = localStorage.getItem("budget"+(j+1).toString());
            var curr_budget_json = JSON.parse(curr_budget_text);
            var budget_created_name = budget.firstChild.innerHTML;
            var budget_created_amount = budget.firstChild.nextSibling.innerHTML;
            var budget_created_reset = budget.lastChild.innerHTML;
            if (budget_created_name == curr_budget_json.name && budget_created_amount == "$"+curr_budget_json.amount && budget_created_reset == "Resets: "+curr_budget_json.reset_period) {
                localStorage.setItem("current_budget", (j+1).toString());
                window.open("budget.html", "_self");
            }
        }
    });
});

/*
setInterval(() => {
    document.getElementById("main-container").style.height = window.innerHeight;
}, 1);*/