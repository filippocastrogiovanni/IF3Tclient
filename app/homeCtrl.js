/**
 * Created by Filippo on 18/05/2016.
 */

if3tApp.controller('HomeController', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'userFactory', '$window',
    function ($scope, $rootScope, $routeParams, $location, $http, userFactory, $window) {
        console.log("ciao");
        $scope.facebookConnectFunction = function() {
            $http({
                method: 'GET',
                url: $rootScope.ipServer+'/facebook/auth?_csrf='+userFactory.getXsrfCookie(),
                headers: {'Content-Type': 'application/json'}
            }).then(function successCallback(response) {
                $scope.facebook_auth_url = response.data.message;
                console.log("success");
                console.log($scope.facebook_auth_url);
                $window.open($scope.facebook_auth_url,"_blank","location=no," +
                    "menubar=no," +
                    "toolbar=no," +
                    "scrollbars=no," +
                    "resizable=no," +
                    "status=no," +
                    "titlebar=no," +
                    "top=100,left=300," +
                    "width=550,height=550");
            }, function errorCallback(response) {
                console.log("error");
            });
        }

        $scope.facebookDisconnectFunction = function() {
            $http({
                method: 'GET',
                url: $rootScope.ipServer+'/facebook/revokeauth?_csrf='+userFactory.getXsrfCookie(),
                headers: {'Content-Type': 'application/json'}
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log("error");
            });
        }
        //including name="scope" value="user_posts"
        /*
         var facebook_data =  {
         scope: "user_posts"
         };
         $http({
         method: 'POST',
         url: $rootScope.ipServer+'/connect/facebook?_csrf='+userFactory.getXsrfCookie(),
         data: angular.toJson(facebook_data),
         headers: {'Content-Type': 'application/json' }
         }).then(function successCallback(response) {
         console.log("success");
         }, function errorCallback(response) {
         console.log("error");
         });
         }
         */

    }
]);