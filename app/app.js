/**
 * Created by Filippo on 18/05/2016.
 */
var if3tApp = angular.module('if3tApp', ['ngRoute', 'ngSanitize', 'ngResource', 'ngMaterial', 'ngCookies']);

if3tApp.config(['$routeProvider', function ($routeProvider) {
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
    $routeProvider.when('/channels', {
        templateUrl: 'template/channels.html',
        controller: 'ChannelsController'
    });
    $routeProvider.otherwise({redirectTo: '/home'});
}]);

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
if3tApp.run(function ($rootScope, userFactory) {
    $rootScope.ipServer = "http://192.168.43.234:8181";

    $rootScope.timeZones = [
        {timezone: -12, id: 1, description: "(GMT-12:00) International Date Line West"},
        {timezone: -11, id: 2, description: "(GMT-11:00) Midway Island, Samoa"},
        {timezone: -10, id: 3, description: "(GMT-10:00) Hawaii"},
        {timezone: -9, id: 4, description: "(GMT-09:00) Alaska"},
        {timezone: -8, id: 5, description: "(GMT-08:00) Pacific Time (US & Canada)"},
        {timezone: -8, id: 6, description: "(GMT-08:00) Tijuana, Baja California"},
        {timezone: -7, id: 7, description: "(GMT-07:00) Arizona"},
        {timezone: -7, id: 8, description: "(GMT-07:00) Chihuahua, La Paz, Mazatlan"},
        {timezone: -7, id: 9, description: "(GMT-07:00) Mountain Time (US & Canada)"},
        {timezone: -6, id: 10, description: "(GMT-06:00) Central America"},
        {timezone: -6, id: 11, description: "(GMT-06:00) Central Time (US & Canada)"},
        {timezone: -6, id: 12, description: "(GMT-06:00) Guadalajara, Mexico City, Monterrey"},
        {timezone: -6, id: 13, description: "(GMT-06:00) Saskatchewan"},
        {timezone: -5, id: 14, description: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"},
        {timezone: -5, id: 15, description: "(GMT-05:00) Eastern Time (US & Canada)"},
        {timezone: -5, id: 16, description: "(GMT-05:00) Indiana (East)"},
        {timezone: -4, id: 17, description: "(GMT-04:00) Atlantic Time (Canada)"},
        {timezone: -4, id: 18, description: "(GMT-04:00) Caracas, La Paz"},
        {timezone: -4, id: 19, description: "(GMT-04:00) Manaus"},
        {timezone: -4, id: 20, description: "(GMT-04:00) Santiago"},
        {timezone: -3.5, id: 21, description: "(GMT-03:30) Newfoundland"},
        {timezone: -3, id: 22, description: "(GMT-03:00) Brasilia"},
        {timezone: -3, id: 23, description: "(GMT-03:00) Buenos Aires, Georgetown"},
        {timezone: -3, id: 24, description: "(GMT-03:00) Greenland"},
        {timezone: -3, id: 25, description: "(GMT-03:00) Montevideo"},
        {timezone: -2, id: 26, description: "(GMT-02:00) Mid-Atlantic"},
        {timezone: -1, id: 27, description: "(GMT-01:00) Cape Verde Is."},
        {timezone: -1, id: 28, description: "(GMT-01:00) Azores"},
        {timezone: 0, id: 29, description: "(GMT+00:00) Casablanca, Monrovia, Reykjavik"},
        {timezone: 0, id: 30, description: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"},
        {timezone: 1, id: 31, description: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"},
        {timezone: 1, id: 32, description: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"},
        {timezone: 1, id: 33, description: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"},
        {timezone: 1, id: 34, description: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb"},
        {timezone: 1, id: 35, description: "(GMT+01:00) West Central Africa"},
        {timezone: 2, id: 36, description: "(GMT+02:00) Amman"},
        {timezone: 2, id: 37, description: "(GMT+02:00) Athens, Bucharest, Istanbul"},
        {timezone: 2, id: 38, description: "(GMT+02:00) Beirut"},
        {timezone: 2, id: 39, description: "(GMT+02:00) Cairo"},
        {timezone: 2, id: 40, description: "(GMT+02:00) Harare, Pretoria"},
        {timezone: 2, id: 41, description: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"},
        {timezone: 2, id: 42, description: "(GMT+02:00) Jerusalem"},
        {timezone: 2, id: 43, description: "(GMT+02:00) Minsk"},
        {timezone: 2, id: 44, description: "(GMT+02:00) Windhoek"},
        {timezone: 3, id: 45, description: "(GMT+03:00) Kuwait, Riyadh, Baghdad"},
        {timezone: 3, id: 46, description: "(GMT+03:00) Moscow, St. Petersburg, Volgograd"},
        {timezone: 3, id: 47, description: "(GMT+03:00) Nairobi"},
        {timezone: 3, id: 48, description: "(GMT+03:00) Tbilisi"},
        {timezone: 3.5, id: 49, description: "(GMT+03:30) Tehran"},
        {timezone: 4, id: 50, description: "(GMT+04:00) Abu Dhabi, Muscat"},
        {timezone: 4, id: 51, description: "(GMT+04:00) Baku"},
        {timezone: 4, id: 52, description: "(GMT+04:00) Yerevan"},
        {timezone: 4.5, id: 53, description: "(GMT+04:30) Kabul"},
        {timezone: 5, id: 54, description: "(GMT+05:00) Yekaterinburg"},
        {timezone: 5, id: 55, description: "(GMT+05:00) Islamabad, Karachi, Tashkent"},
        {timezone: 5.5, id: 56, description: "(GMT+05:30) Sri Jayawardenapura"},
        {timezone: 5.5, id: 57, description: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi"},
        {timezone: 5.75, id: 58, description: "(GMT+05:45) Kathmandu"},
        {timezone: 6, id: 59, description: "(GMT+06:00) Almaty, Novosibirsk"},
        {timezone: 6, id: 60, description: "(GMT+06:00) Astana, Dhaka"},
        {timezone: 6.5, id: 61, description: "(GMT+06:30) Yangon (Rangoon)"},
        {timezone: 7, id: 62, description: "(GMT+07:00) Bangkok, Hanoi, Jakarta"},
        {timezone: 7, id: 63, description: "(GMT+07:00) Krasnoyarsk"},
        {timezone: 8, id: 64, description: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"},
        {timezone: 8, id: 65, description: "(GMT+08:00) Kuala Lumpur, Singapore"},
        {timezone: 8, id: 66, description: "(GMT+08:00) Irkutsk, Ulaan Bataar"},
        {timezone: 8, id: 67, description: "(GMT+08:00) Perth"},
        {timezone: 8, id: 68, description: "(GMT+08:00) Taipei"},
        {timezone: 9, id: 69, description: "(GMT+09:00) Osaka, Sapporo, Tokyo"},
        {timezone: 9, id: 70, description: "(GMT+09:00) Seoul"},
        {timezone: 9, id: 71, description: "(GMT+09:00) Yakutsk"},
        {timezone: 9.5, id: 72, description: "(GMT+09:30) Adelaide"},
        {timezone: 9.5, id: 73, description: "(GMT+09:30) Darwin"},
        {timezone: 10, id: 74, description: "(GMT+10:00) Brisbane"},
        {timezone: 10, id: 75, description: "(GMT+10:00) Canberra, Melbourne, Sydney"},
        {timezone: 10, id: 76, description: "(GMT+10:00) Hobart"},
        {timezone: 10, id: 77, description: "(GMT+10:00) Guam, Port Moresby"},
        {timezone: 10, id: 78, description: "(GMT+10:00) Vladivostok"},
        {timezone: 11, id: 79, description: "(GMT+11:00) Magadan, Solomon Is., New Caledonia"},
        {timezone: 12, id: 80, description: "(GMT+12:00) Auckland, Wellington"},
        {timezone: 12, id: 81, description: "(GMT+12:00) Fiji, Kamchatka, Marshall Is."},
        {timezone: 13, id: 82, description: "(GMT+13:00) Nuku'alofa"}
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
    for (i in $rootScope.timeZones) {
        opt = $rootScope.timeZones[i];
        if (opt.timezone == valZone) {
            $rootScope.timeZone = {timezone: opt.timezone, id: opt.id, description: opt.description};
            break;
        }
    }

    $rootScope.authenticated = userFactory.isAuthenticated();
    $rootScope.signupStatus = {};
    $rootScope.signupStatus.response = false;
    $rootScope.signupStatus.waiting = false;
    $rootScope.signupStatus.success = false;
    $rootScope.signupData = {};
    $rootScope.signupRQ = function (formValidity) {
        if (formValidity) {
            $rootScope.signupStatus.waiting = true;
            $rootScope.signupData.timeZone = $rootScope.timeZone.id;
            userFactory.signup($rootScope.signupData);
        }
    };
    $rootScope.signupRS = function (status) {
        $rootScope.signupStatus.response = true;
        $rootScope.signupStatus.waiting = false;
        if(status) {
            $rootScope.signupStatus.success = true;
        } else {
            $rootScope.signupStatus.success = false;
        }
    };

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

    factory.loadProfile = function () {
        if (authenticated) {
            $http.get($rootScope.ipServer+'/users/' + profile.username)
                .then(function successCallback(response) {
                        profile.id = response.data.id;
                        profile.name = response.data.name;
                        profile.surname = response.data.surname;
                        profile.email = response.data.email;
                        profile.timezone = response.data.timezone;
                    },
                    function errorCallback(response) {
                        authenticated = false;
                        console.log("ERROR GET" + response.status);
                    });
        }
    };

    factory.isAuthenticated = function () {
        return authenticated;
    };

    factory.authenticate = function (credentials, callback) {
        if (!authenticated) {
            if (credentials) {
                $cookies.authorization = "Basic " + btoa(credentials.username + ":" + credentials.password);
                $cookies.user = credentials.username;
            }
            var headers = $cookies.authorization ? {authorization: $cookies.authorization} : {};

            $http.get('http://192.168.43.234:8181/user', {headers: headers}).success(function (data) {
                if (data.name) {
                    authenticated = true;
                } else {
                    authenticated = false;
                }
                callback && callback();
            }).error(function () {
                authenticated = false;
                callback && callback();
            });
        }
    };

    factory.login = function (credentials) {
        profile.username = credentials.username;
        factory.authenticate(credentials, function () {
            if (authenticated) {
                factory.loadProfile();
                return true;
            } else {
                return false;
            }
        });
    };

    factory.logout = function () {
        $http.post('logout', {}).success(function () {
            authenticated = false;
            $cookies.authorization = '';
        }).error(function (data) {
            authenticated = false;
            $cookies.authorization = '';
        });
    };

    factory.signup = function (data) {
        if (!authenticated) {
            var user = {};
            user.name = data.name;
            user.surname = data.surname;
            user.mail = data.mail;
            user.username = data.username;
            user.password = data.password;
            user.timezone = data.timeZone;
            console.log(angular.toJson(user));
            $http({
                method: 'POST',
                dataType: 'json',
                url: 'http://192.168.43.234:8181/users',
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(user)
            })
                .then(function successCallback(response) {
                        factory.login({username: user.username, password: user.password});
                        $rootScope.signupRS(true);
                    },
                    function errorCallback(response) {
                        console.log("ERROR POST: signup");
                        $rootScope.signupRS(false);
                    });
        } else {
            $rootScope.signupRS(false);
        }
    };

    factory.editProfile = function (data) {
        $http({
            method: 'PUT',
            dataType: 'json',
            url: 'http://192.168.43.234:8181/users',
            headers: {'Content-Type': 'application/json', 'authorization': $cookies.authorization},
            data: angular.toJson(data)
        })
            .then(function successCallback(response) {
                    profile.id = data.id;
                    profile.name = data.name;
                    profile.surname = data.surname;
                    profile.email = data.email;
                    profile.timezone = data.timezone;
                    return true;
                },
                function errorCallback(response) {
                    console.log("ERROR PUT:");
                    console.log(response.error);
                    return false;
                });
    };

    factory.changePassword = function (data) {
        $http({
            method: 'PUT',
            dataType: 'json',
            url: 'http://192.168.43.234:8181/userpassword',
            headers: {'Content-Type': 'application/json', 'authorization': $cookies.authorization},
            data: angular.toJson(data)
        })
            .then(function successCallback(response) {
                    return true;
                },
                function errorCallback(response) {
                    console.log("ERROR PUT:");
                    console.log(response.error);
                    return false;
                });
    };

    factory.authenticate(false, factory.loadProfile());

    return factory;
});
