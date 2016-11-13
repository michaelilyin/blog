(function() {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name webmodule.directive:wmTooltip
	 * @description
	 * Директива бутстраповских тултипов. В некоторых местах ведет себя лучше,
	 * чем uib-tooltip.
	 */
	angular.module('webmodule').
	    directive('wmTooltip', function () {
	        return {
	            restrict: 'A',
	            link: function (scope, element, attrs) {
	                var jqe = angular.element(element);
	                jqe.attr("data-toggle", "tooltip"); 
	                jqe.attr("title", attrs.wmTooltip);
	                //jqe.tooltip();
	            }
	        };
	    });
})();