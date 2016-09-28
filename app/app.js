/**
 * Created by Filippo on 18/05/2016.
 */
var if3tApp = angular.module('if3tApp', ['ngRoute', 'ngSanitize', 'ngResource', 'ngMaterial', 'ngCookies', 'ngAnimate']);

if3tApp.config(function ($httpProvider, $routeProvider) {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    
    $routeProvider.when('/home', {
        templateUrl: 'template/home.html',
        controller: 'HomeController'
    });
    $routeProvider.when('/newrecipe', {
        templateUrl: 'template/new_recipe.html',
        controller: 'NewRecipeController'
    });
    $routeProvider.when('/myrecipes', {
        templateUrl: 'template/my_recipes.html',
        controller: 'MyRecipesController'
    });
    $routeProvider.when('/myrecipes/:id', {
        templateUrl: 'template/edit_recipe.html',
        controller: 'EditRecipeController'
    });
    $routeProvider.when('/channels', {
        templateUrl: 'template/channels.html',
        controller: 'ChannelsController'
    });
    $routeProvider.when('/profile', {
        templateUrl: 'template/profile.html',
        controller: 'ProfileController'
    });
    
    $routeProvider.otherwise({redirectTo: '/home'});
});

if3tApp.directive('imageonload', function () {
    return {
        restrict: 'A',

        link: function (scope, element) {
            element.on('load', function () {
                // Set visibility: true + remove spinner overlay
                element.removeClass('spinner-hide');
                element.addClass('spinner-show');
                element.parent().find('span').remove();
            });
            scope.$watch('ngSrc', function () {
                // Set visibility: false + inject temporary spinner overlay
                element.addClass('spinner-hide');
                // element.parent().append('<span class="spinner, description : "</span>');
            });
        }
    }
});

if3tApp.directive("compareTo", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});

//http://jsfiddle.net/2CsfZ/47/
if3tApp.run(function ($rootScope, userFactory, $window, messageFactory) {
    $rootScope.ipServer = "http://localhost:8181";

    $rootScope.authenticated = userFactory.isAuthenticated();
    $rootScope.signupData = {};
    
    $rootScope.signupRQ = function (formValidity) {
        if (formValidity) {
            $('#signup').modal('hide');
            userFactory.signup($rootScope.signupData, $rootScope.signupRS);
        }
    };
    $rootScope.signupRS = function (status, message) {
        if (status) {
            messageFactory.showSuccessMsg("SignUp successful");
            $rootScope.loginRQ(true);
        } else {
            messageFactory.showError("SignUp Error",message);
        }
    };

    $rootScope.loginRQ = function (formValidity) {
        if (formValidity) {
            $('#login').modal('hide');
            messageFactory.showLoading();
            userFactory.login($rootScope.loginData, $rootScope.loginRS);
        }
    };
    $rootScope.loginRS = function (status) {
        if (status) {
            messageFactory.showSuccessMsg("Login successful");
        } else {
            messageFactory.showDangerMsg("Login failed");
        }
        messageFactory.hideLoading();
        $rootScope.authenticated = userFactory.isAuthenticated();
    };
    $rootScope.logoutRQ = function () {
        userFactory.logout($rootScope.logoutRS);
    };
    $rootScope.logoutRS = function (status) {
        if (status) {
            messageFactory.showSuccessMsg("Logout successful");
            $window.location.href = "#/home";
        } else {
            messageFactory.showDangerMsg("Logout failed");
        }
        $rootScope.authenticated = userFactory.isAuthenticated();
    };

    $rootScope.timeZones = [
        {id: 1, daylight_time: 0, timezone_value: -12, name: "(GMT-12:00) International Date Line West"},
        {id: 2, daylight_time: 0, timezone_value: -11, name: "(GMT-11:00) Midway Island, Samoa"},
        {id: 3, daylight_time: 0, timezone_value: -10, name: "(GMT-10:00) Hawaii"},
        {id: 4, daylight_time: 1, timezone_value: -9, name: "(GMT-09:00) Alaska"},
        {id: 5, daylight_time: 1, timezone_value: -8, name: "(GMT-08:00) Pacific Time (US & Canada)"},
        {id: 6, daylight_time: 1, timezone_value: -8, name: "(GMT-08:00) Tijuana, Baja California"},
        {id: 7, daylight_time: 0, timezone_value: -7, name: "(GMT-07:00) Arizona"},
        {id: 8, daylight_time: 1, timezone_value: -7, name: "(GMT-07:00) Chihuahua, La Paz, Mazatlan"},
        {id: 9, daylight_time: 1, timezone_value: -7, name: "(GMT-07:00) Mountain Time (US & Canada)"},
        {id: 10, daylight_time: 0, timezone_value: -6, name: "(GMT-06:00) Central America"},
        {id: 11, daylight_time: 1, timezone_value: -6, name: "(GMT-06:00) Central Time (US & Canada)"},
        {id: 12, daylight_time: 1, timezone_value: -6, name: "(GMT-06:00) Guadalajara, Mexico City, Monterrey"},
        {id: 13, daylight_time: 0, timezone_value: -6, name: "(GMT-06:00) Saskatchewan"},
        {id: 14, daylight_time: 0, timezone_value: -5, name: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"},
        {id: 15, daylight_time: 1, timezone_value: -5, name: "(GMT-05:00) Eastern Time (US & Canada)"},
        {id: 16, daylight_time: 1, timezone_value: -5, name: "(GMT-05:00) Indiana (East)"},
        {id: 17, daylight_time: 1, timezone_value: -4, name: "(GMT-04:00) Atlantic Time (Canada)"},
        {id: 18, daylight_time: 0, timezone_value: -4, name: "(GMT-04:00) Caracas, La Paz"},
        {id: 19, daylight_time: 0, timezone_value: -4, name: "(GMT-04:00) Manaus"},
        {id: 20, daylight_time: 1, timezone_value: -4, name: "(GMT-04:00) Santiago"},
        {id: 21, daylight_time: 1, timezone_value: -3.5, name: "(GMT-03:30) Newfoundland"},
        {id: 22, daylight_time: 1, timezone_value: -3, name: "(GMT-03:00) Brasilia"},
        {id: 23, daylight_time: 0, timezone_value: -3, name: "(GMT-03:00) Buenos Aires, Georgetown"},
        {id: 24, daylight_time: 1, timezone_value: -3, name: "(GMT-03:00) Greenland"},
        {id: 25, daylight_time: 1, timezone_value: -3, name: "(GMT-03:00) Montevideo"},
        {id: 26, daylight_time: 1, timezone_value: -2, name: "(GMT-02:00) Mid-Atlantic"},
        {id: 27, daylight_time: 0, timezone_value: -1, name: "(GMT-01:00) Cape Verde Is."},
        {id: 28, daylight_time: 1, timezone_value: -1, name: "(GMT-01:00) Azores"},
        {id: 29, daylight_time: 0, timezone_value: 0, name: "(GMT+00:00) Casablanca, Monrovia, Reykjavik"},
        {id: 30, daylight_time: 1, timezone_value: 0, name: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"},
        {id: 31, daylight_time: 1, timezone_value: 1, name: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"},
        {id: 32, daylight_time: 1, timezone_value: 1, name: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"},
        {id: 33, daylight_time: 1, timezone_value: 1, name: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"},
        {id: 34, daylight_time: 1, timezone_value: 1, name: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb"},
        {id: 35, daylight_time: 1, timezone_value: 1, name: "(GMT+01:00) West Central Africa"},
        {id: 36, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Amman"},
        {id: 37, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Athens, Bucharest, Istanbul"},
        {id: 38, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Beirut"},
        {id: 39, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Cairo"},
        {id: 40, daylight_time: 0, timezone_value: 2, name: "(GMT+02:00) Harare, Pretoria"},
        {id: 41, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"},
        {id: 42, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Jerusalem"},
        {id: 43, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Minsk"},
        {id: 44, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Windhoek"},
        {id: 45, daylight_time: 0, timezone_value: 3, name: "(GMT+03:00) Kuwait, Riyadh, Baghdad"},
        {id: 46, daylight_time: 1, timezone_value: 3, name: "(GMT+03:00) Moscow, St. Petersburg, Volgograd"},
        {id: 47, daylight_time: 0, timezone_value: 3, name: "(GMT+03:00) Nairobi"},
        {id: 48, daylight_time: 0, timezone_value: 3, name: "(GMT+03:00) Tbilisi"},
        {id: 49, daylight_time: 1, timezone_value: 3.5, name: "(GMT+03:30) Tehran"},
        {id: 50, daylight_time: 0, timezone_value: 4, name: "(GMT+04:00) Abu Dhabi, Muscat"},
        {id: 51, daylight_time: 1, timezone_value: 4, name: "(GMT+04:00) Baku"},
        {id: 52, daylight_time: 1, timezone_value: 4, name: "(GMT+04:00) Yerevan"},
        {id: 53, daylight_time: 0, timezone_value: 4.5, name: "(GMT+04:30) Kabul"},
        {id: 54, daylight_time: 1, timezone_value: 5, name: "(GMT+05:00) Yekaterinburg"},
        {id: 55, daylight_time: 0, timezone_value: 5, name: "(GMT+05:00) Islamabad, Karachi, Tashkent"},
        {id: 56, daylight_time: 0, timezone_value: 5.5, name: "(GMT+05:30) Sri Jayawardenapura"},
        {id: 57, daylight_time: 0, timezone_value: 5.5, name: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi"},
        {id: 58, daylight_time: 0, timezone_value: 5.75, name: "(GMT+05:45) Kathmandu"},
        {id: 59, daylight_time: 1, timezone_value: 6, name: "(GMT+06:00) Almaty, Novosibirsk"},
        {id: 60, daylight_time: 0, timezone_value: 6, name: "(GMT+06:00) Astana, Dhaka"},
        {id: 61, daylight_time: 0, timezone_value: 6.5, name: "(GMT+06:30) Yangon (Rangoon)"},
        {id: 62, daylight_time: 0, timezone_value: 7, name: "(GMT+07:00) Bangkok, Hanoi, Jakarta"},
        {id: 63, daylight_time: 1, timezone_value: 7, name: "(GMT+07:00) Krasnoyarsk"},
        {id: 64, daylight_time: 0, timezone_value: 8, name: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"},
        {id: 65, daylight_time: 0, timezone_value: 8, name: "(GMT+08:00) Kuala Lumpur, Singapore"},
        {id: 66, daylight_time: 0, timezone_value: 8, name: "(GMT+08:00) Irkutsk, Ulaan Bataar"},
        {id: 67, daylight_time: 0, timezone_value: 8, name: "(GMT+08:00) Perth"},
        {id: 68, daylight_time: 0, timezone_value: 8, name: "(GMT+08:00) Taipei"},
        {id: 69, daylight_time: 0, timezone_value: 9, name: "(GMT+09:00) Osaka, Sapporo, Tokyo"},
        {id: 70, daylight_time: 0, timezone_value: 9, name: "(GMT+09:00) Seoul"},
        {id: 71, daylight_time: 1, timezone_value: 9, name: "(GMT+09:00) Yakutsk"},
        {id: 72, daylight_time: 0, timezone_value: 9.5, name: "(GMT+09:30) Adelaide"},
        {id: 73, daylight_time: 0, timezone_value: 9.5, name: "(GMT+09:30) Darwin"},
        {id: 74, daylight_time: 0, timezone_value: 10, name: "(GMT+10:00) Brisbane"},
        {id: 75, daylight_time: 1, timezone_value: 10, name: "(GMT+10:00) Canberra, Melbourne, Sydney"},
        {id: 76, daylight_time: 1, timezone_value: 10, name: "(GMT+10:00) Hobart"},
        {id: 77, daylight_time: 0, timezone_value: 10, name: "(GMT+10:00) Guam, Port Moresby"},
        {id: 78, daylight_time: 1, timezone_value: 10, name: "(GMT+10:00) Vladivostok"},
        {id: 79, daylight_time: 1, timezone_value: 11, name: "(GMT+11:00) Magadan, Solomon Is., New Caledonia"},
        {id: 80, daylight_time: 1, timezone_value: 12, name: "(GMT+12:00) Auckland, Wellington"},
        {id: 81, daylight_time: 0, timezone_value: 12, name: "(GMT+12:00) Fiji, Kamchatka, Marshall Is."},
        {id: 82, daylight_time: 0, timezone_value: 13, name: "(GMT+13:00) Nuku'alofa"}
    ];

    var rightNow = new Date();
    var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
    var temp = jan1.toGMTString();
    var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
    var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);

    var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
    temp = june1.toGMTString();
    var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
    var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
    var dst;
    if (std_time_offset == daylight_time_offset) {
        dst = 0; // daylight savings time is NOT observed
    } else {
        dst = 1; // daylight savings time is observed
    }
    var valZone = new Date().getTimezoneOffset();
    valZone = (valZone / 60) * (-1) - dst;
    //FIXME messo var danti a i
    for (var i in $rootScope.timeZones) {
        //FIXME messo var davanti a opt
        var opt = $rootScope.timeZones[i];
        if (opt.timezone_value == valZone) {
            $rootScope.signupData.timezone = {
                id: opt.id,
                daylight_time: opt.daylight_time,
                timezone_value: opt.timezone_value,
                name: opt.name
            };
            break;
        }
    }

});

if3tApp.factory('userFactory', function ($http, $cookies, $rootScope) {

    var factory = {};
    var authenticated = false;
    var profile = {};

    factory.getProfile = function () {
        if (authenticated) {
            return profile;
        } else {
            return null;
        }
    };
    
    factory.getXsrfCookie = function(){
        return $cookies.get('XSRF-TOKEN');
    };

    factory.getAuthorization = function() {
        return authenticated ? $cookies.get('authorization') : false;
    };

    factory.isAuthenticated = function () {
        return authenticated;
    };

    factory.authenticate = function (credentials, callback) {
        if($cookies.get('authorization')) {
            authenticated = true;
            profile = angular.fromJson($cookies.get('user'));
        }

        if (!authenticated) {
            if (credentials) {
                $cookies.put('authorization', "Basic " + btoa(credentials.username + ":" + credentials.password));
                if(credentials.remember) {
                    $cookies.put("remember", angular.toJson(credentials));
                } else {
                    $cookies.remove("remember");
                }
            } else {
                if($cookies.get('remember')){
                    $rootScope.loginData = angular.fromJson($cookies.get('remember'));
                } else {
                    $rootScope.loginData = {};
                }
            }

            if($cookies.get('authorization')) {
                $http({
                    method: 'GET',
                    dataType: 'json',
                    url: $rootScope.ipServer + '/login?_csrf='+ factory.getXsrfCookie(),
                    headers: {'Content-Type': 'application/json', 'authorization': $cookies.get('authorization')}
                })
                    .then(function successCallback(response) {
                            if (response.data.principal.user) {
                                authenticated = true;
                                profile.id = response.data.principal.user.id;
                                profile.name = response.data.principal.user.name;
                                profile.surname = response.data.principal.user.surname;
                                profile.email = response.data.principal.user.email;
                                profile.username = response.data.principal.user.username;
                                profile.timezone = response.data.principal.user.timezone;
                                $cookies.put('user', angular.toJson(profile));
                            } else {
                                profile = {};
                                authenticated = false;
                                $cookies.remove("authorization");
                                $cookies.remove("user");
                            }
                            callback && callback();
                        },
                        function errorCallback() {
                            authenticated = false;
                            profile = {};
                            $cookies.remove("authorization");
                            $cookies.remove("user");
                            console.log("ERROR GET: authenticate");
                            callback && callback();
                        });
            }
        }
    };
    factory.authenticate();

    factory.login = function (credentials, callback) {
        factory.authenticate(credentials, function () {
            if (authenticated) {
                callback && callback(true);
            } else {
                callback && callback(false);
            }
        });
    };

    factory.logout = function (callback) {
        $http({
            method: 'GET',
            dataType: 'json',
            url: $rootScope.ipServer + '/login?logout&_csrf='+ factory.getXsrfCookie(),
            headers: {'Content-Type': 'application/json'}
        })
            .then(function successCallback() {
                    authenticated = false;
                    $cookies.remove("authorization");
                    $cookies.remove("user");
                    if($cookies.get('remember')){
                        $rootScope.loginData = angular.fromJson($cookies.get('remember'));
                    }
                    callback && callback(true);
                },
                function errorCallback() {
                    callback && callback(false);
                });
    };

    factory.signup = function (data, callback) {
        if (!authenticated) {
            var user = {};
            user.name = data.name;
            user.surname = data.surname;
            user.email = data.mail;
            user.username = data.username;
            user.password = data.password;
            user.timezone = data.timezone;

            $http({
                method: 'POST',
                dataType: 'json',
                url: $rootScope.ipServer + '/signup?_csrf=' + factory.getXsrfCookie(),
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(user)
            })
                .then(function successCallback() {
                        $rootScope.loginData.username = user.username;
                        $rootScope.loginData.password = user.password;
                        callback && callback(true);
                    },
                    function errorCallback(response) {
                        console.log("ERROR POST: signup");
                        console.log(response);
                        callback && callback(false, response.data.message);
                    });
        }
    };

    factory.editProfile = function (data, callback) {
        $http({
            method: 'PUT',
            dataType: 'json',
            url: $rootScope.ipServer + '/userinfo?_csrf=' + factory.getXsrfCookie(),
            headers: {'Content-Type': 'application/json'},
            data: angular.toJson(data)
        })
            .then(function successCallback() {
                    profile = data;
                    $cookies.put('user', angular.toJson(profile));
                    callback && callback(true);
                },
                function errorCallback(response) {
                    console.log("ERROR PUT: editProfile");
                    console.log(response);
                    callback && callback(false, response.data.message);
                });
    };

    factory.changePassword = function (data, callback) {
        $http({
            method: 'PUT',
            dataType: 'json',
            url: $rootScope.ipServer + '/userpassword?_csrf=' + factory.getXsrfCookie(),
            headers: {'Content-Type': 'application/json'},
            data: angular.toJson(data)
        })
            .then(function successCallback() {
                    callback && callback(true);
                },
                function errorCallback(response) {
                    callback && callback(false, response.data.message);
                    console.log("ERROR PUT: changePassword");
                    console.log(response);
                });
    };

    return factory;
});

if3tApp.factory('messageFactory', function()
{
    var factory = {};

    factory.showLoading = function () {
        $('#loading').modal('show');
    };

    factory.hideLoading = function () {
        $('#loading').modal('hide');
    };

    factory.showDialog = function (title, message, confirm, cancel, callback, callbackParam) {
        $("#dialog-box").modal('show');
        $('#dialog-title').html(title);
        $('#dialog-message').html(message);
        $('#dialog-confirm').html(confirm)
            .click(function(){
                if (typeof callback === "function") {
                    callback(callbackParam);
                }
            });
        $('#dialog-cancel').html(cancel)
            .click(function(){});
    };

    factory.showError = function (title, message) {
        $("#error-box").modal('show');
        $('#error-title').html(title);
        $('#error-message').html(message);
    };

    factory.showWarningMsg = function (message) {
        $("#alert-warning").show()
            .html(message)
            .fadeTo(1500, 500).fadeOut(500, function(){
                $("#alert-warning").hide();
            });
    };

    factory.showSuccessMsg = function (message) {
        $("#alert-success").show()
            .html(message)
            .fadeTo(1200, 500).fadeOut(500, function(){
                $("#alert-success").hide();
            });
    };

    factory.showInfoMsg = function (message) {
        $("#alert-info").show()
            .html(message)
            .fadeTo(1000, 500).fadeOut(500, function(){
                $("#alert-info").hide();
            });
    };

    factory.showDangerMsg = function (message) {
        $("#alert-danger").show()
            .html(message)
            .fadeTo(2000, 500).fadeOut(500, function(){
                $("#alert-danger").hide();
            });
    };

    return factory;
});

if3tApp.factory('recipesFactory', function ($http, $cookies, $rootScope, $window, userFactory, messageFactory)
{
    var factory = {};
    
    factory.getRecipe = function(id, callback)
    {
        messageFactory.showLoading();

        $http({
            method: 'GET',
            url: $rootScope.ipServer + '/recipe/' + id + '?_csrf=' + userFactory.getXsrfCookie()
        }).then
        (
            function successCallback(resp)
            {
                messageFactory.hideLoading();
                callback && callback(resp.data);
            },
            function errorCallback(resp)
            {
                messageFactory.hideLoading();
                messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
            }
        );
    };

    factory.getUserRecipes = function(callback)
    {
        messageFactory.showLoading();

        $http({
            method: 'GET',
            url: $rootScope.ipServer + '/user_recipes/?_csrf=' + userFactory.getXsrfCookie()
        }).then
        (
            function success(resp)
            {
                messageFactory.hideLoading();
                callback && callback(resp.data)
            },
            function error(resp)
            {
                messageFactory.hideLoading();
                messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
            }
        );
    };

    factory.toggleRecipeEnabled = function(recipe)
    {
        messageFactory.showLoading();

        $http({
            dataType: 'json',
            method: 'PUT',
            url: $rootScope.ipServer + '/enable_recipe/?_csrf=' + userFactory.getXsrfCookie(),
            data: angular.toJson({ id: recipe.id })
        }).then
        (
            function successCallback(resp)
            {
                messageFactory.hideLoading();
                recipe.isEnabled = !recipe.isEnabled;
                messageFactory.showSuccessMsg(resp.data.message);
            },
            function errorCallback(resp)
            {
                messageFactory.hideLoading();
                messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
            }
        );
    };

    factory.toggleRecipePublic = function(recipe)
    {
        messageFactory.showLoading();
        
        $http({
            dataType: 'json',
            method: 'PUT',
            url: $rootScope.ipServer + '/publish_recipe/?_csrf=' + userFactory.getXsrfCookie(),
            data: angular.toJson({ id: recipe.id })
        }).then
        (
            function successCallback(resp)
            {
                messageFactory.hideLoading();
                recipe.isPublic = !recipe.isPublic;
                messageFactory.showSuccessMsg(resp.data.message);
            },
            function errorCallback(resp) 
            {
                messageFactory.hideLoading();
                messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
            }
        );
    };

    factory.deleteRecipe = function(id)
    {
        messageFactory.showLoading();

        $http({
            method: 'GET',
            url: $rootScope.ipServer + '/delete_recipe/' + id + '?_csrf=' + userFactory.getXsrfCookie()
        }).then
        (
            function successCallback(resp)
            {
                messageFactory.hideLoading();
                $window.location.href = '#/home';
                messageFactory.showSuccessMsg(resp.data.message);

            },
            function errorCallback(resp)
            {
                messageFactory.hideLoading();
                messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
            }
        );
    };

    factory.updateRecipe = function(recipe)
    {
        messageFactory.showLoading();

        $http({
            dataType: 'json',
            method: 'PUT',
            url: $rootScope.ipServer + '/update_recipe/?_csrf=' + userFactory.getXsrfCookie(),
            data: angular.toJson(recipe)
        }).then
        (
            function successCallback(resp)
            {
                messageFactory.hideLoading();
                messageFactory.showSuccessMsg(resp.data.message);
            },
            function errorCallback(resp)
            {
                messageFactory.hideLoading();
                messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
            }
        );
    };

    return factory;
});




var boolean_toggle_nav = false;

function toggle_nav()
{
    if (!boolean_toggle_nav) {
        boolean_toggle_nav = true;
    }
    else {
        boolean_toggle_nav = false;
    }
}

function click_nav()
{
    //FIXME to remove
    //console.log("BEFORE " + boolean_toggle_nav);
    if(boolean_toggle_nav){
        $("#id_nav_button").click();
        boolean_toggle_nav = false;
    }
}