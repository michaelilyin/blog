(function() {
    'use strict';

    angular.module("webmodule").provider('$wmResolve', function() {
        var resolve = this;
        this.resolver = null;

        this.setResolver = function(resolver) {
            this.resolver = resolver;
        };

        this.$get = ['$injector', '$q', function($injector, $q) {
            var resolver = resolve.resolver ? $injector.get(resolve.resolver) : null;
            return {
                resolve: function(invocables, locals, parent, self) {
                    if (resolver) {
                        return resolver.resolve(invocables, locals, parent, self);
                    }

                    var promises = [];

                    angular.forEach(invocables, function(value) {
                        if (angular.isFunction(value) || angular.isArray(value)) {
                            promises.push($q.resolve($injector.invoke(value)));
                        } else if (angular.isString(value)) {
                            promises.push($q.resolve($injector.get(value)));
                        } else {
                            promises.push($q.resolve(value));
                        }
                    });

                    return $q.all(promises).then(function(resolves) {
                        var resolveObj = {};
                        var resolveIter = 0;
                        angular.forEach(invocables, function(value, key) {
                            resolveObj[key] = resolves[resolveIter++];
                        });

                        return resolveObj;
                    });
                }
            };
        }];
    });

    angular.module("webmodule").provider('$wmModal', function() {
        var $modalProvider = {
            options: {
                animation: true,
                backdrop: true, //can also be false or 'static'
                keyboard: true
            },

            $get: ['$rootScope', '$q', '$document', '$templateRequest', '$controller', '$compile', '$log', '$wmResolve',
                function ($rootScope, $q, $document, $templateRequest, $controller, $compile, $log, $wmResolve) {

                    function getTemplatePromise(options) {
                        return options.template ? $q.when(options.template) :
                            $templateRequest(angular.isFunction(options.templateUrl) ?
                                options.templateUrl() : options.templateUrl);
                    }

                    function open(modalInstance, config) {
                        var css = "ui modal " + config.size;
                        if (angular.isDefined(config.css))
                            css += " " + config.css;
                        modalInstance.$element = angular.element("<div class='" + css + "'></div>");
                        modalInstance.$element.attr({
                            'template-url': config.windowTemplateUrl,
                            'size': config.size
                        }).html(config.content);
                        modalInstance.$element.appendTo(config.appendTo);
                        modalInstance.resultDeferred = config.resultDeferred;
                        modalInstance.closedDeferred = config.closedDeferred;
                        modalInstance.scope = config.scope;
                        $compile(modalInstance.$element)(config.scope);
                        modalInstance.$element
                            .modal({
                                closable  : false,
                                blurring: false,
                                onDeny: function () {
                                    return false;
                                }, onApprove: function () {
                                    return false;
                                }
                            })
                            .modal('refresh').modal("show");
                    }

                    function removeWindow(modalInstance) {
                        modalInstance.$element.remove();
                        modalInstance.closedDeferred.resolve();
                        modalInstance.scope.$destroy();
                    }

                    function close(modalInstance, result) {
                        modalInstance.$element.modal("hide");
                        modalInstance.resultDeferred.resolve(result);
                        removeWindow(modalInstance);
                    }

                    function dismiss(modalInstance, reason) {
                        modalInstance.$element.modal("hide");
                        modalInstance.resultDeferred.reject(reason);
                        removeWindow(modalInstance);
                    }

                    var $modal = {};

                    $modal.open = function(config) {
                        $log.info("Open modal for ", config.templateUrl);

                        var modalResultDeferred = $q.defer();
                        var modalOpenedDeferred = $q.defer();
                        var modalClosedDeferred = $q.defer();
                        //var modalRenderDeferred = $q.defer();

                        var modalInstance = {
                            result: modalResultDeferred.promise,
                            opened: modalOpenedDeferred.promise,
                            closed: modalClosedDeferred.promise,
                            //rendered: modalRenderDeferred.promise,
                            close: function (result) {
                                $log.debug("Close modal", modalInstance);
                                return close(modalInstance, result);
                            },
                            dismiss: function (reason) {
                                $log.debug("Dismiss modal", modalInstance);
                                return dismiss(modalInstance, reason);
                            }
                        };

                        config.appendTo = config.appendTo || $document.find('body').eq(0);

                        if (!config.template && !config.templateUrl) {
                            throw new Error('One of template or templateUrl options is required.');
                        }

                        var templateAndResolvePromise = $q.all([getTemplatePromise(config), $wmResolve.resolve(config.resolve, {}, null, null)]);

                        function resolveWithTemplate() {
                            return templateAndResolvePromise;
                        }

                        resolveWithTemplate().then(function(tpltAndVars) {
                            var providedScope = config.scope || $rootScope;
                            var modalScope = providedScope.$new();
                            var content = tpltAndVars[0];

                            modalScope.$close = modalInstance.close;
                            modalScope.$dismiss = modalInstance.dismiss;

                            modalScope.$on('$destroy', function() {
                                //if (!modalScope.$$uibDestructionScheduled) {
                                //    modalScope.$dismiss('$uibUnscheduledDestruction');
                                //}
                            });

                            var ctrlInstance, ctrlInstantiate, ctrlLocals = {};
                            if (config.controller) {
                                ctrlLocals.$scope = modalScope;
                                ctrlLocals.$wmModalInstance = modalInstance;
                                angular.forEach(tpltAndVars[1], function(value, key) {
                                    ctrlLocals[key] = value;
                                });

                                // the third param will make the controller instantiate later,private api
                                // @see https://github.com/angular/angular.js/blob/master/src/ng/controller.js#L126
                                ctrlInstantiate = $controller(config.controller, ctrlLocals, true);
                                if (config.controllerAs) {
                                    ctrlInstance = ctrlInstantiate.instance;

                                    if (config.bindToController) {
                                        ctrlInstance.$close = modalScope.$close;
                                        ctrlInstance.$dismiss = modalScope.$dismiss;
                                        angular.extend(ctrlInstance, providedScope);
                                    }
                                    ctrlInstance = ctrlInstantiate();
                                    modalScope[config.controllerAs] = ctrlInstance;
                                } else {
                                    ctrlInstance = ctrlInstantiate();
                                }
                                if (angular.isFunction(ctrlInstance.$onInit)) {
                                    ctrlInstance.$onInit();
                                }
                            }

                            open(modalInstance, {
                                content: content,
                                scope: modalScope,
                                resultDeferred: modalResultDeferred,
                                //renderDeferred: modalRenderDeferred,
                                closedDeferred: modalClosedDeferred,
                                windowTemplateUrl: config.windowTemplateUrl,
                                size: config.size,
                                //openedClass: config.openedClass,
                                appendTo: config.appendTo,
                                css: config.classes ? config.classes : ""
                            });

                            modalOpenedDeferred.resolve(true);
                        }, function resolveError(reason) {
                            modalOpenedDeferred.reject(reason);
                            modalResultDeferred.reject(reason);
                        });

                        return modalInstance;
                    };

                    return $modal;
                }
            ]
        };

        return $modalProvider;
    });
})();