/* Change values to display text */
widget.transformPivot({ type: ['value'] }, function(metadata, cellData) {
	cellData.contentType  = "text"
	
	switch (cellData.content ) {
		case "10": 
			cellData.content='BAD';
			break;
		case "20": 
			cellData.content='OK';
			break;
		case "30": 
			cellData.content='MEH';
			break;
		default: 
			cellData.content='GOOD';
	}
});