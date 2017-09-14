// Create document ready function
	 $(document).ready(function() {
                    
  	});

	// On click function to store user's input into variable can be found in the logic.js file
  // See logic.js file for querying the bandsintown api for artist info

  // Establish variables for later usage
  var artistName;
  var date;
  var location;
  var results;
    


   
    //Looping over every result to return first 5 items
    for (var i = 0; i < 5; i++) {
      if (response[0].data === true)
        var tr = $('<tr>').text('#artist-input + response.datetime + response.venue.name');
      else if (response[0].data === false);
        var p = $('<p>').text('No Upcoming Shows, Sorry Stalker!');
         

    };




  	
  	// Link AJAX responses to html table
    var artist = $('<td>').text('#artist-input');
    var tourdate = $('<td>').text(response.datetime);
    var venue = $('<td>').text(response.venue.name);

  	// Create arrays to handle data for table k=header v=row

    // Items returned from AJAX to appear in the array?
    
  	var data = {
  		k: ['Artist', 'Tourdate', 'Venue'],
  		v: [['artists', 'response.datetime', 'response.venue.name']], 

    };


  	// Make the Table class
  	function Table() {
    //sets attributes
    this.header = [];
    this.data = [[]];
    this.tableClass = ''
	}

    // Function to add data into table
    function insertData() {
      x = document.getElementById('tourDateDiv')
      x.innerHTML = Table;
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
    container = container || '#tourDateDiv'
 
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
    
    //creates table body
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
    	.setTableClass(container)  // How to set table class to grab user input from .form-control?
    	.build()

    
   
   

    // Append table to div "tourDateDiv" 
    $('#tourDateDiv').append(Table);


    // tourDateDiv needs to expand to accomodate length of tour date list


    // Empty tour date div when user searches for new artist
    $("")



   








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
 


	
