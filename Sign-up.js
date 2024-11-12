// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

// Initialize Firebase and Authentication
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const form = document.getElementById("Sign-up");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const conformPassword = document.getElementById("conformPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const conformPasswordError = document.getElementById("conformPasswordError");
const btn = document.querySelector("button[type='submit']");

const showPasswordToggle = document.getElementById("show-password-toggle");
const passwordField = document.getElementById("password");

showPasswordToggle.addEventListener("click", () => {
  // Toggle the password visibility
  const isPasswordVisible = passwordField.getAttribute("type") === "password";
  passwordField.setAttribute("type", isPasswordVisible ? "text" : "password");

  // Update the toggle text
  showPasswordToggle.textContent = isPasswordVisible ? "Hide" : "Show";
});

const showConformPasswordToggle = document.getElementById("show-conformPassword-toggle");
const conformPasswordField = document.getElementById("conformPassword");

showConformPasswordToggle.addEventListener("click", () => {
  // Toggle the password visibility
  const isConformPasswordVisible = conformPasswordField.getAttribute("type") === "password";
  conformPasswordField.setAttribute("type", isConformPasswordVisible ? "text" : "password");

  // Update the toggle text
  showConformPasswordToggle.textContent = isConformPasswordVisible ? "Hide" : "Show";
});

form.addEventListener("submit", function(event) {
  event.preventDefault(); 

  // Clear previous error messages
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  conformPasswordError.textContent = "";

  let isValid = true; 

  // Name validation
  if (!name.checkValidity()) {
    if (name.validity.valueMissing) {
      nameError.textContent = "Name is required!";
    } else if (name.value.length < 4) {
      nameError.textContent = "Name must be at least 4 characters long!";
    }
    isValid = false;
  }

  // Basic validation for email format and password length
  if (!email.value.endsWith("@gmail.com")) {
    emailError.textContent = "Only @gmail.com email addresses are allowed!";
    isValid = false;
  }

  // Email validation
  if (!email.checkValidity()) {
    if (email.validity.valueMissing) {
      emailError.textContent = "Email is required!";
    } else if (email.validity.typeMismatch) {
      emailError.textContent = "Please enter a valid email address!";
    }
    isValid = false;
  }

  // Password validation
  if (!password.checkValidity()) {
    if (password.validity.valueMissing) {
      passwordError.textContent = "Password is required!";
    } else if (password.value.length < 7 || password.value.length > 15) {
      passwordError.textContent = "Password must be 7-15 characters long!";
    }
    isValid = false;
  }

  // Confirm password validation
  if (password.value !== conformPassword.value) {
    conformPasswordError.textContent = "Passwords do not match!";
    isValid = false;
  }

  // Proceed with signup if the form is valid
  if (isValid) {
    const emailValue = email.value;
    const passwordValue = password.value;

    // Disable button to prevent multiple submissions
    btn.disabled = true;
    btn.innerText = 'Creating account...';

    // Firebase Authentication sign-up
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Successfully signed up
        const user = userCredential.user;
        console.log('Sign Up successful:', user);

        // Reset form and button state
        form.reset();
        btn.disabled = false;
        btn.innerText = 'Create an account';

        // Set sign-up completion flag and redirect
        localStorage.setItem("isSignedUp", "true");
        window.location.href = "/front.html"; // Redirect after successful sign-up
      })
      .catch((error) => {
        const errorMessage = error.message;

        if (error.code === 'auth/email-already-in-use') {
          emailError.textContent = "The email is already in use. Please try another email or log in.";
        } else {
          emailError.textContent = "An error occurred during sign-up. Please try again.";
        }
        console.error('Error during sign up:', errorMessage);

        // Reset button state
        btn.disabled = false;
        btn.innerText = 'Create an account';
      });
  }
});
