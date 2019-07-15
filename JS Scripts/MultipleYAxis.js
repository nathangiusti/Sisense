widget.on('processresult', (el, args) => {
	tertAxis = JSON.parse(JSON.stringify(args.result.yAxis[0])) //Make a deep copy of an existing axis

	//Set axis options
	tertAxis.opposite = true //True shows axis on right, False shows on left
	tertAxis.lineColor = "#6EDA55"
	tertAxis.labels.style.color = "#6EDA55"
	
	args.result.yAxis.push(tertAxis) //Add axis to chart
	args.result.series[2].yAxis = 2 //Tell the widget to use this axis for the 3rd data series
});