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

if3tApp.directive('imageonload', function() {
    return {
        restrict: 'A',

        link: function (scope, element) {
            element.on('load', function () {
                // Set visibility: true + remove spinner overlay
                element.removeClass('spinner-hide');
                element.addClass('spinner-show');
                element.parent().find('span').remove();
            });
            scope.$watch('ngSrc', function () {
                // Set visibility: false + inject temporary spinner overlay
                element.addClass('spinner-hide');
                // element.parent().append('<span class="spinner"></span>');
            });
        }
    }
});
        //http://jsfiddle.net/2CsfZ/47/