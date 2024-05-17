'use strict';


const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElemArr = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}





const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 200 ? header.classList.add("active")
    : header.classList.remove("active");
})

// scroll bar in product 

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      // Update thumb position on mouse move
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;
          // Ensure the scrollbar thumb stays within bounds
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }
      // Remove event listeners on mouse up
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }
      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });
  // Slide images according to the slide button clicks
  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });
   // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }
  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }
  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

/*
   ADDITIONAL
   */
   function showSuggestions() {

    const suggestions = ['hello', 'hi', 'pictures', 'games'];

    const suggestionContainer = document.getElementById('suggestion-container');
    

    suggestionContainer.innerHTML = '';

 
    suggestions.forEach(suggestion => {
      const suggestionElement = document.createElement('div');
      suggestionElement.textContent = suggestion;
      suggestionElement.addEventListener('click', () => {
 
        document.getElementById('searchInput').value = suggestion;
   
        suggestionContainer.innerHTML = '';
      });
      suggestionContainer.appendChild(suggestionElement);
    });
}

function clearSuggestions() {
 
  setTimeout(() => {
    // Clear suggestions when the focus is lost
    const suggestionContainer = document.getElementById('suggestion-container');
    suggestionContainer.innerHTML = '';
  }, 200);
  }

    document.body.addEventListener('click', function(event) {
    const searchInput = document.getElementById('searchInput');
    const suggestionContainer = document.getElementById('suggestion-container');
    
    // Check if the click is outside the search bar and suggestion container
    if (!searchInput.contains(event.target) && !suggestionContainer.contains(event.target)) {
      // Hide the suggestion container
      suggestionContainer.innerHTML = '';
    }
  });
  
  /*
   ADDITIONAL
   */
   
   
let currCity = "Tarlac City, Philippines";
let units = "metric";


let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax")



document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
   
    e.preventDefault();
    
    currCity = search.value;
    
    getWeather();
    
    search.value = ""
})


document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if(units !== "metric"){
       
        units = "metric"
       
        getWeather()
    }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
       
        units = "imperial"
      
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone){
     const convertTimezone = timezone / 3600; 

    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("en-US", options)
   
}

 


function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
    console.log(data)
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone); 
    weather__forecast.innerHTML = `<p>${data.weather[0].main}`
    weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
   
})
}

document.body.addEventListener('load', getWeather())