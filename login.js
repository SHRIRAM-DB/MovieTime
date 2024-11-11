// Import necessary functions from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzQ4VrfxpuRao5WpeBHnl8TStgz8q3KOw",
  authDomain: "ott-website-6e998.firebaseapp.com",
  projectId: "ott-website-6e998",
  storageBucket: "ott-website-6e998.firebasestorage.app",
  messagingSenderId: "353375757349",
  appId: "1:353375757349:web:28b95a40337351d3994bcc",
  measurementId: "G-NVSXR5MKPX"
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Get the form and input elements
const form = document.getElementById("loginPage");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const password = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
const btn = document.getElementById("login-btn");

const showPasswordToggle = document.getElementById("show-password-toggle");
const passwordField = document.getElementById("password");

showPasswordToggle.addEventListener("click", () => {
  // Toggle the password visibility
  const isPasswordVisible = passwordField.getAttribute("type") === "password";
  passwordField.setAttribute("type", isPasswordVisible ? "text" : "password");

  // Update the toggle text
  showPasswordToggle.textContent = isPasswordVisible ? "Hide" : "Show";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();  // Prevent default form submission

    emailError.textContent = "";
    passwordError.textContent = "";


    if (!email.checkValidity()) {
      if (email.validity.valueMissing){
          emailError.textContent = "Email is required!";
      } else if (email.validity.typeMismatch) {
          emailError.textContent = "Please enter a valid email address!";
      }
      return;
  }

    // Basic validation for email format and password length
    if (!email.value.endsWith("@gmail.com")) {
        emailError.textContent = "Only @gmail.com email addresses are allowed!";
        return;
    }

  
    if (!password.checkValidity()) {
        if (password.validity.valueMissing) {
            passwordError.textContent = "Password is required!";
        } else if (password.value.length < 7) {
            passwordError.textContent = "Password must be 7-15 characters long!";
        }
        return;
    }

    // Firebase Authentication: Sign in with email and password
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            alert("Login successful!");
            // Redirect to another page if needed
            window.location.href = "/front.html"; // Update to your desired page
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/user-not-found") {
                emailError.textContent = "No user found with this email!";
            } else if (errorCode === "auth/wrong-password") {
                passwordError.textContent = "Incorrect password!";
            } else {
                // alert("Error: " + errorMessage);
                //I'm add in extra
                passwordError.textContent="The password or email is wrong.";
            }
        });
});
