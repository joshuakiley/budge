// TOGGLE SCREEN FUNCTIONS
const showLogin = () => {
    document.getElementById("home-window").style.display = "none";
    document.getElementById("login-window").style.display = "block";
}

const showHome = () => {
    document.getElementById("login-window").style.display = "none";
    document.getElementById("home-window").style.display = "block";
}

// SHOW BUTTONS
document.getElementById("home-window").style.display = "block";
document.getElementById("login-to-home").addEventListener("click", showHome);

// TOGGLE SCREEN
document.getElementById("new-account-btn").style.display = "block";
document.getElementById("login-btn").addEventListener("click", showLogin);