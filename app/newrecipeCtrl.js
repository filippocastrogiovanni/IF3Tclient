/**
 * Created by Filippo on 24/05/2016.
 */

//FIXME la add con Firefox non funziona. Cliccando su this non succede nulla
if3tApp.controller('NewRecipeController', ['$scope', '$rootScope', '$routeParams', '$location',
    '$window', '$http', 'userFactory', '$anchorScroll', 'messageFactory',
    function ($scope, $rootScope, $routeParams, $location, $window, $http, userFactory, $anchorScroll, messageFactory) {

        $rootScope.curpage = "newrecipe";

        if (!userFactory.isAuthenticated()) {
            $window.location.href = "#/home";
        }

        $("body").css("overflow", "hidden");

        $scope.channelsDetail = [];
        $scope.stepsEnabled = [];
        $scope.totalSteps = 8;

        $scope.recipe = {};
        $scope.recipe.groupId = "";
        $scope.recipe.description = "";
        $scope.recipe.isPublic = false;
        $scope.recipe.isEnabled = true;

        $scope.stepNext = function (nr) {
            for (i = 0; i <= $scope.totalSteps; i++) {
                if (i <= nr) {
                    $scope.stepsEnabled[i] = true;
                } else {
                    $scope.stepsEnabled[i] = false;
                }
            }
        };

        $scope.stepNext(0);

        messageFactory.showLoading();
        $http.get($rootScope.ipServer + "/trigger_channels")
            .then(
                function success(resp) {
                    messageFactory.hideLoading();
                    $scope.trigger_channels = resp.data;
                    $scope.stepNext(1);
                },
                function error(resp) {
                    messageFactory.hideLoading();
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                    $scope.stepNext(0);
                }
            );

        $http.get($rootScope.ipServer + "/action_channels")
            .then(
                function success(resp) {
                    $scope.action_channels = resp.data;
                },
                function error(resp) {
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                }
            );

        $scope.connectChannel = function (channel) {
            $window.open($scope.channelsDetail[channel.channelId].url, "_blank", "location=no," +
                "menubar=no," +
                "toolbar=no," +
                "scrollbars=no," +
                "resizable=no," +
                "status=no," +
                "titlebar=no," +
                "top=100,left=300," +
                "width=550,height=550");
            $scope.channelsDetail[channel.channelId].connected = true;
        };

        /* TRIGGERS */

        $scope.choose_trigger_channel = function (channel) {

            $scope.chosen_trigger_channel = channel;

            $scope.channelsDetail[channel.channelId] = {};
            $scope.channelsDetail[channel.channelId].connected = false;
            $scope.channelsDetail[channel.channelId].url = "";

            $scope.stepNext(2);

            $scope.getChannelTriggers(channel);

            if (channel.isNeededAuth) {
                $http({
                    method: 'GET',
                    dataType: 'json',
                    url: $rootScope.ipServer + '/' + channel.keyword + '/auth',
                    headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
                }).then(
                    function successCallback(resp) {
                        if (resp.data.code == 200) {
                            //channel connected
                            $scope.channelsDetail[channel.channelId].connected = true;
                        } else {
                            //channel not yet connected
                            $scope.channelsDetail[channel.channelId].connected = false;
                            $scope.channelsDetail[channel.channelId].url = resp.data.message;
                        }
                    },
                    function errorCallback(resp) {
                        $scope.stepNext(1);
                        messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                        $scope.channelsDetail[channel.channelId].connected = false;
                        $scope.channelsDetail[channel.channelId].url = "";
                    }
                );
            } else {
                $scope.channelsDetail[channel.channelId].connected = true;
            }
        };

        $scope.getChannelTriggers = function (channel) {
            $scope.channelTriggersData = false;
            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + '/triggers/' + channel.channelId,
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
            }).then(
                function successCallback(response) {
                    $scope.chosen_trigger_channel.trigger_list = response.data;

                    $http({
                        method: 'GET',
                        dataType: 'json',
                        url: $rootScope.ipServer + '/parameters_triggers/' + channel.channelId,
                        headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
                    }).then(
                        function successCallback(response) {
                            var params = response.data; //List<ParametersTriggers>
                            $scope.parameters_triggers = params;
                            var i, j, counter, radioNr, checkboxNr;

                            //creating array_parameters_triggers_same_id_trigger
                            for (i = 0; i < $scope.chosen_trigger_channel.trigger_list.length; i++) {
                                $scope.chosen_trigger_channel.trigger_list[i].params = [];
                                $scope.chosen_trigger_channel.trigger_list[i].radios = [];
                                $scope.chosen_trigger_channel.trigger_list[i].checkboxes = [];
                                counter = 0;
                                radioNr = 0;
                                checkboxNr = 0;
                                $scope.chosen_trigger_channel.trigger_list[i].radio_value = "";
                                for (j = 0; j < params.length; j++) {
                                    if ($scope.chosen_trigger_channel.trigger_list[i].id == params[j].trigger.id) {
                                        if (params[j].type != "radio" && params[j].type != "checkbox") {
                                            $scope.chosen_trigger_channel.trigger_list[i].params[counter] = params[j];

                                            $scope.chosen_trigger_channel.trigger_list[i].params[counter]
                                                .unbinded_name = $scope.chosen_trigger_channel.trigger_list[i].params[counter]
                                                .name.replace(/[_-]/g, " ").capitalize();
                                            $scope.chosen_trigger_channel.trigger_list[i].params[counter].value = "";
                                            counter++;
                                        }

                                        if (params[j].type == "radio") {
                                            $scope.chosen_trigger_channel.trigger_list[i].radios[radioNr] = params[j];

                                            $scope.chosen_trigger_channel.trigger_list[i].radios[radioNr]
                                                .unbinded_name = $scope.chosen_trigger_channel.trigger_list[i].radios[radioNr]
                                                .name.replace(/[_-]/g, " ").capitalize();
                                            if ($scope.chosen_trigger_channel.trigger_list[i].radio_value == "") {
                                                $scope
                                                    .chosen_trigger_channel
                                                    .trigger_list[i]
                                                    .radio_value = $scope
                                                    .chosen_trigger_channel
                                                    .trigger_list[i]
                                                    .radios[radioNr]
                                                    .name;
                                            }

                                            radioNr++;
                                        }

                                        if (params[j].type == "checkbox") {
                                            $scope.chosen_trigger_channel.trigger_list[i].checkboxes[checkboxNr] = params[j];

                                            $scope.chosen_trigger_channel.trigger_list[i].checkboxes[checkboxNr]
                                                .unbinded_name = $scope.chosen_trigger_channel.trigger_list[i].checkboxes[checkboxNr]
                                                .name.replace(/[_-]/g, " ").capitalize();
                                            $scope.chosen_trigger_channel.trigger_list[i].checkboxes[checkboxNr].value = false;
                                            checkboxNr++;
                                        }

                                    }
                                }
                            }
                            console.log($scope.chosen_trigger_channel.trigger_list);
                        },
                        function errorCallback(resp) {
                            $scope.channelTriggersData = false;
                            messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                        });
                },
                function errorCallback(resp) {
                    $scope.channelTriggersData = false;
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                }
            );
        };


        $scope.isTriggerChannelAuthorized = function (channel) {
            if (channel.isNeededAuth) {
                $http({
                    method: 'GET',
                    dataType: 'json',
                    url: $rootScope.ipServer + '/' + channel.keyword + '/auth',
                    headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
                }).then(
                    function successCallback(resp) {
                        if (resp.data.code == 200) {
                            //channel connected
                            $scope.channelsDetail[channel.channelId].connected = true;
                            $scope.stepNext(3);
                        } else {
                            //channel not yet connected
                            $scope.channelsDetail[channel.channelId].connected = false;
                            $scope.stepNext(2);
                        }
                    },
                    function errorCallback(resp) {
                        $scope.stepNext(2);
                        messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                        $scope.channelsDetail[channel.channelId].connected = false;
                    }
                );
            } else {
                $scope.stepNext(3);
            }
        };

        $scope.triggerSubmit = function (triggerID, form) {
            var i;

            $scope.chosen_trigger_channel.chosen_trigger = {};
            for (i = 0; i < $scope.chosen_trigger_channel.trigger_list.length; i++) {
                if ($scope.chosen_trigger_channel.trigger_list[i].id == triggerID) {
                    $scope.chosen_trigger_channel.chosen_trigger = $scope.chosen_trigger_channel.trigger_list[i];
                    break;
                }
            }

            if (!$scope.chosen_trigger_channel.chosen_trigger) {
                return false;
            }

            $scope.recipe.trigger = $scope.chosen_trigger_channel.chosen_trigger;
            $scope.recipe.trigger_ingredients = [];

            //TODO bisogna implementare i vincoli sui campi

            var validity = false;
            if ($scope.chosen_trigger_channel.chosen_trigger.params.length == 0) {
                validity = true;
            } else {
                for (i = 0; i < $scope.chosen_trigger_channel.chosen_trigger.params.length; i++) {
                    if ($scope.chosen_trigger_channel.chosen_trigger.params[i].value != "" &&
                        $scope.chosen_trigger_channel.chosen_trigger.params[i].value != null) {
                        validity = true;
                        break;
                    }
                }
            }

            if (form.$valid && validity) {
                $scope.stepNext(5);
                $('html, body').animate({
                        scrollTop: $("#step_4").offset().top
                    }, "slow"
                );
            }

            return true;
        };

        /* ACTIONS */

        $scope.choose_action_channel = function (channel) {

            $scope.chosen_action_channel = channel;

            $scope.channelsDetail[channel.channelId] = {};
            $scope.channelsDetail[channel.channelId].connected = false;
            $scope.channelsDetail[channel.channelId].url = "";

            $scope.stepNext(6);

            $scope.getChannelActions(channel);

            if (channel.isNeededAuth) {
                $http({
                    method: 'GET',
                    dataType: 'json',
                    url: $rootScope.ipServer + '/' + channel.keyword + '/auth',
                    headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
                }).then(
                    function successCallback(resp) {
                        if (resp.data.code == 200) {
                            //channel connected
                            $scope.channelsDetail[channel.channelId].connected = true;
                        } else {
                            //channel not yet connected
                            $scope.channelsDetail[channel.channelId].connected = false;
                            $scope.channelsDetail[channel.channelId].url = resp.data.message;
                        }
                    },
                    function errorCallback(resp) {
                        $scope.stepNext(5);
                        messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                        $scope.channelsDetail[channel.channelId].connected = false;
                        $scope.channelsDetail[channel.channelId].url = "";
                    }
                );
            } else {
                $scope.channelsDetail[channel.channelId].connected = true;
            }
        };

        $scope.isActionChannelAuthorized = function (channel) {

            if (channel.isNeededAuth) {
                $http({
                    method: 'GET',
                    dataType: 'json',
                    url: $rootScope.ipServer + '/' + channel.keyword + '/auth',
                    headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
                }).then(
                    function successCallback(resp) {
                        if (resp.data.code == 200) {
                            //channel connected
                            $scope.channelsDetail[channel.channelId].connected = true;
                            $scope.stepNext(7);
                        } else {
                            //channel not yet connected
                            $scope.channelsDetail[channel.channelId].connected = false;
                            $scope.stepNext(6);
                        }
                    },
                    function errorCallback(resp) {
                        $scope.stepNext(6);
                        messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                        $scope.channelsDetail[channel.channelId].connected = false;
                    }
                );
            } else {
                $scope.stepNext(7);
            }

        };

        $scope.getChannelActions = function (channel) {

            $scope.channelActionsData = false;
            $http({
                method: 'GET',
                dataType: 'json',
                url: $rootScope.ipServer + '/actions/' + channel.channelId,
                headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
            }).then(
                function successCallback(response) {
                    $scope.chosen_action_channel.action_list = response.data;

                    $http({
                        method: 'GET',
                        dataType: 'json',
                        url: $rootScope.ipServer + '/parameters_actions/' + channel.channelId,
                        headers: {'Content-Type': 'application/json', 'authorization': userFactory.getAuthorization()}
                    }).then(
                        function successCallback(response) {
                            var params = response.data; //List<ParametersActions>
                            $scope.parameters_actions = params;
                            var i, j, counter, radioNr, checkboxNr;

                            for (i = 0; i < $scope.chosen_action_channel.action_list.length; i++) {
                                $scope.chosen_action_channel.action_list[i].params = [];
                                $scope.chosen_action_channel.action_list[i].radios = [];
                                $scope.chosen_action_channel.action_list[i].checkboxes = [];
                                counter = 0;
                                radioNr = 0;
                                checkboxNr = 0;
                                $scope.chosen_action_channel.action_list[i].radio_value = "";
                                for (j = 0; j < params.length; j++) {
                                    if ($scope.chosen_action_channel.action_list[i].id == params[j].action.id) {
                                        if (params[j].type != "radio" && params[j].type != "checkbox") {
                                            $scope.chosen_action_channel.action_list[i].params[counter] = params[j];

                                            $scope.chosen_action_channel.action_list[i].params[counter]
                                                .unbinded_name = $scope.chosen_action_channel.action_list[i].params[counter]
                                                .name.replace(/[_-]/g, " ").capitalize();
                                            $scope.chosen_action_channel.action_list[i].params[counter].value = "";
                                            counter++;
                                        }

                                        if (params[j].type == "radio") {
                                            $scope.chosen_action_channel.action_list[i].radios[radioNr] = params[j];

                                            $scope.chosen_action_channel.action_list[i].radios[radioNr]
                                                .unbinded_name = $scope.chosen_action_channel.action_list[i].radios[radioNr]
                                                .name.replace(/[_-]/g, " ").capitalize();
                                            if ($scope.chosen_action_channel.action_list[i].radio_value == "") {
                                                $scope
                                                    .chosen_action_channel
                                                    .action_list[i]
                                                    .radio_value = $scope
                                                    .chosen_action_channel
                                                    .action_list[i]
                                                    .radios[radioNr]
                                                    .name;
                                            }

                                            radioNr++;
                                        }

                                        if (params[j].type == "checkbox") {
                                            $scope.chosen_action_channel.action_list[i].checkboxes[checkboxNr] = params[j];

                                            $scope.chosen_action_channel.action_list[i].checkboxes[checkboxNr]
                                                .unbinded_name = $scope.chosen_action_channel.action_list[i].checkboxes[checkboxNr]
                                                .name.replace(/[_-]/g, " ").capitalize();
                                            $scope.chosen_action_channel.action_list[i].checkboxes[checkboxNr].value = false;
                                            checkboxNr++;
                                        }

                                    }
                                }
                            }
                            console.log($scope.chosen_action_channel.action_list);
                        },
                        function errorCallback(resp) {
                            $scope.channelActionsData = false;
                            messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                        });
                },
                function errorCallback(resp) {
                    $scope.channelActionsData = false;
                    messageFactory.showError(resp.data.code + " - " + resp.data.reasonPhrase, resp.data.message);
                }
            );

        };

        $scope.actionSubmit = function (actionID, form) {
            var i;

            $scope.chosen_action_channel.chosen_action = {};
            for (i = 0; i < $scope.chosen_action_channel.action_list.length; i++) {
                if ($scope.chosen_action_channel.action_list[i].id == actionID) {
                    $scope.chosen_action_channel.chosen_action = $scope.chosen_action_channel.action_list[i];
                    break;
                }
            }

            if (!$scope.chosen_action_channel.chosen_action) {
                return false;
            }

            $scope.recipe.action = $scope.chosen_action_channel.chosen_action;
            $scope.recipe.action_ingredients = [];

            //TODO bisogna implementare i vincoli sui campi

            var validity = false;
            if ($scope.chosen_action_channel.chosen_action.params.length == 0) {
                validity = true;
            } else {
                for (i = 0; i < $scope.chosen_action_channel.chosen_action.params.length; i++) {
                    if ($scope.chosen_action_channel.chosen_action.params[i].value != "" &&
                        $scope.chosen_action_channel.chosen_action.params[i].value != null) {
                        validity = true;
                        break;
                    }
                }
            }

            if (form.$valid && validity) {
                $scope.stepNext(8);
                $('html, body').animate({
                        scrollTop: $("#step_8").offset().top
                    }, "slow"
                );
            }

            return true;
        };

        $scope.recipeSubmit = function (form) {
            var i, j, k, value;

            if (!form.$valid)
                return;

            k = 0;
            if ($scope.chosen_trigger_channel.chosen_trigger.params.length > 0) {
                for (i = 0; i < $scope.chosen_trigger_channel.chosen_trigger.params.length; i++) {
                    value = $scope.chosen_trigger_channel.chosen_trigger.params[i].value;
                    if (value != null && value != "") {
                        for (j = 0; j < $scope.parameters_triggers.length; j++) {
                            if ($scope.parameters_triggers[j].id == $scope.chosen_trigger_channel.chosen_trigger.params[i].id) {
                                $scope.recipe.trigger_ingredients[k] = {};
                                $scope.recipe.trigger_ingredients[k].param = $scope.parameters_triggers[j];
                                $scope.recipe.trigger_ingredients[k].value = value;
                                k++;
                                break;
                            }
                        }
                    }
                }
            }
            if ($scope.chosen_trigger_channel.chosen_trigger.radios.length > 0) {
                for (i = 0; i < $scope.chosen_trigger_channel.chosen_trigger.radios.length; i++) {
                    value = $scope.chosen_trigger_channel.chosen_trigger.radio_value;
                    for (j = 0; j < $scope.parameters_triggers.length; j++) {
                        if ($scope.parameters_triggers[j].id == $scope.chosen_trigger_channel.chosen_trigger.radios[i].id) {
                            $scope.recipe.trigger_ingredients[k] = {};
                            $scope.recipe.trigger_ingredients[k].param = $scope.parameters_triggers[j];
                            if (value == $scope.parameters_triggers[j].keyword) {
                                $scope.recipe.trigger_ingredients[k].value = value;
                            } else {
                                $scope.recipe.trigger_ingredients[k].value = "unchecked_radio_button";
                            }
                            k++;
                            break;
                        }
                    }
                }
            }
            if ($scope.chosen_trigger_channel.chosen_trigger.checkboxes.length > 0) {
                for (i = 0; i < $scope.chosen_trigger_channel.chosen_trigger.checkboxes.length; i++) {
                    for (j = 0; j < $scope.parameters_triggers.length; j++) {
                        if ($scope.parameters_triggers[j].id == $scope.chosen_trigger_channel.chosen_trigger.checkboxes[i].id) {
                            $scope.recipe.trigger_ingredients[k] = {};
                            $scope.recipe.trigger_ingredients[k].param = $scope.parameters_triggers[j];
                            if($scope.parameters_triggers[j].keyword == $scope.chosen_trigger_channel.chosen_trigger.checkboxes[i].value) {
                                $scope.recipe.trigger_ingredients[k].value = $scope.parameters_triggers[j].keyword;
                            } else {
                                $scope.recipe.trigger_ingredients[k].value = "unchecked_checkbox_button";
                            }
                            k++;
                            break;
                        }
                    }
                }
            }

            k = 0;
            if ($scope.chosen_action_channel.chosen_action.params.length > 0) {
                for (i = 0; i < $scope.chosen_action_channel.chosen_action.params.length; i++) {
                    value = $scope.chosen_action_channel.chosen_action.params[i].value;
                    if (value != null && value != "") {
                        for (j = 0; j < $scope.parameters_actions.length; j++) {
                            if ($scope.parameters_actions[j].id == $scope.chosen_action_channel.chosen_action.params[i].id) {
                                $scope.recipe.action_ingredients[k] = {};
                                $scope.recipe.action_ingredients[k].param = $scope.parameters_actions[j];
                                $scope.recipe.action_ingredients[k].value = value;
                                k++;
                                break;
                            }
                        }
                    }
                }
            }
            if ($scope.chosen_action_channel.chosen_action.radios.length > 0) {
                for (i = 0; i < $scope.chosen_action_channel.chosen_action.radios.length; i++) {
                    value = $scope.chosen_action_channel.chosen_action.radio_value;
                    for (j = 0; j < $scope.parameters_actions.length; j++) {
                        if ($scope.parameters_actions[j].id == $scope.chosen_action_channel.chosen_action.radios[i].id) {
                            $scope.recipe.action_ingredients[k] = {};
                            $scope.recipe.action_ingredients[k].param = $scope.parameters_actions[j];
                            if (value == $scope.parameters_actions[j].keyword) {
                                $scope.recipe.action_ingredients[k].value = value;
                            } else {
                                $scope.recipe.action_ingredients[k].value = "unchecked_radio_button";
                            }
                            k++;
                            break;
                        }
                    }
                }
            }
            if ($scope.chosen_action_channel.chosen_action.checkboxes.length > 0) {
                for (i = 0; i < $scope.chosen_action_channel.chosen_action.checkboxes.length; i++) {
                    for (j = 0; j < $scope.parameters_actions.length; j++) {
                        if ($scope.parameters_actions[j].id == $scope.chosen_action_channel.chosen_action.checkboxes[i].id) {
                            $scope.recipe.action_ingredients[k] = {};
                            $scope.recipe.action_ingredients[k].param = $scope.parameters_actions[j];
                            if($scope.parameters_actions[j].keyword == $scope.chosen_action_channel.chosen_action.checkboxes[i].value) {
                                $scope.recipe.action_ingredients[k].value = $scope.parameters_actions[j].keyword;
                            } else {
                                $scope.recipe.action_ingredients[k].value = "unchecked_checkbox_button";
                            }
                            k++;
                            break;
                        }
                    }
                }
            }

            if (userFactory.isAuthenticated()) {

                console.log($scope.recipe);

                messageFactory.showLoading();
                $http({
                    method: 'POST',
                    dataType: 'json',
                    url: $rootScope.ipServer + '/add_recipe?_csrf=' + userFactory.getXsrfCookie(),
                    headers: {'Content-Type': 'application/json'},
                    data: angular.toJson($scope.recipe)
                }).then(function successCallback() {
                    messageFactory.hideLoading();
                    console.log("saved");
                    $window.location.href = '#/myrecipes';
                }, function errorCallback(response) {
                    messageFactory.hideLoading();
                    messageFactory.showError(response.data.code + " - " + response.data.reasonPhrase, response.data.message);
                    console.log("ERROR");
                });


            } else {
                $window.location.href = "#/home";
            }

        };

        /*
         $http({
         method: 'GET',
         url: $rootScope.ipServer + '/actions/' + o.channelId,
         headers: {'Content-Type': 'application/json'}
         }).then(function successCallback(response) {
         $scope.chosen_action_channel.action_list = response.data; //List<Trigger>
         $http({
         method: 'GET',
         url: $rootScope.ipServer + '/parameters_actions/' + o.channelId,
         headers: {'Content-Type': 'application/json'}
         }).then(function successCallback(response) {
         var params = response.data; //List<ParametersTriggers>
         var output_distinct = [], l = params.length, i;
         for (i = 0; i < l; i++) {
         var present = false;
         for (var j = 0; j < output_distinct.length; j++) {
         if (output_distinct[j] == params[i].action.id) {
         present = true;
         break;
         }
         }
         if (!present)
         output_distinct.push(params[i].action.id);
         }
         //creating array_parameters_actions_same_id_action
         for (var i = 0; i < $scope.chosen_action_channel.action_list.length; i++) {
         $scope.chosen_action_channel.action_list[i].params = [];
         }
         //normalize output_distinct in a new array
         var normalized_array = [];
         output_distinct.reverse();
         for (var i = 0; i < $scope.chosen_action_channel.action_list.length; i++) {
         var contained = false;
         for (var j = 0; j < params.length; j++) {
         if ($scope.chosen_action_channel.action_list[i].id == params[j].action.id) {
         contained = true;
         break;
         }
         }
         if (contained)
         normalized_array[i] = output_distinct.pop();
         }
         for (var i = 0; i < $scope.chosen_action_channel.action_list.length; i++) {
         var params_same_id_action = [];
         $scope.chosen_action_channel.action_list[i].contains_radio = false;
         $scope.chosen_action_channel.action_list[i].contains_time = false;
         $scope.chosen_action_channel.action_list[i].contains_email = false;
         $scope.chosen_action_channel.action_list[i].contains_checkbox = false;
         $scope.chosen_action_channel.action_list[i].contains_textarea = false;
         //check if action is contained in ouput_distinct
         var contained = false;
         for (var j = 0; j < params.length; j++) {
         if ($scope.chosen_action_channel.action_list[i].id == params[j].action.id) {
         contained = true;
         break;
         }
         }
         if (contained) {
         for (var j = 0; j < params.length; j++) {
         if (params[j].action.id == normalized_array[i]) {
         var element_parameters_actions = {};
         element_parameters_actions.name = params[j].name;
         element_parameters_actions.id = params[j].id;
         element_parameters_actions.unbinded_name = element_parameters_actions.name.replace(/[_-]/g, " ").capitalize();
         element_parameters_actions.type = params[j].type;
         if (element_parameters_actions.type.localeCompare("number") == 0) {
         element_parameters_actions.is_number = true;
         }
         else {
         element_parameters_actions.is_number = false;
         }
         if (element_parameters_actions.type.localeCompare("radio") == 0) {
         element_parameters_actions.is_radio = true;
         $scope.chosen_action_channel.action_list[i].contains_radio = true;
         }
         else {
         element_parameters_actions.is_radio = false;
         }
         if (element_parameters_actions.type.localeCompare("time") == 0) {
         $scope.chosen_action_channel.action_list[i].contains_time = true;
         element_parameters_actions.is_time = true;
         }
         else {
         element_parameters_actions.is_time = false;
         }
         if (element_parameters_actions.type.localeCompare("textarea") == 0) {
         $scope.chosen_action_channel.action_list[i].contains_textarea = true;
         element_parameters_actions.is_textarea = true;
         }
         else {
         element_parameters_actions.is_textarea = false;
         }
         if (element_parameters_actions.type.localeCompare("email") == 0) {
         element_parameters_actions.is_email = true;
         }
         else {
         element_parameters_actions.is_email = false;
         }
         if (element_parameters_actions.type.localeCompare("checkbox") == 0) {
         element_parameters_actions.is_checkbox = true;
         $scope.chosen_action_channel.action_list[i].contains_checkbox = true;
         }
         else {
         element_parameters_actions.is_checkbox = false;
         }
         params_same_id_action.push(element_parameters_actions);
         }
         }
         $scope.chosen_action_channel.action_list[i].params = params_same_id_action;
         }
         }
         }, function errorCallback(response) {
         alert("You can not get the actions parameters list of action channel from Server");
         });

         }, function errorCallback(response) {
         alert("You can not get the actions list of action channel from Server");
         });
         */

        $scope.submit_recipe = function (recipe_description) {
            $scope.recipes_list = [];
            console.log("Submitting recipe");
            //preparing data to POST (List<Recipe>) phase2

            var element_recipe = {};
            if (recipe_description != undefined && (new String(recipe_description.trim())) != new String("")) {
                element_recipe.description = recipe_description;
            }
            else {
                element_recipe.description = "No title";
            }

            element_recipe.trigger_ingredients = [];
            element_recipe.action_ingredients = [];
            for (var i = 0; i < $rootScope.chosen_trigger_parameters.length; i++) {
                var parameter_trigger_element = {};
                parameter_trigger_element.id = $rootScope.chosen_trigger_parameters[i].id;
                parameter_trigger_element.channel = $rootScope.chosen_trigger_data.channel;
                parameter_trigger_element.trigger = $rootScope.chosen_trigger_data;
                //delete parameter_trigger_element.trigger.id;
                //delete parameter_trigger_element.trigger.channel.channelId;
                if ($rootScope.chosen_trigger_parameters[i].type.localeCompare("textarea") == 0) {
                    parameter_trigger_element.name = $rootScope.chosen_trigger_parameters[i].name;
                }
                else {
                    parameter_trigger_element.name = $rootScope.chosen_trigger_parameters[i].unbinded_name;
                }
                parameter_trigger_element.type = $rootScope.chosen_trigger_parameters[i].type;
                parameter_trigger_element.checked = $rootScope.chosen_trigger_parameters[i].checked;
                //delete $rootScope.chosen_trigger_parameters[i].id;
                var trigger_ingredient_element = {};
                trigger_ingredient_element.param = parameter_trigger_element;
                //delete trigger_ingredient_element.param.id;
                if ($rootScope.chosen_trigger_parameters[i].type.localeCompare("radio") == 0) {
                    if ($rootScope.chosen_trigger_parameters[i].radio_button_form != undefined && $rootScope.chosen_trigger_parameters[i].radio_button_form != null) {
                        trigger_ingredient_element.value = $rootScope.chosen_trigger_parameters[i].radio_button_form;
                    }
                    else {
                        trigger_ingredient_element.value = "unchecked_radio_button";
                    }
                }
                else if ($rootScope.chosen_trigger_parameters[i].type.localeCompare("checkbox") == 0) {
                    if ($rootScope.chosen_trigger_parameters[i].checkbox_button_form != null && $rootScope.chosen_trigger_parameters[i].checkbox_button_form != undefined) {
                        if ($rootScope.chosen_trigger_parameters[i].checkbox_button_form == true) {
                            trigger_ingredient_element.value = $rootScope.chosen_trigger_parameters[i].name;
                        }
                        else {
                            trigger_ingredient_element.value = "unchecked_checkbox_button";
                        }
                    }
                    else {
                        trigger_ingredient_element.value = "unchecked_checkbox_button";
                    }
                }
                else if ($rootScope.chosen_trigger_parameters[i].type.localeCompare("date") == 0) {
                    trigger_ingredient_element.value = moment($rootScope.chosen_trigger_parameters[i].name).format("DD/MM/YYYY");
                }
                else if ($rootScope.chosen_trigger_parameters[i].type.localeCompare("time") == 0) {
                    trigger_ingredient_element.value = moment($rootScope.chosen_trigger_parameters[i].name).format("HH:mm");
                }
                else {
                    trigger_ingredient_element.value = $rootScope.chosen_trigger_parameters[i].name;
                }
                if (!(trigger_ingredient_element.value instanceof String) || (trigger_ingredient_element.value instanceof String && trigger_ingredient_element.value.localeCompare("unchecked_checkbox_button") != 0 && trigger_ingredient_element.value.localeCompare("unchecked_radio_button") != 0)) {
                    element_recipe.trigger_ingredients.push(trigger_ingredient_element);
                }
            }

            for (var i = 0; i < $rootScope.chosen_action_parameters.length; i++) {
                var parameter_action_element = {};
                parameter_action_element.id = $rootScope.chosen_action_parameters[i].id;
                parameter_action_element.channel = $rootScope.chosen_action_data.channel;
                parameter_action_element.action = $rootScope.chosen_action_data;
                //delete parameter_action_element.action.id;
                //delete parameter_action_element.action.channel.channelId;
                if ($rootScope.chosen_action_parameters[i].type.localeCompare("textarea") == 0) {
                    parameter_action_element.name = $rootScope.chosen_action_parameters[i].name;
                }
                else {
                    parameter_action_element.name = $rootScope.chosen_action_parameters[i].unbinded_name;
                }
                parameter_action_element.type = $rootScope.chosen_action_parameters[i].type;
                parameter_action_element.checked = $rootScope.chosen_action_parameters[i].checked;
                //delete $rootScope.chosen_action_parameters[i].id;
                var action_ingredient_element = {};
                action_ingredient_element.param = parameter_action_element;
                //delete action_ingredient_element.param.id;
                if ($rootScope.chosen_action_parameters[i].type.localeCompare("radio") == 0) {
                    if ($rootScope.chosen_action_parameters[i].radio_button_form != undefined && $rootScope.chosen_action_parameters[i].radio_button_form != null) {
                        action_ingredient_element.value = $rootScope.chosen_action_parameters[i].radio_button_form;
                    }
                    else {
                        action_ingredient_element.value = "unchecked_radio_button";
                    }
                }
                else if ($rootScope.chosen_action_parameters[i].type.localeCompare("checkbox") == 0) {
                    if ($rootScope.chosen_action_parameters[i].checkbox_button_form != null && $rootScope.chosen_action_parameters[i].checkbox_button_form != undefined) {
                        if ($rootScope.chosen_action_parameters[i].checkbox_button_form == true) {
                            action_ingredient_element.value = $rootScope.chosen_action_parameters[i].name;
                        }
                        else {
                            action_ingredient_element.value = "unchecked_checkbox_button";
                        }
                    }
                    else {
                        action_ingredient_element.value = "unchecked_checkbox_button";
                    }
                }
                else if ($rootScope.chosen_action_parameters[i].type.localeCompare("date") == 0) {
                    action_ingredient_element.value = moment($rootScope.chosen_action_parameters[i].name).format("DD/MM/YYYY");
                }
                else if ($rootScope.chosen_action_parameters[i].type.localeCompare("time") == 0) {
                    action_ingredient_element.value = moment($rootScope.chosen_action_parameters[i].name).format("HH:mm");
                }
                else {
                    action_ingredient_element.value = $rootScope.chosen_action_parameters[i].name;
                }
                if (!(action_ingredient_element.value instanceof String) || (action_ingredient_element.value instanceof String && action_ingredient_element.value.localeCompare("unchecked_checkbox_button") != 0 && action_ingredient_element.value.localeCompare("unchecked_radio_button") != 0)) {
                    element_recipe.action_ingredients.push(action_ingredient_element);
                }
            }

            element_recipe.trigger = $rootScope.chosen_trigger_data;
            element_recipe.action = $rootScope.chosen_action_data;
            element_recipe.isPublic = false;
            element_recipe.isEnabled = false;

            element_recipe.parameters_keyword = [];
            for (var i = 0; i < $rootScope.chosen_parameters_keyword.length; i++) {
                element_keyword = {};
                element_keyword.value = $rootScope.chosen_parameters_keyword[i].name;
                element_keyword.name = $rootScope.chosen_parameters_keyword[i].unbinded_name;
                if ($rootScope.chosen_parameters_keyword[i].parameters_keyword == true) {
                    element_keyword.selected = true;
                }
                else {
                    element_keyword.selected = false;
                }
                element_recipe.parameters_keyword.push(element_keyword);
            }

            $scope.recipes_list.push(element_recipe);
            if (userFactory.isAuthenticated()) {
                $http({
                    method: 'POST',
                    url: $rootScope.ipServer + '/add_recipe?_csrf=' + userFactory.getXsrfCookie(),
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.recipes_list
                }).then(function successCallback(response) {
                    alert(response.data.message);
                    $window.location.href = '#/myrecipes';
                }, function errorCallback(response) {
                    alert(response.data.message);
                });
            }
            else {
                alert("You are noy logged so you can not save the recipe on Server");
            }
        };

    }
]);

if3tApp.directive('scrollOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, $elm, attrs) {
            var idToScroll = attrs.href;
            $elm.on('click', function (event) {
                var $target;
                if (idToScroll) {
                    $target = $(idToScroll);
                } else {
                    $target = $elm;
                }
                $("body,html").stop(true, true).animate({scrollTop: $target.offset().top}, "slow");
            });
        }
    }
});

if3tApp.directive('scrollOnClickAndChooseTriggerChannel', function () {
    return {
        restrict: 'A',
        scope: {callbackFn: '&'},
        link: function (scope, $elm, attrs) {
            var idToScroll = attrs.href;
            $elm.on('click', function () {
                scope.callbackFn();
                scope.$apply();
                var $target;
                if (idToScroll) {
                    $target = $(idToScroll);
                } else {
                    $target = $elm;
                }
                $("body,html").stop(true, true).animate({scrollTop: $target.offset().top}, "slow");
            });
        }
    }
});

if3tApp.directive('scrollOnClickAndChooseActionChannel', function () {
    return {
        restrict: 'A',
        scope: {callbackFn: '&'},
        link: function (scope, $elm, attrs) {
            var idToScroll = attrs.href;
            $elm.on('click', function () {
                scope.callbackFn();
                scope.$apply();
                var $target;
                if (idToScroll) {
                    $target = $(idToScroll);
                } else {
                    $target = $elm;
                }
                $("body,html").stop(true, true).animate({scrollTop: $target.offset().top}, "slow");
            });
        }
    }
});

if3tApp.directive('bindHtmlCompile', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.bindHtmlCompile);
            }, function (value) {
                // Incase value is a TrustedValueHolderType, sometimes it
                // needs to be explicitly called into a string in order to
                // get the HTML string.
                element.html(value && value.toString());
                // If scope is provided use it, otherwise use parent scope
                var compileScope = scope;
                if (attrs.bindHtmlScope) {
                    compileScope = scope.$eval(attrs.bindHtmlScope);
                }
                $compile(element.contents())(compileScope);
            });
        }
    };
}]);

String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/\b\w/g, function (m) {
        return m.toUpperCase();
    });
};