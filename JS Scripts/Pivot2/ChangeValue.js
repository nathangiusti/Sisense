/* Change values to display text */
widget.transformPivot({ type: ['value'] }, function(metadata, cellData) {
	cellData.contentType  = "text"
	cellData.content = "BLAH"
});