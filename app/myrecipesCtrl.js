/**
 * Created by Filippo on 24/05/2016.
 */

if3tApp.controller('MyRecipesController', ['messageFactory', 'userFactory','$scope', '$rootScope', '$routeParams', '$window', '$http',
    function (messageFactory, userFactory, $scope, $rootScope, $routeParams, $window, $http) {
        $rootScope.curpage = "myrecipes";

        if(!userFactory.isAuthenticated())
            $window.location.href = "#/home";

        $http({
            method: 'GET',
            url: $rootScope.ipServer + '/user_recipes',
            headers: {'Content-Type': 'application/json'}
        })
            .then(
                function success(response){
                    $scope.recipes = response.data;
                    //console.log($scope.recipes);
                },
                function error(error){
                    console.log(error);
                }
            );

        $scope.removeRecipe = function(recipeId){

        };
    }
]);

//TODO capire se curpage serve a qualcosa e casomai metterlo
if3tApp.controller('EditRecipeController', ['$scope', '$rootScope', '$routeParams', '$location', 'recipesFactory',
    function ($scope, $rootscope, $routeParams, $location, recipesFactory)
    {
        $scope.getLabel = function(rawLabel)
        {
            var splitted = rawLabel.split("_");
            return splitted.join(" ");
        };
        
        $scope.getIdForForm = function(name, type, prefix)
        {   
            prefix += name;
            if (type == 'textarea') prefix += '-ta';
            console.log(prefix);
            return prefix;
        };

        $rootscope.recipeCallback = function(rec)
        {
            $scope.savedRecipe = rec;
        };

        recipesFactory.getRecipe($routeParams.id, $rootscope.recipeCallback);

        $scope.toggleEnabled = recipesFactory.toggleRecipeEnabled;
        $scope.togglePublic = recipesFactory.toggleRecipePublic;

        $scope.reset = function()
        {
            $scope.updatedRecipe = angular.copy($scope.savedRecipe);
        };
    }
]);