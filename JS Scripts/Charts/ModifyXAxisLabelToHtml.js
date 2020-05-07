widget.on('render', function(widget,args){
	widget.queryResult.xAxis = {
	    categories: widget.queryResult.xAxis.categories,
	    labels: {
	        formatter: function () {
	        	var res = this.value.split("/");
	           	return '<a title="Link" target="_blank" href="google.com">Link Text</a>';
	        },
	        useHTML: true // Needed to ensure full html is processed
	    }
	}
})
