var apiKey = require('./../.env').apiKey;
var convertCels = require('./../js/temperature.js').convertCels
var convertFar = require('./../js/temperature.js').convertFar

$(function(){
  $('#temperature').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response)
     { var kelv = response.main.temp
       var cels = convertCels(kelv)
       var fahren = convertFar(cels)
       var tempUnits = $('input[name="temperature"]:checked').val();
       if (tempUnits === "kelvin") {
         $('.showWeather').text("The temperature in " + city + " is " + kelv + "K");
       } else if (tempUnits === "celsius") {
         $('.showWeather').text("The temperature in " + city + " is " + cels + "C");
       } else if (tempUnits === "fahrenheight") {
         $('.showWeather').text("The temperature in " + city + " is " + fahren + "F");
       }
       $('.fiveDay').hide();
       $('.showWeather').show();
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);
    });
  });
});
