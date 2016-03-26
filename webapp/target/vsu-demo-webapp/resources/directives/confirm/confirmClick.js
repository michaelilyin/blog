(function() {
	'use strict';

	angular.module('webmodule')
			.controller('ConfirmDialogCtrl', ['$scope', '$uibModalInstance', 'data',
				function ($scope, $modalInstance, data) {
					$scope.title = data.title;
					$scope.message = data.message;
					$scope.aTitle = data.aTitle;
					$scope.aHref = data.aHref;

					$scope.close = function () {
						$modalInstance.dismiss('cancel');
					};

					$scope.save = function () {
						$modalInstance.close({
						});
					};

				}]);

	/**
	 * @ngdoc directive
	 * @name webmodule.directive:DateRange
	 * @description
	 *
	 * Директива для обработки подтверждения
	 */
	angular.module('webmodule').
	directive('wmConfirmClick', ['ModalService',
		function (ModalService) {
			return {
				scope: {
					'action': "&action",
					'autoconfirm': "&autoconfirm"
				},
				link: function (scope, element, attr) {

					function confirm() {
						var modalInstance = ModalService.open({
							template : "directives/confirm/confirmDialog.html",
							controller : 'ConfirmDialogCtrl',
							size : 'md',
							data: {
								title : "Подтверждение",
								message : msg
							}
						});
						modalInstance.result.then(function() {
							scope.action();
						});
					}

					var msg = attr.arConfirmClick || "Are you sure?";
					element.bind('click', function(event) {
						if (scope.autoconfirm && typeof scope.autoconfirm === "function") {
							var res = scope.autoconfirm();
							if (res !== undefined && typeof res.then === "function") {
								res.then(function(res) {
									if (res)
										confirm();
									else
										return;
								});
							} else {
								confirm();
							}
						} else {
							confirm();
						}
					});
				}
			};
		}]);
})();