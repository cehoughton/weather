var apiKey = require('./../.env').apiKey;

$(function(){
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response)
     {
      $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%");
      $('.fiveDay').hide();
      $('.showWeather').show();
    }).fail(function(error) {
      $('.showWeather').text(error.message);
    });
  });
});
