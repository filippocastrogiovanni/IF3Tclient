/**
 * Created by TheChuck on 07/07/2016.
 */
if3tApp.controller('MyChannelsController', ['$scope', '$rootScope', '$routeParams', '$window', '$http', 'userFactory',
    function ($scope, $rootScope,  $routeParams, $window, $http, userFactory) {
        $rootScope.curpage = "profile";

        if(!userFactory.isAuthenticated())
            $window.location.href = "#/home";

        $http({
            method: 'GET',
            url: $rootScope.ipServer + '/authorized_channels',
            headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
        })
            .then(
                function success(response){
                    $scope.channels = response.data;
                    console.log(response);
                },
                function error(error){
                    console.log(error);
                }
            );

        $scope.disconnectChannel = function(channelId){
            $http({
                method: 'POST',
                dataType: 'json',
                url: $rootScope.ipServer + '/unauthorize_channel/' + channelId,
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
            })
                .then(
                    function successCallback(response) {
                        console.log(response);
                    },
                    function errorCallback(error) {
                        console.log(error);
                    });
        }
    }
]);