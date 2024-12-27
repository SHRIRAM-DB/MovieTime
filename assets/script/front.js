// Toggle profile dropdown
const profileIcon = document.getElementById("profileIcon");
profileIcon.addEventListener("click", function() {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Close the dropdown if clicked outside
window.addEventListener("click", function(event) {
    const dropdown = document.getElementById("profileDropdown");
    if (dropdown.style.display === "block" && !event.target.closest('#profileIcon')) {
        dropdown.style.display = 'none';
    }
});

let logout = false;

// Logout functionality
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function() {
    sessionStorage.clear();
    alert("Logged out successfully!");

    if ('caches' in window) {
      caches.keys().then(function (keyList) {
          return Promise.all(
              keyList.map(function (key) {
                  return caches.delete(key); // Clears browser cache
              })
          );
      });
  }    

    // Set logout to true
    logout = true;


    // Redirect to the index or login page
    window.location.replace("/index.html");
});

if (logout) {
    window.location.replace("/index.html");
    isLoggedIn=false;
}



const movies = []; 
const id=[];  

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getFirestore, doc, setDoc,collection } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
  
  // Firebase configuration
  
  const firebaseConfig = {
      apiKey: "AIzaSyDzQ4VrfxpuRao5WpeBHnl8TStgz8q3KOw",
      authDomain: "ott-website-6e998.firebaseapp.com",
      projectId: "ott-website-6e998",
      storageBucket: "ott-website-6e998.appspot.com",
      messagingSenderId: "353375757349",
      appId: "1:353375757349:web:28b95a40337351d3994bcc",
      measurementId: "G-NVSXR5MKPX"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  // Function to upload JSON to Firebase and render movies
  async function uploadJSONToFirebase() {
      try {
          const response = await fetch('/assets/json/front.json');
          if (!response.ok){
            throw new Error("JSON file not found!");
          } 
          const data = await response.json();
  
          // Upload data to Firestore
          for (const category in data.category) {
              const categoryData = data.category[category];
              const docRef = doc(db, "categories", category);
              await setDoc(docRef, { movies: categoryData });
              console.log(`Uploaded category: ${category}`);
          }
          
          
  const movieSlideContainer = document.getElementById("movieSlideContainer");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  // Add movies to the slider
  data.category.movie_slide.forEach(movie => {
    movieSlideContainer.innerHTML += `
        <div class="slide">
        <a href="movieDetails.html?id=${movie.id}" style="height: 100%;" draggable="false">
            <img src="${movie.image_url}" class="movie_slide" alt="${movie.movie_name}" draggable="false">
        </div>`;
});

// Cloning slides for infinite effect
const slides = document.querySelectorAll(".slide");
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    movieSlideContainer.appendChild(clone);
});

let currentSlide = 0;

function updateSlider() {
    movieSlideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    movieSlideContainer.style.transition = "transform 0.5s ease-in-out";
}

// Next button
nextButton.addEventListener("click", () => {
    if (currentSlide >= slides.length) {
        movieSlideContainer.style.transition = "none"; // Remove transition for seamless loop
        currentSlide = 0; // Reset to start
        movieSlideContainer.style.transform = `translateX(0)`;
        setTimeout(() => {
          movieSlideContainer.style.transition = "transform 0.5s ease-in-out"; // Reapply transition
          currentSlide++;
          updateSlider();
      }, 0);
    } else {
        currentSlide++;
        updateSlider();
    }
});

// Previous button
prevButton.addEventListener("click", () => {
    if (currentSlide <= 0) {
        movieSlideContainer.style.transition = "none";
        currentSlide = slides.length; // Jump to the last slide
        movieSlideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        setTimeout(() => {
          movieSlideContainer.style.transition = "transform 0.5s ease-in-out";
          currentSlide--;
          updateSlider();
      }, 0);
    } else {
        currentSlide--;
        updateSlider();
    }
});

          // Render thriller movies
          const thriller_movie_container = document.getElementById("thrillerMoviesContainer");
          data.category.thriller.forEach(movie => {
            movies.push(movie.movie_name);
            id.push(movie.id);  
              thriller_movie_container.innerHTML += `
                <a href="movieDetails.html?id=${movie.id}" draggable="false">
                  <div class="Thriller_Movie_Container">
                      <img src="${movie.image_url}" class="movie" id="movie_image" alt="${movie.movie_name}" draggable="false">
                      <p class="hidden-movie-name">${movie.movie_name}</p> 
                  </div> 
                  </a>`; 
          });
      


          //Render horror movies
          const horror_movie_container=document.getElementById("horrorMovieContainer")
          data.category.horror.forEach(movie => {
            movies.push(movie.movie_name);
            id.push(movie.id);
            horror_movie_container.innerHTML +=`
              <a href="movieDetails.html?id=${movie.id}" draggable="false">
                <div class="Horror_Movie_Container" >
                <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}" draggable="false">
                  <p class="hidden-movie-name">${movie.movie_name}</p>
                </div>
                </a>`;
          });

          const action_movie_container=document.getElementById("actionMovieContainer")
          data.category.action.forEach(movie => {
            movies.push(movie.movie_name);
            id.push(movie.id);
            action_movie_container.innerHTML +=`
              <a href="movieDetails.html?id=${movie.id}" draggable="false">
                <div class="Action_Movie_Container" >
                <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}" draggable="false">
                  <p class="hidden-movie-name">${movie.movie_name}</p>
                </div>
                </a>`;
          });

        const comedy_movie_container = document.getElementById("comedyMovieContainer");
        
        // Render comedy movies
        data.category.comedy.forEach(movie => {
            movies.push(movie.movie_name);
            id.push(movie.id);
           comedy_movie_container.innerHTML += `
             <a href="movieDetails.html?id=${movie.id}" draggable="false">
                <div class="comedy_Movie_Container">
                    <img src="${movie.image_url}" class="movie"  alt="${movie.movie_name}" draggable="false">
                    <p class="hidden-movie-name">${movie.movie_name}</p>
                </div>
                </a>`;
        });
        
          const romance_movie_container=document.getElementById("romanceMovieContainer")
          data.category.romance.forEach(movie => {
            movies.push(movie.movie_name);
            id.push(movie.id);
            romance_movie_container.innerHTML +=`
              <a href="movieDetails.html?id=${movie.id}" draggable="false">
                <div class="romance_Movie_Container" >
                <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}" draggable="false">
                  <p class="hidden-movie-name">${movie.movie_name}"</p>
                </div>
                </a>`;
          });

document.getElementById("loading-container").style.display = 'none';

      } catch (error) {
          console.error("Error uploading JSON data:", error);
          document.getElementById("thrillerMoviesContainer").innerHTML = "<p>Failed to load movies.</p>";
          document.getElementById("horrorMoviesContainer").innerHTML = "<p>Failed to load movies.</p>";
          document.getElementById("actionMoviesContainer").innerHTML = "<p>Failed to load movies.</p>";
          document.getElementById("comedyMoviesContainer").innerHTML = "<p>Failed to load movies.</p>";
          document.getElementById("romanceMoviesContainer").innerHTML = "<p>Failed to load movies.</p>";
        }
  }
  
  // Upload data on page load
  window.addEventListener("load", uploadJSONToFirebase);


  // Select the element where the username will be displayed
const usernameDisplay = document.getElementById("usernameDisplay");

// Retrieve the username from localStorage
const storedUsername = localStorage.getItem("username");

// Check if the username exists
if (storedUsername) {
    usernameDisplay.textContent = `Welcome, ${storedUsername}!`; // Display the username
} else {
    usernameDisplay.textContent = "Welcome, Guest!"; // Default message
}

// search bar functionality
  const searchBar = document.getElementById("searchBar");
  const resultsContainer = document.getElementById("resultsContainer");
  
  // Function to render search results
  function renderResults(filteredMovies) {
    resultsContainer.innerHTML = ""; // Clear previous results
  
    if (filteredMovies.length > 0) {
      filteredMovies.forEach(movie => {
        const resultItem = document.createElement("div");
        resultItem.textContent = movie;
        resultItem.className = "result-item";
        resultsContainer.style.scrollbarWidth = "thin";
       
        const searchButton = document.getElementById('searchButton');

        searchButton.addEventListener("click", () => {
          
          for (let i = 0; i < movies.length; i++) {
            if (searchBar.value === movies[i]) {
              window.location.href = `movieDetails.html?id=${id[i]}`;
            }
          }
          
       });
      

        resultsContainer.appendChild(resultItem);
  
        // Optional: Add click functionality to result items
        resultItem.addEventListener("click", () => {
          searchBar.value = movie; // Fill the search bar with the selected movie
          resultsContainer.style.display = "none"; // Hide results
        });
       
      });
      
      resultsContainer.style.display = "block"; // Show results
    } else {
      resultsContainer.textContent = "No results found.";
      resultsContainer.style.color = "black";
      resultsContainer.style.textAlign = "center";
      resultsContainer.style.backgroundColor = "white"
      resultsContainer.style.padding = "10px"
      resultsContainer.style.display = "block"; // Show message
    }
  }

  
  // Event listener for input
  searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim().toLowerCase();
  
    if (query) {
      const filteredMovies = movies.filter(movie =>
        movie.toLowerCase().includes(query)
      );
      renderResults(filteredMovies);
    } else {
      resultsContainer.style.display = "none"; // Hide results if input is empty
    }
  });
  
  // Optional: Hide results when clicking outside the search bar
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-container")) {
      resultsContainer.style.display = "none";
    }
  });

 const clear_icon = document.getElementById("clear_icon")

 clear_icon.addEventListener("click" , () => {
  searchBar.value = "";
  resultsContainer.style.display = "none"
 })
  

  console.log("movie id:",id);
  console.log("Movie Names Array:", movies);


const thriller_see_more=document.getElementById("thriller_see_more");
const thriller_movie_container = document.getElementById("thrillerMoviesContainer");
thriller_see_more.addEventListener("click", () => {
  // Toggle the 'flex-wrap' style for the parent container
  thriller_movie_container.style.flexWrap = thriller_movie_container.style.flexWrap === "wrap" ? "nowrap" : "wrap";
  thriller_movie_container.style.gap = "20px";
  if(thriller_movie_container.style.flexWrap === "wrap"){
    thriller_see_more.textContent = "See Less>>";
    }
    else{
      thriller_see_more.textContent = "See More>>"
    }
});

const horror_see_more = document.getElementById("horror_see_more");
const horror_movie_container=document.getElementById("horrorMovieContainer")

horror_see_more.addEventListener("click", () => {
  horror_movie_container.style.flexWrap = horror_movie_container.style.flexWrap === "wrap" ? "nowrap" : "wrap";
  horror_movie_container.style.gap = "20px"
  if(horror_movie_container.style.flexWrap == "wrap"){
    horror_see_more.textContent = "See Less>>";
    }
    else{
      horror_see_more.textContent = "See More>>"
    }
})

const action_see_more = document.getElementById("action_see_more");
const action_movie_container=document.getElementById("actionMovieContainer")

action_see_more.addEventListener("click" , () => {
  action_movie_container.style.flexWrap = action_movie_container.style.flexWrap === "wrap" ? "nowrap" : "wrap";
  action_movie_container.style.gap = "20px";
  if(action_movie_container.style.flexWrap == "wrap"){
    action_see_more.textContent = "See Less>>";
    }
    else{
      action_see_more.textContent = "See More>>"
    }
})


const comedy_see_more = document.getElementById("comedy_see_more");
const comedy_movie_container = document.getElementById("comedyMovieContainer");

comedy_see_more.addEventListener("click", () => {
comedy_movie_container.style.flexWrap = comedy_movie_container.style.flexWrap === "wrap" ? "nowrap" : "wrap";
comedy_movie_container.style.gap = "18px";
if(comedy_movie_container.style.flexWrap == "wrap"){
  comedy_movie_container.style.width = "110%"
  comedy_see_more.textContent = "See Less>>";
  // comedy_movie_container.style.overflowX = "hidden";
  }
  else{
      comedy_movie_container.style.width = "100%"
    comedy_see_more.textContent = "See More>>"
  }
})

const romance_see_more = document.getElementById("romance_see_more");
const romance_movie_container=document.getElementById("romanceMovieContainer")

romance_see_more.addEventListener("click", () => {
  romance_movie_container.style.flexWrap = romance_movie_container.style.flexWrap === "wrap" ? "nowrap" : "wrap";
  romance_movie_container.style.gap = "20px";

  if(romance_movie_container.style.flexWrap == "wrap"){
  romance_movie_container.style.width = "110%"
  romance_see_more.textContent = "See Less>>";
  }
  else{
      romance_movie_container.style.width = "100%"
    romance_see_more.textContent = "See More>>"
  }
})
