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
        'ngSanitize']);

    module.config(
        function($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider,
                 localStorageServiceProvider, $provide) {

            $provide.decorator("$exceptionHandler", function($delegate, $injector){
                return function(exception, cause){
                    showJSError.show(exception);
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

            $stateProvider.state('index', {
                    url : prefix,
                    templateUrl : resourcesPrefix + "/content/index/index.html",
                    controller : "IndexCtrl",
                    ncyBreadcrumb : {
                        label : 'Index page'
                    }
                })
                .state('demotable', {
                    url : prefix + '/demotable',
                    templateUrl : resourcesPrefix + "/content/demo/demotable.html",
                    controller : "DemoTableCtrl",
                    ncyBreadcrumb : {
                        label : 'Demo table page',
                        parent: 'index'
                    }
                });

        });

    module.value('resourcesPrefix', resourcesPrefix);
    module.value('apiPrefix', apiPrefix);

})();