(function() {
    'use strict';

    angular.module('webmodule').
    directive('stModelSearch', ['resourcesPrefix', '$log', function(resourcesPrefix, $log) {
        return {
            restrict: 'A',
            replace: true,
            require: "^stTable",
            scope: {
                ngModel: '='
            },
            link: function(scope, element, attrs, table) {
                var key = attrs.stModelSearch;
                $log.debug("Link model search for [", key, "]");
                scope.$watch('ngModel', function(newModel) {
                    $log.debug("Model search for [", key, "] changed, value: ", newModel);
                    table.search(newModel, key);
                });
            }
        }
    }]);
})();
