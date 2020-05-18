//Creates multiple filters on the dashboard based on the parameters above

num_parameters = 3
table_list = ['Table1', 'Table2', 'Table3']
column_list = ['Column1', 'Column2', 'Column3']
title_list = ['My First Filter', 'My Second Filter', 'My Third Filter']
default_value_list = ['0', '1', '2']

dashboard.on('initialized',function(d) { 
	
	for (var i = 0; i < num_parameters; i++) {
		dashboard.filters.update({
			jaql:{
				'column': column_list[i],
				'datatype':'numeric',
				'dim': '[' + table_list[i] + '.' + column_list[i] + ']',
				'filter':{
					"explicit": true,
					"userMultiSelect": false,
					"multiSelection": false,
					"members": [
						default_value_list[i]
					]
				},
				'table': table_list[i],
				'title': title_list[i]
			}
		})
	}
})