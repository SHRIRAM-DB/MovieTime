// Toggle profile dropdown
const profileIcon = document.getElementById("profileIcon");
profileIcon.addEventListener("click", function() {
    const dropdown = document.getElementById("profileDropdown");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
});

// Logout functionality
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function() {
    
    alert("Logged out successfully!");

    window.location.href = "/login.html";
});
