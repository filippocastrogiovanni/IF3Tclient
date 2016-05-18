/**
 * Created by Filippo on 18/05/2016.
 */
var if3tApp = angular.module('if3tApp', [ 'ngRoute', 'ngSanitize', 'ngResource' ]);

if3tApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/home', {
        templateUrl: 'template/home.html',
        controller: 'HomeController'
    });
    $routeProvider.otherwise({redirectTo: '/home'});
}]);