
function mapWeatherIcons(currentDesc) {
    // Function which maps the associated icon to a given weather condition
    // using a switch statement
    // return: array containing a small and a large weather icon path

    var l_img_url; // large icon
    var sm_img_url; // small uicon
    switch(currentDesc) {
        case "Thunderstorm":
        l_img_url = "../imgs/thunderstorm-grey.png";
        sm_img_url = "../imgs/thunderstorm-white.png";
        break;
        case "Drizzle":
        l_img_url = "../imgs/drizzle-grey.png";
        sm_img_url = "../imgs/drizzle-white.png";
        break;
        case "Rain":
        l_img_url = "../imgs/rain-grey.png";
        sm_img_url = "../imgs/rain-white.png";
        break;
        case "Snow":
        l_img_url = "../imgs/snow-grey.png";
        sm_img_url = "../imgs/snow-white.png";
        break;
        case "Clear":
        l_img_url = "../imgs/clear-sky-grey.png";
        sm_img_url = "../imgs/clear-sky-white.png";
        break;
        case "Clouds":
        l_img_url = "../imgs/clouds-grey.png";
        sm_img_url = "../imgs/clouds-white.png";
        break;
        case "Snow":
        l_img_url = "../imgs/snow-grey.png";
        sm_img_url = "../imgs/snow-white.png";
        break;
        // Mist
        case "Mist":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
        case "Smoke":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
        case "Haze":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
        case "Dust":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
        case "Fog":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
        case "Sand":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
        case "Dust":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
        case "Ash":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
        case "Squall":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
        case "Tornado":
        l_img_url = "../imgs/mist-grey.png";
        sm_img_url = "../imgs/mist-white.png";
        break;
    }
    var img_urls = [l_img_url, sm_img_url];
    return img_urls;
}

function setBackground(cityName) {
    // Function fetching the app background depending on the city, using the Pexels API.
    
    var cityName = cityName.replace(/-/g," ");

    const KEY = '563492ad6f9170000100000172dbe915a2bc4ce294d3e5fb719fdc14'; // API Key

    // fetch API
    fetch(`https://api.pexels.com/v1/search?query=${cityName}&per_page=10`, {
        headers: {
        Authorization: KEY
        }
    })
    .then(response => response.json()) 
    .then(json => insertImage(json)) // callback function if promise is successfull
    .catch(err => console.log('Request Failed', err)); // Catch error
}

function insertImage(json) {
    // callback function from fetch API call

    // picks a ranfom number from 0-9 and picks image from response
    let i = Math.floor(Math.random() * 10);
    bg_img_url = json.photos[i].src.large;

    // replaces background in html script
    document.getElementById("bg-img").src=bg_img_url;
}

function fetchLocation(latitude, longitude) {
    // Fetches Google Reverse Geocoding API to retrieve (largest) city name
    const KEY = 'AIzaSyCl8xuKwal-sSnAXAvGzjlhfG--HT_m57Q';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;

    // Fetch API GET Request
    fetch(url)
    // Handle promise
    .then(response => response.json())  // convert to json
    .then(json => insertLocationName(json))    // call insertLocationName function if successfull promise
    .catch(err => console.log('Request Failed', err)); // catch errors
}

function insertLocationName(json) {
    // Callback function from API request
    // retrieve city and country name from response / json 
    var part = json.results[3].address_components;
    console.log("Loop starts");
    for (var i = 0; i<part.length; i++) {
        var current = part[i];
        if (current.types.includes("postal_town") || current.types.includes("locality")) {
            var cityName = current.long_name;
        }
        if (part[i].types.includes("country")) {
            var countryName = current.long_name;
        }
    }

    // Change app title in html script
    document.getElementById("cityName").innerHTML=cityName.toUpperCase();
    document.getElementById("countryName").innerHTML=countryName.toUpperCase();

    // call setBackground function
    setBackground(cityName);  
}

function fetchWeather(lat, lon) {
    // Fetch weather data from openWeather API
    const KEY = 'bea7fbb8ded1b3f8c08fd623c25069cb';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${KEY}&units=metric`;

    // GET Request
    fetch(url)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => insertWeather(json))    // call insertWeather if promise successfull
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

function insertCurrent(json) {
    // Inserting current weather data into html script
    var currentTemp = String(Math.round(json.current.temp));
    var currentDesc = String(json.current.weather[0].main);
    var currentWind = String(json.current.wind_speed);
    var currentHumidity = String(json.current.humidity);

    var img_urls = mapWeatherIcons(currentDesc);
    var sm_img_url = img_urls[1];

    document.getElementById("weather-icon-img").src=sm_img_url;
    document.getElementById("weather-icon-text").innerHTML=currentDesc;

    document.getElementById("wind-icon-img").src="../imgs/wind-white.png";
    document.getElementById("wind-icon-text").innerHTML=currentWind.concat(' mhp');

    document.getElementById("humidity-icon-img").src="../imgs/humidity-white.png";
    document.getElementById("humidity-icon-text").innerHTML=currentHumidity.concat(' %');

    document.getElementById("weather-data-degrees").innerHTML=currentTemp.concat('°');
}

function insertForecast(json) {
    // Creates weather forcast (5 days)
    
    // Map forecast weekday names
    var weekday = new Array(7);
    weekday[0] = "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";

    var hashMap = new Array(5);
    for(var i=0; i<hashMap.length; i++) {
      var tempDate = new Date();
      tempDate.setDate(tempDate.getDate() + (i+1)); 
      
      dayName = weekday[tempDate.getDay()];
      fcMaxWeather = Math.round(json.daily[i+1].temp.max);
      fcMinWeather = Math.round(json.daily[i+1].temp.min);
      fcWeatherDesc = json.daily[i+1].weather[0].main;

      var img_urls = mapWeatherIcons(fcWeatherDesc);
      var l_img_url = img_urls[0];
      
      document.getElementById("name-day-".concat(String(i+1))).innerHTML=dayName;
      document.getElementById("img-day-".concat(String(i+1))).src=l_img_url;
      document.getElementById("max-day-".concat(String(i+1))).innerHTML=fcMaxWeather;
      document.getElementById("min-day-".concat(String(i+1))).innerHTML=fcMinWeather;
    }

}

function insertWeather(json) {
  // inserts current weather data  
  insertCurrent(json);

  // insearts forcast data
  insertForecast(json);
}

//// Event listener callback function
function getWeatherCurrentLocation() {    

  function success(position) {
    // Callback function from getCurrentPosition method receiving position argument
    // returns latitude and longitude
    
    var latitude = position.coords.latitude; // get lat
    var longitude = position.coords.longitude; // get long

    // call fetchLocation function, in order to get the city & country name
    fetchLocation(latitude, longitude);

    // call fetchWeather function, in order to get the weather data for the specific lat & lon
    fetchWeather(latitude, longitude);
  }

  function error() {
    // Error callback function
    var locationError = 'Unable to retrieve your location';
    console.log(locationError);
  }

  // if geolocation supported call getCurrentPosition method
  // else return error
  if(!navigator.geolocation) {
    var unsupportedError = 'Geolocation is not supported by your browser';
    console.log(unsupportedError);
  } else {
    // getCurrentPosition method call
    navigator.geolocation.getCurrentPosition(success, error); // success, error callback functions
  }

}

// Handle autocomplete using Google Maps autocomplete
let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),{});

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();

  if (!place.geometry) {
    document.getElementById('autocomplete').placeholder = 'Enter a place';
  } else {
    var latitude = String(place.geometry.location.lat());
    var longitude = String(place.geometry.location.lng());
    
    // When new place selected trigger fetching process
    fetchLocation(latitude, longitude);
    fetchWeather(latitude, longitude);
  }

}

// when DOM content loaded get weather of user's current location
document.addEventListener('DOMContentLoaded', getWeatherCurrentLocation);