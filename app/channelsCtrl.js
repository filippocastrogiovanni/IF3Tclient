/**
 Created by Filippo on 24/05/2016.
 */

if3tApp.controller('ChannelsController', ['$scope', '$rootScope', '$routeParams', '$window', '$http', 'userFactory',
    function ($scope, $rootScope, $routeParams, $window, $http, userFactory) {
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

        $scope.channelURL = "";
        $scope.showDetailChannel = false;
        $scope.selectChannel = function(channel){
            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + '/' + channel.keyword + '/auth',
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
            })
                .then(function successCallback(response) {
                        $scope.channelURL = response.data.message;
                    },
                    function errorCallback(error) {
                        console.log(error);
                        console.log("Errore nel richiedere il channel URL");
                    });
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

        $scope.loadPage = function(){
            console.log($scope.channelURL);
            $window.open($scope.channelURL,"_blank","location=no," +
                "menubar=no," +
                "toolbar=no," +
                "scrollbars=no," +
                "resizable=no," +
                "status=no," +
                "titlebar=no," +
                "top=100,left=300," +
                "width=550,height=550");
        };

    }
]);