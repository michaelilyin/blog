(function() {
	'use strict';
	var module = angular.module('webmodule');
	module.controller('DemoTableCtrl',
			[ '$scope', 'DemoService', '$state', 'GridService', 'ModalService', '$log',
				function($scope, DemoService, $state, GridService, ModalService, $log) {

                    function loadDemo(data) {
                        if (angular.isDefined(data.id)) {
                            return DemoService.getDemo(data.id);
                        } else
                            return false;
                    }

                    function saveDemo(model, data, scope) {
                        if (angular.isDefined(data.id)) {
                            return DemoService.updateDemo(model);
                        } else {
                            return DemoService.createDemo(model);
                        }
                    }

                    function openEditDialog(data) {
                        ModalService.openEdit({
                            template: 'content/demo/editDemoDlg.html',
                            size: 'md',
                            data: data,
                            actions: {
                                load: loadDemo,
                                save: saveDemo
                            }
                        }).result.then(function() {
                            refresh();
                        });
                    }

                    function createDemo() {
                        openEditDialog({
                            title: "Create user"
                        });
                    }

                    function editDemo(id) {
                        openEditDialog({
                            title: "Edit user",
                            id: id
                        });
                    }

                    function removeDemo(id) {
                        DemoService.deleteDemo(id).then(function() {
                            refresh();
                        });
                    }

                    function refresh() {
                        $scope.demoConfig.refresh();
                    }

					$scope.demoConfig = {
						getData: DemoService.getDemos,
                        actions: {
                            createDemo: createDemo,
                            editDemo: editDemo,
                            removeDemo: removeDemo
                        }
					};

				} ]);
})();