$(document).ready(function(){

  var googlePlacesKey ="AIzaSyBFRWN8PVL2qv6q8xUl096GVi-Lp5TDdeQ";


  // Press Genre Button

  $(".waves-effect.waves-light.btn").on("click", function(event){
    event.preventDefault();
    genreBtnInput = $(this).attr("genre");
    console.log(genreBtnInput);

    // Edit DOM with artist name
    $("#venuesHeader").text("You are stalking " + genreBtnInput + ", here are some places you may enjoy skulking about:");


    //Start geolocation

    var pos;
    var userCords;
    var tempMarkerHolder = [];

    if (navigator.geolocation) {    
      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }

      function success(pos){
        userCords = pos.coords;
        console.log(userCords);
        console.log(userCords.latitude);
        //return userCords;

        var mapOptions = {
          zoom: 11,
          // Center on geolocation
          center: new google.maps.LatLng(userCords.latitude, userCords.longitude),
          panControl: true,
          panControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
          },
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
          },
          scaleControl: true
        };

        // Fire up Google Maps
        map = new google.maps.Map(document.getElementById('relatedVenues'), mapOptions);

        var locationLatLong = {lat: userCords.latitude, lng: userCords.longitude};

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: locationLatLong,
          radius: 10000,
          keyword: [genreBtnInput],
          type: ['bars']
        }, callback1);

      } //closes "success"

      // Get the user's current position
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocation is not supported in your browser');
    }  //closes all if else

  });  //closes if function

});







// INITIAL Google Places API

  var map;
  var infowindow;

  function initMap() {
    var denver = {lat: 39.7392, lng: -104.9903};

    map = new google.maps.Map(document.getElementById('relatedVenues'), {
      center: denver,
      zoom: 3
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    // service.nearbySearch({
    //   location: denver,
    //   radius: 5000,
    //   keyword: ['punk'],
    //   type: ['restaurant']
    // });
  }

  function callback1(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }



