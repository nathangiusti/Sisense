dashboard.on('initialized',function(d) { 
	dashboard.filters.update({ //Set the date filter to be next quarter
		jaql:{
			'column': 'Date',
			'datatype':'datetime',
			'dim': '[DIM_Date.Date]',
			'filter':{
				'next': {
					'count': 1,
					'offset': 1
				}
			},
			'level': 'quarters',
			'table': 'DIM_Date',
			'title': 'My filter'
		}
	})
})