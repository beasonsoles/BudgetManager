let form = document.getElementById("log-in-form");
let facebook = document.getElementById("facebook-link");
let google = document.getElementById("google-link");
let sign_up = document.getElementById("go-to-sign-up");
let contador_usuarios = localStorage.getItem("contador_usuarios");
let user_actual = 0;

facebook.addEventListener("click", function() {
    window.open("http://www.facebook.com", "_self");
});

google.addEventListener("click", function() {
    window.open("http://www.google.com", "_self");
});

sign_up.addEventListener("click", function() {
    window.open("sign-up-form.html");
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    var email = document.getElementById("useremail");
    var password = document.getElementById("pswd");
    var username = document.getElementById("username");
    var email_found = false;
    var password_found = false;
    var username_found = false;

    for (var i = 0; i < contador_usuarios; i++) {
        if (localStorage.getItem("email_"+(i+1).toString()) == email.value) {
            email_found = true;
            user_actual = i+1;
        }
    }

    for (var i = 0; i < contador_usuarios; i++) {
        if (localStorage.getItem("password_"+(i+1).toString()) == password.value) {
            password_found = true;
        }
    }

    for (var i = 0; i < contador_usuarios; i++) {
        if (localStorage.getItem("username_"+(i+1).toString()) == username.value) {
            username_found = true;
        }
    }

    if (!email_found) {
        alert("El email " + email.value + " no está dado de alta");
        return;
    } 
    
    if (!username_found) {
        alert("Nombre de usuario no encontrado");
        return;
    }

    if (!password_found) {
        alert("Contraseña incorrecta");
        return;
    }
    
    if (email_found && password_found && username_found) {
        localStorage.setItem("user_actual", user_actual);
        window.open("sesion-iniciada.html", "_self");
    }
});
