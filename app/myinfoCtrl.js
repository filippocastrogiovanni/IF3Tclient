/**
 * Created by TheChuck on 07/07/2016.
 */
if3tApp.controller('MyInfoController', ['messageFactory','userFactory', '$scope', '$rootScope', '$routeParams', '$location', '$http',
    function (messageFactory, userFactory, $scope, $rootScope, $routeParams, $location, $http) {
        $rootScope.curpage = "profile";

        if(!userFactory.isAuthenticated())
            $window.location.href = "#/home";

        $scope.user = userFactory.getProfile();
        
        $scope.passwordChange = {currPass: "", newPass:"", confirmNewPass:""};
        
        $scope.callback = function(response){
            messageFactory.hideLoading();
            if(response)
                messageFactory.showSuccessMsg("Profile successfully updated!");
            else
                messageFactory.showDangerMsg("There was an error with the server, try again!");
        };
        
        $scope.saveUserData = function(formValidity){
            if(formValidity) {
                var currentUser = userFactory.getProfile();
                if(currentUser != $scope.user)
                    return;

                messageFactory.showLoading();
                userFactory.editProfile($scope.user, $scope.callback);
            }
        };

        $scope.changePassword = function(form){
            if(form.$valid) {
                messageFactory.showLoading();
                userFactory.changePassword($scope.passwordChange, $scope.callback);
                $scope.passwordChange = {};
                form.$setPristine();
            }

        }
    }
]);