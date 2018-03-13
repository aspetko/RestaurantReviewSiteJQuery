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
var infoWindow;
var position;
var restaurantIcon;
var restaurants = [];
var geocoder;

// Marker Icon
//////////////////////
function createIcon() {
    return {
        url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
    };
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
            // "heading": 34,
            // "pitch": 10,
            "ratings": [
            ],
            "provided_by": "G"
        };
};

/**
 * Callback for filtering restaurants.
 * @param results found places by google
 * @param status
 */
function callback(results, status) {
    filterRestaurants = [];
    restaurantIcon = createIcon();
    //////////////////////////////////////////
    // First add the most common denominators
    for (var j=0; j<results.length; j++){
        filterRestaurants.push(dataHelper(results[j]));
    }

    ////////////////////////////////////////
    // Draw the search results on the map
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        bounds = new google.maps.LatLngBounds();
        for (var r=0; r<filterRestaurants.length; r++){
            // console.log("filterRestaurants contains:", filterRestaurants[r].restaurantName);

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
                console.log("marker2", marker);
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
                            $('#showStreetView').modal('show');
                            $('#showStreetView').on('hidden.bs.modal', function () {
                                $('#street-view').empty();
                                $('#title').empty();
                            });
                            console.log("StreetViewStatus", "1Show Photo of "+marker.getTitle());
                        } else {
                            console.log("StreetViewStatus", "1no picture available for "+marker.getTitle());
                            $('#street-view').css("width", "500px");
                            $('#street-view').css("height", "20px");
                            $('#street-view').text("We deeply regret, unfortunately there is no picture available for this establishment.");
                            $('#showStreetViewNotAvailible').modal('show');
                            $('#showStreetViewNotAvailible').on('hidden.bs.modal', function () {
                                $('#street-view').empty();
                                $('#title').empty();
                            })

                        }
                    });
                $('#title').append(marker.getTitle());
                $('#reviews').empty();
                $('#reviews').append("<p>Hello World</p>");

            });
            bounds.extend(new google.maps.LatLng( filterRestaurants[r].lat, filterRestaurants[r].lng));
        }
        listRestaurants(1,5);
        map.fitBounds(bounds);
    }

}

function callbackOrig(results, status) {
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
            // console.log("filterRestaurants contains:", filterRestaurants[r].restaurantName);

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
                console.log("marker2", marker);
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
                            $('#showStreetView').modal('show');
                            $('#showStreetView').on('hidden.bs.modal', function () {
                                $('#street-view').empty();
                                $('#title').empty();
                            });
                        } else {
                            $('#street-view').css("width", "500px");
                            $('#street-view').css("height", "20px");
                            $('#street-view').text("We deeply regret, unfortunately there is no picture available for this establishment.");
                            $('#showStreetViewNotAvailible').modal('show');
                            $('#showStreetViewNotAvailible').on('hidden.bs.modal', function () {
                                $('#street-view').empty();
                                $('#title').empty();
                            })

                        }
                    });
                $('#title').append(marker.getTitle());
                $('#reviews').empty();
            });
            bounds.extend(new google.maps.LatLng( filterRestaurants[r].lat, filterRestaurants[r].lng));
        }
        listRestaurants(1,5);
       map.fitBounds(bounds);
    }
};

function restoreOptions(controlPosition, zoomControlStyle, mapTypeId){
    return {
        center: position,
        disableDefaultUI: false,
        scrollWheel: true,
        draggable: true,
        maxZoom: 23,
        minZoom: 3,
        zoom: 15,
        zoomControlOptions: {
            position: controlPosition,
            style: zoomControlStyle
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
    };
}

function displayCoordinates(pnt) {
    var lat = pnt.lat();
    // lat = lat.toFixed(4);
    var lng = pnt.lng();
    // lng = lng.toFixed(4);
    // console.log("Latitude: " + lat + "  Longitude: " + lng);
    $("#position").empty();
    $("#position").append('<p>'+pnt.lat()+ ", " + pnt.lng()+'</p>');
}
function displayBounds(bounds) {
    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();
    $("#bounds_northEast").empty();
    $("#bounds_southWest").empty();
    $("#bounds_northEast").append('<p>'+southWest.lat()+ ", " + southWest.lng()+'</p>');
    $("#bounds_southWest").append('<p>'+northEast.lat()+ ", " + northEast.lng()+'</p>');
}

function addRestaurantDialog( event ){
    position = new google.maps.LatLng(
        event.latLng.lat(), event.latLng.lng()
    );
    geocoder.geocode({'location': position}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                var input = results[0].formatted_address;
                var addressStr = input.split(',', 3);
                $("#streetRestaurantNew").val( addressStr[0].trim());
                $("#cityRestaurantNew").val( addressStr[1].trim());
            } else {
                $("#cityRestaurantNew").val( 'No results found');
            }
        } else {
            $("#cityRestaurantNew").val('Geocoder failed due to: ' + status);
        }
    });
    // $("#nameRestaurantNew").val("nameRestaurantNew");
    $("#gpsRestaurantNew").val(position.lat() +' / '+ position.lng());
    // $("#starsRestaurantNew").val("starsRestaurantNew");
    // $("#ratingRestaurantNew").val("ratingRestaurantNew");
    $('#addRestaurant').modal('show');
}

function fallback(){
    console.log("Using Fallback");
    position = new google.maps.LatLng(48.171229, 11.746022);
    infoWindow.setPosition(position);
    infoWindow.setContent("Location found.");
    infoWindow.open(map);
    $("#position").innerHTML = '<span>48.171229, 11.746022</span>';
}



function initialize() {
    ////////// Geolocation
    geocoder = new window.google.maps.Geocoder();
    infoWindow = new window.google.maps.InfoWindow({map: map});

    ///////// Position = Golden Gate Bridge
    position = new google.maps.LatLng(37.820667, -122.478526);

    // Try HTML5 geolocation.
    if (onSpot){
        UsingHTML5Geolocation();
        console.log("Using HTML5 geolocation");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (thePosition) {
                position = {
                    lat: thePosition.coords.latitude,
                    lng: thePosition.coords.longitude
                };
                infoWindow.setPosition(position);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                console.log("Location found.");
                map.setCenter(position);
                $("#position").empty();
                $("#position").innerHTML = '<span>thePosition.coords.latitude+ ", " + thePosition.coords.longitude</span>';
                console.log("navigator.geolocation", onSpot, position);
            }, function () {
                infoWindow.setPosition(position);
                infoWindow.setContent("Error: The Geolocation service failed.");
            });
        } else {
            browserDoesntSupportGeoLocation();
            // Browser doesn't support Geolocation
            infoWindow.setPosition(position);
            infoWindow.setContent("Error: Your browser doesn't support geolocation.");
            infoWindow.open(map);
        }
    } else { // Set the loaction to fallback
        fallback();
    }
    /////// Display basic map
    var mapDiv = document.getElementById("mymap");
    var mapOptions = restoreOptions(google.maps.ControlPosition.BOTTOM_LEFT,
        google.maps.ZoomControlStyle.DEFAULT,
        google.maps.MapTypeId.ROADMAP
        //     mapTypeId: google.maps.MapTypeId.SATELLITE
    );
    map = new google.maps.Map(mapDiv, mapOptions);
    var request = {
        location: position,
        radius: '1000',
        type: ['restaurant']
    };
    //Add listener
    google.maps.event.addListener(map, 'click', addRestaurantDialog);
    // console.log("request",request.location.toString());
    google.maps.event.addListener(map, 'bounds_changed', function () {
        displayBounds(map.getBounds());
        var from = $("#fromStars").val();
        var to = $("#toStars").val();
        // listRestaurants(from, to);
    });
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
                        position: marker.getPosition()
                        // ,
                        // pov: {
                        //     heading: 34,
                        //     pitch: 10
                        // }
                    });
                //////////// Check if Streetview is available
                var streetViewService = new google.maps.StreetViewService();
                var STREETVIEW_MAX_DISTANCE = 100;

                streetViewService.getPanoramaByLocation(marker.getPosition(), STREETVIEW_MAX_DISTANCE,
                    function (streetViewPanoramaData, status) {
                        if (status === google.maps.StreetViewStatus.OK) {
                            console.log("StreetViewStatus", "Show Photo");
                            map.setStreetView(panorama);
                        } else {
                            console.log("StreetViewStatus", "no picture available");
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

function load(item){
    return JSON.parse(sessionStorage.getItem(item));
}

function save(item, restaurants){
    sessionStorage.setItem('restaurants', JSON.stringify(restaurants));
}

function memoryDump(item){
    console.log(item, JSON.parse(sessionStorage.getItem(item)));
}

function saveRestaurant(){
    var marker = new google.maps.Marker({
            restaurant_id: -1,
            position:  position,
            map: map,
            title: $("#nameRestaurantNew").val()
    });
    $('#addRestaurant').modal('hide');
    var restaurants = load('restaurants');
    restaurants.push({
            "id": -1,
            "restaurantName": $("#nameRestaurantNew").val(),
            "address_street": $("#streetRestaurantNew").val(),
            "address_city": $("#cityRestaurantNew").val(),
            "lat": position.lat(),
            "lng": position.lng(),
            "stars": $("#starsRestaurantNew").val(),
            // "heading": 34,
            // "pitch": 10,
            "ratings": [{
                "stars": $("#starsRatingRestaurantNew").val(),
                "comment": $("#ratingRestaurantTextNew").val()
            }
            ],
            "provided_by": "XXP"
    });
    save('restaurants', restaurants);
    memoryDump('restaurants');

    ///////////////////////////
    // Reseting Dialog Values
    $("#streetRestaurantNew").val("");
    $("#cityRestaurantNew").val("");
    $("#nameRestaurantNew").val("");
    $("#gpsRestaurantNew").val("");
    $("#starsRestaurantNew").val("");
    $("#ratingRestaurantNew").val("");

}
