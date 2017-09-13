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


  	
  		  	
  	var artists = "";

  


  	 $("#addArtist").on("click", function(event) {
  	 	event.preventDefault()
      console.log("Button was clicked");

      //Grabbed values from text boxes
      var artists = $("#artist-input").val().trim();
      console.log("artists", artists)


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
      



      $("#searchDisplay").html(searches.length > 0 ? searches[4] : "nothing");
      

     
    }); 
});
