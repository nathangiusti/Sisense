/*
Scrolls pivots to the left

Windows only
*/
dashboard.on('widgetready', (el, args) => {
    $('.p-mid', 'widget[widgetid=' + args.widget.oid + ']').scroll((scrollBar) => {
        $('.p-mid').each((_,pivot) => {
            pivot.scrollLeft = scrollBar.target.scrollLeft;
        });
    });
});