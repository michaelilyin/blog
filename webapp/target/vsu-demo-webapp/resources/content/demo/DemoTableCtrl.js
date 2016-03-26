(function() {
	'use strict';
	var module = angular.module('webmodule');
	module.controller('DemoTableCtrl',
			[ '$scope', 'DemoService', '$state', 'GridService', 'ModalService', '$log',
				function($scope, DemoService, $state, GridService, ModalService, $log) {

					$scope.demoConfig = {
						getData: DemoService.getDemos
					};

					$scope.createDemo = function() {
						$log.info("Create demo");
						ModalService.open({
							template: 'content/demo/editDemoDlg.html',
							controller: 'EditDemoCtrl',
							size: 'md',
							data: {
								title: "Create Demo"
							}
						}).result.then(function() {
							$scope.getDemos();
						});
					};

					$scope.editDemo = function(id) {
						ModalService.open({
							template: 'content/demo/editDemoDlg.html',
							controller: 'EditDemoCtrl',
							size: 'md',
							data: {
								title: "Edit Demo",
								id: id
							}
						}).result.then(function() {
							$scope.getDemos();
						});
					};

					$scope.removeDemo = function(id) {
						DemoService.deleteDemo(id).then(function() {
							$scope.getDemos();
						});
					};

					$scope.getIndex = function(index) {
						if (!$scope.tableState || $scope.tableState == null)
							return index;
						return $scope.tableState.pagination.start + index + 1;
					}

				} ]);
})();