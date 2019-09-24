widget.on('processresult', (el, args) => {
	args.result.yAxis[0].plotBands = [{
    	color:  'grey', 
    	from: 100,
    	to: 200,
        zIndex:-1 
    }] 
})