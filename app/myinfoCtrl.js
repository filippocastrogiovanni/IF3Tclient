/**
 * Created by TheChuck on 07/07/2016.
 */
if3tApp.controller('MyInfoController', ['userFactory', '$scope', '$rootScope', '$routeParams', '$location', '$http',
    function (userFactory, $scope, $rootScope, $routeParams, $location, $http) {
        $rootScope.curpage = "profile";

        if(!userFactory.isAuthenticated())
            $window.location.href = "#/home";

        $scope.user = userFactory.getProfile();
        
        $scope.passwordChange = {currPass: "", newPass:"", confirmNewPass:""};
        
        $scope.saveUserData = function(){
            var currentUser = userFactory.getProfile();
            if(currentUser != $scope.user)
                return;
            
            userFactory.editProfile($scope.user);
            console.log($scope.user);
        };

        $scope.changePassword = function(){
            //userFactory.changePassword();
            console.log($scope.passwordChange);
            $scope.passwordChange = {currPass: "", newPass:"", confirmNewPass:""};
        }
    }
]);