const loginForm = document.getElementById("login-form");
const errorBox = document.getElementById("error-box");

if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "leads.html";
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("Email").value.trim();
  const password = document.getElementById("Password").value;

  if (email === "admin@gmail.com" && password === "admin123") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "leads.html";
  } else {
    errorBox.classList.add("show");
    document.getElementById("Password").value = "";
    document.getElementById("Password").focus();
  }
});

document.getElementById("Email").addEventListener("input", () => errorBox.classList.remove("show"));
document.getElementById("Password").addEventListener("input", () => errorBox.classList.remove("show"));