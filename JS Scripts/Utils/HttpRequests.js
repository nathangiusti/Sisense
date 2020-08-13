dashboard.on('initialized',function(d) { 

	// Create the post request
	var request = new XMLHttpRequest()
	var payload =
		{
			"my json query"
		}
	request.open('POST', 'https://sisense.mycompany.com/api/datasources/MyCubeName/jaql', true)
	var json = JSON.stringify(payload);

	// Set up response function which sets the filter
	request.onload = function() {
		var data = JSON.parse(this.response)
		value = data['values'][0][0] //Get the first available value
		console.log(value)
	}
	request.send(json) // Send request
})