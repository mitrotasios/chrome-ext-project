
/*
document.addEventListener("DOMContentLoaded", function() {
  chrome.extension.getBackgroundPage().backgroundFunction();
});
*/

/*
document.addEventListener('DOMContentLoaded', function () {

  chrome.extension.getBackgroundPage().getLocation();

  
  var cityName = "LOS ANGELES";
  var countryName = "USA";
  document.getElementById("cityName").innerHTML=lat;
  document.getElementById("countryName").innerHTML=lng;
});
*/
  
function getWeatherCurrentLocation() {

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
    var cityName = cityName.replace(/ /g,"-");
    console.log(cityName);
    
    /*
    const KEY = '';

    fetch("https://api.pexels.com/v1/search?query=London", {
      headers: {
      Authorization: KEY
      }
    })
    .then(response => response.json())  // convert to json
    .then(json => insertImage(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
    */
    
    const KEY = '';
    const url = `https://api.unsplash.com/photos/random/?query=${cityName}&client_id=${KEY}`;

    // GET Request.
    fetch(url)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => insertImage(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
  }

  function insertImage(json) {
    console.log("Pexels", json);
    console.log("Done");
    bg_img_url = json.urls.full;

    document.getElementById("bg-img").src=bg_img_url;
  }

  function fetchLocation(latitude, longitude) {
    const KEY = '';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;

    // GET Request.
    fetch(url)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => insertLocationName(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
  }

  function insertLocationName(json) {
    part = json.results[0].address_components;
    for (var i = 0; i<part.length; i++) {
      var current = part[i];
      if (current.types.includes("postal_town")) {
        var cityName = current.long_name;
      }
      if (part[i].types.includes("country")) {
        var countryName = current.long_name;
      }
    }
    document.getElementById("cityName").innerHTML=cityName.toUpperCase();
    document.getElementById("countryName").innerHTML=countryName.toUpperCase();
    console.log(cityName);

    setBackground(cityName);  
  }

  function fetchWeather(lat, lon) {
    const KEY = '';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${KEY}&units=metric`;

    // GET Request.
    fetch(url)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => insertWeather(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
  }

  function insertCurrent(json) {
    var currentTemp = String(Math.round(json.current.temp));
    var currentDesc = String(json.current.weather[0].main);
    var currentWind = String(json.current.wind_speed);
    var currentHumidity = String(json.current.humidity);
    
    var img_urls = mapWeatherIcons(currentDesc);
    var sm_img_url = img_urls[1];

    var smWeatherIcon = document.createElement("img");
    smWeatherIcon.src = sm_img_url;
    smWeatherIcon.setAttribute("class", "icon-image");                   
    smWeatherIcon.setAttribute("height", "15");
    smWeatherIcon.setAttribute("width", "15");

    var smWeatherDesc = document.createElement("span");
    smWeatherDesc.innerHTML = currentDesc;
    smWeatherDesc.setAttribute("class", "icon-text");
    smWeatherDesc.setAttribute("id", "weather-icon-text");                   

    var smWindIcon = document.createElement("img");
    smWindIcon.src = "../imgs/wind-white.png";
    smWindIcon.setAttribute("class", "icon-image");                   
    smWindIcon.setAttribute("height", "15");
    smWindIcon.setAttribute("width", "15");

    var smWindInfo = document.createElement("span");
    smWindInfo.innerHTML = currentWind.concat(' mhp');
    smWindInfo.setAttribute("class", "icon-text");
    smWindInfo.setAttribute("id", "wind-icon-text");

    var smHumidityIcon = document.createElement("img");
    smHumidityIcon.src = "../imgs/humidity-white.png";
    smHumidityIcon.setAttribute("class", "icon-image");                   
    smHumidityIcon.setAttribute("height", "15");
    smHumidityIcon.setAttribute("width", "15");

    var smHumidityInfo = document.createElement("span");
    smHumidityInfo.innerHTML = currentHumidity.concat(' %');
    smHumidityInfo.setAttribute("class", "icon-text");
    smHumidityInfo.setAttribute("id", "humidity-icon-text");

    document.getElementById("weather-data-degrees").innerHTML=currentTemp.concat('°');
    
    document.getElementById("sm-weather-icon").appendChild(smWeatherIcon);
    document.getElementById("sm-weather-icon").appendChild(smWeatherDesc);
    //document.getElementById("weather-icon-text").innerHTML=currentDesc;

    document.getElementById("sm-wind-icon").appendChild(smWindIcon);
    document.getElementById("sm-wind-icon").appendChild(smWindInfo);

    document.getElementById("sm-humidity-icon").appendChild(smHumidityIcon);
    document.getElementById("sm-humidity-icon").appendChild(smHumidityInfo);
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

    var n = d.getDay();

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
      
      var lWeatherIcon = document.createElement("img");
      lWeatherIcon.src = l_img_url;
      lWeatherIcon.setAttribute("class", "center-block");                   
      lWeatherIcon.setAttribute("height", "25");
      lWeatherIcon.setAttribute("width", "25");

      document.getElementById("name-day-".concat(String(i+1))).innerHTML=dayName;
      document.getElementById("img-day-".concat(String(i+1))).appendChild(lWeatherIcon);
      document.getElementById("max-day-".concat(String(i+1))).innerHTML=fcMaxWeather;
      document.getElementById("min-day-".concat(String(i+1))).innerHTML=fcMinWeather;
    }

  }

  function insertWeather(json) {
    insertCurrent(json);
    insertForecast(json);
  }

  function success(position) {
    console.log("success");
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
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


document.addEventListener('DOMContentLoaded', getWeatherCurrentLocation);