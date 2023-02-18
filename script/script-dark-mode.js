let switch_theme = document.getElementById("switch-dark-mode");
let header = document.getElementById("header");
let budget_brand_name = document.getElementById("budget-brand-name");
let texts = document.querySelectorAll(".subtitle, .subtitles");
let menu = document.getElementById("menu-container");
let contents_menu = document.querySelectorAll("#home, #library, #create, #favorito, #settings");
let images_menu = document.querySelectorAll("#home-icon, #library-icon, #create-icon, #favorito-icon, #settings-icon");
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
    var theme_actual = localStorage.getItem("theme");
    // change switch button offset depending on the window size
    var x = 0;
    if (481 < window.innerWidth && window.innerWidth < 900) { x = 19;} // tablet
    else if (window.innerWidth < 480) { x = 12;} // smartphone
    else { x = 20;} // laptop
    if (theme_actual == "light") {
        // change website's colors
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
        if ((create_playlist = document.getElementById("create-playlist")) != undefined) {
            create_playlist.style.background = "rgb(150, 150, 150)";
        }
        if ((confirmation1 = document.getElementById("confirmation1")) != undefined) {
            confirmation1.style.color = "black";
        }
        if ((confirmation2 = document.getElementById("confirmation2")) != undefined) {
            confirmation2.style.color = "black";
        }
        if ((footer = document.getElementById("footer")) != undefined) {
            footer.style.backgroundColor = "rgb(117, 117, 117)";
        }
        // change switch state
        if (sliding_button != null && sliding_circle != null) {
            sliding_button.style.background = "rgb(78, 218, 39)";
            sliding_circle.style.background = "black";
            sliding_circle.style.transform = "translateX("+x.toString()+"px)";
        }
    } else {
        // change colores de la página
        document.body.style.backgroundColor = "rgb(43, 43, 43)";
        budget_brand_name.style.color = "white";
        header.style.background = "black";
        texts.forEach(function (text) {text.style.color = "white";});
        main.style.background = "rgb(43, 43, 43)";
        menu.style.background = "rgb(28, 27, 27)";
        contents_menu.forEach(function(option) {option.style.color = "white";});
        images_menu.forEach(function(image) {image.style.filter = "invert(100%)";});
        if ((data_container = document.getElementById("data-container")) != undefined) {
            container.style.background = "black";
        }
        if ((create_playlist = document.getElementById("create-playlist")) != undefined) {
            create_playlist.style.background = "black";
        }
        if ((confirmation1 = document.getElementById("confirmation1")) != undefined) {
            confirmation1.style.color = "rgb(118, 218, 118)";
        }
        if ((confirmation2 = document.getElementById("confirmation2")) != undefined) {
            confirmation2.style.color = "rgb(118, 218, 118)";
        }
        if ((footer = document.getElementById("footer")) != undefined) {
            footer.style.backgroundColor = "black";
        }
        // change el estado del switch
        if (sliding_button != null && sliding_circle != null) {
            sliding_button.style.background = "rgb(134, 140, 133)";
            sliding_circle.style.background = "white";
            sliding_circle.style.transform = "translateX(0px)";
        }
    }
}, 1);
