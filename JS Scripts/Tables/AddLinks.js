widget.on('domready', () => {
	$('tbody td[fidx="0"]:not([rowspan]) div div span', element).each(function() { // Adjust this CSS selector to grab what is needed
		str = $(this).text() 
		$(this).text(''); // We are going to add a new link so we need to delete what is current in the text
		$('<a target=\"_blank\">' + str + '</a>').attr(
			{'href': 'https://en.wikipedia.org/wiki/' + str}
		).appendTo($(this)); // Add the new link
	})
})

