var JSONHelper = {
    createRequest:function(position){
        return {
              location: position,
              radius: '1000',
              type: ['restaurant']
          }
    },
    createIcon:function(){
        return {
            url: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
    },
    streetViewHelper:function(lookTo){
        return {
            position: lookTo,
            panControl: false,
            addressControl: false,
            linksControl: false,
            zoomControlOptions: false
        };
    },
    dataHelper:function(result){
        var starsHelper = (result.rating !== undefined? result.rating : "1");
        return {
            "id": result.place_id,
            "restaurantName": result.name,
            "address_street": result.vicinity.substring(0, result.vicinity.indexOf(",")),
            "address_city": result.vicinity.substring(result.vicinity.indexOf(",")),
            "lat": result.geometry.location.lat(),
            "lng": result.geometry.location.lng(),
            "stars": starsHelper,
            "ratings": [
            ]
        };
    },
    createMarker:function(map, result){
        return new google.maps.Marker({
            map: map,
            icon: JSONHelper.createIcon(),
            title: result.name,
            position: new google.maps.LatLng(
                result.geometry.location.lat(), result.geometry.location.lng()
            )
        });
    }
};
