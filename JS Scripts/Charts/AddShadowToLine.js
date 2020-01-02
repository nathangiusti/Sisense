widget.on('processresult', (el, args) => {
	args.result.series[0].shadow = {
		color: '#ff1122', //Can be hex or rgb or rgba
		width:20, //Size of the shadow
		opacity:.05,
		offsetX: -5, // moves the shadow left or right
		offsetY: 10 //moved shadow up or down
	}
})