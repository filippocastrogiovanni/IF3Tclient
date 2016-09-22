/**
 * Created by TheChuck on 07/07/2016.
 */
if3tApp.controller('MyChannelsController', ['messageFactory', '$scope', '$rootScope', '$routeParams', '$window', '$http', 'userFactory',
    function (messageFactory, $scope, $rootScope, $routeParams, $window, $http, userFactory) {
        $rootScope.curpage = "profile";

        if (!userFactory.isAuthenticated())
            $window.location.href = "#/home";

        $http({
            method: 'GET',
            url: $rootScope.ipServer + '/authorized_channels',
            headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
        })
            .then(
                function success(response) {
                    $scope.channels = response.data;
                },
                function error(error) {
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                }
            );

        $scope.channelDetail = [];

        $scope.visibleChannel = function (channel) {
            if ($scope.channelDetail[channel.channelId]) {
                return $scope.channelDetail[channel.channelId].visible;
            }
            return false;
        };

        $scope.selectChannel = function (channel) {
            $scope.channelDetail[channel.channelId] = {};
            $scope.channelDetail.forEach(function (entry) {
                entry.visible = false;
            });
            $scope.channelDetail[channel.channelId].visible = true;
            $scope.channelDetail[channel.channelId].url = "";

            if(!channel.isNeededAuth) {
                $scope.channelDetail[channel.channelId].connected = true;
                $scope.channelDetail[channel.channelId].visible = false;
                return;
            }

            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + '/' + channel.keyword + '/auth',
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
            }).then
            (
                function successCallback(resp) {
                    $scope.channelDetail[channel.channelId].url = resp.data.message;
                    $scope.channelDetail[channel.channelId].visible = true;
                },
                function errorCallback(resp) {
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                    $scope.channelDetail[channel.channelId].visible = false;
                    $scope.channelDetail[channel.channelId].url = "";
                }
            );

        };


        $scope.disconnect = function (channel) {
            messageFactory.showLoading();
            $scope.channelDetail[channel.channelId].visible = false;
            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + $scope.channelDetail[channel.channelId].url,
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
            }).then
            (
                function successCallback(resp) {
                    messageFactory.hideLoading();
                    if (resp.data.code == 200) {
                        //channel disconnected
                        $scope.channels.forEach(function (item, index, object) {
                            if(item.channelId == channel.channelId) {
                                object.splice(index, 1);
                            }
                        });
                        messageFactory.showSuccessMsg("Channel succesfully disconnected");
                    } else {
                        messageFactory.showWarningMsg("Channel not disconnected yet");
                    }
                },
                function errorCallback(resp) {
                    messageFactory.hideLoading();
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                }
            );
        };
    }
]);