var musicGraphKey = "  15ad1c68b6d53829ad83e71ac3c5a746";
var artist = "sublime";
  
var googlePlacesKey ="  AIzaSyBFRWN8PVL2qv6q8xUl096GVi-Lp5TDdeQ";
  
  
  // basic artist lookup & get to main genre
function callMusicGraph(){
  $.ajax({
    type: "GET",
    url: "http://api.musicgraph.com/api/v2/  artist/search?api_key=" + musicGraphKey +   "&name=" + artist,
  }).done(function(response){
    var genre = response.data[0].main_genre;
    console.log(genre);
  });
}

callMusicGraph();


// Google Places API

var map;
var infowindow;

function initMap() {
  var denver = {lat: 39.7392, lng: -104.9903};

  map = new google.maps.Map(document.getElementById('relatedVenues'), {
    center: denver,
    zoom: 13
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: denver,
    radius: 5000,
    keyword: ['punk'],
    type: ['restaurant']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      // console.log(results[i]);
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