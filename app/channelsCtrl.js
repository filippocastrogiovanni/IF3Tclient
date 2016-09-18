/**
 Created by Filippo on 24/05/2016.
 */

if3tApp.controller('ChannelsController', ['$scope', '$rootScope', '$routeParams', '$window', '$http', 'userFactory', 'messageFactory',
    function ($scope, $rootScope, $routeParams, $window, $http, userFactory, messageFactory) {
        $rootScope.curpage = "channels";
        $("body").css("overflow", "auto");

        messageFactory.showLoading();
        $http.get($rootScope.ipServer + "/channels").then
        (
            function success(resp) {
                messageFactory.hideLoading();
                $scope.channels = resp.data;
            },
            function error(resp) {
                messageFactory.hideLoading();
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

        $scope.connectedChannel = function (channel) {
            if ($scope.channelDetail[channel.channelId]) {
                return $scope.channelDetail[channel.channelId].connected;
            }
            return false;
        };

        $scope.selectChannel = function (channel) {
            $scope.channelDetail[channel.channelId] = {};
            $scope.channelDetail.forEach(function (entry) {
                entry.visible = false;
            });
            $scope.channelDetail[channel.channelId].visible = true;
            $scope.channelDetail[channel.channelId].connected = false;
            $scope.channelDetail[channel.channelId].url = "";

            if(!userFactory.isAuthenticated()) {
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
                    if (resp.data.code == 200) {
                        //channel connected
                        $scope.channelDetail[channel.channelId].connected = true;
                    } else {
                        //channel not yet connected
                        $scope.channelDetail[channel.channelId].connected = false;
                    }
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

        $scope.connect = function (channel) {
            $scope.channelDetail[channel.channelId].visible = false;
            $window.open($scope.channelDetail[channel.channelId].url, "_blank", "location=no," +
                "menubar=no," +
                "toolbar=no," +
                "scrollbars=no," +
                "resizable=no," +
                "status=no," +
                "titlebar=no," +
                "top=100,left=300," +
                "width=550,height=550");
        };

        $scope.disconnect = function (channel) {
            $scope.channelDetail[channel.channelId].visible = false;
            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + $scope.channelDetail[channel.channelId].url,
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
            }).then
            (
                function successCallback(resp) {
                    if (resp.data.code == 200) {
                        //channel disconnected
                        $scope.channelDetail[channel.channelId].connected = false;
                        messageFactory.showSuccessMsg("Channel succesfully disconnected");
                    } else {
                        messageFactory.showWarningMsg("Channel not disconnected yet");
                        $scope.channelDetail[channel.channelId].connected = true;
                    }
                },
                function errorCallback(resp) {
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                }
            );
        };
    }
]);