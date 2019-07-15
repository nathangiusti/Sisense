widget.on('render',function(w, e) {	
	e.prefixText = '';
	e.suffixText = '';
	e.selectedColor = '#86b817'; /*The color of the chosen title*/
	e.fontColor = '#cccccc'; /*The color of the unchosen titles*/
	e.elementWidth = '103%';
	e.descColor = '#a5a5a5';
	e.parentMarginLeft = '-15px';
	e.height = 32; /* affects the tabber widget default high*/
});
widget.tabs = [
	{
		title: "Month", 
		displayWidgetIds : ["5d1e278afdb8b73048eda3f0"],
		hideWidgetIds : ["5d1e27a024005f4910936f79", "5d1e27ae24005f4910936f7d", "5d1e27ba24005f4910936f81"]
	},{
		title: "Quarter", 
		displayWidgetIds : ["5d1e27a024005f4910936f79"],
		hideWidgetIds : ["5d1e278afdb8b73048eda3f0", "5d1e27ae24005f4910936f7d", "5d1e27ba24005f4910936f81"]
	},{
		title: "Week", 
		displayWidgetIds : ["5d1e27ae24005f4910936f7d"],
		hideWidgetIds : ["5d1e278afdb8b73048eda3f0", "5d1e27a024005f4910936f79", "5d1e27ba24005f4910936f81"]
	},{
		title: "Day", 
		displayWidgetIds : ["5d1e27ba24005f4910936f81"],
		hideWidgetIds : ["5d1e278afdb8b73048eda3f0", "5d1e27a024005f4910936f79", "5d1e27ae24005f4910936f7d"]
	}
];