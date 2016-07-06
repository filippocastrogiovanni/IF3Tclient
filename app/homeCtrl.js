/**
 * Created by Filippo on 18/05/2016.
 */

if3tApp.controller('HomeController', ['$scope', '$rootScope', '$routeParams', '$location',
    function ($scope, $rootscope, $routeParams, $location) {
        $rootscope.curpage = "home";
        var offset = new Date().getTimezoneOffset();
        console.log(offset);
    }
]);