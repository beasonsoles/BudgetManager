/* Redirect the user depending on the option chosen from the menu */
let home = document.getElementById("option1");
let biblioteca = document.getElementById("option2");
let crear_playlist = document.getElementById("option3");
let favoritos = document.getElementById("option4");
let ajustes = document.getElementById("option5");

home.addEventListener("click", function() {
    window.open("home.html", "_self");
});

biblioteca.addEventListener("click", function() {
    window.open("biblioteca.html", "_self");
});

crear_playlist.addEventListener("click", function() {
    window.open("crear_playlist.html", "_self");
});

favoritos.addEventListener("click", function() {
    window.open("favoritos.html", "_self");
});

ajustes.addEventListener("click", function() {
    var popup = document.getElementById("change_theme");
    popup.classList.toggle("show_popup_theme");
});
