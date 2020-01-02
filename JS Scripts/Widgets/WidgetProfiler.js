
startTime = 0
endTime = 0

widget.on('initialized', () => {
	console.log('initialized')
	startTime = new Date().getTime()
	console.log(startTime)
})

widget.on('domready', () => {
	console.log('domready')
console.log(new Date().getTime()- startTime)
})

widget.on('buildquery', () => {
	console.log('buildquery')
console.log(new Date().getTime()- startTime)
})
widget.on('beforequery', () => {
	console.log('beforequery')
console.log(new Date().getTime()- startTime)
})
widget.on('querystart', () => {
	console.log('querystart')
console.log(new Date().getTime()- startTime)
})
widget.on('processresult', () => {
	console.log('processresult')
console.log(new Date().getTime()- startTime)
})
widget.on('render', () => {
	console.log('render')
console.log(new Date().getTime()- startTime)
})
widget.on('ready', () => {
	console.log('ready')
console.log(new Date().getTime()- startTime)
})