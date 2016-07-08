/**
 * Created by Filippo on 24/05/2016.
 */

if3tApp.controller('MyRecipesController', ['$scope', '$rootScope', '$routeParams', '$location',
    function ($scope, $rootscope, $routeParams, $location)
    {
        $rootscope.curpage = "myrecipes";
    }
]);

if3tApp.controller('EditRecipeController', ['$scope', '$rootScope', '$routeParams', '$location',
    function ($scope, $rootscope, $routeParams, $location)
    {
        //rootscope.curpage = "editrecipe";
        $scope.idRecipe = $routeParams.id_recipe;
        $scope.urlTriggerImg = "images/google_calendar_icon.png";
        $scope.urlActionImg = "images/google_mail_icon.png";
    }
]);