$(document).ready(function(){
    var config = {
    apiKey: "AIzaSyAqc7CcXb6NsIXUa8KY21zvKrB7Zgk6oBM",
    authDomain: "music-stalker.firebaseapp.com",
    databaseURL: "https://music-stalker.firebaseio.com",
    projectId: "music-stalker",
    storageBucket: "music-stalker.appspot.com",
    messagingSenderId: "685713629052"
  };
  firebase.initializeApp(config);

  // console.log(firebase);

  var database = firebase.database();
  var searches = [""];


  // basic artist lookup & get to main genre
  var musicGraphKey = "15ad1c68b6d53829ad83e71ac3c5a746";

  
  function callMusicGraph(){
    $.ajax({
      type: "GET",
      url: "http://api.musicgraph.com/api/v2/artist/search?api_key=" + musicGraphKey + "&name=" + artists,
    }).done(function(response){
      var musicGraphGenre = response.data[0].main_genre + " Music";
      console.log(musicGraphGenre);
      
      // Edit DOM with artist name
      $("#venuesHeader").text("You are stalking " + artists + ", here are some places you may enjoy skulking about:");

      // Update map from artist
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
            zoom: 12,
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
            keyword: [musicGraphGenre],
            type: ['bars']
          }, callback2);

          function callback2(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
                // console.log(results[i]);
                // console.log(musicGraphGenre);
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

        } //closes "success"

        // Get the user's current position
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
          alert('Geolocation is not supported in your browser');
      }  //closes all if else

    }); 

    } //Closes function musicGraph
  

  	
  		  	
  	var artists = "";
    var location = "";

  


  	$("#addArtist").on("click", function(event) {
  	 	event.preventDefault()

      //Grabbed & Clear values from text boxes
      artists = $("#artist-input").val().trim();
      // var location = $("#location-input").val().trim();
      $("#artist-input").val("");
      // $("#location-input").val("");


      // Music Graph Call
      callMusicGraph();


      console.log('before', searches)
      searches.splice(4)
      searches.splice(0,0,artists);
      console.log('after', searches)
      
      database.ref("searches").set(searches)
    });
      
     

    

  	 database.ref("searches").on("value", function(snapshot) {
    
       searches = snapshot.val();
       if (!searches) searches=[];
       console.log(searches);

      // Console.loging the last user's data
      console.log(searches);
      



      $("#searchDisplay").html(searches.length > 0 ? searches[1] : "nothing");


      //for (var i = 0; i<searches.length; i++) {
         // console.log(searches[""]);

        
        
      
      //}

     
    }); 
});

//