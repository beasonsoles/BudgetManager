let interruptor = document.getElementById("interruptor-modo-oscuro");
var header = document.getElementById("header");
var budget_brand_name = document.getElementById("budget-brand-name");
var texts = document.querySelectorAll(".subtitulo, .autor, .titulo, .nombre-playlist, .nombre-usuario, .subtitulos");
var menu = document.getElementById("menu-container");
var menu_contents = document.querySelectorAll("#home, #library, #create, #favorito, #settings");
var menu_images = document.querySelectorAll("#home-icono, #library-icono, #create-icono, #favorito-icono, #settings-icono");
var main = document.getElementById("main-container");
let boton_deslizante = document.getElementsByClassName("boton-deslizante")[0];
let circulo_deslizante = document.getElementById("circulo");


interruptor.addEventListener("change", function (e) {
    if (e.target.checked) {
        var tema = "claro";
    } else {
        var tema = "oscuro";
    }
    localStorage.setItem("tema", tema);
});

setInterval(function() {
    var tema_actual = localStorage.getItem("tema");
    // cambiar offset del botón del interruptor según el tamaño de la ventana
    var x = 0;
    if (481 < window.innerWidth && window.innerWidth < 900) { x = 19;} // tablet
    else if (window.innerWidth < 480) { x = 12;} // móvil
    else { x = 20;} // ordenador
    if (tema_actual == "claro") {
        // cambiar colores de la página
        document.body.style.backgroundColor = "rgb(224, 224, 224)";
        budget_brand_name.style.color = "black";
        header.style.background = "rgb(117, 117, 117)";
        texts.forEach(function (text) {text.style.color = "black";});
        main.style.background = "rgb(224, 224, 224)";
        menu.style.background = "rgb(189, 189, 189)";
        menu_contents.forEach(function(option) {option.style.color = "black";});
        menu_images.forEach(function(image) {image.style.filter = "invert(0%)";});
        privacidad.style.color = "black";
        privacidad.style.fontWeight = "bold";
        cookies.style.color = "black";
        cookies.style.fontWeight = "bold";
        if ((container_datos = document.getElementById("container-datos")) != undefined) {
            container_datos.style.background = "rgb(150, 150, 150)";
        }
        if ((create_playlist = document.getElementById("create-playlist")) != undefined) {
            create_playlist.style.background = "rgb(150, 150, 150)";
        }
        if ((confirmacion1 = document.getElementById("confirmacion1")) != undefined) {
            confirmacion1.style.color = "black";
        }
        if ((confirmacion2 = document.getElementById("confirmacion2")) != undefined) {
            confirmacion2.style.color = "black";
        }
        if ((footer = document.getElementById("footer")) != undefined) {
            footer.style.backgroundColor = "rgb(117, 117, 117)";
        }
        // cambiar el estado del interruptor
        if (boton_deslizante != null && circulo_deslizante != null) {
            boton_deslizante.style.background = "rgb(78, 218, 39)";
            circulo_deslizante.style.background = "black";
            circulo_deslizante.style.transform = "translateX("+x.toString()+"px)";
        }
    } else {
        // cambiar colores de la página
        document.body.style.backgroundColor = "rgb(43, 43, 43)";
        budget_brand_name.style.color = "white";
        header.style.background = "black";
        texts.forEach(function (text) {text.style.color = "white";});
        main.style.background = "rgb(43, 43, 43)";
        menu.style.background = "rgb(28, 27, 27)";
        menu_contents.forEach(function(option) {option.style.color = "white";});
        menu_images.forEach(function(image) {image.style.filter = "invert(100%)";});
        privacidad.style.color = "white";
        cookies.style.color = "white";
        if ((container_datos = document.getElementById("container-datos")) != undefined) {
            container.style.background = "black";
        }
        if ((create_playlist = document.getElementById("create-playlist")) != undefined) {
            create_playlist.style.background = "black";
        }
        if ((confirmacion1 = document.getElementById("confirmacion1")) != undefined) {
            confirmacion1.style.color = "rgb(118, 218, 118)";
        }
        if ((confirmacion2 = document.getElementById("confirmacion2")) != undefined) {
            confirmacion2.style.color = "rgb(118, 218, 118)";
        }
        if ((footer = document.getElementById("footer")) != undefined) {
            footer.style.backgroundColor = "black";
        }
        // cambiar el estado del interruptor
        if (boton_deslizante != null && circulo_deslizante != null) {
            boton_deslizante.style.background = "rgb(134, 140, 133)";
            circulo_deslizante.style.background = "white";
            circulo_deslizante.style.transform = "translateX(0px)";
        }
    }
}, 1);
