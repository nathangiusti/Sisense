widget.on('processresult', (el, args) => {
	var hide = true
	for(i = 0; i < el.dashboard.filters.$$items.length; i++) {
		val =  el.dashboard.filters.$$items[i]
		if(val.jaql.dim = "[nba.csv.Division]") 
		   hide = false
	}
	
	if(hide)								
		args.result.series = []
})