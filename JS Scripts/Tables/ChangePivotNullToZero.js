widget.on('domready', () => {
	$('div.p-value', element).each(function() { 
		var str = $(this).text();
		if (!str.replace(/\s/g, '').length)	{
			$(this).text('0');
		}
	})
})