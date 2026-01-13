const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;

    if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "leads.html";
    } else {
        alert("Invalid email or password");
    }
});
