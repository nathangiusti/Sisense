const value = payload.data.value;
if (value == 'Years') {
    $('widget[widgetid="5ee7b38da167171a7482b856"]').show()
    $('widget[widgetid="5ee7b391a167171a7482b858"]').hide()
    $('widget[widgetid="5ee7b3e4a167171a7482b85e"]').hide()
} else if (value == 'Months') {
    $('widget[widgetid="5ee7b38da167171a7482b856"]').hide()
    $('widget[widgetid="5ee7b391a167171a7482b858"]').show()
    $('widget[widgetid="5ee7b8ad25fb583ab8aaba08"]').hide()
} else {
    $('widget[widgetid="5ee7b38da167171a7482b856"]').hide()
    $('widget[widgetid="5ee7b391a167171a7482b858"]').hide()
    $('widget[widgetid="5ee7b3e4a167171a7482b85e"]').show()
}