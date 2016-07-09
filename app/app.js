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
    $routeProvider.when('/myrecipes/:id_recipe', {
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
    $rootScope.ipServer = "http://localhost:8181";

    $rootScope.authenticated = userFactory.isAuthenticated();
    $rootScope.signupStatus = {};
    $rootScope.signupStatus.response = false;
    $rootScope.signupStatus.waiting = false;
    $rootScope.signupStatus.success = false;
    $rootScope.signupData = {};
    $rootScope.signupRQ = function (formValidity) {
        if (formValidity) {
            $rootScope.signupStatus.waiting = true;
            userFactory.signup($rootScope.signupData);
        }
    };
    $rootScope.signupRS = function (status) {
        $rootScope.signupStatus.response = true;
        $rootScope.signupStatus.waiting = false;
        if (status) {
            $rootScope.signupStatus.success = true;
        } else {
            $rootScope.signupStatus.success = false;
        }
    };

    $rootScope.loginStatus = {};
    $rootScope.loginStatus.waiting = false;
    $rootScope.loginStatus.response = false;
    $rootScope.loginStatus.success = false;
    $rootScope.loginData = {};
    $rootScope.loginRQ = function (formValidity) {
        if (formValidity) {
            $rootScope.loginStatus.waiting = true;
            userFactory.login($rootScope.loginData);
        }
    };
    $rootScope.loginRS = function (status) {
        $rootScope.loginStatus.response = true;
        $rootScope.loginStatus.waiting = false;
        if (status) {
            $rootScope.loginStatus.success = true;
        } else {
            $rootScope.loginStatus.success = false;
        }
        $rootScope.authenticated = userFactory.isAuthenticated();
    };
    $rootScope.logoutRQ = function () {
        userFactory.logout();
    };
    $rootScope.logoutRS = function (status) {
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
        {
            id: 30,
            daylight_time: 1,
            timezone_value: 0,
            name: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"
        },
        {
            id: 31,
            daylight_time: 1,
            timezone_value: 1,
            name: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
        },
        {
            id: 32,
            daylight_time: 1,
            timezone_value: 1,
            name: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
        },
        {id: 33, daylight_time: 1, timezone_value: 1, name: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"},
        {id: 34, daylight_time: 1, timezone_value: 1, name: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb"},
        {id: 35, daylight_time: 1, timezone_value: 1, name: "(GMT+01:00) West Central Africa"},
        {id: 36, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Amman"},
        {id: 37, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Athens, Bucharest, Istanbul"},
        {id: 38, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Beirut"},
        {id: 39, daylight_time: 1, timezone_value: 2, name: "(GMT+02:00) Cairo"},
        {id: 40, daylight_time: 0, timezone_value: 2, name: "(GMT+02:00) Harare, Pretoria"},
        {
            id: 41,
            daylight_time: 1,
            timezone_value: 2,
            name: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
        },
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
    for (i in $rootScope.timeZones) {
        opt = $rootScope.timeZones[i];
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

    factory.getAuthorization = function() {
        return authenticated ? $cookies.get('authorization') : false;
    };

    factory.isAuthenticated = function () {
        return authenticated;
    };

    factory.authenticate = function (credentials, callback) {
        if($cookies.get('authorization')) {
            authenticated = true;
            profile = $cookies.get('user');
        }

        if (!authenticated) {
            if (credentials) {
                $cookies.put('authorization', "Basic " + btoa(credentials.username + ":" + credentials.password));
            }

            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + '/login',
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
                            $cookies.put('user', profile);
                        } else {
                            profile = {};
                            authenticated = false;
                            $cookies.remove("authorization");
                            $cookies.remove("user");
                        }
                        callback && callback();
                    },
                    function errorCallback(response) {
                        authenticated = false;
                        profile = {};
                        $cookies.remove("authorization");
                        $cookies.remove("user");
                        console.log("ERROR GET: authenticate");
                        callback && callback();
                    });
        }
    };
    factory.authenticate();

    factory.login = function (credentials) {
        factory.authenticate(credentials, function () {
            if (authenticated) {
                $rootScope.loginRS(true);
            } else {
                $rootScope.loginRS(false);
            }
        });
    };

    factory.logout = function () {
        $http({
            method: 'GET',
            dataType: 'json',
            url: $rootScope.ipServer + '/logout',
            headers: {'Content-Type': 'application/json', 'authorization': $cookies.get('authorization')}
        })
            .then(function successCallback(response) {
                    authenticated = false;
                    $cookies.remove("authorization");
                    $cookies.remove("user");
                    $rootScope.logoutRS(true);
                },
                function errorCallback(response) {
                    authenticated = false;
                    $cookies.remove("authorization");
                    $cookies.remove("user");
                    $rootScope.logoutRS(false);
                });
    };

    factory.signup = function (data) {
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
                url: $rootScope.ipServer + '/signin',
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(user)
            })
                .then(function successCallback(response) {
                        $rootScope.loginData.username = user.username;
                        $rootScope.loginData.password = user.password;
                        factory.login($rootScope.loginData);
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
            url: $rootScope.ipServer + '/users',
            headers: {'Content-Type': 'application/json', 'authorization': $cookies.get('authorization')},
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
                    console.log("ERROR PUT: editProfile");
                    return false;
                });
    };

    factory.changePassword = function (data) {
        $http({
            method: 'PUT',
            dataType: 'json',
            url: $rootScope.ipServer + '/userpassword',
            headers: {'Content-Type': 'application/json', 'authorization': $cookies.get('authorization')},
            data: angular.toJson(data)
        })
            .then(function successCallback(response) {
                    return true;
                },
                function errorCallback(response) {
                    console.log("ERROR PUT: changePassword");
                    return false;
                });
    };

    return factory;
});

if3tApp.factory('recipesFactory', function ($http, $cookies, $rootScope)
{
    var factory = {}

    function Channel(id, name, image_url)
    {
        this.id = id;
        this.name = name;
        this.image_url = image_url;
    }

    function Trigger(id, channel, header, paragraph)
    {
        this.id = id;
        this.channel = channel;
        this.header = header;
        this.paragraph = paragraph;
    }

    function Action(id, channel, header, paragraph)
    {
        this.id = id;
        this.channel = channel;
        this.header = header;
        this.paragraph = paragraph;
    }

    function Recipe(id, groupId, description, isPublic, isEnabled, trigger, actions)
    {
        this.id = id;
        this.groupId = groupId;
        this.description = description;
        this.isPublic = isPublic;
        this.isEnabled = isEnabled;
        this.trigger = trigger;
        this.actions = actions;
    }

    factory.getRecipe = function(id)
    {
        $http({
            method: 'GET',
            url: 'http://localhost:8181/recipe/' + id
        }).then
        (
            function successCallback(resp)
            {
                var actArray = [];
                var r = resp.data[0];
                var tri = r.trigger;
                var chaTri = new Channel(tri.channel.channelId, tri.channel.name, tri.channel.image_url);
                var trig = new Trigger(tri.id, chaTri, tri.header, tri.paragraph);

                for (var i = 0; i < resp.data.length; i++)
                {
                    var act = resp.data[i].action;
                    var chaAct = new Channel(act.channel.channelId, act.channel.name, act.channel.image_url);

                    actArray.push(new Action(act.id, chaAct, act.header, act.paragraph));
                }

                var rec = new Recipe(r.id, r.groupId, r.description, r.isPublic, r.isEnabled, trig, actArray);
                console.log(rec);
                $rootScope.recProva = rec;
                return rec;
            },
            function errorCallback(resp)
            {
                alert("You DIDN'T get the recipe " + id);
            }
        );
    };

    return factory;
});