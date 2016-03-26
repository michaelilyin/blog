(function() {
    'use strict';

    angular.module('webmodule')
        .controller('TableMenuCtrl', ['$scope', '$timeout', '$log', function ($scope, $timeout, $log) {
            $scope.pageRowsNum = [10, 50, 100, 250, 500, 1000];

            $scope.selectPageRowsNum = function(pageRowsNum) {
                if ($scope.rowsOnPage != pageRowsNum) {
                    $scope.rowsOnPage = pageRowsNum;
                    $timeout(function(){
                        $scope.refreshAction();
                    });
                }
            };

            $scope.recalcColumnsCount = function() {
                var count = 0;
                angular.forEach($scope.headers.list, function(col) {
                    if (col.visible)
                        count++;
                });
                if ($scope.headers.hasRowMenu)
                    count += 1;
                $scope.headers.active = count;
                $log.debug("Active columns count", count);
            };
            $scope.recalcColumnsCount();
        }]);
    
    angular.module('webmodule').
    directive('wmTableMenu', ['$timeout', 'resourcesPrefix', function ($timeout, rp) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                refreshAction: '=',
                rowsOnPage: '=',
                headers: '=',
                filterConfig: '=',
                tableMenu: '='
            },
            controller: 'TableMenuCtrl',
            templateUrl: rp + '/directives/table/tableMenu.html'
        }
    }]);
})();