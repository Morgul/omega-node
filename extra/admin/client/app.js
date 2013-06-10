//----------------------------------------------------------------------------------------------------------------------
// Angular app for the omega admin section.
//
// @module app.js
//----------------------------------------------------------------------------------------------------------------------

angular.module("omega.admin", ['ngResource', 'ui.bootstrap.dialog', 'omega.admin.controllers', 'omega.admin.directives'])
    .config(['$routeProvider', '$locationProvider', '$dialogProvider', function($routeProvider, $locationProvider, $dialogProvider)
    {
        $dialogProvider.options({
            backdropFade: true
        });

        //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: partialUrl('index.html'),   controller: 'IndexCtrl'})
            .when('/:model', {templateUrl: partialUrl('model.html'),   controller: 'ModelCtrl'})
            .when('/:model/!new', {templateUrl: partialUrl('instance.html'),   controller: 'NewInstanceCtrl'})
            .when('/:model/:instance', {templateUrl: partialUrl('instance.html'),   controller: 'InstanceCtrl'})
            .otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', '$http', function($rootScope, $http)
    {
        // Get our models
        $http.get(adminUrl('/models'))
            .success(function(data, status)
            {
                $rootScope.models = data;
            })
            .error(function(data, status)
            {
                console.error("Got an error getting models.", data, status);
                $rootScope.models = [];
            });

        // Url Building helpers
        $rootScope.partialUrl = function(partial)
        {
            return window.partialUrl(partial);
        }; // end partialUrl

        $rootScope.adminUrl = function(url)
        {
            return window.adminUrl(url);
        }; // end partialUrl
    }])
    .filter('saneType', function ()
    {
        return function (type) {
            if(_.isObject(type))
            {
                // This is weird, but Enums do this. So, we try returning the type from the type. \o/ Hurray!
                return type.type;
            } // end if

            return type;
        };
    })
    .filter('modelGroups', function()
    {
        return function(models)
        {
            var groups = [];
            _.each(models, function(model)
            {
                if(model.options.group)
                {
                    groups.push(model.options.group);
                } // end if
            });

            return _.uniq(groups);
        }; // end function
    })
    .filter('matchGroup', function()
    {
        return function(models, group)
        {
            var _models = [];
            _.each(models, function(model)
            {
                if(model.options.group == group)
                {
                    _models.push(model);
                } // end if
            });

            return _models;
        };
    });

//----------------------------------------------------------------------------------------------------------------------