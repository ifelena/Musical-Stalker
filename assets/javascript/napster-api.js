

   // where input from text box is bandName

   $(document).ready()

    var bandName = "green day";
    var queryURL = "http://api.napster.com/v2.2/search?apikey=OTM2NzJhM2ItNTAyNS00NGRhLTk5YTMtNDA5MzA3ZDllYzQ1&query=" +bandName+ "&type=artist";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response);
      if (response.order)
        response=response.order[0];

       console.log(response.search.order[0]);

       var bandID=(response.search.order[0]);
        //randomizer
       var x = Math.floor((Math.random() * response.search.data.artists[0].blurbs.length) + 1);

        //need to create randomizer here to grab random blurbs
       var artistData=(response.search.data.artists[0].blurbs[x-1]);

          console.log(bandID);

          console.log(x);

          console.log(artistData);
           

    // Taking band Id capured and using it to find specefic tracks to play.

  
    queryURL = "http://api.napster.com/v2.2/artists/" + bandID + "/tracks?apikey=OTM2NzJhM2ItNTAyNS00NGRhLTk5YTMtNDA5MzA3ZDllYzQ1&limit=2";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);

      if (response.previewURL)
        response=response.tracks["0"].previewURL;

      console.log(response.tracks["0"].previewURL);


      // document.getElementById("demo").innerHTML = bandID;
      
    })
     });