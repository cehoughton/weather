$(function(){
  $('#fiveDay').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey).then(function(response){
      var days = [0, 8, 16, 24, 32];
      var avgTemps = [];
      var dates = [];
      var tempUnits = $('input[name="temperature"]:checked').val();
      for(var j = 0; j < days.length; j++) {
        var avgTemp = 0;
        var day = days[j];
        var date = response.list[day].dt_txt.substring(5, 10).replace("-", '/');
        dates.push(date);
        for(var i = day; i < day+8; i++) {
          avgTemp += response.list[i].main.temp;
        }
        if (tempUnits === "kelvin") {
          avgTemp = Math.round((avgTemp / 8)*100)/100;
        }else if (tempUnits === "celsius") {
          avgTemp = Math.round((convertCels(avgTemp/8))*100)/100;
        }else if (tempUnits === "fahrenheight") {
          avgTemp = Math.round((convertFar(convertCels(avgTemp/8)))*100)/100;

        }
        avgTemps.push(avgTemp);
      }
      console.log(dates);
      $('.fiveDay').show();
      $(".showWeather").hide();
      var dayIds = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
      var dateIds = ['first', 'second', 'third', 'fourth', 'fifth'];
      for(var i = 0; i < 5; i++) {
        $('#' + dateIds[i] + 'Date').text(dates[i])
        $('#' + dayIds[i]).text('Average temperature: ' + avgTemps[i]);
      }
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);
    });
  });
});
