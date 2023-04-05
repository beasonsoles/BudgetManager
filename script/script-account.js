let form_account = document.getElementById("account-form");
let user_counter = localStorage.getItem("user_counter");
let user_profile = document.getElementById("user-profile-picture");
let new_file = document.getElementById("userpicture");
let reader = new FileReader();

/* Show current values */
setInterval(function() {
    document.form.pswd.value = localStorage.getItem("password_"+current_user.toString());
    document.form.name.value = localStorage.getItem("name_"+current_user.toString());
    document.form.surname.value = localStorage.getItem("surname_"+current_user.toString());
    document.form.useremail.value = localStorage.getItem("email_"+current_user.toString());
    if ((profile = localStorage.getItem("userpicture_"+current_user.toString())) != undefined) {
        user_profile.src = profile;
    } else {
        user_profile.src = "images/empty-profile.png";
    }
}, 1);

/* Change profile picture if the user selects a new one */
new_file.addEventListener("change", function(e) {
    selected_photo = e.currentTarget.files.length;
    if (selected_photo != 0) {
        reader.addEventListener("load", function(e) {
            localStorage.setItem("userpicture_"+current_user.toString(), e.target.result);
        });
        reader.readAsDataURL(new_file.files[0]);
    }
});

/* Verify changes and store them if they are correct */
form_account.addEventListener("submit", function(e) {
    e.preventDefault();
    // make sure that the new values are correct
    new_password = document.getElementById("pswd").value;
    new_email = document.getElementById("useremail").value;
    // save the rest of the inputs
    new_name = document.getElementById("name").value;
    new_surname = document.getElementById("surname").value;
    try {
        if (checkPassword(new_password) && checkEmail(new_email)) {
            localStorage.setItem("password_"+current_user.toString(), new_password);
            localStorage.setItem("name_"+current_user.toString(), new_name);
            localStorage.setItem("surname_"+current_user.toString(), new_surname);
            localStorage.setItem("email_"+current_user.toString(), new_email);
            alert("Your changes have been saved");
        }
    } catch (error) {
        e.preventDefault();
    }
});

function checkPassword(password) {
    var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!?@#$%^&*.+()]{8,}$/;
    if (pattern.test(password)) {
        return true;
    } else {
        one_number_pattern = /\d/;
        one_special_char_pattern = /\W/;
        if(password.length < 8) {
            alert("The password must be at least 8 characters long");
        } else if (!one_number_pattern.test(password)) { 
            alert("The password must contain at least one number");
        } else if (!one_special_char_pattern.test(password)) {
            alert("The password must contain at least one special character");
        } else {
            alert("The password cannot contain spaces or the special characters /:'<>|=ºª´`");
        }
    }
    return false;
}

function checkEmail(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)){
        return true;
    } else {
        alert("Enter an email with the format name@domain.extension");
    }
}