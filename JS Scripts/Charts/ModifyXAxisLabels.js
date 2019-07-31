
widget.on('render', function(widget,args){
	var cats = widget.queryResult.xAxis.categories //Need to save and reassign the categories
	widget.queryResult.xAxis = {
	    categories: cats,
	    //Runs every value in the category through this function 
	    labels: {
	        formatter: function () {
	           return '<a target="_blank" href="https://en.wikipedia.org/wiki/'+ this.value + '">' + this.value + '</a>';
	        },
	        useHTML: true // Needed to ensure full html is processed
	    }
	}
})
