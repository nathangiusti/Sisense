visible = false
widget.on('ready', function(el, args) {
	

	widgetsToShowHide = ['5db09ca72bb1b22a849325fd',
				'5db09d242bb1b22a84932604',
				'5db09d2a2bb1b22a84932606',
				'5db09d322bb1b22a84932608',
				'5db09dcc2bb1b22a84932613']
	
	//Initialize by hiding all the widgets 
	for(i = 0; i < widgetsToShowHide.length; i++)
	{	
		widgetId = widgetsToShowHide[i]
		widgetString = 'widget[widgetid="'
		widgetString = widgetString.concat(widgetId, '"]')
		$(widgetString).hide();
	}
	widgetId = '5d9f273d1239cd1d505c7270' //This is the widget we are attaching the click listener to
	widgetString = 'widget[widgetid="'
	widgetString = widgetString.concat(widgetId, '"]')
	thisWidget = $(widgetString)[0]
	thisWidget.addEventListener('click', function(event) {
		for(i = 0; i < widgetsToShowHide.length; i++){	
			widgetId = widgetsToShowHide[i]
			widgetString = 'widget[widgetid="' 
			widgetString = widgetString.concat(widgetId, '"]')
			if(visible) 
			{
				$(widgetString).hide();
			} else {
				prism.activeDashboard.widgets.$$widgets.some(function(widget) {
					if(widget.oid == widgetId) {
						$(widgetString).show();
						widget.refresh()
						return true
					}
					return false
				})
			}
		}
		visible = !visible
	})
});