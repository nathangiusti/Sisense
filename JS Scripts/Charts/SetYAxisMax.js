widget.on('processresult', (el, args) => {
	max = -1
	for(var i = 0; i < args.result.series.length; i++) {
		series = args.result.series[i]
		for(var j = 0; j < series.data.length; j++) {
			if(series.data[j].y > max) {
				max = series.data[j].y
			}
		}
	}
	
	args.result.yAxis[0].max = max * 1.1
});