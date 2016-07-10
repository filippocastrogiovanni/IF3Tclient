/**
 * Created by Filippo on 24/05/2016.
 */

if3tApp.controller('MyRecipesController', ['userFactory','$scope', '$rootScope', '$routeParams', '$window', '$http',
    function (userFactory, $scope, $rootScope, $routeParams, $window, $http) {
        $rootScope.curpage = "myrecipes";

        if(!userFactory.isAuthenticated())
            $window.location.href = "#/home";

        $http({
            method: 'GET',
            url: $rootScope.ipServer + '/recipes/' + userFactory.getProfile().id,
            headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
        })
            .then(
                function success(response){
                    $scope.recipes = response.data;
                    //console.log($scope.recipes);
                },
                function error(error){
                    console.log(error.statusText);
                }
            );

        $scope.removeRecipe = function(recipeId){

        };

        $scope.toggleRecipePublic = function(recipe){
            $http({
                method: 'PUT',
                dataType: 'json',
                url: $rootScope.ipServer + '/publish_recipe',
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()},
                data: angular.toJson(recipe)
            })
                .then(
                    function successCallback(response) {
                        console.log(response);
                        recipe.isPublic = !recipe.isPublic;
                    },
                    function errorCallback(error) {
                        console.log(error);
                    });

        };

        $scope.toggleRecipeEnabled = function(recipe){
            $http({
                method: 'PUT',
                dataType: 'json',
                url: $rootScope.ipServer + '/enable_recipe',
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()},
                data: angular.toJson(recipe)
            })
                .then(
                    function success(response){
                        //console.log(response);
                        recipe.isEnabled = !recipe.isEnabled;
                    },
                    function error(error){
                        //$window.alert(error.data.message);
                        console.log("ciao");
                    }
                );
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