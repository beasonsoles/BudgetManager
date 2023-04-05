let titulos_base_datos = ["Moscow mule", "Demasiadas mujeres", "Bohemian rhapsody", "Waiting for love", "Sucker for pain", 
"More than you know", "Kitt y los coches del pasado", "Boulevard of broken dreams", "Viva la vida", "Lagrimas de amor"];
let foto_seleccionada = 0; 
let cancion_buscada = document.getElementById("cancion_playlist");
let boton_anadir = document.getElementById("boton_anadir_cancion");
let image = document.getElementById("subir_foto");
let form = document.getElementById("crear_playlist");
let text1 = document.getElementById("confirmacion1");
let text2 = document.getElementById("confirmacion2");
let reader_playlist = new FileReader();
if ((contador_playlists = localStorage.getItem("contador_playlists")) == undefined) {
    contador_playlists = 0;
}

//JSON que guarda el nombre de la playlist y las canciones que contiene 
let playlist_json = {
    "nombre_playlist": "",
    "foto_playlist": "",
    "canciones_playlist": []
}

/* Funciones para resetear los mensajes para el usuario */
function resetear_mensaje_foto() {
    text1.classList.remove("mostrar");
    text1.classList.add("texto1");
}

function resetear_mensaje_musica() {
    text2.classList.remove("mostrar");
    text2.classList.add("texto2");
}

/* Mostrar un mensaje cuando el usuario sube una foto para la playlist */
image.addEventListener("change", function(e) {
    resetear_mensaje_foto();
    foto_seleccionada = e.currentTarget.files.length;
    if (foto_seleccionada != 0) {
        text1.classList.toggle("mostrar");
        reader_playlist.addEventListener("load", function(e) {
            playlist_json.foto_playlist = e.target.result;
            //localStorage.setItem("playlistpicture_"+(parseInt(contador_playlists)+1).toString(), e.target.result);
        });
        reader_playlist.readAsDataURL(image.files[0]);
    }
});

cancion_buscada.addEventListener("click", function(e) {
    resetear_mensaje_musica();
});

/* Para asegurarse de que la cancion que se intenta añadir existe y no está ya en la playlist */
boton_anadir.addEventListener("click", function(e) {
    e.preventDefault();
    var text2 = document.getElementById("confirmacion2");
    for (var i=0; i < titulos_base_datos.length; i++) {
        // si la canción existe... 
        var titulo_cancion_buscada = capitalizeFirstLetter(cancion_buscada.value);
        if (titulo_cancion_buscada == titulos_base_datos[i]) {
            var canciones = playlist_json.canciones_playlist;
            for (var i = 0; i < canciones.length; i++) {
                if (canciones[i] == titulo_cancion_buscada) {
                    alert("La canción '"+titulo_cancion_buscada+"' ya está en la playlist");
                    return;
                }
            }
            // ...y no está ya en la playlist, añadir la canción a la playlist 
            playlist_json.canciones_playlist.push(titulo_cancion_buscada);            
            // mostar un mensaje al usuario indicando que se ha añadido
            text2.classList.toggle("mostrar");
            cancion_buscada.value = "";
            return;
        }
    }
    alert("Lo sentimos. Esa cancion no está en nuestra base de datos");
});

/* Para prevenir que el usuario guarde la playlist si no pulsa guardar*/
form.addEventListener("keydown", function(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
    }
});

/* Guardar la playlist creada */
form.addEventListener("submit", function(e) {
    e.preventDefault();
    var nombre_playlist = document.getElementById("nombre").value;
    // evitar que la misma playlist se cree dos veces
    for (var i = 1; i <= contador_playlists; i++) { 
        var playlist_text = localStorage.getItem("playlist"+i.toString());
        var playlist = JSON.parse(playlist_text);
        if (playlist != undefined && playlist.nombre_playlist == nombre_playlist) {
            alert("Ya existe una playlist con el nombre "+nombre_playlist);
            return;
        }
    }
    if (foto_seleccionada == 0) {
        alert("No has añadido una foto para la playlist");
        return;
    }
    contador_playlists++;
    localStorage.setItem("contador_playlists", contador_playlists);
    playlist_json.nombre_playlist = nombre_playlist;
    var json_text = JSON.stringify(playlist_json);
    localStorage.setItem("playlist"+contador_playlists.toString(), json_text);
    alert("¡Tu playlist ha sido creada! Accede a la biblioteca para verla");
    resetear_mensaje_foto();
    resetear_mensaje_musica();
    nombre_playlist = "";
});