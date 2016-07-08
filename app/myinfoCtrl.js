/**
 * Created by TheChuck on 07/07/2016.
 */
if3tApp.controller('MyInfoController', ['userFactory', '$scope', '$rootScope', '$routeParams', '$location', '$http',
    function (userFactory, $scope, $rootScope, $routeParams, $location, $http) {
        $rootScope.curpage = "profile";

        //if(!userFactory.isAuthenticated())

        $scope.user = {name: "Andrea", surname: "Cuiuli", username: "TheChuck",
                        email: "ciaociao@gmail.com", enable: 0, role: "USER",
                        timezone: {timezone: -9, id: 4, daylight_time: 1, description: "(GMT-09:00) Alaska"}};
        
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