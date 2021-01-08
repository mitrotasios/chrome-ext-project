
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

  function getCityName(latitude, longitude) {

    const KEY = '<KEY>';
    url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;
    // GET Request.
    fetch(url)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => {
      console.log(json)
      part = json.results[0].address_components;
      console.log("Part 0: ", part);
      for (var i = 0; i<part.length; i++) {
        var current = part[i];
        console.log("current: ", current);
        if (current.types.includes("postal_town")) {
          var cityName = current.long_name;
          console.log(cityName);
          document.getElementById("cityName").innerHTML=cityName.toUpperCase();
        }
        if (part[i].types.includes("country")) {
          var countryName = current.long_name;
          console.log(countryName);
          document.getElementById("countryName").innerHTML=countryName.toUpperCase();
        }
      }

    })    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
  }

  function success(position) {
    
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    getCityName(latitude, longitude);


  }

  function error() {
    var locationError = 'Unable to retrieve your location';
    console.log(locationError);
  }

  if(!navigator.geolocation) {
    var unsupportedError = 'Geolocation is not supported by your browser';
    console.log(unsupportedError);
  } else {
    //status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}


document.addEventListener('DOMContentLoaded', getWeatherCurrentLocation);