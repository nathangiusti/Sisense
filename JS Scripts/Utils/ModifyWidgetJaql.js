widget.on('buildquery', (el, args) => {
	//args.query.metadata is an with an entry for each value being graphed
	//Here we append a * 2 to the formula to multiply the value by 2. 
    args.query.metadata[0].jaql.formula = args.query.metadata[0].jaql.formula + " * 2"
})