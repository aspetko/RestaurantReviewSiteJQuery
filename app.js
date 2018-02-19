var restaurants = [
  {
    "restaurantName": "Bronco",
    "address_street": "39 Rue des Petites Écuries",
    "address_city": "75010 Paris",
    "lat": "48.8737815",
    "long": "2.3501649",
    "stars": 4,
    "ratings": [
      {
        "stars": "4",
        "comment": "Great! But not many veggie options."
      },
      {
        "stars": "5",
        "comment": "My favorite restaurant!"
      }
    ]
  },
  {
    "restaurantName": "Babalou",
    "address_street": "4 Rue Lamarck",
    "address_city": "75018 Paris",
    "lat": "48.8865035",
    "long": "2.3442197",
    "stars": 5,
    "ratings": [
      {
        "stars": "5",
        "comment": "Tiny pizzeria next to Sacre Coeur!"
      },
      {
        "stars": "3",
        "comment": "Meh, it was fine."
      }
    ]
  }
]

function fromSelectionChanged(){
    console.log("fromSelectionChanged()");
    listRestaurants(1,5);
}

function toSelectionChanged(){
    console.log("toSelectionChanged()");
    listRestaurants(1,5);
}

function listRestaurants(from, to) {
    $('#restaurants').empty();
    var restaurantDiv = "";
    for(var i=0; i< restaurants.length; i++) {
        if (restaurants[i].stars >= from && restaurants[i].stars<= to) {
            restaurantDiv += '<div class="restaurant"><h1>' + restaurants[i].restaurantName + ' <span>';
            for (var b = 0; b < 5; b++) {
                if (b < restaurants[i].stars) {
                    restaurantDiv += '<span class="glyphicon glyphicon-star" id="restaurantStars" aria-hidden="true"/>';
                } else {
                    restaurantDiv += '<span class="glyphicon glyphicon-star-empty" id="restaurantStars2" aria-hidden="true"/>';
                }
            }
            restaurantDiv += '</span></h1><p>' + restaurants[i].address_street + '</p><p>' + restaurants[i].address_city + '</p></div>';

            for (var j = 0; j < restaurants[i].ratings.length; j++) {
                restaurantDiv += '<hr>';
                for (var a = 0; a < 5; a++) {
                    if (a < restaurants[i].ratings[j].stars) {
                        restaurantDiv += '<span class="glyphicon glyphicon-star" aria-hidden="true"/>';
                    } else {
                        restaurantDiv += '<span class="glyphicon glyphicon-star-empty" aria-hidden="true"/>';
                    }
                }
                restaurantDiv += '<br>' + restaurants[i].ratings[j].comment;
            }

            $('#restaurants').append(restaurantDiv);
            restaurantDiv = "";
        }
    }
}








listRestaurants(1,5);

function initialize() {
    ///////// Position = Golden Gate Bridge
    var position = new google.maps.LatLng(37.820667, -122.478526);

    /////// Display basic map
    var mapDiv = document.getElementById("mymap");
    console.log("mapDiv", mapDiv);
    var mapOptions = {
        center: position,
        disableDefaultUI: false,
        scrollWheel: true,
        draggable: true,
        maxZoom: 15,
        minZoom: 3,
        zoom: 15,
        zoomControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
            style: google.maps.ZoomControlStyle.DEFAULT
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
        //     mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    var map = new google.maps.Map(mapDiv, mapOptions);
}