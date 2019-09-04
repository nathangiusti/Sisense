start = ''
end =  ''
start_index = 1
end_index = 2
counter = 0

widget.on('domready',(el, args) => {
	if (counter == 0) {
		start = $(".table-container .p-dim-member")[start_index].innerText 
		end = $(".table-container .p-dim-member")[end_index].innerText
		el.dashboard.filters.update({
		    "jaql":{
		        "dim":'[DIM_Date.Date]',
				"format": "yyyy-MM-dd",
		       	"filter":{
		           	"from": start,
					"to":end
		        },
		        "datatype":"datetime", //mandatory
				"level":"days",
				"table": "DIM_Date",
				"title": "My Filter"
		    }
		},{"save":true, "refresh":true})
	}
	counter = 1
})
