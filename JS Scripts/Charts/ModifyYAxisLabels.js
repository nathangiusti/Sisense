widget.on('processresult', (el, args) => {
	args.result.yAxis[0].labels = {
            formatter: function() {
                return this.value + 'BLAG';
    	}
	}
});