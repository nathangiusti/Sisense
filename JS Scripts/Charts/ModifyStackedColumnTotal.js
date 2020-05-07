// Calculates the total of the stacked column chart but omits one section in doing the calculation. 
// valToOmit is base 0 and counts from the top down so 0 is the top section, 1 would be the second highest section, etc
// Num cats is the number of categories in the stacked bar chart
widget.on('render', function(widget,args){
    widget.queryResult.yAxis[0].stackLabels.formatter =
    function() {

        valToOmit = 0 //Set this to 0 to omit top stack, numcats-1 to remove bottom stack
		numCats = 4 // Number of categories total

		max = 0
		decimalPlaces = 2
		for(i = 0; i < numCats; i++) {
			if(this.points[i] != null) {
				max = this.points[i][1]
				break
			}
		}
		retVal = 0
		if(this.points[valToOmit] != null)
        	retVal = max - (this.points[ valToOmit ][1] - this.points[ valToOmit ][0])
		else retVal = max

		return retVal
    }
})