let form_account = document.getElementById("account-form");
let contador_usuarios = localStorage.getItem("contador_usuarios");
let user_profile = document.getElementById("user-profile-picture");
let new_file = document.getElementById("userpicture");
let reader = new FileReader();

/* Mostrar los valores actuales */
setInterval(function() {
    document.form.username.value = localStorage.getItem("username_"+user_actual.toString());
    document.form.pswd.value = localStorage.getItem("password_"+user_actual.toString());
    document.form.name.value = localStorage.getItem("name_"+user_actual.toString());
    document.form.surname1.value = localStorage.getItem("surname1_"+user_actual.toString());
    document.form.surname2.value = localStorage.getItem("surname2_"+user_actual.toString());
    document.form.useremail.value = localStorage.getItem("email_"+user_actual.toString());
    document.form.birthdate.value = localStorage.getItem("birthdate_"+user_actual.toString());
    user_profile.src = localStorage.getItem("userpicture_"+user_actual.toString());
}, 1);

/* Cambiar la foto de perfil si el usuario selecciona una nueva */
new_file.addEventListener("change", function(e) {
    foto_seleccionada = e.currentTarget.files.length;
    if (foto_seleccionada != 0) {
        reader.addEventListener("load", function(e) {
            localStorage.setItem("userpicture_"+user_actual.toString(), e.target.result);
        });
        reader.readAsDataURL(new_file.files[0]);
    }
});

/* Verificar los cambios y guardarlos si son correctos */
form_account.addEventListener("submit", function(e) {
    e.preventDefault();
    // asegurarse de que los nuevos valores que intenta guardar el usuario son correctos
    new_password = document.getElementById("pswd").value;
    new_email = document.getElementById("useremail").value;
    // guardar el resto de inputs
    new_user_name = document.getElementById("username").value;
    new_name = document.getElementById("name").value;
    new_surname1 = document.getElementById("surname1").value;
    new_surname2 = document.getElementById("surname2").value;
    new_birthdate = document.getElementById("birthdate").value;
    try {
        if (checkPassword(new_password) && checkEmail(new_email)) {
            localStorage.setItem("username_"+user_actual.toString(), new_user_name);
            localStorage.setItem("password_"+user_actual.toString(), new_password);
            localStorage.setItem("name_"+user_actual.toString(), new_name);
            localStorage.setItem("surname1_"+user_actual.toString(), new_surname1);
            localStorage.setItem("surname2_"+user_actual.toString(), new_surname2);
            localStorage.setItem("email_"+user_actual.toString(), new_email);
            localStorage.setItem("birthdate_"+user_actual.toString(), new_birthdate);
            alert("Los cambios han sido guardados");
        }
    } catch (error) {
        e.preventDefault();
    }
});

function checkPassword(password) {
    var pattern = /[0-9a-z]{8,}/;
    if (pattern.test(password)) {
        return true;
    } else {
        if(password.length < 8) {
            alert("Introduca una contraseña con un mínimo de 8 caracteres");
        } else {
            alert("Introduzca una contraseña con las letras a-z y los números 0-9");
        }
    }
}

function checkEmail(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)){
        return true;
    } else {
        alert("Introduca una email con el formato nombre@dominio.extensión");
    }
}