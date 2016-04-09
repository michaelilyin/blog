(function() {
    'use strict';
    angular.module('webmodule').controller('EditModalCtrl',
        [ '$scope', '$wmModalInstance', 'DemoService', 'data', '$log',
            function($scope, $modalInstance, DemoService, data, $log) {
                var userData = data.userData;
                var actions = data.actions;

                $scope.getTemplateUrl = function() {
                    return data.templateUrl;
                };

                if (angular.isDefined(userData.title))
                    $scope.title = userData.title;
                if (angular.isDefined(userData.title))
                    $scope.id = userData.id;

                if (angular.isDefined(actions.open)) {
                    actions.open(userData, $scope);
                }

                if (angular.isDefined(actions.load)) {
                    $scope.loading = true;
                    var promise = actions.load(userData, $scope);
                    if (promise) {
                        promise.then(function (model) {
                            $scope.model = model;
                            $scope.loading = false;
                        }).catch(function () {
                            $scope.loading = false;
                            //throw message
                        });
                    } else {
                        $scope.loading = false;
                        $scope.model = {};
                    }
                } else
                    $scope.model = {};

                $scope.close = function () {
                    var allow = true;
                    if (angular.isDefined(actions.cancel))
                        allow |= actions.cancel($scope.model, userData, $scope);
                    if (allow)
                        $modalInstance.dismiss('cancel');
                };

                $scope.save = function () {
                    if (angular.isDefined(actions.save)) {
                        $scope.processing = true;
                        actions.save($scope.model, userData, $scope).then(function () {
                            $scope.processing = false;
                            $modalInstance.close($scope.model);
                        }).catch(function () {
                            //throw message
                            $scope.processing = false;
                        });
                    } else
                        $log.warn("Save function is not implemented");
                };

            } ]);
})();
