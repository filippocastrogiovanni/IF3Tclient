/**
 * Created by Filippo on 24/05/2016.
 */

if3tApp.controller('ChannelsController', ['$scope', '$rootScope', '$routeParams', '$location', '$http',
    function ($scope, $rootscope, $routeParams, $location, $http) {
        $rootscope.curpage = "channels";

        /*$http.get("localhost:8181/channels")
            .then(function(response){
                $scope.channels = response;
        })*/

        $scope.showDetailChannel = false;
        $scope.channels = [];
        $scope.channels[0] = {channelId: 0, name: "facebook", url:"images/facebook_icon.png"};
        $scope.channels[1] = {channelId: 1, name: "google_calendar", url:"images/google_calendar_icon.png"};
        $scope.channels[2] = {channelId: 2, name: "google_mail", url:"images/google_mail_icon.png"};
        $scope.channels[3] = {channelId: 3, name: "twitter", url:"images/twitter_icon.png"};
        
        $scope.selectChannel = function(channelId){
            if($scope.selectedChannel == null || $scope.selectedChannel.channelId == channelId){
                $scope.selectedChannel = $scope.channels[channelId];
                $scope.showDetailChannel = !$scope.showDetailChannel;
                return;
            }
            $scope.showDetailChannel = false;
            $scope.selectedChannel = $scope.channels[channelId];
            $scope.showDetailChannel = true;
        };

        $scope.backToChannels = function(){
            $scope.showDetailChannel = false;
        }
    }
]);