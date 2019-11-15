index = 0
fired = false
dashboard.on('domready',function(d) {
	
	//Create an array of an array of widgets. Each array is a set of widgets to rotate through
	widgetGroup = [
		['5d9e379f90d3ba21585baa6a', '5d9e379f90d3ba21585baa69'],  // These widgets are down when index is 0
		['5d9f273d1239cd1d505c7270',  '5d9f2c5c1239cd1d505c72ca'], // Shown when index is 1
		['5d9f2f321239cd1d505c72d6',  '5d9f33281239cd1d505c72e6'], 
		['5da0b4cd90d3ba21585bad09',  '5da0d06b90d3ba21585bad2d']	
	]
	
	//Initialize by hiding all the widgets except the selected ones
	for(i = 0; i < widgetGroup.length; i++)
	{	
		for(j = 0; j < widgetGroup[i].length; j++) {
			widgetString = 'widget[widgetid="' 
			widgetString = widgetString.concat(widgetGroup[i][j], '"]')
			if(i == index) {
				$(widgetString).show();
			}else{
				$(widgetString).hide();
			}
		}
	}

	// We set fired to false on key up in order to prevent the event from firing multiple times
	document.addEventListener('keyup', (e) => {
        fired = false;
    });

	document.addEventListener('keydown', function(event) {
		//If fired is true, then we haven't keyed up yet. If false then we continue
		if(!fired) {
			fired = true
			//Subtract one from the index on ArrowLeft to back in the array
			if(event.code == 'ArrowLeft') {
				index = index - 1
				//If index rolls past 0, we jump to the end of the array
				if(index < 0)
					index = index +  widgetGroup.length
			}
			// Add one to index on ArrowRight to move forward in the array
			if(event.code == 'ArrowRight') {
			   index = index + 1
			   // If index rolls beyond the widget length, we reset index to front of array
			   if (index >= widgetGroup.length)
				   index = index - widgetGroup.length
			}
			if(event.code == 'ArrowLeft' || event.code == 'ArrowRight' ){
				for(i = 0; i < widgetGroup.length; i++){	
					for(j = 0; j < widgetGroup[i].length; j++) {
						widgetId = widgetGroup[i][j]
						widgetString = 'widget[widgetid="' 
						widgetString = widgetString.concat(widgetId, '"]')
						if(i == index) {
							//This refresh is optional. Some widgets don't take to being shown and hidden well, refreshing the widget when we show it ensures it's drawn correctly
							prism.activeDashboard.widgets.$$widgets.some(function(widget) {
								if(widget.oid == widgetId) {
									widget.refresh()
									return true
								}
								return false
							})
							$(widgetString).show();
						}else{
							$(widgetString).hide();
						}
					}
				}
			}
		}
	})
});