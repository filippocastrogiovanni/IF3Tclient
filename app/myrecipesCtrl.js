/**
 * Created by Filippo on 24/05/2016.
 */

//TODO sta cosa si deve capire se toglierla o no a sto
if3tApp.controller('MyRecipesController', ['$scope', '$rootScope', '$routeParams', '$window', 'messageFactory', 'userFactory', 'recipesFactory',
    function ($scope, $rootscope, $routeParams, $window, messageFactory, userFactory, recipesFactory)
    {
        $rootscope.curpage = "myrecipes";

        if (!userFactory.isAuthenticated()) {
            $window.location.href = "#/home";
        }

        $rootscope.userRecipesCallback = function(recipes) {
            $scope.recipes = recipes;
        };

        recipesFactory.getUserRecipes($rootscope.userRecipesCallback);

        $scope.toEditPage = function(recipeId) {
            $window.location.href = '#/myrecipes/' + recipeId;
        };
    }
]);

//FIXME togliere 'paragrafo di prova' dal db
//FIXME aggiornare db under-below
//FIXME timezones?
//FIXME capire perchè dopo aver visualizzato un messaggio di errore il contenuto della pagina si sposta a sinistra di un po'
if3tApp.controller('EditRecipeController', ['$scope', '$rootScope', '$routeParams', '$window', '$location', 'userFactory', 'recipesFactory',
    function ($scope, $rootscope, $routeParams, $window, $location, userFactory, recipesFactory)
    {
        if (!userFactory.isAuthenticated()) {
            $window.location.href = "#/home";
        }

        $scope.needThumbnail = function(urlImage)
        {
            return (urlImage.search('facebook') != -1);
        };

        $scope.getLabel = function(rawLabel)
        {
            var splitted = rawLabel.split("_");
            return splitted.join(" ");
        };

        function initializeRadioModel(params)
        {
            var checked_radio = _.find(params, function(obj) {
                return obj.type == 'radio' && obj.value != 'unchecked_radio_button';
            });

            if (checked_radio !== undefined) {
                $scope.radio_tri = { value: checked_radio.value };
            }
        }

        function prepareRadioToBeSent(params)
        {
            var tri_all_radios = _.filter(params, function(par) {
                return par.type == 'radio';
            });

            if (tri_all_radios.length > 0)
            {
                var tri_checked_radio = _.find(tri_all_radios, function(par) {
                    return par.name == $scope.radio_tri.value;
                });

                var tri_unchecked_radios = _.filter(tri_all_radios, function(par) {
                    return par.name != tri_checked_radio.name;
                });

                tri_checked_radio.value = $scope.radio_tri.value;

                _.forEach(tri_unchecked_radios, function(par) {
                    par.value = 'unchecked_radio_button';
                });
            }
        }

        function parseNumberParameters(params)
        {
            var numbers = _.filter(params, function(par) {
                return par.type == 'number';
            });

            _.forEach(numbers, function(par) {
                par.value = parseInt(par.value, 10);
            });
        }

        function parseDateParameters(params)
        {
            var dates = _.filter(params, function(par) {
                return par.type == 'date';
            });

            _.forEach(dates, function(par) {
                var fields = par.value.split('/');
                par.value = new Date(moment(fields[2]+'-'+fields[1]+'-'+fields[0]));
            });
        }

        function prepareDatesToBeSent(params)
        {
            var dates = _.filter(params, function(par) {
                return par.type == 'date';
            });

            _.forEach(dates, function(par) {
                par.value = moment(par.value).format("DD/MM/YYYY");
            });
        }

        function parseTimeParameters(params)
        {
            var times = _.filter(params, function(par) {
                return par.type == 'time';
            });

            _.forEach(times, function(par) {
                var fields = par.value.split(':');
                par.value = new Date(1970, 0, 1, fields[0], fields[1]);
            });
        }

        function prepareTimesToBeSent(params)
        {
            var times = _.filter(params, function(par) {
                return par.type == 'time';
            });

            _.forEach(times, function(par) {
                par.value = moment(par.value).format("HH:mm");
            });
        }

        function initializeForm()
        {
            //TODO non è previsto un radio button per le action ora come ora (si può aggiungere facilmente per una sola)
            initializeRadioModel($scope.savedRecipe.trigger.parameters);
            parseNumberParameters($scope.savedRecipe.trigger.parameters);

            _.forEach($scope.savedRecipe.actions, function(act) {
                parseNumberParameters(act.parameters);
            });

            parseDateParameters($scope.savedRecipe.trigger.parameters);

            _.forEach($scope.savedRecipe.actions, function(act) {
                parseDateParameters(act.parameters);
            });

            parseTimeParameters($scope.savedRecipe.trigger.parameters);

            _.forEach($scope.savedRecipe.actions, function(act) {
                parseTimeParameters(act.parameters);
            });
        }

        function prepareDataFormToBeSent(recipe)
        {
            prepareRadioToBeSent(recipe.trigger.parameters);
            prepareDatesToBeSent(recipe.trigger.parameters);

            _.forEach($scope.savedRecipe.actions, function(act) {
                prepareDatesToBeSent(act.parameters);
            });

            prepareTimesToBeSent(recipe.trigger.parameters);

            _.forEach($scope.savedRecipe.actions, function(act) {
                prepareTimesToBeSent(act.parameters);
            });
        }

        $rootscope.recipeCallback = function(recipe)
        {
            $scope.savedRecipe = recipe;
            $scope.master = angular.copy($scope.savedRecipe);
            initializeForm();
        };

        recipesFactory.getRecipe($routeParams.id, $rootscope.recipeCallback);

        $scope.toggleEnabled = recipesFactory.toggleRecipeEnabled;
        $scope.togglePublic = recipesFactory.toggleRecipePublic;
        $scope.delete = recipesFactory.deleteRecipe;

        $scope.update = function(recipe, isFormValid)
        {
            if (isFormValid)
            {
                prepareDataFormToBeSent(recipe);

                //FIXME forzo dei campi a null per vedere quanto il server è robusto
                /*_.forEach(recipe.trigger.parameters, function(par) {
                    par.value = null;
                });
                _.forEach(recipe.actions, function(act) {
                    _.forEach(act.parameters, function(par) {
                        par.id = null;
                    });
                });*/

                recipesFactory.updateRecipe(recipe);
            }
        };

        $scope.reset = function()
        {
            $scope.savedRecipe = angular.copy($scope.master);
            initializeForm();
        };
    }
]);