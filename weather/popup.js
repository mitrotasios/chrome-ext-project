
function mapWeatherIcons(currentDesc) {
    var l_img_url;
    var sm_img_url;
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
    var cityName = cityName.replace(/ /g," ");
    console.log("CityName", cityName);

    const KEY = '563492ad6f9170000100000172dbe915a2bc4ce294d3e5fb719fdc14';

    fetch(`https://api.pexels.com/v1/search?query=${cityName}&per_page=10`, {
        headers: {
        Authorization: KEY
        }
    })
    .then(response => response.json())  // convert to json
    .then(json => insertImage(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

function insertImage(json) {
    console.log("Pexels", json);
    console.log("Done");

    let i = Math.floor(Math.random() * 10);
    bg_img_url = json.photos[i].src.large;

    document.getElementById("bg-img").src=bg_img_url;
}

function fetchLocation(latitude, longitude) {
    console.log("fetchLocationLatLong", latitude, longitude)
    const KEY = 'AIzaSyCl8xuKwal-sSnAXAvGzjlhfG--HT_m57Q';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;

    // GET Request.
    fetch(url)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => insertLocationName(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

function insertLocationName(json) {
    console.log("Reverse Geocoding", json);
    console.log("cityName before loop", cityName);
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
    console.log("cityName", cityName);
    console.log("countryName", countryName);
    document.getElementById("cityName").innerHTML=cityName.toUpperCase();
    document.getElementById("countryName").innerHTML=countryName.toUpperCase();

    setBackground(cityName);  
}

function fetchWeather(lat, lon) {
    const KEY = 'bea7fbb8ded1b3f8c08fd623c25069cb';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${KEY}&units=metric`;

    // GET Request.
    fetch(url)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => insertWeather(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

function insertCurrent(json) {
    console.log("Weather", json);
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
    var d = new Date();
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
    insertCurrent(json);
    insertForecast(json);
}

function getWeatherCurrentLocation() {  
  function success(position) {
    console.log("success");
    console.log("LS",localStorage.lat);
    console.log("LS",localStorage.lon);
    var latitude;
    var longitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log("lat", latitude);
    console.log("long", longitude);
    fetchLocation(latitude, longitude);
    fetchWeather(latitude, longitude);
  }

  function error() {
    console.log("error");
    var locationError = 'Unable to retrieve your location';
    console.log(locationError);
  }

  console.log("running");
  if(!navigator.geolocation) {
    var unsupportedError = 'Geolocation is not supported by your browser';
    console.log(unsupportedError);
  } else {
    //status.textContent = 'Locating…';
    console.log("get lat long");
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            //types: [],
            //componentRestrictions: {'country': ['AU']},
            //fields: ['place_id', 'geometry', 'name']
        });

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();

  if (!place.geometry) {
    document.getElementById('autocomplete').placeholder = 'Enter a place';
  } else {
    //document.getElementById('details').innerHTML = place.name;
    var latitude = String(place.geometry.location.lat());
    var longitude = String(place.geometry.location.lng());
    console.log("new latlong", typeof latitude);
    fetchLocation(latitude, longitude);
    fetchWeather(latitude, longitude);
  }

}

document.addEventListener('DOMContentLoaded', getWeatherCurrentLocation);