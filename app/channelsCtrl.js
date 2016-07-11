/**
 Created by Filippo on 24/05/2016.
 */

if3tApp.controller('ChannelsController', ['$scope', '$rootScope', '$routeParams', '$location', '$http',
    function ($scope, $rootScope, $routeParams, $location, $http) {
        $rootScope.curpage = "channels";

        $http.get($rootScope.ipServer + "/channels")
            .then(
                function success(response){
                    $scope.channels = response.data;
                },
                function error(error){
                    console.log(error);
                }
            );

        $scope.showDetailChannel = false;
        $scope.selectChannel = function(channel){
            if($scope.selectedChannel == null || $scope.selectedChannel == channel){
                $scope.selectedChannel = channel;
                $scope.showDetailChannel = !$scope.showDetailChannel;
                return;
            }
            $scope.showDetailChannel = false;
           $scope.selectedChannel = channel;
            $scope.showDetailChannel = true;
        };

        $scope.backToChannels = function(){
            $scope.showDetailChannel = false;
        };

        $scope.loadPage = function(url) {
            $('#external-box').modal('show').find('.modal-body').load(url);
        };

        $scope.connect = function() {
            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + '/gmail/auth',
                headers: {'Content-Type': 'application/json', 'authorization': $cookies.get('authorization')}
            })
                .then(function successCallback(response) {
                        $scope.loadPage(response.data.message);
                    },
                    function errorCallback(response) {
                        $scope.loadPage(response.data.message);
                    });
        };
    }
]);