var n = 2 // Number of columns to remove from the start. 

widget.on('processresult', (el, args) => {
	var i;
	for (i = 0; i < 2; i++) {
	  	args.result.series[0].data.shift()
		args.result.xAxis["categories"].shift()
	}
});