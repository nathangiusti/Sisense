widget.on('render', function(widget,args){
	widget.queryResult.xAxis = {
	    categories: widget.queryResult.xAxis.categories,
	    //Runs every value in the category through this function 
	    labels: {
	        formatter: function () {
	        	var res = this.value.split("/");
	           	return '<a title="' + res[1] + '" target="_blank" href="https://en.wikipedia.org/wiki/'+ res[0] + '">' + res[0] + '</a>';
	        },
	        useHTML: true // Needed to ensure full html is processed
	    }
	}
})
