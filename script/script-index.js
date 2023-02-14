/* Para avisar al usuario que debe sign-in sesión para acceder a las funciones del menu */
let sign_up = document.getElementById("sign-up");
let log_in = document.getElementById("sign-in");
let home = document.getElementById("opcion1");
let library = document.getElementById("opcion2");
let playlist = document.getElementById("opcion3");
let favoritos = document.getElementById("opcion4");
let settings = document.getElementById("opcion5");
let anuncio = document.getElementById("go-to-sign-up");

sign_up.addEventListener("click", function() {
    window.open("sign-up-form.html", "_self");
})

log_in.addEventListener("click", function() {
    window.open("log-in-form.html", "_self");
});

home.addEventListener("click", function() {
    window.open("index.html", "_self");  //pulsar en home mantiene al usuario en la página principal
});

library.addEventListener("click", function() {
    alert("Inicia sesión o regístrate para acceder a tus playlists");
});

playlist.addEventListener("click", function() {
    alert("Inicia sesión o regístrate para poder create playlists");
});

favoritos.addEventListener("click", function() {
    alert("Inicia sesión o regístrate para acceder a tus favoritos");
});

settings.addEventListener("click", function() {
  alert("Inicia sesión o regístrate para acceder a los settings");
});

anuncio.addEventListener("click", function() {
    window.open("sign-up-form.html", "_self");
})

/* Para create la account atrás de cada una de las canciones */

// account atrás termina el 7 de septiembre a las 23:59:00
var fechaaccountAtras = new Date("Nov 7, 2023 23:59:00").getTime(); 

// account atrás se actualiza cada segundo
var accountAtras = setInterval(actualizaraccountAtras, 1000); 
    
function actualizaraccountAtras() {
    var hoy = new Date().getTime();
    var longitud = fechaaccountAtras - hoy;

    // calcular los días, las horas, los minutos y los segundos que quedan hasta el 7 de septiembre
    var dias = Math.floor(longitud / (1000 * 60 * 60 * 24));
    var horas = Math.floor((longitud % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutos = Math.floor((longitud % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((longitud % (1000 * 60)) / 1000);
      
    var contadores = document.getElementsByClassName("contador");
    for (var i = 0; i < contadores.length; ++i) {
        contadores[i].innerHTML = dias + "d " + horas + "h " + minutos + "m " + segundos + "s";
    }

    if (longitud < 0) { 
        clearInterval(accountAtras);
        document.getElementById("contador").innerHTML = "¡Nuevo lanzamiento!";
    }
}