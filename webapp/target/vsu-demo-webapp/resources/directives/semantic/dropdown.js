(function() {
    'use strict';

    angular.module('webmodule').
    directive('wmDropdown', ['resourcesPrefix', '$log', function(resourcesPrefix, $log) {
        return {
            restrict: 'AE',
            scope: false,
            link: function(scope, element, attrs, model) {
                angular.element(element).dropdown();
            }
        }
    }]);

})();
