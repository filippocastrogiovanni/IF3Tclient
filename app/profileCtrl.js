/**
 * Created by TheChuck on 07/07/2016.
 */

if3tApp.controller('ProfileController', ['userFactory', '$scope', '$rootScope', '$routeParams', '$window',
    function (userFactory, $scope, $rootScope, $routeParams, $window) {
        $rootScope.curpage = "profile";

        if(!userFactory.isAuthenticated())
            $window.location.href = "#/home";

        $scope.tabs = [
            {
                name: "My Info",
                template: 'template/my_info.html'
            },
            {
                name: "My Channels",
                template: 'template/my_channels.html'
            },
            {
                name: "My Recipes",
                template: 'template/my_recipes.html'
            }];
    }
]);