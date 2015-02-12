$(function () {

    function getRestaurantMenu(restaurant, that) {
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

    var ApplicationState = can.Map.extend({
        define: {
            restaurant: {
                value: {},
                serialize: function () {
                    var name = this.attr('restaurant.name');
                    return name ? name.replace(/\s/ig, '_') : name;
                },
                set: function (restaurant) {
                    var that = this;

                    if (!restaurant) return restaurant;

                    if(typeof restaurant === 'string'){
                        RestaurantModel.findOne({name: restaurant},
                        function success(restaurantModel){
                            getRestaurantMenu(restaurantModel, that);
                            return restaurantModel;
                        },
                        function error(xhr){
                            alert(xhr.message);
                        })
                    }

                    else if (restaurant.restaurantId) {
                        getRestaurantMenu(restaurant, that);
                        return restaurant;
                    }

                }
            },
            menus: {
                value: null,
                serialize: false
            },
            confirmation: {
                value: {},
                set: function (confirmation) {
                    if (typeof confirmation === 'string') {
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



