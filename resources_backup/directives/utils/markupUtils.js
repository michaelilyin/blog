(function() {
    'use strict';

    angular.module('webmodule').
    directive('wmBindHtml', ['$compile', '$log', function ($compile, $log) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $log.debug("Bind html:", attrs.wmBindHtml);
                scope.$watch(function () {
                    return scope.$eval(attrs.wmBindHtml);
                }, function (value) {
                    $log.debug("Compile html:", value);
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        }
    }]);
})();
