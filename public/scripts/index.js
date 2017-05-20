$(document).ready(function () {

  $.ajax({
    type: "GET",
    url: "https://jsonip.com",
    dataType: "json",
    success: function(data) {
      var ipAddress = data.ip;
      $('.location').text("IP Address: " + ipAddress);
    }
  })

  $.ajax({
    type: "GET",
    url: "http://ip-api.com/json",
    dataType: "json",
    success: function(data) {
      var longitude = data.lon;
      var latitude = data.lat;
      $('.longlat').text("Longitude: " + longitude + "     Latitude: " + latitude)
    }
  })

  $.ajax({
    type: "GET",
    url: "http://www.flickr.com/services/feeds/photos_public.gne?tags=puggle&format=json",
    dataType: "jsonp",
    data: {format: "json"}
  })

  jsonFlickrFeed = function(data) {
    var x = data.items[1].media["m"].replace(/_m/, "");
    $('body').css('background', 'url("' + x + '") no-repeat center center fixed');
    $('body').css('background-size', 'cover')
  }

  $('form').on("submit", function (e) {
    var place = $(this).serialize().replace("location=", "").toLowerCase();  // This is better with a big form
    // var place = $("input[type=text]").val().replace(/( )/, "").toLowerCase();
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + process.env.OPENWEATHERMAP,
      success: function(data) {
        var weather = data.weather[0].main;
        console.log(weather);
        if ( weather === "Clouds")
          $('.message').text("Cloudy with a chance of furballs");
        else if ( weather === "Rain")
          $('.message').text("It's raining cats and dogs");
        else if ( weather === "Clear")
          $('.message').text("I need a dog pun about the sun...");
        else
          $('.message').text("It's ruff out there");

        $('.weather-report').html(fahrenheit(data.main.temp) + " &#186; F");

      }
    })
    e.preventDefault();
  })

  var fahrenheit = function (data) {
    return (9/5*(Number(data) - 273) + 32).toFixed(0);
  }

});
