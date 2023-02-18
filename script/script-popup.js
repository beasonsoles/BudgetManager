let profile_picture = document.getElementById("profile-picture");
let log_out = document.getElementById("log-out-text");
let account = document.getElementById("account-text");
let profile = document.getElementById("profile-text");
let current_user = localStorage.getItem("current_user");



/* Update profile picture when user changes it */
setInterval(function() {
    profile_picture.src = localStorage.getItem("userpicture_"+current_user.toString());
}, 1);

/* Show the pop-up when the user clicks on the profile picture */
profile_picture.addEventListener("click", function() {
    var popup = document.getElementById("popup_perfil");
    var popup_contents = document.querySelectorAll("#account-text, #profile-text, #log-out-text");
    popup.classList.toggle("show");
    popup_contents.forEach((option) => {
        option.classList.toggle("show");
    });
});

log_out.addEventListener("click", function() {
    var response = confirm("Are you sure you want to log out?");
    if (response) {
        window.open("index.html", "_self");
    }
});

account.addEventListener("click", function() {
    window.open("account.html", "_self");
});

profile.addEventListener("click", function() {
    window.open("profile.html", "_self");
});