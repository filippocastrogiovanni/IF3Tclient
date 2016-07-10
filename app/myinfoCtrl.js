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
            if(response)
                messageFactory.showSuccessMsg("Information successfully modified!");
            else
                messageFactory.showDangerMsg("There was an error with the server, try again!");
        };
        
        $scope.saveUserData = function(){
            var currentUser = userFactory.getProfile();
            if(currentUser != $scope.user)
                return;
            
            userFactory.editProfile($scope.user, callback);
            console.log($scope.user);
        };

        $scope.changePassword = function(){
            //userFactory.changePassword();
            console.log($scope.passwordChange);
            $scope.passwordChange = {currPass: "", newPass:"", confirmNewPass:""};
        }
    }
]);