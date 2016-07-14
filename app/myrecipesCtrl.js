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

        $scope.toggleRecipePublic = function(recipe){
            messageFactory.showLoading();
            $http({
                method: 'PUT',
                dataType: 'json',
                url: $rootScope.ipServer + '/publish_recipe?_csrf=' + userFactory.getXsrfCookie(),
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(recipe)
            })
                .then(
                    function successCallback(response) {
                        messageFactory.hideLoading();
                        recipe.isPublic = !recipe.isPublic;
                    },
                    function errorCallback(error) {
                        console.log(error);
                    });

        };

        $scope.toggleRecipeEnabled = function(recipe){
            messageFactory.showLoading();
            $http({
                method: 'PUT',
                dataType: 'json',
                url: $rootScope.ipServer + '/enable_recipe?_csrf=' + userFactory.getXsrfCookie(),
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(recipe)
            })
                .then(
                    function success(response){
                        console.log(response);
                        messageFactory.hideLoading();
                        recipe.isEnabled = !recipe.isEnabled;
                    },
                    function error(error){
                        console.log(error);
                        $window.alert(error.data.message);
                        messageFactory.hideLoading();
                    }
                );
        };
    }
]);

if3tApp.controller('EditRecipeController', ['$scope', '$rootScope', '$routeParams', '$location', 'recipesFactory',
    function ($scope, $rootscope, $routeParams, $location, recipesFactory)
    {
        $rootscope.recipeCallback = function(rec)
        {
            $scope.savedRecipe =
            {
                //TODO controllare se servono altri campi qui omessi
                id: rec.id,
                title: rec.title,
                isEnabled: rec.isEnabled,
                trigger : 
                {
                    id: rec.trigger.id,
                    header: rec.trigger.header,
                    //FIXME
                    paragraph: rec.trigger.paragraph ? rec.trigger.paragraph : "Questo è un paragrafo di prova",
                    urlImg: rec.trigger.channel.image_url
                },
                action:
                {
                    //TODO sistemare per considerare più actions
                    id: rec.actions[0].id,
                    header: rec.actions[0].header,
                    paragraph: rec.actions[0].paragraph,
                    urlImg: rec.actions[0].channel.image_url
                }
            };
        };

        recipesFactory.getRecipe($routeParams.id, $rootscope.recipeCallback);

        $scope.switchOnOff = function()
        {
            
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