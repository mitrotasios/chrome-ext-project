
/*
document.addEventListener("DOMContentLoaded", function() {
  chrome.extension.getBackgroundPage().backgroundFunction();
});
*/

document.addEventListener('DOMContentLoaded', function () {

  //var test = document.getElementById("firstText").innerHTML;
  var cityName = "LOS ANGELES"
  var countryName = "USA"
  document.getElementById("cityName").innerHTML=cityName;
  document.getElementById("countryName").innerHTML=countryName;
 
});