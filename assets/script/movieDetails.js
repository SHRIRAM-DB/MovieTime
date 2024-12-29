const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the movie ID
const movieId = urlParams.get('id'); // 'id' is the name of the parameter passed
console.log(movieId)

// Log the movie ID (for testing purposes)
console.log("Movie ID:", movieId);

    
const back = document.getElementById("back")
back.style.display="none"
back.addEventListener("click" , () => {
  window.location.replace("/assets/Pages/html/front.html")
})

const watch_now = document.getElementById("watch_now");
watch_now.style.display = "none"
watch_now.addEventListener("click", () => {
  window.location.replace(`/assets/Pages/html/video.html`)
})

const related_movie = document.getElementById("related_movie");
related_movie.style.display = "none"

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



async function uploadJSONToFirebase() {
  try {
    // Fetch the JSON file
    const response = await fetch('/assets/json/front.json');
    if (!response.ok) {
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


    // Ensure movieId is valid before proceeding
    if (!movieId) {
      console.error("Movie ID not found in URL!");
      return;
    }

    // Find the movie details using the ID
    let movieDetails = null;

    // Search through all categories for the movie
    for (const category in data.category) {
      const categoryMovies = data.category[category];
      movieDetails = categoryMovies.find(movie => movie.id == movieId);
      if (movieDetails) break; // Exit loop once movie is found
    }

    if (movieDetails) {
      const movieDetailContainer = document.getElementById("movieDetailContainer");
      movieDetailContainer.style.background = `
        linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%),
        url(${movieDetails.poster})
      `;
      movieDetailContainer.style.backgroundSize = "cover";
      movieDetailContainer.style.backgroundPosition = "center";
      movieDetailContainer.style.overflow = "hidden"
      movieDetailContainer.innerHTML = `
        <h1 class="movie_name" >${movieDetails.movie_name}</h1>
        <p class="movie_description" >${movieDetails.description}</p>
         <h2 class="cast">Cast</h2>
        <p class="movie_cast">${movieDetails.cast}</p>
      `;
    } else {
      console.error("Movie not found!");
    }

    related_movie.style.display = "block"
    watch_now.style.display = "block"
    back.style.display="block"
    document.getElementById("loading-container").style.display = 'none';

const thriller_movie_container = document.getElementById("thrillerMoviesContainer");
data.category.thriller.forEach(movie => {  
    thriller_movie_container.innerHTML += `
      <a href="movieDetails.html?id=${movie.id}" draggable="false">
        <div class="Thriller_Movie_Container">
        <img src="${movie.image_url}" class="movie" id="movie_image" alt="${movie.movie_name}" draggable="false">
        </div> 
      </a>`; 
        
});

const horror_movie_container=document.getElementById("horrorMovieContainer")
data.category.horror.forEach(movie => {
  horror_movie_container.innerHTML +=`
    <a href="movieDetails.html?id=${movie.id}" draggable="false">
      <div class="Horror_Movie_Container" >
      <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}" draggable="false">
      </div>
      </a>`;
});

const action_movie_container=document.getElementById("actionMovieContainer")
data.category.action.forEach(movie => {
  action_movie_container.innerHTML +=`
    <a href="movieDetails.html?id=${movie.id}" draggable="false">
      <div class="Action_Movie_Container">
      <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}" draggable="false">
      </div>
      </a>`;
});

const comedy_movie_container = document.getElementById("comedyMovieContainer");
data.category.comedy.forEach(movie => {
 comedy_movie_container.innerHTML += `
   <a href="movieDetails.html?id=${movie.id}" draggable="false">
      <div class="comedy_Movie_Container">
          <img src="${movie.image_url}" class="movie"  alt="${movie.movie_name}" draggable="false">
      </div>
      </a>`;
});


const romance_movie_container=document.getElementById("romanceMovieContainer")
data.category.romance.forEach(movie => {
  romance_movie_container.innerHTML +=`
    <a href="movieDetails.html?id=${movie.id}" draggable="false">
      <div class="romance_Movie_Container" >
      <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}" draggable="false">
      </div>
      </a>`;
});



  } catch (error) {
    console.log("Error uploading JSON data:", error);
  }
}


// Call the function
uploadJSONToFirebase();
