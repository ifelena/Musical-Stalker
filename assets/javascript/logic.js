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

  // function similarArtists(){
  //   $.ajax({
  //     type: "GET",
  //     url: "http://api.musicgraph.com/api/v2/artist/search?api_key=" + musicGraphKey + "&name=" + artists,
  //   }).done(function(response){
  // }
  



  function callMusicGraph(){
    $.ajax({
      type: "GET",
      url: "http://api.musicgraph.com/api/v2/artist/search?api_key=" + musicGraphKey + "&name=" + artists,
    }).done(function(response){
      var musicGraphGenre = response.data[0].main_genre + " Music";
      $("#topNameHeader").text(response.data[0].name);
      console.log(response);
      
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
          // console.log(userCords);
          // console.log(userCords.latitude);
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
  

   // where input from text box is bandName
  function napSearch() {
  
    var audiolink;
         var media;
         var bandName = artists;
         var queryURL = "https://api.napster.com/v2.2/search?apikey=OTM2NzJhM2ItNTAyNS00NGRhLTk5YTMtNDA5MzA3ZDllYzQ1&query=" +bandName+ "&type=artist";     
         $.ajax({
           url: queryURL,
           method: "GET"
         }).done(function(response) {
             // console.log(response);

           if (response.order)
             response=response.order[0];

            console.log(response.search.order[0]);

            var bandID=(response.search.order[0]);
             //randomizer
            var x = Math.floor((Math.random() * response.search.data.artists[0].blurbs.length) + 1);

             //need to create randomizer here to grab random blurbs
            $('#artistData').html(response.search.data.artists[0].blurbs[0] +"</p><br><p>" + response.search.data.artists[0].blurbs[1]+"</p><br><p>" + response.search.data.artists[0].blurbs[2]);
               
               // console.log(artistData);

         // Taking band Id capured and using it to find specefic tracks to play.
         
         queryURL = "https://api.napster.com/v2.2/artists/" + bandID + "/tracks?apikey=OTM2NzJhM2ItNTAyNS00NGRhLTk5YTMtNDA5MzA3ZDllYzQ1&limit=2";

                var result;

                $.get( queryURL, function( data ) {
                  $( "#result" ).html( data );
                  console.log(result);
                    });

         $.ajax({
           url: queryURL,
           method: "GET"
         }).done(function(response) {
           

           if (response.previewURL)
             response=response.tracks["0"].previewURL;

              console.log(response.tracks["0"].previewURL);
              
              $('#result').text(response.tracks["0"].previewURL);

              var a = $("<div>");
          
           // Adding a data-attribu

              console.log(response.tracks["0"].previewURL);

              $(".amazingaudioplayer-source").append(`
                  <video controls autoplay name="media">
                    <source src=${response.tracks["0"].previewURL} audio_source type="audio/mpeg">
                  </video>
              `)

              $(".audio_source").attr("src", response.tracks[0].previewURL);

              function load(){
              window.location.href = "amazingaudioplayer-source";
              }

            }) //closes done function
        });
      }
  // CLOSES NAPSTER API ++++++++++++++++++++++++++++++++++++++++++++++++++

  	
  		  	
  	var artists = "";
    var location = "";

  



  	$("#addArtist").on("click", function(event) {
  	 	event.preventDefault();


      //Grabbed & Clear values from text boxes
      artists = $("#artist-input").val().trim();
      // var location = $("#location-input").val().trim();
      $("#artist-input").val("");
      // $("#location-input").val("");


      // Music Graph Call
      callMusicGraph();


      console.log('before', searches);
      searches.splice(4);
      searches.splice(0,0,artists);
      console.log('after', searches);
      
      database.ref("searches").set(searches);

     // (Ife) Search Bands in Town for artists name and return tourdates
      var queryURL = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp";
         $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"
          }).done(function(response) {
            
            $('tbody#test').html('');
            var trHTML = '';

            $.each(response, function(i, item) {
                if (i === 5) {
                  return false;
                }
                trHTML += 
                '<tr><td>' + artists +
                '</td><td>' + item.datetime + 
                '</td><td>' + item.venue.name + 
                '</td></tr>' 
            });

            $('tbody#test').append(trHTML)


          }).fail(function() {
            $('#no-response').text('No Upcoming Shows, Sorry Stalker! Check out some new places on the map below');
          });      
          // End Bands in Town logic 

          // CALL NAPSTER API ++++++++ LOGIC ABOVE
          napSearch()



      });
    // END CLICK FUNCTION



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