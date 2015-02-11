var RestaurantListViewModel = can.Map.extend({

    init: function () {
        this.attr('restaurants', new RestaurantModel.List({}));
        this.attr('currentRestaurant', {visible: false});
        this.attr('visible', true);
    },
    restaurantSelected: function (isChanged, select) {
        var restaurant = select.find('option:checked').data('restaurant');
        this.attr('currentRestaurant', restaurant);
    },
    showMenu: function () {
        //Sets the restaurant value on the parent scope (AppState)
        this.attr('restaurant', this.currentRestaurant);
    }

});

can.Component.extend({

    tag: 'restaurant-list',
    template: can.view('components/restaurant_list/restaurant_list.stache'),
    scope: RestaurantListViewModel

});

