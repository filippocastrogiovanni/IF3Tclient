/**
 * Created by TheChuck on 07/07/2016.
 */
if3tApp.controller('MyChannelsController', ['messageFactory', '$scope', '$rootScope', '$routeParams', '$window', '$http', 'userFactory',
    function (messageFactory, $scope, $rootScope,  $routeParams, $window, $http, userFactory) {
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

        $scope.disconnectChannel = function(channel){
            messageFactory.showLoading();
            $http({
                method: 'POST',
                dataType: 'json',
                url: $rootScope.ipServer + '/unauthorize_channel/' + channel.channelId,
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
            })
                .then(
                    function successCallback(response) {
                        messageFactory.hideLoading();
                        var index = $scope.channels.indexOf(channel);
                        if (index != -1) {
                            $scope.channels.splice(index, 1);
                            messageFactory.showSuccessMsg("Channel successfully disconnected!");
                        }
                        //console.log(response);
                    },
                    function errorCallback(error) {
                        //console.log(error);
                    });
        }
    }
]);