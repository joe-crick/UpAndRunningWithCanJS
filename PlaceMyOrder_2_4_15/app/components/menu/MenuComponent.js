var MenuViewModel = can.Map.extend({
    menuData: {}
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

