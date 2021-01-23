function getWeatherCurrentLocation() {
    var lat = "default location";
    var lon = "default location";

    function fetchWeather(latitude, longitude) {
        console.log("success");
    }

    function fetchLocation(latitude, longitude) {
        console.log("success");
    }
    
    function success(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(String(lat));
        fetchLocation(lat, lon);
        fetchWeather(lat, lon);
    }
        
    function error() {
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
        navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
        navigator.geolocation.getCurrentPosition(success, error, {maximumAge:60000, timeout:10000, enableHighAccuracy:true});
    }
}

document.addEventListener('DOMContentLoaded', getWeatherCurrentLocation);
