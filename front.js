// Toggle profile dropdown
const profileIcon = document.getElementById("profileIcon");
profileIcon.addEventListener("click", function(event) {
    event.stopPropagation(); // Prevent the event from bubbling up
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
    
// Logout functionality
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function() {
    sessionStorage.clear();

    alert("Logged out successfully!");

    // Redirect to the index or login page
    window.location.href = "/index.html";
});
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
  
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
          const response = await fetch('front.json');
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

          const thrillerMovieContainer = document.getElementById("thrillerMoviesContainer");
          const thrillerPrevButton = document.getElementById("thrillerPrevButton");
          const thrillerNextButton = document.getElementById("thrillerNextButton");

          // Render thriller movies
          const thriller_movie_container = document.getElementById("thrillerMoviesContainer");
          data.category.thriller.forEach(movie => {
              thriller_movie_container.innerHTML += `
                  <div class="Thriller_Movie_Container">
                      <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}">

                  </div>`;
          });

          let thrillerIndex = 0; // Tracks the current slide
const thrillerMovies = document.querySelectorAll(".Thriller_Movie_Container");
const thrillerTotalMovies = thrillerMovies.length;
const thrillerMovieWidth = 188; // Width of each movie card + margin
// Update the carousel view
function updateThrillerCarousel() {
    thrillerMovieContainer.style.transform = `translateX(-${thrillerIndex * thrillerMovieWidth}px)`;
}

// Next button functionality
thrillerNextButton.addEventListener("click", () => {
    if (thrillerIndex < thrillerTotalMovies - 1) {
        thrillerIndex = Math.min(thrillerIndex + 5, thrillerTotalMovies - 1); // Prevent overflow
        updateThrillerCarousel();
    }
});

// prev button functionality
thrillerPrevButton.addEventListener("click", () => {
    if (thrillerIndex > 0) {
        thrillerIndex = Math.max(thrillerIndex - 5, 0); // Prevent underflow
        updateThrillerCarousel();
   
    }
});

const horrorPrevButton = document.getElementById("horrorPrevButton");
const horrorNextButton = document.getElementById("horrorNextButton");

          //Render horror movies
          const horror_movie_container=document.getElementById("horrorMovieContainer")
          data.category.horror.forEach(movie => {
            horror_movie_container.innerHTML +=`
                <div class="Horror_Movie_Container" >
                <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}">
                </div>`;
          });

          let horrorIndex = 0; // Tracks the current slide
          const horrorMovies = document.querySelectorAll(".Horror_Movie_Container");
          const horrorTotalMovies = horrorMovies.length;
          const horrorMovieWidth = 188; // Width of each movie card + margin

                     // Update the carousel view
function updateHorrorCarousel() {
    horror_movie_container.style.transform = `translateX(-${horrorIndex * horrorMovieWidth}px)`;
    horror_movie_container.style.transition = "transform 0.5s ease";
}

// Next button functionality
horrorNextButton.addEventListener("click", () => {
    if (horrorIndex < horrorTotalMovies - 1) {
        horrorIndex = Math.min(horrorIndex + 5, horrorTotalMovies - 1); // Prevent overflow
        updateHorrorCarousel();
    }
});

// Previous button functionality
horrorPrevButton.addEventListener("click", () => {
    if (horrorIndex > 0) {
        horrorIndex = Math.max(horrorIndex - 5, 0); // Prevent underflow
        updateHorrorCarousel();
    }
});

const actionPrevButton = document.getElementById("actionPrevButton");
const actionNextButton = document.getElementById("actionNextButton");

          const action_movie_container=document.getElementById("actionMovieContainer")
          data.category.action.forEach(movie => {
            action_movie_container.innerHTML +=`
                <div class="Action_Movie_Container" >
                <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}">
                </div>`;
          });

          let actionIndex = 0; // Tracks the current slide
          const actionMovies = document.querySelectorAll(".Action_Movie_Container");
          const actionTotalMovies = actionMovies.length;
          const actionMovieWidth = 188;

          function updateActionCarousel() {
            action_movie_container.style.transform = `translateX(-${actionIndex * actionMovieWidth}px)`;
            action_movie_container.style.transition = "transform 0.5s ease";
        }
        
        // Next button functionality
        actionNextButton.addEventListener("click", () => {
            if (actionIndex < actionTotalMovies - 1) {
                actionIndex = Math.min(actionIndex + 5, actionTotalMovies - 1); // Prevent overflow
                updateActionCarousel();
            }
        });
        
        // Previous button functionality
        actionPrevButton.addEventListener("click", () => {
            if (actionIndex > 0) {
                actionIndex = Math.max(actionIndex - 5, 0); // Prevent underflow
                updateActionCarousel();
            }
        });
         
        const comedy_movie_container = document.getElementById("comedyMovieContainer");
        const comedyPrevButton = document.getElementById("comedyPrevButton");
        const comedyNextButton = document.getElementById("comedyNextButton");
        
        // Render comedy movies
        data.category.comedy.forEach(movie => {
           comedy_movie_container.innerHTML += `
                <div class="comedy_Movie_Container">
                    <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}">
                </div>`;
        });
        
        // Variables for carousel functionality
        let comedyIndex = 0; // Tracks the current slide
        const comedyMovies = document.querySelectorAll(".comedy_Movie_Container");
        const comedyTotalMovies = comedyMovies.length;
        const comedyMovieWidth = 134.5; // Width of each movie card + margin
       
        
        // Update the carousel view
        function updateComedyCarousel() {
           comedy_movie_container.style.transform = `translateX(-${comedyIndex * comedyMovieWidth}px)`;
            comedy_movie_container.style.transition = "transform 0.5s ease-in-out";
        }
        
        // Next button functionality
        comedyNextButton.addEventListener("click", () => {
            if (comedyIndex < Math.ceil(comedyTotalMovies + 5)) {
                comedyIndex=comedyIndex+5; // Move to the next group of 5
                updateComedyCarousel();
            }
        });
        
        // Previous button functionality
        comedyPrevButton.addEventListener("click", () => {
            if (comedyIndex > 0) {
                comedyIndex=comedyIndex-5; // Move to the previous group of 5
                updateComedyCarousel();
            }
        });
        
        const romancePrevButton = document.getElementById("romancePrevButton");
        const romanceNextButton = document.getElementById("romanceNextButton");
        const romanceMovieContainer = document.getElementById("romanceMovieContainer");
          const romance_movie_container=document.getElementById("romanceMovieContainer")
          data.category.romance.forEach(movie => {
            romance_movie_container.innerHTML +=`
                <div class="romance_Movie_Container" >
                <img src="${movie.image_url}" class="movie" alt="${movie.movie_name}">

                </div>`;
          });

 // Carousel variables
let romanceIndex = 0; // Tracks the current slide
const romanceMovies = document.querySelectorAll(".romance_Movie_Container");
const romanceTotalMovies = romanceMovies.length;
const romanceMovieWidth = 224.5; // Width of each movie card + margin
const itemsPerSlide = 4; // Number of movies visible per slide

// Update the carousel view
function updateRomanceCarousel() {
    romanceMovieContainer.style.transform = `translateX(-${romanceIndex * romanceMovieWidth * itemsPerSlide}px)`;
    romanceMovieContainer.style.transition = "transform 0.5s ease"; // Smooth transition
}

// Next button functionality
romanceNextButton.addEventListener("click", () => {
    const maxIndex = Math.ceil(romanceTotalMovies / itemsPerSlide) - 1; // Total number of slides
    if (romanceIndex < maxIndex) {
        romanceIndex++; // Move to the next slide
        updateRomanceCarousel();
    }
});

// Previous button functionality
romancePrevButton.addEventListener("click", () => {
    if (romanceIndex > 0) {
        romanceIndex--; // Move to the previous slide
        updateRomanceCarousel();
    }
});


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



  const movieSlideContainer = document.getElementById("movieSlideContainer");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  
  const data = {
      category: {
          movie_slide: [
              {
                  movie_name: "Vettaiyan",
                  image_url: "https://assets-in.bmscdn.com/discovery-catalog/events/et00379391-uwerqpdxtl-landscape.jpg"
              },
              {
                  movie_name: "Black",
                  image_url: "https://assets-in.bmscdn.com/discovery-catalog/events/et00414825-zvyzztfquu-landscape.jpg"
              },
              {
                  movie_name: "Jailer",
                  image_url: "https://m.media-amazon.com/images/M/MV5BZjJhZTk1MGUtNzk4MC00NjgxLTllM2EtMTVjNGMwZWM3MzAzXkEyXkFqcGc@._V1_.jpg"
              },
              {
                  movie_name: "Bramayagam",
                  image_url: "https://assets-in.bmscdn.com/discovery-catalog/events/et00367666-dcdttzmgfe-landscape.jpg"
              },
              {
                  movie_name: "Demonte Colony 2",
                  image_url: "https://akamaividz2.zee5.com/image/upload/w_1170,h_658,c_scale/resources/0-0-1z5625693/list/ImageTitle8efab77c2e1a40699e2e6d44ccf157a7.jpg"
              }
          ] 
      }
  };
  
  // Add movies to the slider
  data.category.movie_slide.forEach(movie => {
      movieSlideContainer.innerHTML += `
          <div class="slide">
              <img src="${movie.image_url}" class="movie_slide" alt="${movie.movie_name}">
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

// const searchInput = document.getElementById("search");
// const searchButton = document.getElementById("search-btn");
// const resultsBox = document.getElementById("resultsBox");

// const itmes = ["Vikram","Ratsasan","Kaithi","Aramm","Valimai","Soorarai Pottru","Psycho","Kolaigaran","Karnan","Vikram Vedha","Miruthan","Papanasam","Thadam","Black","Trip",
//                "Demonte Colony 2","Airaa","Diary","Lift","Pisasu","Maya","Pizza III","U Turn","Nenjam Marappathillai","Sync","Asvins","Katteri","Bramayagam","Estate","Game Over",
//                "Vada Chennai","Asuran","Sarpatta Parambarai","Thiunivu","Jailer","Vettaiyan","Leo","Jigarthanda Double X","Master","Beast","Captain Miller","Thani Oruvan","Mahaan","Maharaja","Raayan",
//                "Kalakalappu 2","Mark Antony","Remo","Don","Doctor","Comali","Zombie","Gurkha","DD Returns","Maragadha Naanayam","Dhilluku Dhuddu","Naai Sekar Returns","Dikkiloona","Varalaru Mukkiyam",
//                "Adiyae","Star","Thiruchitrambalam","Sita Ramam","Hey Sinamika","Love Today","Romeo","O Kadhai Kanmani","Sivakumarin Sabadham","Kannum kannum Kollaiyadithaal","Rasavathi","Saba Nayagan","Jeeva","Kaathuvaakula Rendu Kaadhal","Anegan"];


