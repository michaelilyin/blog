(function() {
	'use strict';
	angular.module('webmodule').controller('StubModalCtrl',
			[ '$scope', '$uibModalInstance', 'data', function($scope, $modalInstance, data) {
				$scope.title = data.title;
				
				$scope.ok = function () {
					$modalInstance.close({result: 'data'});
				};

				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
			} ]);
})();