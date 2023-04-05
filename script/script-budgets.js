let contador_playlists = localStorage.getItem("contador_playlists");
/* Para crear una playlist */
function add_playlist(foto_playlist_anadida, nombre_playlist_anadida) {
    // crear los elementos de la canción
    playlist = document.createElement("div");
    foto = document.createElement("img");
    descripcion = document.createElement("div");
    nombre = document.createElement("h3");
    // añadir clases a cada uno de los elementos
    playlist.classList.add("playlist");
    foto.classList.add("musica");
    descripcion.classList.add("descripcion");
    nombre.classList.add("nombre_playlist");
    // crear la estructura usando appendChild
    document.getElementById("tus_playlists").appendChild(playlist);
    playlist.appendChild(foto);
    playlist.appendChild(descripcion);
    descripcion.appendChild(nombre);
    // dar valor a los elementos
    foto.src = foto_playlist_anadida;
    nombre.innerHTML = nombre_playlist_anadida;
}

/* Para mostrar las playlists que hayan sido creadas por el usuario */
for (let i = 1; i <= contador_playlists; i++) {
    var playlist_text = localStorage.getItem("playlist"+i.toString());
    var playlist_json = JSON.parse(playlist_text);
    var nombre_playlist_anadida = playlist_json.nombre_playlist;
    var foto_playlist_anadida = playlist_json.foto_playlist;
    if (nombre_playlist_anadida != "" && foto_playlist_anadida != "") {
        add_playlist(foto_playlist_anadida, nombre_playlist_anadida);
    }
}
    

let listas_de_reproduccion = document.querySelectorAll(".playlist");

/* Para mostrar las canciones dentro de una playlist */
listas_de_reproduccion.forEach(function(lista) {
    lista.addEventListener("click", function() {
        // para localizar la playlist de la que el usuario quiere ver los contenidos
        localStorage.setItem("playlist_actual", lista.lastChild.firstChild.innerHTML);
        window.open("playlist.html", "_self");
    });
});

setInterval(() => {
    document.getElementById("main_container").style.height = window.innerHeight;
}, 1);