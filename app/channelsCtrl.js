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

        $scope.selectChannel = function(channel)
        {
            $scope.channelDetail[channel.channelId] = {};
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
                },
                function errorCallback(resp)
                {
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
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