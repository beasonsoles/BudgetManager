let budget_categories = document.querySelectorAll("[id$=budget]");

budget_categories.forEach(function (category) {
    category.addEventListener("click", function(){
        // to keep track of which category the user clicked on
        localStorage.setItem("selected_category", category.getElementsByClassName("budget-name")[0].innerHTML);
        window.open("category.html", "_self");
    });
});