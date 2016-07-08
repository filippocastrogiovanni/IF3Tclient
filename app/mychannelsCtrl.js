/**
 * Created by TheChuck on 07/07/2016.
 */
if3tApp.controller('MyChannelsController', ['$scope', '$rootScope', '$routeParams', '$location', '$http',
    function ($scope, $rootScope,  $routeParams, $location, $http) {        
        $rootScope.curpage = "profile";

        /*$http.get("localhost:8181/channels")
            .then(function(response){
                $scope.myChannels = response;
         });*/

        $scope.channels = [];
        $scope.channels[0] = {channelId: 0, name: "facebook", url:"images/facebook_icon.png"};
        $scope.channels[1] = {channelId: 1, name: "google_calendar", url:"images/google_calendar_icon.png"};
        $scope.channels[2] = {channelId: 2, name: "google_mail", url:"images/google_mail_icon.png"};
        $scope.channels[3] = {channelId: 3, name: "twitter", url:"images/twitter_icon.png"};
    }
]);