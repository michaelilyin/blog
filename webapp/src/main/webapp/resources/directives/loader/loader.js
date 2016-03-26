angular.module('webmodule').
	    directive('wmLoader', ['resourcesPrefix', function (resourcesPrefix) {
	        return {
	            restrict: 'E',
	            template: '<img ng-src="{{::getSrc()}}">',
	            link: function(scope, element, attrs) {
	                scope.getSrc = function() {
	                	return resourcesPrefix + '/img/ajax-loader-medium.gif'
	                }
	            }
	        }
	    }]);