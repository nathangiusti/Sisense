// Hide sort arrows on pivot tables																					 
widget.on('domready', () => {
	$("#pivot__ACCRowArea .p-sort-head").filter(function(index) {
        return (index - <column to remove>) % <number of columns in table> == 0;    
    }).css('display', 'none')
});

