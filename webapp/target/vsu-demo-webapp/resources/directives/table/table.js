(function() {
    'use strict';

    angular.module('webmodule').
    controller('TableCtrl',
        [ '$scope', '$log', 'resourcesPrefix',
            function($scope, $log, rp) {

                var config = $scope.config;

                angular.forEach(config.actions, function(v, k) {
                   $scope[k] = v;
                });

                function getPageNumber(start, number) {
                    if (!start || !number) {
                        return 1;
                    }
                    return Math.round(start / number) + 1;
                }

                if (!angular.isDefined(config.rowsOnPage)) {
                    config.rowsOnPage = 10;
                }

                var page = 1;
                var predicate = 'id';
                var reverse = false;
                var filter = null;

                $scope.rowCollection = [];
                $scope.data = [].concat($scope.rowCollection);
                $scope.loadData = function(tableState) {
                    config.isLoading = true;
                    $log.debug("Fetching data for state: ", tableState, "config: ", config);

                    if (tableState && tableState != null) {
                        predicate = tableState.sort.predicate;
                        reverse = tableState.sort.reverse;
                        page = tableState.pagination.start;
                        filter = tableState.search.predicateObject;
                    }

                    var params = {
                        page: getPageNumber(page, config.rowsOnPage),
                        rows: config.rowsOnPage,
                        sidx: predicate,
                        sord: reverse ? "desc" : "asc"
                    };

                    if (filter != null) {
                        angular.forEach(filter, function(value, key) {
                            if (angular.isObject(value) && (moment.isMoment(value) || moment.isDate(value))) {
                                params[key] = moment(value).valueOf();
                            } else
                                params[key] = value;
                        });
                    }

                    var staticParams = null;
                    if (angular.isDefined(config.staticParams)) {
                        var type = typeof config.staticParams;
                        if (type === "function")
                            staticParams = config.staticParams();
                        else if (type === "object")
                            staticParams = config.staticParams;
                        else
                            throw "Additional parameters must be a function or an object";
                    }
                    $log.debug("Get request for params:", params, "static params: ", staticParams);
                    config.getData(params, staticParams).then(function(result) {
                        $log.debug("Result data:", result);
                        angular.forEach(result.rows, function(v, k) {
                            if (angular.isDefined(config.rowMapper) && angular.isFunction(config.rowMapper))
                                config.resultMapper(v);
                        });
                        $scope.data = result.rows;
                        if (angular.isDefined(tableState)) {
                            tableState.pagination.numberOfPages = result.total;
                        }
                        $log.debug("New table data was loaded");
                        config.isLoading = false;
                    }).catch(function(e) {
                        $log.warn("Fetching data error", e);
                    });
                };

                $scope.refreshData = function() {
                    if (angular.isDefined(config.rowsOnPage)) {
                        $scope.loadData();
                    }
                };

                config.refresh = $scope.refreshData;

                $scope.getIndex = function(index) {
                    if (!$scope.tableState || $scope.tableState == null)
                        return index + 1;
                    return $scope.tableState.pagination.start + index + 1;
                };

                $scope.getTemplateUrl = function() {
                    return rp + ($scope.config.rowTemplate ? $scope.config.rowTemplate : '/directives/table/tableRowDefault.html');
                };

                $scope.paginationTemplate = rp + '/directives/table/paginationTemplate.html';

                $scope.isShowColumn = function (index) {
                    return config.columns.list[index].visible;
                };
            }]);

    angular.module('webmodule').
    controller('tableRowCtrl',
        [ '$scope', 'resourcesPrefix',
            function($scope, rp) {
                $scope.getTemplateUrl = function() {
                    return rp + ($scope.template ? $scope.template : '/directives/table/tableRowDefault.html');
                }
            }]);

    angular.module('webmodule').
    directive('wmTable', ['$timeout', 'resourcesPrefix', '$log', function ($timeout, rp, $log) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                id: '@',
                config: '=',
                title: '@'
            },
            link: function(scope, element, attrs) {
                scope.config.title = scope.title;

                if (!attrs.disableFilter && !scope.config.disableFilter) {
                    scope.config.filter = {
                        display: true,
                        toggle: function() {
                            scope.config.filter.display = !scope.config.filter.display;
                        },
                        clear: function() {
                            angular.forEach(scope.config.filter.data, function (v, k) {
                                scope.config.filter.data[k] = null;
                                //scope.search(null, k);
                            });
                        },
                        data: {

                        }
                    }
                }

                scope.config.columns = {
                    active: 0,
                    list: []
                };
                var columns = angular.element(element).find('table-column');
                angular.forEach(columns, function (col) {
                    $log.debug("Accept column", col);

                    var column = angular.element(col);
                    var id = column.attr('id');
                    var label = column.attr('label');
                    var disableSort = column.attr('disable-sort');
                    var visible = column.attr('visible');
                    var width = column.attr('width');
                    var type = column.attr('type');
                    var disableFilter = column.attr('disable-filter');
                    var cssClass = column.attr('class');
                    scope.config.columns.list.push({
                        id: id,
                        label: label,
                        disableSort: angular.isDefined(disableSort) ? disableSort == "true" : false,
                        visible: angular.isDefined(visible) ? visible == "true" : true,
                        width: angular.isDefined(width) ? width : undefined,
                        type: angular.isDefined(type) ? type.toLowerCase() : 'string',
                        disableFilter: !scope.config.filter || (angular.isDefined(disableFilter) ? disableFilter == 'true' : false),
                        css: cssClass
                    });
                });
                scope.config.columns.active = scope.config.columns.list.length;

                var rowMenu = angular.element(element).find('table-row-menu');
                if (rowMenu) {
                    $log.debug("Append row menu", rowMenu.html());
                    scope.config.rowMenu = {
                        html: rowMenu.html(),
                        width: angular.isDefined(rowMenu.attr('width')) ? parseInt(rowMenu.attr('width')) : 10
                    };
                    rowMenu.html('');
                    scope.config.columns.hasRowMenu = true;
                }

                var tableMenu = angular.element(element).find('table-menu');
                if (tableMenu) {
                    $log.debug("Append table menu", tableMenu.html());
                    scope.config.tableMenu = {
                        html: tableMenu.html()
                    };
                    tableMenu.html('');
                }
            },
            controller: 'TableCtrl',
            templateUrl: rp + '/directives/table/table.html'
        }
    }]);

    angular.module('webmodule').
    directive('wmTableRow', ['$timeout', 'resourcesPrefix', function ($timeout, rp) {
        return {
            restrict: 'E',
            replace: true,
            require: '^tbody',
            scope: {
                data: '=',
                template: '='
            },
            controller: 'TableRowCtrl',
            template: "<tr ng-include='getTemplateUrl()'></tr>"
        }
    }]);
})();