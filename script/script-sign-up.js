let form = document.getElementById("sign-up-form");
let facebook = document.getElementById("facebook-link");
let google = document.getElementById("google-link");
let log_in = document.getElementById("go-to-log-in");
let new_file = document.getElementById("userpicture");
let reader = new FileReader();
if ((contador_usuarios = localStorage.getItem("contador_usuarios")) == undefined) {
    contador_usuarios = 0;
}

facebook.addEventListener("click", function() {
    window.open("http://www.facebook.com", "_self");
});

google.addEventListener("click", function() {
    window.open("http://www.google.com", "_self");
});

log_in.addEventListener("click", function() {
    window.open("log-in-form.html", "_self");
});

new_file.addEventListener("change", function(e) {
    foto_seleccionada = e.currentTarget.files.length;
    if (foto_seleccionada != 0) {
        reader.addEventListener("load", function(e) {
            localStorage.setItem("userpicture_"+(parseInt(contador_usuarios)+1).toString(), e.target.result);
        });
        reader.readAsDataURL(new_file.files[0]);
    }
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    password = document.getElementById("pswd");
    email = document.getElementById("useremail");
    try {
        if (checkPassword(password.value) && checkEmail(email.value)) {
            for (var i = 0; i < contador_usuarios; i++) {
                if (localStorage.getItem("email_"+(i+1).toString()) == email.value) {
                    alert("Ya existe una account asociada a la account " + email.value);
                    return;
                }
            }
            contador_usuarios++;
            localStorage.setItem("contador_usuarios", contador_usuarios);
            localStorage.setItem("username_"+contador_usuarios.toString(), document.getElementById("username").value);
            localStorage.setItem("password_"+contador_usuarios.toString(), document.getElementById("pswd").value);
            localStorage.setItem("name_"+contador_usuarios.toString(), document.getElementById("name").value);
            localStorage.setItem("surname1_"+contador_usuarios.toString(), document.getElementById("surname1").value); 
            localStorage.setItem("surname2_"+contador_usuarios.toString(), document.getElementById("surname2").value); 
            localStorage.setItem("email_"+contador_usuarios.toString(), document.getElementById("useremail").value); 
            localStorage.setItem("birthdate_"+contador_usuarios.toString(), document.getElementById("birthdate").value);
            //localStorage.setItem("userpicture_"+contador_usuarios.toString(), document.getElementById("userpicture").files[0].name);
            window.open("log-in-form.html", "_self");
        }
    } catch (error) {
        e.preventDefault();
    }
});

function checkPassword(password) {
    var pattern = /[0-9a-zA-Z]{8,}/;
    if (pattern.test(password)) {
        return true;
    } else {
        if(password.length < 8) {
            alert("Introduca una contraseña con un mínimo de 8 caracteres");
        } else {
            alert("Introduzca una contraseña con las letras a-z y los números 0-9");
        }
    }
    return false;
}

function checkEmail(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)){
        return true;
    } else {
        alert("Introduca una email con el formato nombre@dominio.extensión");
    }
    return false;
}