function createOrder(menuItems) {
    this.attr('menus.collection').each(function (itemSet) {
        itemSet.attr('items').each(function (item) {
            if (item.attr('selected')) {
                menuItems.push(item);
            }
        });
    });

    return new MenuOrder({
        delivery: this.attr('delivery'),
        menuItems: menuItems
    });
}

function validateOrder(order, errors) {
    var errorCheck = order.errors();

    for (var issue in errorCheck) {
        if (errorCheck.hasOwnProperty(issue)) {
            errors[issue.replace('delivery.', '')] = errorCheck[issue][0];
        }
    }
    return errorCheck;
}

var RestaurantMenuViewModel = can.Map.extend({
    init: function () {
        this.attr('delivery', {});
        this.attr('order', {});
        this.attr('issues', {});
    },
    placeOrder: function () {

        var menuItems = [];
        var order, errorCheck, errors = {};

        order = createOrder.call(this, menuItems);

        errorCheck = validateOrder(order, errors);

        if (errorCheck) {
            this.attr('issues', errors);
            return;
        }
        var that = this;

        order.save(
            function success() {
                that.attr('confirmation', 'Your Order has been Placed');
            }, function error(xhr) {
                alert(xhr.message);
            });

        this.attr('order', order);
    }
});

can.Component.extend({
    tag: "order-form",
    template: can.view('components/order_form/order_form.stache'),
    scope: RestaurantMenuViewModel
});



