widget.on('domready', () => {
	$('div.p-value').each(function() { 
		var str = $(this).text(); 
		str = str.replace(/,/g,""); //Strip commas out of text string 
		var num = parseInt(str, 10); 
		if(num > 1000) {
			$(this).html("<img src='https://via.placeholder.com/10x10'>"); //Replace text box with image
		}
	})
}