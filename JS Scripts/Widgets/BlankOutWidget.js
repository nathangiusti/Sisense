/* 
Somewidgets, like those behind tabbers, still load, even though they aren't seen
Add this to your widget to speed up rendering widgets that won't be seen. 
This function clears out the results from the query so that the widget loads faster. 
The first run flag is there so that it only runs on initilization, but will still show values once loaded again. 
*/

firstRun = true
widget.on('processresult',function(el, args) {
    if (firstRun) {
        args.result = null
        firstRun = false
    }
})