// Create document ready function
	 $(document).ready(function() {
                    
  	});

	// Artist input field id= #icon_prefix 
	$("input#icon_prefix").click(function(){
  	event.preventDefault();
  	searchBandsInTown($("#artist-input").val());
	});


  	function searchBandsInTown(artistname) {

  	// Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artistname + "/events?app_id=codingbootcamp";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
       console.log(response);

    });
  }

   
  	// Code to capture only first 5 tourdates and venue locations from API return
  	for (i = 0; i < 5; i++) {
  			console.log('response[i].venue.name' + 'response.datetime');
  	}

  	
  	//


  	// Create arrays to handle data

  	var data = {
  		k: ['Artist', 'Tourdate', 'Venue']
  		v: [['.artist-input', 'response.datetime', 'response.venue.name']]  // How do i get the items returned from AJAX to appear in the array?
  	}

  	// Make the Table class
  	function Table() {
    //sets attributes
    this.header = [];
    this.data = [[]];
    this.tableClass = ''
	}

	// Setter methods, which allow the Table object to have it’s attributes set and have the data set.
	Table.prototype.setHeader = function(keys) {
    //sets header data
    this.header = keys
    return this
	}

	Table.prototype.setData = function(data) {
    //sets the main data
    this.data = data
    return this
	}

	Table.prototype.setTableClass = function(tableClass) {
    //sets the table class name
    this.tableClass = tableClass
    return this
	}


	// Create the table cells and fill in with returned data from AJAX call
	Table.prototype.build = function(container) {

    //default selector
    container = container || '.table-container'
 
    //creates table
    var table = $('<table></table>').addClass(this.tableClass)

    var tr = $('<tr></tr>') //creates row
    var th = $('<th></th>') //creates table header cells
    var td = $('<td></td>') //creates table cells

    var header = tr.clone() //creates header row

    //fills header row
    this.header.forEach(function(d) {
        header.append(th.clone().text(d))
    })

    //attaches header row
    table.append($('<thead></thead>').append(header))
    
    //creates 
    var tbody = $('<tbody></tbody>')

    //fills out the table body
    this.data.forEach(function(d) {
        var row = tr.clone() //creates a row
        d.forEach(function(e,j) {
            row.append(td.clone().text(e)) //fills in the row
        })
        tbody.append(row) //puts row on the tbody
      })
 
      $(container).append(table.append(tbody)) //puts entire table in the container

      return this
	   }


	 // Creates new table object 
	 var table = new Table()
    
	 //sets table data and builds it
	 table
    	.setHeader(data.k)
    	.setData(data.v)
    	.setTableClass('#artist-input')  // How to set table class to grab user input from .form-control?
    	.build()

    
   
    // Set function to create table and populate with results from 
    // Append table to div "tourDateDiv" 
    $('#tourDateDiv').append(Table)








  // Event handler for user clicking the select-artist button
  $(".form-control").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var artist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function (passing in the artist as an argument)
    searchBandsInTown(artist);
  });
  

  // BandsinTown API script
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


	
