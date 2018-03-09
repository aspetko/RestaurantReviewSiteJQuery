// Helper for decentralized development
////////////////////////////////////////////////////
var onSpot = false;
// var onSpot = true;

////////////////////////////////////////////////////////////
// Make a real world application using Haversine algorithm
var rad = function(x) {
    return x * Math.PI / 180;
};

var getDistanceInMeter = function(p1, lat,lng) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(lat - p1.lat());
    var dLong = rad(lng - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

// Global Variables
//////////////////////
var bounds;
var filterRestaurants;
var map;
var service;
var infowindow;
var position;
var restaurantIcon;

// Marker Icon
//////////////////////
function createIcon() {
    return {
        // url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        size: new google.maps.Size(71, 71),
        url: "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
    };
}

var restaurants = [
    {
            "id": "ChIJJ4gGYsALnkcRyIw7cQY2hwo",
            "restaurantName": "Ivvi's Bistro",
            "address_street": "Westendstraße 1",
            "address_city": "85551 Kirchheim bei München",
            "lat": "48.174702",
            "lng": "11.750214",
            "stars": 4,
            "heading": 34,
            "pitch": 10,
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
        "id": "ChIJweMU9sALnkcRGbNQiDWqskk",
        "restaurantName": "Indisches Restaurant Shiva",
        "address_street": "Am Brunnen 17",
        "address_city": "85551 Kirchheim bei München",
        "lat": "48.174033",
        "lng": "11.750664",
        "stars": 5,
        "heading": 34,
        "pitch": 10,
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
        "id": "ChIJBZOi5MELnkcRCz99WgCIHRI",
        "restaurantName": "Restaurant Olympia<br> Griechisches Restaurant",
        "address_street": "Heimstettner Str. 2",
        "address_city": "85551 Kirchheim",
        "lat": "48.175984",
        "lng": "11.752758",
        "stars": 5,
        "heading": 34,
        "pitch": 10,
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
        "id": "ChIJrwcr4cELnkcRxCxUuRM98pE",
        "restaurantName": "s`Kiramer Wirtshäusl",
        "address_street": "Münchener Strasse 5a",
        "address_city": "85551 Kirchheim bei München",
        "lat": "48.176406",
        "lng": "11.754196",
        "stars": 5,
        "heading": 34,
        "pitch": 10,
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
        "id": "ChIJ9-RYAuoLnkcRI6u-_Qgz8NM",
        "restaurantName": "Gasthof Neuwirt",
        "address_street": "Erdinger Str. 2",
        "address_city": "85551 Kirchheim bei München",
        "lat": "48.177089",
        "lng": "11.756471",
        "stars": 5,
        "heading": 34,
        "pitch": 10,
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
        "lng": "11.761715",
        "stars": 5,
        "heading": 34,
        "pitch": 10,
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
        "lng": "-115.2383485",
        "stars": 5,
        "heading": 34,
        "pitch": 10,
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
        "lng": "-74.0059730",
        "stars": 5,
        "heading": 34,
        "pitch": 10,
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

function displayCoordinates(pnt) {
    var lat = pnt.lat();
    // lat = lat.toFixed(4);
    var lng = pnt.lng();
    // lng = lng.toFixed(4);
    // console.log("Latitude: " + lat + "  Longitude: " + lng);
    // $("#position").innerHTML = '<span>"Latitude: " + lat + "  Longitude: " + lng</span>';
}

/**
 * Filter the restaurant list limited by bounds
 * @param from number of stars that should be present
 * @param to maximum number of stars
 */
function listRestaurants(from, to) {
    $('#restaurants').empty();
    var restaurantDiv = "";

    for (var i = 0; i < filterRestaurants.length; i++) {
        // Check if restaurant is within range of the customer's assumption
        if (filterRestaurants[i].stars >= from && filterRestaurants[i].stars <= to) {
            restaurantDiv += '<div class="restaurant"><h3>' + filterRestaurants[i].restaurantName + '</h3><span>';
            // Draw the stars...
            for (var b = 0; b < 5; b++) {
                // filled one's..
                if (b < filterRestaurants[i].stars) {
                    restaurantDiv += '<span class="glyphicon glyphicon-star" id="restaurantStars" aria-hidden="true"/>';
                } else {
                    // empty one's
                    restaurantDiv += '<span class="glyphicon glyphicon-star-empty" id="restaurantStars2" aria-hidden="true"/>';
                }
            }
            restaurantDiv += '</span><p>' + filterRestaurants[i].address_street + '</p><p>' + filterRestaurants[i].address_city + '</p></div>';
            $('#restaurants').append(restaurantDiv);
            restaurantDiv = "";
        }
    }
}

function dataHelper(result){
    var starsHelper = (result.rating !== undefined? result.rating : "1");
    return {
            "id": result.place_id,
            "restaurantName": result.name,
            "address_street": result.vicinity.substring(0, result.vicinity.indexOf(",")),
            "address_city": result.vicinity.substring(result.vicinity.indexOf(",")),
            "lat": result.geometry.location.lat(),
            "lng": result.geometry.location.lng(),
            "stars": starsHelper,
            "heading": 34,
            "pitch": 10,
            "ratings": [
            ],
            "provided_by": "G"
        };
};



function callback(results, status) {
    filterRestaurants = [];
    restaurantIcon = createIcon();
    var found = false;
    //////////////////////////////////////////
    // First add the most common denominators
    for (var j=0; j<results.length; j++){
        found = false;
        for(var k=0; k<restaurants.length; k++) {
            if (results[j].place_id === restaurants[k].id) {
                restaurants[k].provided_by = "G|A";
                filterRestaurants.push(restaurants[k]);
                found = true;
            }
        }
        if (!found){
            filterRestaurants.push(dataHelper(results[j]));
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Make the list complete by adding my stuff, from the backend...
    for(var my=0; my<restaurants.length; my++) {
        var found = false;
        for (var j=0; j<results.length; j++){
            if (results[j].place_id === restaurants[my].id) {
                found = true;
            }
        }
        if (!found){
            /////////////////////////
            // Add places not known to google but added by the customers. Only local places, please!
            if (getDistanceInMeter(position, restaurants[my].lat, restaurants[my].lng)<1000){
                restaurants[my].provided_by = "A";
                filterRestaurants.push(restaurants[my]);
            }
        }
    }
    ////////////////////////////
    // Debug info:
    // console.log("results", results);
    // console.log("filterRestaurants", filterRestaurants );

    ////////////////////////////////////////
    // Draw the search results on the map
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        bounds = new google.maps.LatLngBounds();
        for (var r=0; r<filterRestaurants.length; r++){
            console.log("filterRestaurants contains:", filterRestaurants[r].restaurantName);

            var marker = new google.maps.Marker({
                map: map,
                icon: restaurantIcon,
                title: filterRestaurants[r].restaurantName,
                position: new google.maps.LatLng(
                    filterRestaurants[r].lat, filterRestaurants[r].lng
                )
            });

            /////////// Click Event Listener
            google.maps.event.addListener(marker, 'click', function(){
                var marker = this;
                console.log("marker", marker.anchorPoint.x);
                var panoramaDiv = document.getElementById('street-view');
                var panorama = new google.maps.StreetViewPanorama(
                    panoramaDiv, {
                        position: marker.getPosition(),
                        pov: {
                             heading: marker.anchorPoint.x,
                             pitch: 10
                         }
                    });
                //////////// Check if Streetview is available
                var streetViewService = new google.maps.StreetViewService();
                var STREETVIEW_MAX_DISTANCE = 1000;

                streetViewService.getPanoramaByLocation(marker.getPosition(), STREETVIEW_MAX_DISTANCE,
                    function (streetViewPanoramaData, status) {
                        if (status === google.maps.StreetViewStatus.OK) {
                            $('#street-view').css("width", "500px");
                            $('#street-view').css("height", "600px");
                            map.setStreetView(panorama);
                        } else {
                            $('#street-view').css("width", "500px");
                            $('#street-view').css("height", "20px");
                            $('#street-view').text("We deeply regret, unfortunately there is no picture available for this establishment.");
                        }
                    });
                $('#title').empty();
                $('#title').append(marker.getTitle());
                $('#reviews').empty();
                $('#showStreetView').modal('show');
            });
            bounds.extend(new google.maps.LatLng( filterRestaurants[r].lat, filterRestaurants[r].lng));
        }
        listRestaurants(1,5);
       map.fitBounds(bounds);
    }
};

function initialize() {
    ////////// Geolocation
    var geocoder = new window.google.maps.Geocoder();
    infoWindow = new window.google.maps.InfoWindow({map: map});

    ///////// Position = Golden Gate Bridge
    position = new google.maps.LatLng(37.820667, -122.478526);

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
                console.log("navigator.geolocation", onSpot, position);
            }, function () {
                infoWindow.setPosition(position);
                infoWindow.setContent("Error: The Geolocation service failed.");
            });
        } else {
            // Browser doesn't support Geolocation
            infoWindow.setPosition(position);
            infoWindow.setContent("Error: Your browser doesn't support geolocation.");
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
        maxZoom: 23,
        minZoom: 3,
        zoom: 15,
        zoomControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
            style: google.maps.ZoomControlStyle.DEFAULT
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //     mapTypeId: google.maps.MapTypeId.SATELLITE
        streetViewControl: false
    };
    map = new google.maps.Map(mapDiv, mapOptions);
    console.log("position", position.toString());
    var request = {
        location: position,
        radius: '1000',
        type: ['restaurant']
    };
    // console.log("request",request.location.toString());
    google.maps.event.addListener(map, 'mousemove', function (event) {
        displayCoordinates(event.latLng);
    });

    ////////////// Limit to the current location...
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    ////////// Add a list of restaurants...
    for (var i = 0 ; i<restaurants.length; i++){
        var marker = new google.maps.Marker(
            {
                restaurant_id: restaurants[i].id,
                position:  new google.maps.LatLng(
                    restaurants[i].lat,
                    restaurants[i].lng
                ),
                map: map,
                title: restaurants[i].restaurantName
            });
        // marker.setValues({ locations});

        //Add listener
        google.maps.event.addListener(map, 'click', function( event ){
            console.log("leCut", "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() );
            $('#addRestaurant').modal('show');
        });

        //  filter

        //     // Check if restaurant is on map ...
        // if (bounds.contains(new google.maps.LatLng(restaurants[i].lat, restaurants[i].lng))) {
            /////////// Click Event Listener
            google.maps.event.addListener(marker, 'click', function(){
                var marker = this;
                console.log("Clickevent called");
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
                            $('#street-view').css("width", "500px");
                            $('#street-view').css("height", "20px");
                            $('#street-view').text("We deeply regret, unfortunately there is no picture available for this establishment.");
                        }
                    });
                $('#title').empty();
                $('#title').append(marker.getTitle());
                $('#showStreetView').modal('show');
                console.log('restaurant_id', marker.get('restaurant_id'));
            });
        // } else {
        //     console.log("outBounds:", locations[i].name);
        // }
    //     // bounds.extend(restaurants[i].latlng);
    }
    // map.fitBounds(bounds);

}

function selectionChanged(){
    try{
        var from = $("#fromStars").val();
        var to = $("#toStars").val();
        listRestaurants(from, to);
    } catch(err){
        console.error(err);
    }
}
