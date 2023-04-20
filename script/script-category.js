let budget_container = document.getElementById("your-budgets");
if ((budget_counter = localStorage.getItem("budget_counter")) == undefined) {
    budget_counter = 0;
}
if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}
let selected_category = localStorage.getItem("selected_category");
document.getElementsByClassName("category-budgets")[0].innerHTML = selected_category +" Budgets";

/* To display the budgets created within each category */
for (var i = 0; i < maximum_budget_counter; i++) {
        var budget_text = localStorage.getItem("budget"+(i+1).toString());
        var budget_json = JSON.parse(budget_text);
        if (budget_json && budget_json.category == selected_category) {
            var budget_name = budget_json.name;
            var budget_amount = budget_json.amount;
            if (budget_json.reset_date != "") {
                var budget_reset_period = "Day "+budget_json.reset_date + " of each month";
            }
            else {
                var budget_reset_period = budget_json.reset_period;
            }
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
    var view_budget = document.createElement("div");
    var view_budget_img = document.createElement("img");
    var edit_budget = document.createElement("div");
    var edit_budget_img = document.createElement("img");
    var delete_budget = document.createElement("div");
    var delete_budget_img = document.createElement("img");
    var n_line = document.createElement("br");
    // add classes to each of the new elements
    budget.classList.add("budget");
    name.classList.add("name");
    amount.classList.add("amount");
    reset_period.classList.add("reset-period");
    view_budget.classList.add("view-budget");
    view_budget_img.classList.add("view-budget-img");
    edit_budget.classList.add("edit-budget");
    edit_budget_img.classList.add("edit-budget-img");
    delete_budget.classList.add("delete-budget");
    delete_budget_img.classList.add("delete-budget-img");
    // create the structure by using appendChild
    budget_container.appendChild(budget);
    budget.appendChild(view_budget);
    budget.appendChild(edit_budget);
    budget.appendChild(delete_budget);
    view_budget.appendChild(view_budget_img);
    edit_budget.appendChild(edit_budget_img);
    delete_budget.appendChild(delete_budget_img);
    budget.appendChild(name);
    budget.appendChild(amount);
    budget.appendChild(reset_period);
    budget_container.appendChild(n_line);
    // give values to the elements
    view_budget_img.src = "images/view.png";
    edit_budget_img.src = "images/edit.png";
    delete_budget_img.src = "images/delete.png";
    name.innerHTML = budget_name;
    amount.innerHTML = "$"+budget_amount;
    reset_period.innerHTML = "Resets: "+budget_reset_period;
} 

/* To redirect the user to the budget creation page*/
let create_budget_button = document.getElementById("create-budget-button");
create_budget_button.addEventListener("click", function() {
    window.open("new-budget.html", "_self");
});

/* To let the user view the budget */
let view_button_list = document.querySelectorAll(".view-budget");
view_button_list.forEach(function(view_button) {
    // change the image of the view button when user hovers over it
    view_button.addEventListener("mouseover", function() {
        view_button.firstChild.src = "images/view_full.png";
    });
    view_button.addEventListener("mouseout", function() {
        view_button.firstChild.src = "images/view.png";
    });
    // redirect the user to the budget viewion page 
    view_button.addEventListener("click", function() {
        var selected_budget = view_button.parentElement.lastChild.previousSibling.previousSibling.innerHTML;
        localStorage.setItem("selected_budget", selected_budget);
        window.open("budget.html", "_self");
    });
});

/* To let the user edit the budget */
let edit_button_list = document.querySelectorAll(".edit-budget");
edit_button_list.forEach(function(edit_button) {
    // change the image of the edit button when user hovers over it
    edit_button.addEventListener("mouseover", function() {
        edit_button.firstChild.src = "images/edit_full.png";
    });
    edit_button.addEventListener("mouseout", function() {
        edit_button.firstChild.src = "images/edit.png";
    });
    // redirect the user to the budget edition page 
    edit_button.addEventListener("click", function() {
        var selected_budget = edit_button.parentElement.lastChild.previousSibling.previousSibling.innerHTML;
        localStorage.setItem("selected_budget", selected_budget);
        window.open("edit-budget.html", "_self");
    });
});

/* To let the user delete the budget */
let delete_button_list = document.querySelectorAll(".delete-budget");
delete_button_list.forEach(function(delete_button) {
    // change the image of the delete button when user hovers over it
    delete_button.addEventListener("mouseover", function() {
        delete_button.firstChild.src = "images/delete_full.png";
    });
    delete_button.addEventListener("mouseout", function() {
        delete_button.firstChild.src = "images/delete.png";
    });
    // delete the budget
    delete_button.addEventListener("click", function() {
        var response = confirm("Are you sure you want to delete this budget?");
        if (response) {
            // get the budget the user clicked on
            var budget = delete_button.parentElement;
            // find the budget in local storage and delete it
            for (var i=0; i < maximum_budget_counter; i++) {
                var curr_budget_text = localStorage.getItem("budget"+(i+1).toString());
                var curr_budget_json = JSON.parse(curr_budget_text);
                if (curr_budget_json && budget.lastChild.previousSibling.previousSibling.innerHTML == curr_budget_json.name) {
                    localStorage.removeItem("budget"+(i+1).toString());
                    budget_counter--;
                    localStorage.setItem("budget_counter", budget_counter);
                    budget.remove();
                }
            }
        }
    });
});

