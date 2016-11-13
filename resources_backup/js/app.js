(function() {
    'use strict';

    var domain = document.baseUrl;
    var prefix = "/web";
    var resourcesPrefix = domain + "resources";
    var apiPrefix = domain + "api";

    var module = angular.module('webmodule', [ 'ngRoute',
        'ui.router',
        'ncy-angular-breadcrumb',
        'restangular',
        'smart-table',
        'LocalStorageModule',
        'ngSanitize',
        'ngStomp']);

    module.config(
        function($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider,
                 localStorageServiceProvider, $provide) {

            $provide.decorator("$exceptionHandler", function($delegate, $injector){
                return function(exception, cause){
                    showJSError.show(exception);
                    //showJSError.show(cause);
                    $delegate(exception, cause);
                };
            });

            $locationProvider.html5Mode(true).hashPrefix('!');

            localStorageServiceProvider.setPrefix('webmodule');

            RestangularProvider.setBaseUrl(apiPrefix);

            var defaultHeaders = {
                'X-Requested-With': 'XMLHttpRequest' // this is ajax request
            };

            if (isIe11()) {
                defaultHeaders["If-Modified-Since"] = "Mon, 26 Jul 1997 05:00:00 GMT";
            }
            RestangularProvider.setDefaultHeaders(defaultHeaders);

            function isIe11() {
                var trident = !!navigator.userAgent.match(/Trident\/7.0/);
                var rv = navigator.userAgent.indexOf("rv:11.0");
                return !!(trident && rv != -1);
            }

            $urlRouterProvider.otherwise(domain + '/web');

            var statePrefix = prefix;
            $stateProvider.state('index', {
                    url : statePrefix,
                    templateUrl : resourcesPrefix + "/content/index/index.html",
                    controller : "IndexCtrl",
                    ncyBreadcrumb : {
                        label : 'Index page'
                    }
                })
                .state('demotable', {
                    url : statePrefix + '/demotable',
                    templateUrl : resourcesPrefix + "/content/demo/demotable.html",
                    controller : "DemoTableCtrl",
                    ncyBreadcrumb : {
                        label : 'Demo table page'
                    }
                })

                .state('administrative', {
                    url : statePrefix + '/administrative',
                    ncyBreadcrumb : {
                        label : 'Administrative'
                    },
                    abstract: true,
                    template: '<ui-view/>'
                })
                .state('administrative.users', {
                    url : '/users',
                    templateUrl : resourcesPrefix + "/content/administrative/users/usersTable.html",
                    controller : "UsersCtrl",
                    ncyBreadcrumb : {
                        label : 'Users',
                        parent: 'administrative'
                    }
                })

                .state('administrative.system', {
                    url : '/system',
                    templateUrl : resourcesPrefix + "/content/administrative/system/system.html",
                    ncyBreadcrumb : {
                        label : 'System',
                        parent: 'administrative'
                    }
                })
                .state('administrative.system.monitoring', {
                    url : '/monitoring',
                    templateUrl : resourcesPrefix + "/content/administrative/system/monitoring/monitoring.html",
                    controller : "SystemMonitoringCtrl",
                    ncyBreadcrumb : {
                        label : 'Monitoring',
                        parent: 'system'
                    }
                });

        });

    module.value('resourcesPrefix', resourcesPrefix);
    module.value('apiPrefix', apiPrefix);

})();