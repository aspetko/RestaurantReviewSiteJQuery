var MapObject = {

  /**
   * Filter the restaurant list limited by bounds
   * @param from number of stars that should be present
   * @param to maximum number of stars
   */
    listRestaurants:function() {
      var from = Storage.load(Storage.FROM_STARS);
      var to = Storage.load(Storage.TO_STARS);
      $('#restaurants').empty();
      var restaurantDiv = "";
      var restaurants = Storage.load(Storage.RESTAURANTS);
      for (var i = 0; i < restaurants.length; i++) {
          // Check if restaurant is within range of the customer's assumption
          if (restaurants[i].stars >= from && restaurants[i].stars <= to) {
              restaurantDiv += '<div class="restaurant"><h3>' + restaurants[i].restaurantName + '</h3><span>';
              // Draw the stars...
              for (var b = 0; b < 5; b++) {
                  // filled one's..
                  if (b < restaurants[i].stars) {
                      restaurantDiv += '<span class="glyphicon glyphicon-star" id="restaurantStars" aria-hidden="true"/>';
                  } else {
                      // empty one's
                      restaurantDiv += '<span class="glyphicon glyphicon-star-empty" id="restaurantStars2" aria-hidden="true"/>';
                  }
              }
              restaurantDiv += '</span><p>' + restaurants[i].address_street + '</p><p>' + restaurants[i].address_city + '</p></div>';
              $('#restaurants').append(restaurantDiv);
              restaurantDiv = "";
          }
      }
  },
  fallback:function(){
    console.log("Using Fallback");
    position = new google.maps.LatLng(48.171229, 11.746022);
    infoWindow.setPosition(position);
    infoWindow.setContent("Location found.");
    infoWindow.open(map);
    $("#position").innerHTML = '<span>48.171229, 11.746022</span>';
  }

};
