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

        $scope.channelURL = "";
        $scope.showDetailChannel = false;

        $scope.selectChannel = function(channel)
        {
            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + '/' + channel.keyword + '/auth',
                headers: { 'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization() }
            }).then
            (
                function successCallback(resp)
                {
                    $scope.channelURL = resp.data.message;
                },
                function errorCallback(resp)
                {
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                }
            );

            if ($scope.selectedChannel == null || $scope.selectedChannel == channel)
            {
                $scope.selectedChannel = channel;
                $scope.showDetailChannel = !$scope.showDetailChannel;
                return;
            }

            $scope.showDetailChannel = false;
            $scope.selectedChannel = channel;
            $scope.showDetailChannel = true;

        };

        $scope.backToChannels = function() {
            $scope.showDetailChannel = false;
        };

        $scope.loadPage = function()
        {
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