var SiteMenuModel = can.Model.extend({
        findOne: "GET /site_menu"
    },
    {});

var RestaurantModel = can.Model.extend({
        findAll: "GET /restaurants",
        findOne: 'GET /restaurant/{name}'
    },
    {});

var RestaurantMenusModel = can.Model.extend({
        findOne: "GET /restaurantMenus/{id}"
    },
    {});

var MenuOrder = can.Model.extend({
        create: 'POST /createOrder',
        init: function () {

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
