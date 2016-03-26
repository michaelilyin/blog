(function() {
	'use strict';
	angular.module('webmodule').controller('EditDemoCtrl',
			[ '$scope', '$uibModalInstance', 'DemoService', 'data',
			  function($scope, $modalInstance, DemoService, data) {
				
				$scope.title = data.title;
				$scope.id = data.id ? data.id : null;
				
				if ($scope.id !== null && $scope.id !== undefined) {
					DemoService.getDemo($scope.id).then(function(data) {
						$scope.demo = data;
					});
				}
				
				$scope.close = function () {
	                $modalInstance.dismiss('cancel');
	            };

	            $scope.save = function () {
	            	$scope.demo.flag = $scope.demo.flag ? true : false;
					if ($scope.id) {
//						DemoService.updateDemo($scope.demo).then(function() { //возможны оба варианта
						$scope.demo.put().then(function() {
							$modalInstance.close($scope.demo);
						});
					} else {
						DemoService.createDemo($scope.demo).then(function() {
							$modalInstance.close($scope.demo);
						});
					}
	            };
				
			} ]);
})();