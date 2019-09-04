widget.on('beforedatapointtooltip', (el, args) => {
	seriesName="SeriesName";
	if (args.context.pointScope.series.name==seriesName){
		args.context.points[0].seriesName += ' THIS IS A SPECIAL VALUE - SERIES NAME AREA';
		args.context.points[0].value += ' THIS IS A SPECIAL VALUE - VALUE AREA';
		args.context.category += ' THIS IS A SPECIAL VALUE - CATEGORY AREA';
	}
});
