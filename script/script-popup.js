let foto_perfil = document.getElementById("foto-perfil");
let cerrar_sesion = document.getElementById("cerrar-sesion-text");
let account = document.getElementById("account-text");
let perfil = document.getElementById("perfil-text");
let user_actual = localStorage.getItem("user_actual");



/* Para actualizar la foto de perfil si el usario la cambia */
setInterval(function() {
    foto_perfil.src = localStorage.getItem("userpicture_"+user_actual.toString());
}, 1);

/* Para mostrar el popup cuando el usuario clica en la foto de perfil */
foto_perfil.addEventListener("click", function() {
    var popup = document.getElementById("popup_perfil");
    var contenidos_popup = document.querySelectorAll("#account-text, #perfil-text, #cerrar-sesion-text");
    popup.classList.toggle("mostrar");
    contenidos_popup.forEach((opcion) => {
        opcion.classList.toggle("mostrar");
    });
});

cerrar_sesion.addEventListener("click", function() {
    var response = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (response) {
        window.open("index.html", "_self");
    }
});

account.addEventListener("click", function() {
    window.open("account.html", "_self");
});

perfil.addEventListener("click", function() {
    window.open("perfil.html", "_self");
});