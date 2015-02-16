var MenuViewModel = can.Map.extend({
    menuData: {},
    goHome: function(viewModel, element, event){
        this.attr('menus', null);
        this.attr('restaurant', null);
        event.preventDefault();
    }
});

var siteMenuViewModel = new MenuViewModel();

can.Component.extend({
    tag: "menu",
    template: can.view('components/menu/menu.stache'),
    scope: siteMenuViewModel
});

MenuModel.findOne({},
    function success(menu) {
        siteMenuViewModel.attr('menuData', menu);
    },
    function error(xhr) {
        alert(xhr.message);
    });

