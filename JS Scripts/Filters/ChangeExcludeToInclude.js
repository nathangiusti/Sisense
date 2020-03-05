dashboard.on('filterschanged',function(d, t, i) {
	// We need to get all the possible dimension values. 
	// This could be done as a post call, but given the limited scope, I think hard coding it will be fine
	// Replace these with the years you have data for. 
	year_arr = ['2020-01-01T00:00:00',
				'2019-01-01T00:00:00',
				'2018-01-01T00:00:00',
				'2017-01-01T00:00:00',
				'2016-01-01T00:00:00',
				'2015-01-01T00:00:00',
				'2014-01-01T00:00:00',
				'2013-01-01T00:00:00',
				'2012-01-01T00:00:00'
	]
	// Go through all the filters
	for (filter of t.items) {
		// Only filter for our date table. So update this table name to your date table. 
		if (filter.jaql.table == 'DIM_Date') {
			// If it is an exclude filter, we take the excluded values, remove them from the year_arr
			if('exclude' in  filter.jaql.filter) {
				for(item of filter.jaql.filter.exclude.members) {
					index = year_arr.indexOf(item)
					if(index > -1)
						year_arr.splice(index, 1)
					
				}
				//Make the new dashboard filter with Year arr. 
				dashboard.filters.update({ 
					jaql:{
						'column': 'Date',
						'datatype':'datetime',
						'dim': '[DIM_Date.Date]',
						'filter':{
							'members': year_arr
						},
						'level': 'years',
						'table': 'DIM_Date',
						'title': 'Years in Date'
					}
				})
				
			}
				
		}
	}
			
	
})