widget.on('domready', (widget) => {
	// Substitue the widget you want to acess
	var widget = prism.activeDashboard.widgets.$$widgets.find(w => w.oid === '5ec55937fa71210e142eeac9') 							
	// Make your changes here

	//Call these methods to refresh your widget to reflect the changes
	widget.changesMade()
	widget.refresh()
});