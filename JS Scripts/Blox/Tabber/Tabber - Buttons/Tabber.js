const value = payload.title;

// This is the css selector for each widget
// widget[widgetid="{your widget id}"]
const brand_id = 'widget[widgetid="5f87359026e1201818bf48bb"]'
const category_id = 'widget[widgetid="5f87359626e1201818bf48bf"]'
const age_id = 'widget[widgetid="5f8735cb26e1201818bf48c3"]'


if (value == 'Brand') {
    $(brand_id).show()
    $(category_id).hide()
    $(age_id).hide()
} else if (value == 'Category') {
    $(brand_id).hide()
    $(category_id).show()
    $(age_id).hide()
} else {
    $(brand_id).hide()
    $(category_id).hide()
    $(age_id).show()
}