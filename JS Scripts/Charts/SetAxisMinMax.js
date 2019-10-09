widget.on('processresult', (el, args) => {
	args.result.yAxis[0].floor = 0
	args.result.yAxis[0].ceiling = 1000
})