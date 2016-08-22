/**
 * Created by Filippo on 24/05/2016.
 */

//FIXME la add con Firefox non funziona. Cliccando su this non succede nulla
if3tApp.controller('NewRecipeController', ['$scope', '$rootScope', '$routeParams', '$location', '$window', '$http', 'userFactory', '$anchorScroll',
    function ($scope, $rootScope, $routeParams, $location, $window, $http, userFactory, $anchorScroll) {

        $rootScope.curpage = "newrecipe";

        //waiting for data (alias progress dialog) by hiding the first div and wait for the response of the server to show it
        $("#first_div").hide();
        $http({
            method: 'GET',
            url: $rootScope.ipServer+'/channels/',
            headers: {'Content-Type': 'application/json' }
        }).then(function successCallback(response) {
            $scope.channels = response.data;
            for(var i=0; i<$scope.channels.length; i++){
                $scope.channels[i].image_url = $rootScope.ipServer+'/'+$scope.channels[i].image_url;
            }
            $("#first_div").show();
        }, function errorCallback(response) {
            alert("Can not load channels list from Server");
        });

        //all functions handled by controller
        $scope.choose_trigger_channel = function(o) {
            choose_trigger_channel($scope, $http, $rootScope, o, userFactory);
        }

        $scope.choose_action_channel = function(o) {
            choose_action_channel($scope, $http, $rootScope, o, userFactory);
        }

        $scope.submit_trigger = function(triggers_parameters, is_form_valid, trigger_header, data_trigger) {
            submit_trigger($rootScope, $scope, triggers_parameters, is_form_valid, $location, $anchorScroll, trigger_header, data_trigger);
        }

        $scope.submit_action = function(actions_parameters, is_form_valid, action_header, data_action, parameters_keyword) {
            submit_action($rootScope, $scope, actions_parameters, is_form_valid, $location, $anchorScroll, action_header, data_action, parameters_keyword);
        }

        $scope.submit_recipe = function(recipe_description) {
            submit_recipe($rootScope, $scope, $window, $http, recipe_description, userFactory);
        }
    }
]);


function choose_trigger_channel($scope, $http, $rootScope, o, userFactory){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_channel = o;
    $rootScope.chosen_trigger_channel = o;
    $http({
        method: 'GET',
        url: $rootScope.ipServer+'/triggers/'+o.channelId,
        headers: {'Content-Type': 'application/json'}
    }).then(function successCallback(response) {
        $scope.chosen_trigger_channel.trigger_list = response.data; //List<Trigger>
        $http({
            method: 'GET',
            url: $rootScope.ipServer+'/parameters_triggers/'+o.channelId,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            var params = response.data; //List<ParametersTriggers>
            var output_distinct = [], l = params.length, i;
            for( i=0; i<l; i++) {
                var present = false;
                for(var j=0; j<output_distinct.length; j++){
                    if(output_distinct[j] == params[i].trigger.id){
                        present = true;
                        break;
                    }
                }
                if(!present)
                    output_distinct.push(params[i].trigger.id);
            }
            //creating array_parameters_triggers_same_id_trigger
            for(var i=0; i<$scope.chosen_trigger_channel.trigger_list.length; i++) {
                $scope.chosen_trigger_channel.trigger_list[i].params = [];
            }
            //normalize output_distinct in a new array
            var normalized_array = [];
            output_distinct.reverse();
            for(var i=0; i<$scope.chosen_trigger_channel.trigger_list.length; i++) {
                var contained = false;
                for (var j = 0; j < params.length; j++) {
                    if ($scope.chosen_trigger_channel.trigger_list[i].id == params[j].trigger.id) {
                        contained = true;
                        break;
                    }
                }
                if(contained)
                    normalized_array[i] = output_distinct.pop();
            }
            for(var i=0; i<$scope.chosen_trigger_channel.trigger_list.length; i++) {
                var params_same_id_trigger = [];
                $scope.chosen_trigger_channel.trigger_list[i].contains_radio = false;
                $scope.chosen_trigger_channel.trigger_list[i].contains_time = false;
                $scope.chosen_trigger_channel.trigger_list[i].contains_email = false;
                $scope.chosen_trigger_channel.trigger_list[i].contains_checkbox = false;
                $scope.chosen_trigger_channel.trigger_list[i].contains_textarea = false;
                //check if trigger is contained in ouput_distinct
                var contained = false;
                for (var j = 0; j < params.length; j++) {
                    if ($scope.chosen_trigger_channel.trigger_list[i].id == params[j].trigger.id) {
                        contained = true;
                        break;
                    }
                }
                if(contained) {
                    for (var j = 0; j < params.length; j++) {
                        if (params[j].trigger.id == normalized_array[i]) {
                            var element_parameters_triggers = {};
                            element_parameters_triggers.name = params[j].name;
                            element_parameters_triggers.id = params[j].id;
                            element_parameters_triggers.unbinded_name = element_parameters_triggers.name.replace(/[_-]/g, " ").capitalize();
                            element_parameters_triggers.type = params[j].type;
                            if (element_parameters_triggers.type.localeCompare("radio") == 0) {
                                element_parameters_triggers.is_radio = true;
                                $scope.chosen_trigger_channel.trigger_list[i].contains_radio = true;
                            }
                            else {
                                element_parameters_triggers.is_radio = false;
                            }
                            if (element_parameters_triggers.type.localeCompare("number") == 0) {
                                element_parameters_triggers.is_number = true;
                            }
                            else {
                                element_parameters_triggers.is_number = false;
                            }
                            if (element_parameters_triggers.type.localeCompare("time") == 0) {
                                $scope.chosen_trigger_channel.trigger_list[i].contains_time = true;
                                element_parameters_triggers.is_time = true;
                            }
                            else{
                                element_parameters_triggers.is_time = false;
                            }
                            if (element_parameters_triggers.type.localeCompare("textarea") == 0) {
                                $scope.chosen_trigger_channel.trigger_list[i].contains_textarea = true;
                                element_parameters_triggers.is_textarea = true;
                            }
                            else{
                                element_parameters_triggers.is_textarea = false;
                            }
                            if (element_parameters_triggers.type.localeCompare("email") == 0) {
                                element_parameters_triggers.is_email = true;
                            }
                            else {
                                element_parameters_triggers.is_email = false;
                            }
                            if (element_parameters_triggers.type.localeCompare("checkbox") == 0) {
                                element_parameters_triggers.is_checkbox = true;
                                $scope.chosen_trigger_channel.trigger_list[i].contains_checkbox = true;
                            }
                            else {
                                element_parameters_triggers.is_checkbox = false;
                            }
                            params_same_id_trigger.push(element_parameters_triggers);
                        }
                    }
                    $scope.chosen_trigger_channel.trigger_list[i].params = params_same_id_trigger;
                }
            }

            /*
            $scope.array_try = [];
            var elem_try = {};
            elem_try.aa = "aa";
            elem_try.bb = "bb";
            $scope.array_try.push(elem_try);
            elem_try.aa = "AA";
            elem_try.bb = "BB";
            $scope.array_try.push(elem_try);
            */
            //preparing parameters to pass to form
            /*
            $scope.parameters_triggers_names_list = [];
            $scope.chosen_trigger_channel.trigger_list.params = [];
            for(var j=0; j<$scope.array_parameters_triggers.length; j++) {
                for(var k=0; k<$scope.chosen_trigger_channel.trigger_list.params.length; k++) {
                    chosen_trigger_channel.trigger_list.params.push($scope.chosen_trigger_channel.trigger_list.params[k].name);
                }
            }
            */
            /*
            for(var j=0; j<$scope.array_parameters_triggers.length; j++) {
                //preparing <h4>Email address:</h4><input type='text' name='email_address' ng-model='email_address'><br> couples
                $scope.parameters_triggers_couples = "";
                for (var i = 0; i < array_parameters_triggers[j].array_same_id_trigger.length; i++) {
                    $scope.parameters_triggers_couples += "<h4>" + array_parameters_triggers[j].array_same_id_trigger[i].name + "</h4>";
                    $scope.parameters_triggers_couples += "<input type='" + array_parameters_triggers[j].array_same_id_trigger[i].type + "' name='" + array_parameters_triggers[j].array_same_id_trigger[i].name + "' ng-model='" + array_parameters_triggers[j].array_same_id_trigger[i].name + "' <br> ";
                }
                $scope.chosen_trigger_channel.trigger_list[j].extra_element = "<br><br><form novalidate ng-submit='submit_trigger(" +$scope.parameters_triggers_names_list[j] + ")'>" + $scope.parameters_triggers_couples + " <input scroll-on-click href='#step_2_b' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
            }
            */
            $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        }, function errorCallback(response) {
            alert("You can not get the triggers parameters list of trigger channel from Server");
        });

    }, function errorCallback(response) {
        alert("You can not get the triggers list of trigger channel from Server");
    });

}

function choose_action_channel($scope, $http, $rootScope, o, userFactory){
    console.log("You have choosen " + o.name);
    $scope.chosen_action_channel = o;
    $rootScope.chosen_action_channel = o;
    $http({
        method: 'GET',
        url: $rootScope.ipServer+'/actions/'+o.channelId,
        headers: {'Content-Type': 'application/json'}
    }).then(function successCallback(response) {
        $scope.chosen_action_channel.action_list = response.data; //List<Trigger>
        $http({
            method: 'GET',
            url: $rootScope.ipServer+'/parameters_actions/'+o.channelId,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            var params = response.data; //List<ParametersTriggers>
            var output_distinct = [], l = params.length, i;
            for( i=0; i<l; i++) {
                var present = false;
                for(var j=0; j<output_distinct.length; j++){
                    if(output_distinct[j] == params[i].action.id){
                        present = true;
                        break;
                    }
                }
                if(!present)
                    output_distinct.push(params[i].action.id);
            }
            //creating array_parameters_actions_same_id_action
            for(var i=0; i<$scope.chosen_action_channel.action_list.length; i++) {
                $scope.chosen_action_channel.action_list[i].params = [];
            }
            //normalize output_distinct in a new array
            var normalized_array = [];
            output_distinct.reverse();
            for(var i=0; i<$scope.chosen_action_channel.action_list.length; i++) {
                var contained = false;
                for (var j = 0; j < params.length; j++) {
                    if ($scope.chosen_action_channel.action_list[i].id == params[j].action.id) {
                        contained = true;
                        break;
                    }
                }
                if(contained)
                    normalized_array[i] = output_distinct.pop();
            }
            for(var i=0; i<$scope.chosen_action_channel.action_list.length; i++) {
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
                if(contained) {
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
                            else{
                                element_parameters_actions.is_time = false;
                            }
                            if (element_parameters_actions.type.localeCompare("textarea") == 0) {
                                $scope.chosen_action_channel.action_list[i].contains_textarea = true;
                                element_parameters_actions.is_textarea = true;
                            }
                            else{
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
            //preparing parameters to pass to form
            /*
            $scope.parameters_actions_names_list = _.map($scope.chosen_action_channel.action_list.params, 'name').join(', ');
            for(var j=0; j<array_parameters_actions.length; j++) {
                //preparing <h4>Email address:</h4><input type='text' name='email_address' ng-model='email_address'><br> couples
                $scope.parameters_actions_couples = "";
                for (var i = 0; i < array_parameters_actions[j].array_same_id_action.length; i++) {
                    $scope.parameters_actions_couples += "<h4>" + array_parameters_actions[j].array_same_id_action[i].name + "</h4>";
                    $scope.parameters_actions_couples += "<input type='" + array_parameters_actions[j].array_same_id_action[i].type + "' name='" + array_parameters_actions[j].array_same_id_action[i].name + "' ng-model='" + array_parameters_actions[j].array_same_id_action[i].name + "' <br> ";
                }
                $scope.chosen_action_channel.action_list[j].extra_element = "<br><br><form novalidate ng-submit='submit_action(" + $scope.parameters_actions_names_list + ")'>" + $scope.parameters_actions_couples + " <input scroll-on-click href='#step_2_b' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create action&nbsp&nbsp&nbsp'></form>"
            }
            */
        }, function errorCallback(response) {
            alert("You can not get the actions parameters list of action channel from Server");
        });

    }, function errorCallback(response) {
        alert("You can not get the actions list of action channel from Server");
    });

}

function submit_trigger($rootScope, $scope, triggers_parameters, is_form_valid, $location, $anchorScroll, trigger_header, data_trigger){
    for(var i=0; i<triggers_parameters.length; i++){
        console.log("Input data: " + triggers_parameters[i]);
    }
    //save parameters for showing them later in parameters' keyword section
    $rootScope.possible_parameters_keyword = [];
    for(var i=0; i<data_trigger.params.length; i++){
        $rootScope.possible_parameters_keyword.push(data_trigger.params[i]);
    }
    delete data_trigger.params;
    $('html, body').animate({
        scrollTop: $("#step_2_b").offset().top}, "slow"
    );
    //$("html, body").animate({ scrollTop: "300px" });
    $rootScope.chosen_trigger_job = trigger_header;
    for(var i=0; i<triggers_parameters.length; i++){
        triggers_parameters[i].unbinded_name = triggers_parameters[i].unbinded_name.toLowerCase().replace(/ /g,"_");
    }
    $rootScope.chosen_trigger_parameters = triggers_parameters;
    $rootScope.chosen_trigger_data = data_trigger;
}

function submit_action($rootScope, $scope, actions_parameters, is_form_valid, $location, $anchorScroll, action_header, data_action, parameters_keyword){
    for(var i=0; i<actions_parameters.length; i++){
        console.log("Input data: " + actions_parameters[i]);
    }
    delete data_action.params;
    $('html, body').animate({
        scrollTop: $("#step_5").offset().top}, "slow"
    );

    $scope.chosen_action_job = action_header;
    $scope.chosen_action_parameters = actions_parameters;
    $scope.chosen_action_data = data_action;
    $rootScope.chosen_action_job = action_header;
    for(var i=0; i<actions_parameters.length; i++){
        actions_parameters[i].unbinded_name = actions_parameters[i].unbinded_name.toLowerCase().replace(/ /g,"_");
    }
    $rootScope.chosen_action_parameters = actions_parameters;
    $rootScope.chosen_action_data = data_action;
    $rootScope.chosen_parameters_keyword = parameters_keyword;
    //preparing data to POST (List<Recipe>) phase1
    var recipe_to_add = {};
    //recipe_to_add.action = data_action;

    $scope.recipes_list = [];
    //$scope.recipes_list.push(recipe_to_add);
    $rootScope.recipes_list = $scope.recipes_list;

    $scope.chosen_trigger_channel = $rootScope.chosen_trigger_channel;
    $scope.chosen_action_channel = $rootScope.chosen_action_channel;
    $scope.chosen_trigger_job = $rootScope.chosen_trigger_job;
    $scope.chose_trigger_parameters = $rootScope.chose_trigger_parameters;
    $scope.chosen_trigger_data = $rootScope.chosen_trigger_data;
    $scope.recipe_description = "When " + $scope.chosen_trigger_job + " in " + $scope.chosen_trigger_channel.name + ", do " + $scope.chosen_action_job + " in " + $scope.chosen_action_channel.name;
}

function submit_recipe($rootScope, $scope, $window, $http, recipe_description, userFactory) {
    $scope.recipes_list = [];
    console.log("Submitting recipe");
    //preparing data to POST (List<Recipe>) phase2
    /*
    for (var i = 0; i < $scope.recipes_list.length; i++) {
        $scope.recipes_list[i].description = recipe_description;
        $scope.recipes_list[i].trigger = $rootScope.chosen_trigger_data;
        $scope.recipes_list[i].action = $rootScope.chosen_action_data;
        $scope.recipes_list[i].trigger_ingredients = $rootScope.chosen_trigger_parameters;
        $scope.recipes_list[i].action_ingredients = $rootScope.chosen_action_parameters;
        for(var j=0; j<$scope.recipes_list[i].trigger_ingredients.length; j++) {
            delete $scope.recipes_list[i].trigger_ingredients[j].unbinded_name;
        }
        for(var j=0; j<$scope.recipes_list[i].action_ingredients.length; j++) {
            delete $scope.recipes_list[i].action_ingredients[j].unbinded_name;
        }
        $scope.recipes_list[i].is_public = false;
        $scope.recipes_list[i].is_enabled = false;
    }
    */
    var element_recipe = {};
    if(recipe_description!=undefined && (new String(recipe_description.trim()))!= new String("")) {
        element_recipe.description = recipe_description;
    }
    else{
        element_recipe.description = "No title";
    }

    element_recipe.trigger_ingredients = [];
    element_recipe.action_ingredients = [];
    for(var i=0; i<$rootScope.chosen_trigger_parameters.length; i++){
        var parameter_trigger_element = {};
        parameter_trigger_element.id = $rootScope.chosen_trigger_parameters[i].id;
        parameter_trigger_element.channel = $rootScope.chosen_trigger_data.channel;
        parameter_trigger_element.trigger = $rootScope.chosen_trigger_data;
        //delete parameter_trigger_element.trigger.id;
        //delete parameter_trigger_element.trigger.channel.channelId;
        if($rootScope.chosen_trigger_parameters[i].type.localeCompare("textarea")==0) {
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
        if($rootScope.chosen_trigger_parameters[i].type.localeCompare("radio")==0) {
            if($rootScope.chosen_trigger_parameters[i].radio_button_form!=undefined && $rootScope.chosen_trigger_parameters[i].radio_button_form!=null){
                trigger_ingredient_element.value = $rootScope.chosen_trigger_parameters[i].radio_button_form;
            }
            else{
                trigger_ingredient_element.value = "unchecked_radio_button";
            }
        }
        else if($rootScope.chosen_trigger_parameters[i].type.localeCompare("checkbox")==0){
            if($rootScope.chosen_trigger_parameters[i].checkbox_button_form!=null && $rootScope.chosen_trigger_parameters[i].checkbox_button_form!=undefined) {
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
        else if($rootScope.chosen_trigger_parameters[i].type.localeCompare("date")==0){
            trigger_ingredient_element.value = moment($rootScope.chosen_trigger_parameters[i].name).format("DD/MM/YYYY");
        }
        else if($rootScope.chosen_trigger_parameters[i].type.localeCompare("time")==0){
            trigger_ingredient_element.value = moment($rootScope.chosen_trigger_parameters[i].name).format("HH:mm");
        }
        else {
            trigger_ingredient_element.value = $rootScope.chosen_trigger_parameters[i].name;
        }
        if( !(trigger_ingredient_element.value instanceof String) || (trigger_ingredient_element.value instanceof String && trigger_ingredient_element.value.localeCompare("unchecked_checkbox_button")!=0 && trigger_ingredient_element.value.localeCompare("unchecked_radio_button")!=0)) {
            element_recipe.trigger_ingredients.push(trigger_ingredient_element);
        }
    }

    for(var i=0; i<$rootScope.chosen_action_parameters.length; i++){
        var parameter_action_element = {};
        parameter_action_element.id = $rootScope.chosen_action_parameters[i].id;
        parameter_action_element.channel = $rootScope.chosen_action_data.channel;
        parameter_action_element.action = $rootScope.chosen_action_data;
        //delete parameter_action_element.action.id;
        //delete parameter_action_element.action.channel.channelId;
        if($rootScope.chosen_action_parameters[i].type.localeCompare("textarea")==0) {
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
        if($rootScope.chosen_action_parameters[i].type.localeCompare("radio")==0) {
            if($rootScope.chosen_action_parameters[i].radio_button_form!=undefined && $rootScope.chosen_action_parameters[i].radio_button_form!=null){
                action_ingredient_element.value = $rootScope.chosen_action_parameters[i].radio_button_form;
            }
            else{
                action_ingredient_element.value = "unchecked_radio_button";
            }
        }
        else if($rootScope.chosen_action_parameters[i].type.localeCompare("checkbox")==0){
            if($rootScope.chosen_action_parameters[i].checkbox_button_form!=null && $rootScope.chosen_action_parameters[i].checkbox_button_form!=undefined) {
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
        else if($rootScope.chosen_action_parameters[i].type.localeCompare("date")==0){
            action_ingredient_element.value = moment($rootScope.chosen_action_parameters[i].name).format("DD/MM/YYYY");
        }
        else if($rootScope.chosen_action_parameters[i].type.localeCompare("time")==0){
            action_ingredient_element.value = moment($rootScope.chosen_action_parameters[i].name).format("HH:mm");
        }
        else {
            action_ingredient_element.value = $rootScope.chosen_action_parameters[i].name;
        }
        if( !(action_ingredient_element.value instanceof String) || (action_ingredient_element.value instanceof String && action_ingredient_element.value.localeCompare("unchecked_checkbox_button")!=0 && action_ingredient_element.value.localeCompare("unchecked_radio_button")!=0)) {
            element_recipe.action_ingredients.push(action_ingredient_element);
        }
    }

    element_recipe.trigger = $rootScope.chosen_trigger_data;
    element_recipe.action = $rootScope.chosen_action_data;
    element_recipe.isPublic = false;
    element_recipe.isEnabled = false;

    element_recipe.parameters_keyword = [];
    for(var i=0; i<$rootScope.chosen_parameters_keyword.length; i++){
        element_keyword = {};
        element_keyword.value = $rootScope.chosen_parameters_keyword[i].name;
        element_keyword.name = $rootScope.chosen_parameters_keyword[i].unbinded_name;
        if($rootScope.chosen_parameters_keyword[i].parameters_keyword == true){
            element_keyword.selected = true;
        }
        else{
            element_keyword.selected = false;
        }
        element_recipe.parameters_keyword.push(element_keyword);
    }

    $scope.recipes_list.push(element_recipe);
    if(userFactory.isAuthenticated()) {
        $http({
            method: 'POST',
            url: $rootScope.ipServer+'/add_recipe?_csrf='+userFactory.getXsrfCookie(),
            headers: {'Content-Type': 'application/json' },
            data: $scope.recipes_list
        }).then(function successCallback(response) {
            alert(response.data.message);
            $window.location.href = '#/myrecipes';
        }, function errorCallback(response) {
            alert(response.data.message);
        });
    }
    else{
        alert("You are noy logged so you can not save the recipe on Server");
    }
}

    /*
    //define all the for 4 channels and put it in the array of the scope
    var channel_google_mail = {};
    channel_google_mail.name = "Google Mail";
    channel_google_mail.image_url = "static/images/google_mail_icon.png";
    //channel_google_mail.image_url = "https://d3rnbxvnd0hlox.cloudfront.net/images/channels/33/icons/regular.png";
    channel_google_mail.trigger_list = [
        /*
         {
         header: "Any new email in inbox" ,
         paragraph: "This Trigger fires every time any new email arrives in Gmail." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         {
         header: "Any new attachment in inbox" ,
         paragraph: "This Trigger fires for every email attachment that arrives in your inbox. NOTE: Multiple attachments each fire separately." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         *//*
        {
            header: "New email in inbox from" ,
            paragraph: "This Trigger fires every time a new email arrives in your inbox from the address and with the subject you specify." ,
            extra_element: "<br><br><form novalidate ng-submit='submit_trigger_google_mail1(email_address, email_subject)'><h4>Email address:</h4><input type='text' name='email_address' ng-model='email_address'><br><h4>Email subject:</h4><input type='text' name='email_subject' ng-model='email_subject'><br><input scroll-on-click href='#step_2_b' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        },
        /*
         {
         header: "New starred email in inbox" ,
         paragraph: "This Trigger fires every time you add any new star to an email in your inbox." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         {
         header: "New email in inbox labeled" ,
         paragraph: "This Trigger fires every time a new email arrives in your inbox with the label you specify." ,
         extra_element: "<br><br><form novalidate ng-submit='submit_trigger_google_mail5(trigger_list_channel)'><h4>Email label:</h4><input type='text' name='email_label' placeholder='Case sensitive; '/' to split'><br><br><input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
         },
         {
         header: "New email in inbox from search" ,
         paragraph: "This Trigger fires every time a new email arrives in your inbox that matches the search query you specify." ,
         extra_element: "<br><h6 class='step_0_helper' style='padding-left: 0px'>Use Gmail’s <a href='http://support.google.com/mail/bin/answer.py?hl=en&answer=7190'>search operators</a> for advanced search</h6><br><br><form novalidate ng-submit='submit_trigger_google_mail6(trigger_list_channel)'><h4>Search for:</h4><input type='text' name='search_for'><br><br><input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
         }
         *//*
    ];
    channel_google_mail.action_list = [
        {
            header: "Send an email" ,
            paragraph: "This Action will send an email to someone with a given subject and a given body." ,
            extra_element: "<form novalidate ng-submit='submit_action_google_mail1()'<h4>Email recipient address:</h4><input type='text' name='email_recipient_address' ng-model='email_recipient_address' ><br><h4>Email subject:</h4><input type='text' name='email_subject' ng-model='email_subject' ><br><h4>Body:</h4><input type='text' name='email_body' ng-model='email_body' ><br><input scroll-on-click href='#step_5' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
    ];

    var channel_google_calendar = {};
    channel_google_calendar.name = "Google Calendar";
    channel_google_calendar.image_url = "images/google_calendar_icon.png";
    //channel_google_calendar.image_url = "https://d3rnbxvnd0hlox.cloudfront.net/images/channels/36/icons/regular.png";
    channel_google_calendar.trigger_list = [
        {
            header: "A particular event with a given title or description starts" ,
            paragraph: "" ,
            extra_element: "<form novalidate ng-submit='submit_trigger_google_calendar1()'><h4>Keyword or phrase:</h4><input type='text' name='keyword_or_phrase' ng-model='keyword_or_phrase'><br><br><input scroll-on-click href='#step_2_b' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        },
        /*
         {
         header: "Event from search starts" ,
         paragraph: "This Trigger fires within 15 minutes of the starting time of an event on your Google Calendar that contains a specific keyword or phrase. The search looks at the event’s Title, Description, and Location." ,
         extra_element: "<form novalidate ng-submit='submit_trigger_google_calendar2(trigger_list_channel)'><h4>Keyword or phrase:</h4><input type='text' name='keyword'><br><br><input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
         },
         */
        {/*
            header: "A particular new event ith a given title or description added" ,
            paragraph: "" ,
            extra_element: "<form novalidate ng-submit='submit_trigger_google_calendar2()'><h4>Keyword or phrase:</h4><input scroll-on-click href='#step_2_b' type='text' name='keyword_or_phrase' ng-model='keyword_or_phrase'><br><br><input scroll-on-click href='#step_2_b' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        }
    ];
    channel_google_calendar.action_list = [
        {
            header: "Quick add event with a given title and date (DD/MM/YYYY HH:MM)" ,
            paragraph: "This Action will add an event to your Google Calendar. Simply include a detailed description of when and what." ,
            extra_element: "<form novalidate ng-submit='submit_action_google_calendar1()'><h4>Title:</h4><input type='text' name='title' ng-model='title'><br><h4>Date:</h4><input type='text' name='date' ng-model='date'><br><input scroll-on-click href='#step_5' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Action&nbsp&nbsp&nbsp'></form>"
        },
    ];

    var channel_weather = {};
    channel_weather.name = "Weather";
    channel_weather.image_url = "images/weather_icon.png";
    //channel_weather.image_url = "http://thesweetsetup.com/wp-content/uploads/2013/11/CheckTheWeather512.png";
    channel_weather.trigger_list = [
        {
            header: "Tomorrow weather report at a given time" ,
            paragraph: "",
            extra_element: "<form novalidate ng-submit='submit_trigger_weather1()'><h4>Time (HH:MM):</h4><input type='text' name='time' ng-model='time'><br><br><input scroll-on-click href='#step_2_b' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        },
        {
            header: "Current temperature above or below a given threshold" ,
            paragraph: "" ,
            extra_element: "<form novalidate ng-submit='submit_trigger_weather2()'><input type='radio' name='below_or_under' ng-model='below_or_under' value='below' checked> Below<br><input type='radio' name='below_or_under' ng-model='below_or_under' value='under'> Under<br><h4>Temperature:</h4><input type='text' name='temperature' ng-model='temperature'><br><br><input scroll-on-click href='#step_2_b' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        },
        {
            header: "Sunrise event in your location at a given time" ,
            paragraph: "" ,
            extra_element: "<form novalidate ng-submit='submit_trigger_weather3()'><input scroll-on-click href='#step_2_b' type='submit' scroll-on-click href='#step_2_b' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        }
    ];
    channel_weather.action_list = [
    ];

    var channel_facebook = {};
    channel_facebook.name = "Facebook";
    channel_facebook.image_url = "images/facebook_icon.png";
    //channel_facebook.image_url = "https://d3rnbxvnd0hlox.cloudfront.net/images/channels/10/icons/regular.png";
    channel_facebook.trigger_list = [
        /*
         {
         header: "Any new post by you in area" ,
         paragraph: "This Trigger fires every time you post on Facebook at a location you specify." ,
         extra_element: "(CONSENTI/BLOCCA) <form novalidate ng-submit='submit_trigger_facebook1(trigger_list_channel)'>	<input autocapitalization='off' autocomplete='off' autocorrect='off' class='step_1_channels_search' 		   name='q' placeholder='Search Channels' type='text'> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         *//*
        {
            header: "New status message by you" ,
            paragraph: "This Trigger fires every time you create a new plain text status message on Facebook." ,
            extra_element: "<form novalidate ng-submit='submit_trigger_facebook1()'><input scroll-on-click href='#step_2_b' type='submit' scroll-on-click href='#step_2_b' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        },
        /*
         {
         header: "New status message by you with hashtag" ,
         paragraph: "This Trigger fires every time you create a new plain text status message on Facebook with a specific hashtag." ,
         extra_element: "<form novalidate ng-submit='submit_trigger_facebook3(trigger_list_channel)'> 	<h4>Hashtag:</h4> 	<input type='text' name='hashtag'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "New link post by you" ,
         paragraph: "This Trigger fires every time you create a new link post on Facebook." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         {
         header: "New link post by you with hashtag" ,
         paragraph: "This Trigger fires every time you create a new link post on Facebook with a specific hashtag." ,
         extra_element: "<form novalidate ng-submit='submit_trigger_facebook5(trigger_list_channel)'> 	<h4>Hashtag:</h4> 	<input type='text' name='hashtag'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "New photo post by you" ,
         paragraph: "This Trigger fires every time you post a new photo on Facebook." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         }
         ,
         {
         header: "New photo post by you with hashtag" ,
         paragraph: "This Trigger fires every time you post a new photo on Facebook with a specific hashtag." ,
         extra_element: "<form novalidate ng-submit='submit_trigger_facebook7(trigger_list_channel)'> 	<h4>Hashtag:</h4> 	<input type='text' name='hashtag'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "New photo post by you in area" ,
         paragraph: "" ,
         extra_element: "(CONSENTI/BLOCCA) <form novalidate ng-submit='submit_trigger_facebook8(trigger_list_channel)'> 	<input autocapitalization='off' autocomplete='off' autocorrect='off' class='step_1_channels_search' 		   name='q' placeholder='Search Channels' type='text'> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "You are tagged in a photo" ,
         paragraph: "This Trigger fires every time you are tagged you in a new photo. NOTE: Facebook privacy settings may block IFTTT’s access to some photos you are tagged in." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         *//*
        {
            header: "Your profile changes" ,
            paragraph: "A Trigger that monitors changes in your Facebook profile information. It works with these Facebook profile fields: Name, Profile picture, Location." ,
            extra_element: "<form novalidate ng-submit='submit_trigger_facebook2()' ><input type='checkbox' name='full_name' ng-model='full_name'>Full name<br> 	<input type='checkbox' name='profile_picture' ng-model='profile_picture'>Profile picture<br><input type='checkbox' name='location' ng-model='location'>Location<br><input scroll-on-click href='#step_2_b' type='submit' class='btn btn-info btn-large' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp' /> </form>"
        }
    ];
    channel_facebook.action_list = [
        {
            header: "Create a status message" ,
            paragraph: "This Action will create a new plain text status message on Facebook." ,
            extra_element: "<form novalidate ng-submit='submit_action_facebook1()' id='message_form'><textarea rows='4' cols='50' name='message' form='message_form' ng-model='message'> 		Message... 	</textarea> <br> 	<input scroll-on-click href='#step_5' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        }/*,
         {
         header: "Create a link post" ,
         paragraph: "his Action will create a new link post on Facebook." ,
         extra_element: "<form novalidate ng-submit='submit_action_facebook2' id='message2_form'> 	<h4>Link URL:</h4> 	<input type='text' name='link_url'> 	<br> 	<textarea rows='4' cols='50' name='recipe_title' form='message2_form'> 		Message... 	</textarea> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "Upload a photo from URL" ,
         paragraph: "This Action will upload a new photo, from the given URL, to a Facebook album you specify." ,
         extra_element: "<form novalidate ng-submit='submit_action_facebook3' id='text_form'> 	<h4>Link URL:</h4> 	<input type='text' name='link_url'> 	<br> 	<h4>Album name:</h4> 	<input type='text' name='album_name'> 	<br> 	<textarea rows='4' cols='50' name='recipe_title' form='text_form'> 		Text... 	</textarea> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         *//*
    ];

    var channel_twitter = {};
    channel_twitter.name = "Twitter";
    channel_twitter.image_url = "images/twitter_icon.png";
    //channel_twitter.image_url = "https://d3rnbxvnd0hlox.cloudfront.net/images/channels/2/icons/regular.png";
    channel_twitter.trigger_list = [
        {
            header: "New tweet by you" ,
            paragraph: "This Trigger fires every time you post a tweet" ,
            extra_element: "<form novalidate ng-submit='submit_trigger_twitter1()'> <input scroll-on-click href='#step_2_b' type='submit' class='btn btn-info btn-large' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp' /> </form>"
        }/*,
         {
         header: "New tweet by you with hashtag" ,
         paragraph: "This Trigger fires every time you post a tweet at a location you specify. " ,
         extra_element: "<form novalidate ng-submit='submit_trigger_twitter2(trigger_list_channel)'> 	<h4>Hashtag:</h4> 	<input type='text' name='hashtag'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "New tweet by you in area" ,
         paragraph: "This Trigger fires every time you post a tweet at a location you specify. " ,
         extra_element: "(CONSENTI/BLOCCA) <form novalidate ng-submit='submit_trigger_twitter3(trigger_list_channel)'> 	<input autocapitalization='off' autocomplete='off' autocorrect='off' class='step_1_channels_search' 		   name='q' placeholder='Search Channels' type='text'> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "New mention of you" ,
         paragraph: "This Trigger fires every time you are @mentioned in a tweet." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         {
         header: "New link by you" ,
         paragraph: "This Trigger fires for every link you tweet. If your tweet has multiple links, it will fire multiple times." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         {
         header: "New follower" ,
         paragraph: "This Trigger fires every time a new user starts following you." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         {
         header: "New liked tweet by you" ,
         paragraph: "This Trigger fires every time you like a tweet." ,
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         {
         header: "New tweet by a specific user" ,
         paragraph: "This Trigger fires every time the Twitter user you specify tweets." ,
         extra_element: "<form novalidate ng-submit='submit_trigger_twitter8(trigger_list_channel)'> 	<h4>Username:</h4> 	<input type='text' name='username'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "New tweet from search" ,
         paragraph: "This Trigger fires every time a new tweet matches your search query. NOTE: limited to 15 tweets per check." +
         + "Use Twitter’s <a href='https://support.twitter.com/articles/71577-how-to-use-advanced-twitter-search' >search operators</a> for advanced search. For example: ('@twitter' '#followfriday')",
         extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
         },
         {
         header: "New tweet by anyone in area" ,
         paragraph: "This Trigger fires every time anyone posts a tweet at a location you specify. " ,
         extra_element: "(CONSENTI/BLOCCA) <form novalidate ng-submit='submit_trigger_twitter10(trigger_list_channel)'> 	<input autocapitalization='off' autocomplete='off' autocorrect='off' class='step_1_channels_search' 		   name='q' placeholder='Search Channels' type='text'> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         *//*
    ];
    channel_twitter.action_list = [
        {
            header: "Post a tweet" ,
            paragraph: "This Action will post a new tweet to your Twitter account" ,
            extra_element: "<form novalidate ng-submit='submit_action_twitter1()'> <input scroll-on-click href='#step_5' type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        }/*,
         {
         header: "Send an email" ,
         paragraph: "This Action will post a new tweet to your Twitter account with a linked pic.twitter.com image. NOTE: Please adhere to Twitter’s Rules and Terms of Service.Tagged! {{Caption}} {{ImageSource}}" ,
         extra_element: "<form novalidate ng-submit='submit_action_twitter2'> 	<h4>Caption:</h4> 	<input type='text' name='caption'> 	<br> 	<h4>Image source:</h4> 	<input type='text' name='image_source'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "Send a direct message to yourself" ,
         paragraph: "This Action will send a direct message to your Twitter account. NOTE: Please adhere to Twitter’s Rules and Terms of Service.I'm tagged in {{From}}\'s photo! Check it out (if you have permission) {{Link}}" ,
         extra_element: "<form novalidate ng-submit='submit_action_twitter3'> 	<h4>From:</h4> 	<input type='text' name='from'> 	<br> 	<h4>Link:</h4> 	<input type='text' name='link'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "'>Update profile picture" ,
         paragraph: "This Action will update your profile picture from the image URL you specify and optionally tweet about it. NOTE: Please adhere to Twitter’s Rules and Terms of Service." ,
         extra_element: "<form novalidate ng-submit='submit_action_twitter4'> 	<h4>Caption:</h4> 	<input type='text' name='caption'> 	<br> 	<h4>Image source:</h4> 	<input type='text' name='image_source'> 	<br> 	<h4>Link:</h4> 	<input type='text' name='link'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "Update bio" ,
         paragraph: "This Action will update your bio and optionally tweet about it. NOTE: Please adhere to Twitter’s Rules and Terms of Service. {{TWeet}}Tagged! {{Caption}} {{Link}}" ,
         extra_element: "<form novalidate ng-submit='submit_action_twitter5'> 	<h4>Caption:</h4> 	<input type='text' name='caption'> 	<br> 	<h4>Tweet:</h4> 	<input type='text' name='tweet'> 	<br> 	<h4>Link:</h4> 	<input type='text' name='link'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         {
         header: "Add user to list" ,
         paragraph: "This Action will add a user to a Twitter list you specify. NOTE: Twitter allows 1000 lists per user and 5000 users per list." ,
         extra_element: "<form novalidate ng-submit='submit_action_twitter2' id='user_list_form'> 	<h4>User name:</h4> 	<input type='text' name='username'> 	<br> 	<textarea rows='4' cols='50' name='recipe_title' form='user_list_form'> 		Enter list of users separated by comma (,). 	</textarea> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
         },
         *//*
    ];

    $scope.channels = [channel_google_mail, channel_google_calendar, channel_weather, channel_facebook, channel_twitter];
    */
}

if3tApp.directive('scrollOnClick', function() {
    return {
        restrict: 'A',
        link: function(scope, $elm, attrs) {
            var idToScroll = attrs.href;
                    $elm.on('click', function (event) {
                        var $target;
                        if (idToScroll) {
                            $target = $(idToScroll);
                        } else {
                            $target = $elm;
                        }
                        $("body,html").stop(true,true).animate({scrollTop: $target.offset().top}, "slow");
                    });
                }
            }
});

if3tApp.directive('scrollOnClickAndChooseTriggerChannel', function() {
    return {
        restrict: 'A',
        scope: { callbackFn : '&'},
        link: function(scope, $elm, attrs) {
            var idToScroll = attrs.href;
            $elm.on('click', function() {
                scope.callbackFn();
                scope.$apply();
                var $target;
                if (idToScroll) {
                    $target = $(idToScroll);
                } else {
                    $target = $elm;
                }
                $("body,html").stop(true,true).animate({scrollTop: $target.offset().top}, "slow");
            });
        }
    }
});

if3tApp.directive('scrollOnClickAndChooseActionChannel', function() {
    return {
        restrict: 'A',
        scope: { callbackFn : '&'},
        link: function(scope, $elm, attrs) {
            var idToScroll = attrs.href;
            $elm.on('click', function() {
                scope.callbackFn();
                scope.$apply();
                var $target;
                if (idToScroll) {
                    $target = $(idToScroll);
                } else {
                    $target = $elm;
                }
                $("body,html").stop(true,true).animate({scrollTop: $target.offset().top}, "slow");
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

String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
}