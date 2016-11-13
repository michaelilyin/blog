(function() {
	'use strict';
	angular.module('webmodule').controller('IndexCtrl',
			[ '$scope', 'ModalService', function($scope, ModalService) {
				
				$scope.showModal = function() {
					var modal = ModalService.open({
						size: 'md',
						controller: 'StubModalCtrl',
						template: 'content/stub/stubModal.html',
						data: {
							title: "Stub modal!"
						}
					});
				}
				
			} ]);
})();