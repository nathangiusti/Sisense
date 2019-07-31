dashboard.on('widgetready', (el, args) => {
    $('.p-mid', 'widget[widgetid=' + args.widget.oid + ']').scroll((scrollBar) => {
        $('.p-mid').each((_,pivot) => {
            pivot.scrollLeft = scrollBar.target.scrollLeft;
        });
    });
});