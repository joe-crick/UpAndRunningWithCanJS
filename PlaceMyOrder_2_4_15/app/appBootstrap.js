$(function () {

    var ApplicationState = can.Map.extend({
        define: {
            restaurant: {
                value: {},
                serialize: function () {
                    return this.attr('restaurant.name');
                },
                set: function (restaurant) {
                    if (restaurant.restaurantId) {
                        var that = this;
                        RestaurantMenusModel.findOne({id: restaurant.restaurantId},
                            function success(selectedMenus) {
                                that.attr('menus', {
                                    collection: selectedMenus.menus,
                                    restaurantName: restaurant.name
                                });
                            },
                            function error(xhr) {
                                alert(xhr.message);
                            });
                    }
                    return restaurant;
                }
            },
            menus: {
                value: null,
                serialize: false
            },
            confirmation: {
                value: {},
                set: function(confirmation){
                    if(typeof confirmation === 'string') {
                        alert(confirmation);
                        this.attr('menus', null);
                    }
                    return confirmation;
                },
                serialize: false
            }
        }
    });

    var appState = new ApplicationState();

    //Bind the application state to the root of the application
    $('#can-app').html(can.view('base_template.stache', appState));

    //Bind the application state to the can.route
    can.route.map(appState);

    can.route('/:restaurant');

    can.route.ready();

});



