var filterBounds;
// var restaurants = [
//     {
//         "restaurantName": "Bronco",
//         "address_street": "39 Rue des Petites Écuries",
//         "address_city": "75010 Paris",
//         "lat": "48.8737815",
//         "long": "2.3501649",
//         "stars": 4,
//         "ratings": [
//             {
//                 "stars": "4",
//                 "comment": "Great! But not many veggie options."
//             },
//             {
//                 "stars": "5",
//                 "comment": "My favorite restaurant!"
//             }
//         ]
//     },
//     {
//         "restaurantName": "Babalou",
//         "address_street": "4 Rue Lamarck",
//         "address_city": "75018 Paris",
//         "lat": "48.8865035",
//         "long": "2.3442197",
//         "stars": 5,
//         "ratings": [
//             {
//                 "stars": "5",
//                 "comment": "Tiny pizzeria next to Sacre Coeur!"
//             },
//             {
//                 "stars": "3",
//                 "comment": "Meh, it was fine."
//             }
//         ]
//     }
// ];

var restaurants = [
        {
            "id": 1,
            "restaurantName": "Ivvi's Bistro",
            "address_street": "Westendstraße 1",
            "address_city": "85551 Kirchheim bei München",
            "lat": "48.174702",
            "long": "11.750214",
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
            "id": 2,
            "restaurantName": "Indisches Restaurant Shiva",
            "address_street": "Am Brunnen 17",
            "address_city": "85551 Kirchheim bei München",
            "lat": "48.174033",
            "long": "11.750664",
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
        },
        {
            "id": 3,
            "restaurantName": "Restaurant Olympia<br> Griechisches Restaurant",
            "address_street": "Heimstettner Str. 2",
            "address_city": "85551 Kirchheim",
            "lat": "48.175984",
            "long": "11.752758",
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
        },
        {
            "id": 4,
            "restaurantName": "s`Kiramer Wirtshäusl",
            "address_street": "Münchener Strasse 5a",
            "address_city": "85551 Kirchheim bei München",
            "lat": "48.176406",
            "long": "11.754196",
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
        },
        {
            "id": 5,
            "restaurantName": "Gasthof Neuwirt",
            "address_street": "Erdinger Str. 2",
            "address_city": "85551 Kirchheim bei München",
            "lat": "48.177089",
            "long": "11.756471",
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
        },
        {
            "id": 6,
            "restaurantName": "KSC Geschäftsstelle Kirchheimer Sport-Club e.V.",
            "address_street": "Florianstraße 26",
            "address_city": "85551 Kirchheim bei München",
            "lat": "48.174498",
            "long": "11.761715",
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
        },
        {
            "id": 7,
            "restaurantName": "Las Vegas - Should not show!",
            "address_street": "If this shows up, we did not filter the list correct!",
            "address_city": "Las Vegas",
            "lat": "36.255123",
            "long": "-115.2383485",
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
        },
        {
            "id": 8,
            "restaurantName": "New York - Should not show either!",
            "address_street": "I always want to fly 9 hours to get a '7 Layer Burrito'",
            "address_city": "New York",
            "lat": "40.7143528",
            "long": "-74.0059730",
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
    ];
// console.log(JSON.stringify(restaurants, null, 2));



// function listRestaurants(from, to) {
//     $('#restaurants').empty();
//     var restaurantDiv = "";
//     for(var i=0; i< restaurants.length; i++) {
//         if (restaurants[i].stars >= from && restaurants[i].stars<= to) {
//             restaurantDiv += '<div class="restaurant"><h1>' + restaurants[i].restaurantName + ' <span>';
//             for (var b = 0; b < 5; b++) {
//                 if (b < restaurants[i].stars) {
//                     restaurantDiv += '<span class="glyphicon glyphicon-star" id="restaurantStars" aria-hidden="true"/>';
//                 } else {
//                     restaurantDiv += '<span class="glyphicon glyphicon-star-empty" id="restaurantStars2" aria-hidden="true"/>';
//                 }
//             }
//             restaurantDiv += '</span></h1><p>' + restaurants[i].address_street + '</p><p>' + restaurants[i].address_city + '</p></div>';
//
//             for (var j = 0; j < restaurants[i].ratings.length; j++) {
//                 restaurantDiv += '<hr>';
//                 for (var a = 0; a < 5; a++) {
//                     if (a < restaurants[i].ratings[j].stars) {
//                         restaurantDiv += '<span class="glyphicon glyphicon-star" aria-hidden="true"/>';
//                     } else {
//                         restaurantDiv += '<span class="glyphicon glyphicon-star-empty" aria-hidden="true"/>';
//                     }
//                 }
//                 restaurantDiv += '<br>' + restaurants[i].ratings[j].comment;
//             }
//
//             $('#restaurants').append(restaurantDiv);
//             restaurantDiv = "";
//         }
//     }
// }

function listRestaurants(from, to, bounds) {
    $('#restaurants').empty();
    var restaurantDiv = "";

    for(var i=0; i< restaurants.length; i++) {
        // Check if restaurant is on map ...
        if (bounds.contains(new google.maps.LatLng(restaurants[i].lat, restaurants[i].long))){
            // Check if restaurant is within range of the customer's assumption
            if (restaurants[i].stars >= from && restaurants[i].stars<= to) {
                restaurantDiv += '<div class="restaurant"><h3>' + restaurants[i].restaurantName + ' <span>';
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
                restaurantDiv += '</span></h3><p>' + restaurants[i].address_street + '</p><p>' + restaurants[i].address_city + '</p></div>';

                $('#restaurants').append(restaurantDiv);
                restaurantDiv = "";
            }
        }

    }
}

// var onSpot = false;
var onSpot = true;

function initialize() {
    ////////// Geolocation
    var geocoder = new window.google.maps.Geocoder();
    var infoWindow = new window.google.maps.InfoWindow({map: map});

    ///////// Position = Golden Gate Bridge
    var position = new google.maps.LatLng(37.820667, -122.478526);

    // Try HTML5 geolocation.
    if (onSpot){
        console.log("Using HTML5 geolocation");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (thePosition) {
                position = {
                    lat: thePosition.coords.latitude,
                    lng: thePosition.coords.longitude
                };
                infoWindow.setPosition(position);
                infoWindow.setContent("Location found.");
                map.setCenter(position);
                console.log("navigator.geolocation", onSpot);
                console.log("position1", position);
            }, function () {
                infoWindow.setPosition(position);
                infoWindow.setContent("Error: The Geolocation service failed.");
                console.log("position2", position);
            });
        } else {
            // Browser doesn't support Geolocation
            infoWindow.setPosition(position);
            infoWindow.setContent("Error: Your browser doesn't support geolocation.");
            console.log("position3", position);
        }
    } else { // Set the loaction to fallback
        console.log("Using Fallback");
        position = new google.maps.LatLng(48.175708, 11.7558223);
    }

    /////// Display basic map
    var mapDiv = document.getElementById("mymap");
    var mapOptions = {
        center: position,
        disableDefaultUI: false,
        scrollWheel: true,
        draggable: true,
        maxZoom: 15,
        minZoom: 3,
        zoom: 15,
        zoomControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
            style: google.maps.ZoomControlStyle.DEFAULT
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //     mapTypeId: google.maps.MapTypeId.SATELLITE
        streetViewControl: false
    };
    var map = new google.maps.Map(mapDiv, mapOptions);

    ////////////// Limit to the current location...
    var bounds = new google.maps.LatLngBounds();
    console.log("bounds", bounds.toString());


    console.log("position4", position.toString());
    var lat = position.lat();
    console.log("lat", lat);
    var lng =  position.lng();
    console.log("lng", lng);


    ////////// Add a list of restaurants...
    var locations = [];
    for (var r=0;r<restaurants.length; r++){
        locations.push({
            locationID: r,
            name: restaurants[r].restaurantName,
            latlng: new google.maps.LatLng(
                restaurants[r].lat,
                restaurants[r].long
            )
        });
    }

    for (var i = 0 ; i<locations.length; i++){
        var marker = new google.maps.Marker({position: locations[i].latlng, map: map, title: locations[i].name});
        marker.setValues({restaurant_id: locations[i].locationID});

        // Check if restaurant is on map ...
        if (bounds.contains(new google.maps.LatLng(restaurants[i].lat, restaurants[i].long))) {
            console.log("inBounds:" , locations[i].name);
            /////////// Click Event Listener
            google.maps.event.addListener(marker, 'click', function(){
                var marker = this;
                var panoramaDiv = document.getElementById('street-view');
                var panorama = new google.maps.StreetViewPanorama(
                    panoramaDiv, {
                        position: marker.getPosition(),
                        pov: {
                            heading: 34,
                            pitch: 10
                        }
                    });
                //////////// Check if Streetview is available
                var streetViewService = new google.maps.StreetViewService();
                var STREETVIEW_MAX_DISTANCE = 100;

                streetViewService.getPanoramaByLocation(marker.getPosition(), STREETVIEW_MAX_DISTANCE,
                    function (streetViewPanoramaData, status) {
                        if (status === google.maps.StreetViewStatus.OK) {
                            map.setStreetView(panorama);
                        } else {
                            panoramaDiv.css("width", "500px");
                            panoramaDiv.css("height", "20px");
                            panoramaDiv.text("We deeply regret, unfortunately there is no picture available for this establishment.");
                        }
                    });
                $('#title').empty();
                $('#title').append(marker.getTitle());
                $('#myModal').modal('show');
                // console.log('restaurant_id', marker.get('restaurant_id'));
            });
        } else {
            console.log("outBounds:", locations[i].name);
        }
        bounds.extend(locations[i].latlng);
    }
    map.fitBounds(bounds);
    filterBounds = bounds;
    listRestaurants(1,5,bounds);
}

function selectionChanged(){
    try{

        var from = $("#fromStars").val();
        var to = $("#toStars").val();
        listRestaurants(from, to, filterBounds);
    } catch(err){
        console.log(err);
    }
}
