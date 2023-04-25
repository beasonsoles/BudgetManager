let switch_theme = document.getElementById("switch-dark-mode");
let header = document.getElementById("header");
let my_expenses = document.querySelectorAll(".expense, #create-expense");
let budget_brand_name = document.getElementById("budget-brand-name");
let texts = document.querySelectorAll(".subtitle, .subtitles, #title, #slogan, #create-budget-text, #expense-title, #budget-title, #dollars, .info, .budget-name, .category-budgets, #create-expense-text, .name, .reset-period, #budget-name, #budget-amount-container, #budget-amount-left-container, #budget-category-container, #budget-reset-period-container, #your-expenses-title, .home-expenses");
let menu = document.getElementById("menu-container");
let contents_menu = document.querySelectorAll("#home, #budgets, #create, #settings, #paypal");
let images_menu = document.querySelectorAll("#home-icon, #budgets-icon, #create-icon, #settings-icon, #create-budget-image, .view-budget-img, .edit-budget-img, .delete-budget-img, #create-expense-image, .edit-expense-img, .delete-expense-img");
let main = document.getElementById("main-container");
let sliding_button = document.getElementsByClassName("sliding-button")[0];
let sliding_circle = document.getElementById("circle");


switch_theme.addEventListener("change", function (e) {
    if (e.target.checked) {
        var theme = "light";
    } else {
        var theme = "dark";
    }
    localStorage.setItem("theme", theme);
});

setInterval(function() {
    var curr_theme = localStorage.getItem("theme");
    // change switch button offset depending on the window size
    var x = 0;
    if (481 < window.innerWidth && window.innerWidth < 900) { x = 19;} // tablet
    else if (window.innerWidth < 480) { x = 12;} // smartphone
    else { x = 20;} // laptop
    if (curr_theme == "light") {
        // change website's colors to dark colors
        document.body.style.backgroundColor = "rgb(224, 224, 224)";
        budget_brand_name.style.color = "black";
        header.style.background = "rgb(117, 117, 117)";
        texts.forEach(function (text) {text.style.color = "black";});
        main.style.background = "rgb(224, 224, 224)";
        menu.style.background = "rgb(189, 189, 189)";
        contents_menu.forEach(function(option) {option.style.color = "black";});
        images_menu.forEach(function(image) {image.style.filter = "invert(0%)";});
        if ((data_container = document.getElementById("data-container")) != undefined) {
            data_container.style.background = "rgb(150, 150, 150)";
        }
        if ((new_expense = document.getElementById("new-expense")) != undefined) {
            new_expense.style.background = "rgb(150, 150, 150)";
        }
        if ((new_budget = document.getElementById("new-budget")) != undefined) {
            new_budget.style.background = "rgb(150, 150, 150)";
        }
        if (my_expenses) {
            my_expenses.forEach(function(expense) {
                expense.style.backgroundColor = "rgb(117, 117, 117)";
            });
        }
        if ((footer = document.getElementById("footer")) != undefined) {
            footer.style.backgroundColor = "rgb(117, 117, 117)";
        }
        // change switch state to off
        if (sliding_button != null && sliding_circle != null) {
            sliding_button.style.background = "rgb(78, 218, 39)";
            sliding_circle.style.background = "black";
            sliding_circle.style.transform = "translateX("+x.toString()+"px)";
        }
    } else {
        // change website's colors to light colors
        document.body.style.backgroundColor = "rgb(43, 43, 43)";
        budget_brand_name.style.color = "white";
        header.style.background = "black";
        texts.forEach(function (text) {text.style.color = "white";});
        main.style.background = "rgb(43, 43, 43)";
        menu.style.background = "rgb(28, 27, 27)";
        contents_menu.forEach(function(option) {option.style.color = "white";});
        images_menu.forEach(function(image) {image.style.filter = "invert(100%)";});
        if ((data_container = document.getElementById("data-container")) != undefined) {
            data_container.style.background = "black";
        }
        if ((new_expense = document.getElementById("new-expense")) != undefined) {
            new_expense.style.background = "black";
        }
        if ((new_budget = document.getElementById("new-budget")) != undefined) {
            new_budget.style.background = "black";
        }
        if (my_expenses) {
            my_expenses.forEach(function(expense) {
                expense.style.backgroundColor = "rgb(31, 31, 31)";
            });
        }
        if ((footer = document.getElementById("footer")) != undefined) {
            footer.style.backgroundColor = "black";
        }
        // change switch state to on
        if (sliding_button != null && sliding_circle != null) {
            sliding_button.style.background = "rgb(134, 140, 133)";
            sliding_circle.style.background = "white";
            sliding_circle.style.transform = "translateX(0px)";
        }
    }
}, 1);
