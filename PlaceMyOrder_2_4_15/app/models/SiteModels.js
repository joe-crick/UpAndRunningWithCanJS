
var MenuModel = can.Model.extend({
        findOne: "GET /menu"
    },
    {});

var RestaurantModel = can.Model.extend({
        findAll: "GET /restaurants"
    },
    {});

var RestaurantMenusModel = can.Model.extend({
    findOne: "GET /restaurantMenus/{id}"
});

var MenuOrder = can.Model.extend({
        create: 'POST /createOrder',
        init: function () {
            'use strict';

            this.validatePresenceOf('delivery.address');

            // validates that name is at least two chars long
            this.validate("delivery.name", function (name) {
                if (!name) {
                    return "Your name must be at least two characters long."
                }
                if (name.length < 2) {
                    return "Your name must be at least two characters long."
                }
            });
        }
    },
    {});
