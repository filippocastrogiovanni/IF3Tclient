/**
 Created by Filippo on 24/05/2016.
 */

if3tApp.controller('ChannelsController', ['$scope', '$rootScope', '$routeParams', '$window', '$http', 'userFactory', 'messageFactory',
    function ($scope, $rootScope, $routeParams, $window, $http, userFactory, messageFactory)
    {
        $rootScope.curpage = "channels";
        messageFactory.showLoading();

        $http.get($rootScope.ipServer + "/channels").then
        (
            function success(resp)
            {
                messageFactory.hideLoading();
                $scope.channels = resp.data;
            },
            function error(resp)
            {
                messageFactory.hideLoading();
                messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
            }
        );

        $scope.channelDetail = [];

        $scope.visibleChannel = function(channel)
        {
            if($scope.channelDetail[channel.channelId]) {
                console.log("qui entra");
                return $scope.channelDetail[channel.channelId].visible;
            }
            return false;
        };

        $scope.selectChannel = function(channel)
        {
            $scope.channelDetail[channel.channelId] = {};
            $scope.channelDetail.forEach(function(entry) {
                entry.visible = false;
            });
            $scope.channelDetail[channel.channelId].visible = true;
            $scope.channelDetail[channel.channelId].url = "";


            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + '/' + channel.keyword + '/auth',
                headers: { 'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization() }
            }).then
            (
                function successCallback(resp)
                {
                    $scope.channelDetail[channel.channelId].url = resp.data.message;
                    $scope.channelDetail[channel.channelId].visible = true;
                },
                function errorCallback(resp)
                {
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                    $scope.channelDetail[channel.channelId].visible = false;
                    $scope.channelDetail[channel.channelId].url = "";
                }
            );

        };

        $scope.loadPage = function(channel)
        {
            $window.open($scope.channelDetail[channel.channelId].url,"_blank","location=no," +
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