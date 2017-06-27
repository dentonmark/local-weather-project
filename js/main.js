var userLong = "";
var userLat = "";
var weatherData = [];
var locationData = [];
var currentTemp = "";
var currentConditions = "";
var conditionsIcon = "";
var city = "";
var state = "";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(success, fail);
  userLong.textContent = "Checking location...";
  function success(position) {
    userLong = position.coords.longitude;
    userLat = position.coords.latitude;
    $(document).ready(function() {
      $.getJSON("https://crossorigin.me/https://api.darksky.net/forecast/520a954a1dde77e3f6f056c8b8a2a9c3/" + userLat + "," + userLong + "?exclude=minutely,hourly,daily,alerts,flags", function(weatherData) {

          var currentTemp = weatherData.currently.temperature;
          var currentConditions = weatherData.currently.summary;
          var conditionsIcon = weatherData.currently.icon;

          $("#conditions").hide().html(currentConditions).fadeIn('fast');

          $("#temperature").hide().html(Math.round(currentTemp) + "° F").fadeIn('fast');

          $("#temperatureCelsius").hide().html(Math.round((currentTemp-32)/1.8) + "° C");

          var skycons = new Skycons({ color: "white" });

          if (conditionsIcon == "clear-day") {
            skycons.add("skycon", Skycons.CLEAR_DAY);
          } else if (conditionsIcon == "clear-night") {
            skycons.add("skycon", Skycons.CLEAR_NIGHT);
          } else if (conditionsIcon == "rain") {
            skycons.add("skycon", Skycons.RAIN);
          } else if (conditionsIcon == "snow") {
            skycons.add("skycon", Skycons.SNOW);
          } else if (conditionsIcon == "sleet") {
            skycons.add("skycon", Skycons.SLEET);
          } else if (conditionsIcon == "fog") {
            skycons.add("skycon", Skycons.FOG);
          } else if (conditionsIcon == "cloudy") {
            skycons.add("skycon", Skycons.CLOUDY);
          } else if (conditionsIcon == "partly-cloudy-day") {
            skycons.add("skycon", Skycons.PARTLY_CLOUDY_DAY);
          } else if (conditionsIcon == "partly-cloudy-night") {
            skycons.add("skycon", Skycons.PARTLY_CLOUDY_NIGHT);
          } else {
            skycons.add("skycon", Skycons.PARTLY_CLOUDY_DAY);
          }

          skycons.play();

        }
      );

      $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + userLat + "," + userLong + "&result_type=street_address&key=AIzaSyBiRdSjQjimiZyZtCBA5Osijg0L1cAYNjw", function(locationData) {
          for (var i = 0; i < locationData.results[0].address_components.length; i++) {
            var ac = locationData.results[0].address_components[i];
            if (ac.types.indexOf("locality") >= 0) city = ac.long_name;
            if (ac.types.indexOf("administrative_area_level_1") >= 0)
              state = ac.long_name;
          }
          $("#location").hide().html(city + ", " + state).fadeIn('fast');
        }
      );
    });
  }

  function fail(statusMessage) {
    $("#location").hide().html("Sorry, we were unable to get your location.").fadeIn('fast');
  }
} else {
  $("#location").hide().html("Sorry, your browser doesn't support geolocation.").fadeIn('fast');
}

$(function(){
  $('#fc-toggle').click(function(){
     $('#temperature').toggle();
     $('#temperatureCelsius').toggle();
  });
});

//Good JSON Example: https://www.sitepoint.com/ajaxjquery-getjson-simple-example/

//Reverse Geocoding Example: https://www.raymondcamden.com/2013/03/05/Simple-Reverse-Geocoding-Example
