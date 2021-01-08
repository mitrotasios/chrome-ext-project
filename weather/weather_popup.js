
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

function test() {
  
  function getUserLocation(callback) {

    function success(position) {
      
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      callback(latitude);
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

  getUserLocation (function(latitude){
    alert(latitude);
    document.getElementById("cityName").innerHTML=latitude;
    //document.getElementById("countryName").innerHTML=longitude;
  })

}

document.addEventListener('DOMContentLoaded', test);