/**
 * Created by Filippo on 24/05/2016.
 */

if3tApp.controller('MyRecipesController', ['$scope', '$rootScope', '$routeParams', '$location', '$http',
    function ($scope, $rootScope, $routeParams, $location, $http) {
        $rootScope.curpage = "myrecipes";

        $http.get($rootScope.ipServer + "/recipes/1")
            .then(
                function success(response){
                    $scope.recipes = response.data;
                    console.log($scope.recipes);
                },
                function error(error){
                    console.log(error.statusText);
                }
            );

        $scope.removeRecipe = function(recipeId){

        };

        $scope.toggleRecipePublic = function(recipe){
            recipe.isPublic = !recipe.isPublic;
            $http.put($rootScope.ipServer + "/update_recipe", recipe)
                .then(
                    function success(response){
                        console.log(response);
                    },
                    function error(error){
                        console.log(error);
                    }
                );
        };

        $scope.toggleRecipeEnabled = function(recipeId){

        };
    }
]);

if3tApp.controller('EditRecipeController', ['$scope', '$rootScope', '$routeParams', '$location', 'recipesFactory',
    function ($scope, $rootscope, $routeParams, $location, recipesFactory)
    {
        $scope.idRecipe = $routeParams.id_recipe;
        var recipe = recipesFactory.getRecipe(1);
        console.log(recipe);
        console.log($scope.recProva);

        $scope.savedRecipe =
        {
            urlTriggerImg: "images/google_calendar_icon.png",
            urlActionImg: "images/google_mail_icon.png"
        };

        $scope.reset = function()
        {
            $scope.updatedRecipe = angular.copy($scope.savedRecipe);
        };

        $scope.submit = function()
        {
            alert("ccwcee");
        };
    }
]);