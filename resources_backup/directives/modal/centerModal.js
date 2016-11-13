(function() {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name webmodule.directive:wmCenterModal
	 * @description
	 *
	 * Директива для вычисления и установки верхнего отступа модального окна, для его центрирования
	 */
	angular.module('webmodule').
	    directive('wmCenterModal', [ '$interval',
	        function ($interval) {
	            return {
	                scope: {},
	                link: function (scope, element, attr) {
	                    var intervalCounter = 0;
	                    var interval = $interval(function() {
	                        intervalCounter++;
	                        var windowHeight = $(window).height();
	                        var modalHeight = angular.element(element).height();
	                        if (windowHeight > modalHeight && modalHeight > 50) {  // убеждаемся, что окно открылось и меньше размера окна браузера
	                            var bootstrapModalTopMargin = 30;  // учитываем отступ в стилях бутстрапа
	                            var topInPix = parseInt((windowHeight - modalHeight) / 2) - bootstrapModalTopMargin;
	                            element.children().css("top", topInPix);
	                            cancelInterval();
	                        } else if (windowHeight <= modalHeight) {
	                            cancelInterval();
	                        }
	                        if (intervalCounter>100) {
	                            cancelInterval();
	                            throw new Error("Превышено допустимое время ожидания при открытии модального окна");
	                        }
	                    }, 10);

	                    function cancelInterval() {
	                        $interval.cancel(interval);
	                        interval = undefined;
	                    }

	                }
	            };
	        }]);
})();