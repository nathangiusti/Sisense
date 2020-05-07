/*
Modify pivot text values
*/
widget.on('domready', () => {
	$('div.p-value', widget).each(function() { 
		var textVal = $(this).text(); 
		$(this).html("<img src='https://via.placeholder.com/10x10'>"); //Replace text box with image
		$(this).text("The new text")
	}
}