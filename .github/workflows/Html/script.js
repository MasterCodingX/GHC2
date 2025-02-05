document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Dummy authentication (Replace with actual backend authentication)
    if (email === "admin@example.com" && password === "admin123") {
        window.location.href = "admin-dashboard.html";
    } else if (email === "doctor@example.com" && password === "doctor123") {
        window.location.href = "doctor-dashboard.html";
    } else {
        errorMessage.textContent = "Invalid email or password.";
    }
});// JavaScript Document