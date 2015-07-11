$(document).ready(function () {

  $.ajax({
    type: "GET",
    url: "http://jsonplaceholder.typicode.com/posts/1",
    datatype: "json",
    success: function(data) {
      console.log(data.title);
    }
  })

  $.ajax({
    type: "GET",
    url: "http://jsonip.com",
    dataType: "json",
    success: function(data) {
      var ipAddress = data.ip;
      $('.location').text(ipAddress);
    }
  })

  $.ajax({
    type: "GET",
    url: "http://www.telize.com/geoip?callback=",
    dataType: "json",
    success: function(data) {
      var longitude = data.longitude;
      var latitude = data.latitude;
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
    var x = data.items[18].media["m"].replace(/_m/, "");
    $('body').css('background', 'url("' + x + '") no-repeat center center fixed');
    $('body').css('background-size', 'cover')
  }

  $('form').on("submit", function (e) {
    var place = $(this).serialize().replace("location=", "").toLowerCase();  // This is better with a big form
    // var place = $("input[type=text]").val().replace(/( )/, "").toLowerCase();
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + place,
      success: function(data) {
        var weather = data.weather[0].main;
        console.log(weather);
        if ( weather === "Cloudy Or Clouds")
          $('.message').text("Cloudy with a chance of furballs");
        else if ( weather === "Rain")
          $('.message').text("It's raining cats and dogs");
        else if ( weather === "Clear")
          $('.message').text("I need a dog pun about the sun...");
        else
          $('.message').text("It's ruff out there");
      }
    })
    e.preventDefault();
  })

});
