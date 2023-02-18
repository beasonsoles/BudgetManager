let searchbar = document.querySelectorAll("#searchbar");
/*let titulos = ["Moscow mule", "Demasiadas mujeres", "Bohemian rhapsody", "Waiting for love", "Sucker for pain", 
"More than you know", "Kitt y los coches del pasado", "Boulevard of broken dreams", "Viva la vida", "Lagrimas de amor"];*/

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

searchbar.forEach(function(search) {
    search.addEventListener("keyup", function(event) {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            var search_value = capitalizeFirstLetter(search.value);
            for (var i=0; i < titulos.length; i++) {
                if (search_value == titulos[i]) {
                    localStorage.setItem("search_value", search_value);
                    //window.open("resultados.html", "_self");
                    return;
                }
            }
            alert("Sorry...");
        }
    });
});