/* 
Blanks out widget query so that the widget doesn't process or load data. 

Can be used to disable widgets during debugging.
*/

widget.on('buildquery',function(el, args) {
	args.query.metadata = []
}
