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

// Toggle password visibility
showPasswordToggle.addEventListener("click", () => {
  const isPasswordVisible = passwordField.getAttribute("type") === "password";
  passwordField.setAttribute("type", isPasswordVisible ? "text" : "password");
  showPasswordToggle.textContent = isPasswordVisible ? "Hide" : "Show";
});

let isValid=false;

form.addEventListener("submit", (event) => {
  event.preventDefault();  // Prevent default form submission

  // Clear any previous error messages
  emailError.textContent = "";
  passwordError.textContent = "";

  // Validate email
  if (!email.value) {
    emailError.textContent = "Email is required!";
  } else if (!email.value.endsWith("@gmail.com")) {
    emailError.textContent = "Only @gmail.com email addresses are allowed!";
  }

  // Validate password
  if (!password.value) {
    passwordError.textContent = "Password is required!";
    return;
  } else if (password.value.length < 7 || password.value.length > 15) {
    passwordError.textContent = "Password must be 7-15 characters long!";
    return;
  }


  // Firebase Authentication: Sign in with email and password
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      alert("Login successful!");
      // Redirect to another page if needed
      window.location.replace("/assets/pages/html/front.html");  // Update to your desired page  
      isValid=true    
    })  

    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === "auth/user-not-found") {
        emailError.textContent = "No user found with this email!";
      } else if (errorCode === "auth/wrong-password") {
        passwordError.textContent = "Incorrect password!";
      } else {
        passwordError.textContent = "The password or email is wrong.";
      }
    });
});


email.addEventListener("input", function() {
  emailError.textContent = "";

  // Regular expression for a valid Gmail address
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  // Check if the email matches the regex pattern
  if (!gmailRegex.test(email.value)) {
    emailError.textContent = "Please enter a valid @gmail.com email address!";
  } else {
    emailError.textContent = ""; // Clear the error if the email is valid
  }
});


password.addEventListener("input", function() {
  passwordError.textContent = "";
  
  // Check if the passwords match
  if (password.value.length < 7 || password.value.length > 15 ) {
    passwordError.textContent = `Password must be at least ${password.minLength} characters`;
  } else {
    passwordError.textContent = ""; // Clear the error if passwords match
  }
});

const signUpLink = document.getElementById("sign-up");
signUpLink.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default link navigation
  window.location.replace("/assets/pages/html/Sign-up.html"); // Navigate without adding to history
});

