let form = document.getElementById("sign-up-form");
let facebook = document.getElementById("facebook-link");
let google = document.getElementById("google-link");
let log_in = document.getElementById("go-to-log-in");
if ((user_counter = localStorage.getItem("user_counter")) == undefined) {
    user_counter = 0;
}

facebook.addEventListener("click", function() {
    window.open("http://www.facebook.com");
});

google.addEventListener("click", function() {
    window.open("http://www.google.com");
});

log_in.addEventListener("click", function() {
    window.open("log-in-form.html", "_self");
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    password = document.getElementById("pswd");
    email = document.getElementById("useremail");
    try {
        if (checkPassword(password.value) && checkEmail(email.value)) {
            for (var i = 0; i < user_counter; i++) {
                if (localStorage.getItem("email_"+(i+1).toString()) == email.value) {
                    alert("There is already an account associated to " + email.value);
                    return;
                }
            }
            user_counter++;
            localStorage.setItem("user_counter", user_counter);
            localStorage.setItem("password_"+user_counter.toString(), document.getElementById("pswd").value);
            localStorage.setItem("name_"+user_counter.toString(), document.getElementById("name").value);
            localStorage.setItem("surname_"+user_counter.toString(), document.getElementById("surname").value); 
            localStorage.setItem("email_"+user_counter.toString(), document.getElementById("useremail").value); 
            alert("Thanks for joining Budget Buddy!\nClick OK to be redirected to the log in page");
            window.open("log-in-form.html", "_self");
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
    return false;
}