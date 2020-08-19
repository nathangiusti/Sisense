// Query the elasticube to see what values a user has access to, and then set the filter to that value. 

dashboard.on('initialized',function(d) { 
	// Set up the widget jaql request for dimension values
	var request = new XMLHttpRequest()
	var payload = {
		"datasource": {
			"title":"MyCube",
			"fullname":"LocalHost/MyCube",
		},
		"metadata":[
			{
				"dim":"[Brands.BrandName]",
				"sort":"asc"
			}
		],
		"offset":0,
		"count":1,
		"isMaskedResponse":false
	}

	request.open('POST', 'https://sisense.mycompany.com/api/datasources/MyCube/jaql', true)
	var json = JSON.stringify(payload);

	// Set up response function which sets the filter
	request.onload = function() {
		var data = JSON.parse(this.response)
		value = data['values'][0][0] //Get the first available value
		dashboard.filters.update({ //Update the filter
			jaql:{
				'column': 'BrandName',
				'datatype':'text',
				'dim': '[Brands.BrandName]',
				'filter':{
					'members': [value],
					'multiSelection': true,
					'userMultiSelect': true
				},
				'table': 'Brands',
				'title': 'Facility'
			}
		},{"save":true, "refresh":true})
	}
	request.send(json) // Send request
})