/**
 * Created by Filippo on 18/05/2016.
 */
var if3tApp = angular.module('if3tApp', [ 'ngRoute', 'ngSanitize', 'ngResource', 'ngMaterial' ]);

if3tApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/home', {
        templateUrl: 'template/home.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/newrecipe', {
        templateUrl: 'template/new_recipe.html',
        controller: 'NewRecipeController'
    });
    $routeProvider.when('/myrecipes', {
        templateUrl: 'template/my_recipes.html',
        controller: 'MyRecipesController'
    });
    $routeProvider.when('/channels', {
        templateUrl: 'template/channels.html',
        controller: 'ChannelsController'
    });
    $routeProvider.otherwise({redirectTo: '/home'});
}]);