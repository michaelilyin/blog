(function() {
	'use strict';
	var module = angular.module('webmodule');
	module.controller('DemoTableCtrl',
			[ '$scope', 'DemoService', '$state', 'GridService', 'ModalService', '$log',
				function($scope, DemoService, $state, GridService, ModalService, $log) {

                    function createDemo() {
                        $log.info("Create demo");
                        ModalService.open({
                            template: 'content/demo/editDemoDlg.html',
                            controller: 'EditDemoCtrl',
                            size: 'md',
                            data: {
                                title: "Create Demo"
                            }
                        }).result.then(function() {
                            refresh();
                        });
                    }

                    function editDemo(id) {
                        ModalService.open({
                            template: 'content/demo/editDemoDlg.html',
                            controller: 'EditDemoCtrl',
                            size: 'md',
                            data: {
                                title: "Edit Demo",
                                id: id
                            }
                        }).result.then(function() {
                            refresh();
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