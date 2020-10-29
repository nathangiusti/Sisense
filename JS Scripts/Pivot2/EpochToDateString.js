/* Change values to display text */
widget.transformPivot(
	{
		index: [0] //The 0 should be the index of whatever column you have your epoch seconds in 
	}, 
	function(metadata, cellData) {

		if (!isNaN(cellData.content)) {
			
			//Get the date as a javascript object using our seconds from epoch
			var d = new Date(parseInt(cellData.content) * 1000)

			// Here is where we set the string format.
			cellData.content = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + 
				d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
		}
	}
);