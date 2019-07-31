widget.on('domready', () => {
	$('div.p-value').each(function() { 
		var str = $(this).text(); 
		str = str.replace(/,/g,""); 
		var num = parseInt(str, 10); 
		if(num > 1000){
			$(this).html("<img src='https://via.placeholder.com/10x10'>"); 
		}
	})
}