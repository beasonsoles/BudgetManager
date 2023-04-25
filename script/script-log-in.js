let form = document.getElementById("log-in-form");
let facebook = document.getElementById("facebook-link");
let google = document.getElementById("google-link");
let sign_up = document.getElementById("go-to-sign-up");
let user_counter = localStorage.getItem("user_counter");
let current_user = 0;

facebook.addEventListener("click", function() {
    window.open("http://www.facebook.com");
});

google.addEventListener("click", function() {
    window.open("http://www.google.com");
});

sign_up.addEventListener("click", function() {
    window.open("sign-up-form.html");
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    var email = document.getElementById("useremail");
    var password = document.getElementById("pswd");
    var email_found = false;
    var password_found = false;

    for (var i = 0; i < user_counter; i++) {
        if (localStorage.getItem("email_"+(i+1).toString()) == email.value) {
            email_found = true;
            current_user = i+1;
        }
    }

    for (var i = 0; i < user_counter; i++) {
        if (localStorage.getItem("password_"+(i+1).toString()) == password.value) {
            password_found = true;
        }
    }

    if (!email_found) {
        alert("The email " + email.value + " is not registered");
        return;
    }

    if (!password_found) {
        alert("The entered password is incorrect");
        return;
    }
    
    if (email_found && password_found) {
        localStorage.setItem("current_user", current_user);
        window.open("home.html", "_self");
    }
});
