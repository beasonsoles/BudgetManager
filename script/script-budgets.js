let budget_counter = localStorage.getItem("budget_counter");
/* Para crear una playlist */
function add_playlist(foto_playlist_anadida, expense_name_anadida) {
    // crear los elementos de la canción
    playlist = document.createElement("div");
    foto = document.createElement("img");
    descripcion = document.createElement("div");
    name = document.createElement("h3");
    // añadir clases a cada uno de los elementos
    playlist.classList.add("playlist");
    foto.classList.add("musica");
    descripcion.classList.add("descripcion");
    name.classList.add("expense-amount");
    // crear la estructura usando appendChild
    document.getElementById("tus_playlists").appendChild(playlist);
    playlist.appendChild(foto);
    playlist.appendChild(descripcion);
    descripcion.appendChild(name);
    // dar valor a los elementos
    foto.src = foto_playlist_anadida;
    name.innerHTML = expense-amount_anadida;
}

/* Para show las playlists que hayan sido creadas por el usuario */
for (let i = 1; i <= budget_counter; i++) {
    var playlist_text = localStorage.getItem("playlist"+i.toString());
    var playlist_json = JSON.parse(playlist_text);
    var expense_name_anadida = playlist_json.expense-amount;
    var foto_playlist_anadida = playlist_json.foto_playlist;
    if (expense-amount_anadida != "" && foto_playlist_anadida != "") {
        add_playlist(foto_playlist_anadida, expense-amount_anadida);
    }
}
    

let listas_de_reproduccion = document.querySelectorAll(".playlist");

/* Para show las canciones dentro de una playlist */
listas_de_reproduccion.forEach(function(lista) {
    lista.addEventListener("click", function() {
        // para localizar la playlist de la que el usuario quiere ver los contents
        localStorage.setItem("playlist_actual", lista.lastChild.firstChild.innerHTML);
        window.open("playlist.html", "_self");
    });
});

setInterval(() => {
    document.getElementById("main-container").style.height = window.innerHeight;
}, 1);