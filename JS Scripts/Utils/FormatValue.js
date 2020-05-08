/*
When audjusting values in scripts we overwrite the Sisense formatting. 
This will return the value to using the M/K notation. 
*/
widget.on('render', function(widget,args){
	widget.queryResult.plotOptions.series.dataLabels.formatter = function() {
		decimalPlaces = 2
    	retVal = this.y
		
		if(retVal > 1000000)
			retVal = '$' + (retVal/1000000).toFixed(decimalPlaces) + 'M'
		else if (retVal > 1000)
			retVal = '$' + (retVal/1000).toFixed(decimalPlaces) + 'K'
		else
			retVal = '$' + retVal
		return retVal
	}
})