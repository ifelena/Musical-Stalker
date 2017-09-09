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



  	
  		  	
  	var artists = "";

  


  	 $("#addArtist").on("click", function(event) {
  	 	event.preventDefault()
      console.log("Button was clicked");

      // Grabbed values from text boxes
      var artists = $("#artist-input").val().trim();
      console.log("artists", artists)

      var artistData = {
      	name: artists
      }
      
      database.ref().push(artistData)
});
      
     

    

  	     database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
    
      var sv = snapshot.val();

      // Console.loging the last user's data
      //console.log(sv.artists);
      



      $("#searchDisplay").html(sv.name);
      

     
    }); 
});