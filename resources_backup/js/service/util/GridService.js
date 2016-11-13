(function() {
	'use strict';

	/**
	 * @ngdoc service
	 * @name webmodule.GridService
	 * @description
	 *
	 * Сервис гридов.
	 */
	angular.module('webmodule')
	    .service('GridService', ['localStorageService', function (localStorageService) {

	        function findColumn(predicate, multiParams) {
	            for (var i = 0; i < multiParams.predicate.length; i++) {
	                if (multiParams.predicate[i] == predicate) {
	                    return i;
	                }
	            }
	            return false;
	        }

	        var GRID_LOCAL_STORAGE_PREFIX = 'gridParams_';
	        var GRID_COL_ROWS_ON_PAGE = 10;
	        var GRID_FIRST_RECORD = 0;

	        return {
	            setGridTableStateParams: function (tableState, predicate, reverse) {
	                if (angular.isUndefined(tableState)) {
	                    throw new Error("tableState параметр должен быть определен");
	                }
	                if (angular.isUndefined(tableState.sort)) {
	                    tableState.sort = {};
	                }
	                if (angular.isUndefined(tableState.sort.predicate)) {
	                    tableState.sort.predicate = predicate;
	                }
	                if (angular.isUndefined(tableState.sort.reverse)) {
	                    tableState.sort.reverse = reverse;
	                }
	            },
	            sortTable: function (predicate, reverse, multiParams) {
	                if (reverse != null) {
	                    var columuIndex = findColumn(predicate, multiParams);
	                    if (columuIndex || columuIndex === 0) {
	                        multiParams.predicate[columuIndex] = predicate;
	                        multiParams.reverse[columuIndex] = reverse ? "asc" : "desc";
	                    } else {
	                        multiParams.predicate.push(predicate);
	                        multiParams.reverse.push(reverse ? "asc" : "desc");
	                    }
	                } else {
	                    var index = findColumn(predicate, multiParams);
	                    multiParams.predicate.splice(index, 1);
	                    multiParams.reverse.splice(index, 1);
	                }
	            },
	            getHeaderClass: function (id, multiParams) {
	                var index = findColumn(id, multiParams);
	                if (index || index === 0) {
	                    return multiParams.reverse[index] == "asc" ? "st-sort-ascent" : "st-sort-descent";
	                }
	                return "";
	            },
	            getGridParamsById: function (gridId) {
	                return localStorageService.get(GRID_LOCAL_STORAGE_PREFIX + gridId);
	            },
	            setGridParams: function (gridId, params) {
	                localStorageService.set(GRID_LOCAL_STORAGE_PREFIX + gridId, params);
	            },
	            /**
	             * Получает выбранный элемент из списка по id
	             *
	             * @param id - id нужного элемента
	             * @param list - все элементы списка
	             */
	            getFilterSelectFromSavedParams: function (id, list) {
	                if (angular.isDefined(id) && id != null) {
	                    for (var i = 0; i < list.length; i++) {
	                        if (list[i].id == id) {
	                            return list[i];
	                        }
	                    }
	                }
	                return null;
	            },
	            resetPageParams: function(tableState) {
	                if (angular.isDefined(tableState) && angular.isDefined(tableState.pagination) && tableState.pagination != null ) {
	                    tableState.pagination.start = GRID_FIRST_RECORD;
	                    //tableState.pagination.number = GRID_COL_ROWS_ON_PAGE;
	                }
	            },
	            initGridData: function(config) {
	                var self = this;
	                /* save params begin */
	                var result = {};

	                config.tableScope.colRowsOnPage = 10;
	                if (!config.tableScope.viewRowsOnPage) config.tableScope.viewRowsOnPage = config.tableScope.colRowsOnPage; 

	                result.pagination = {};
	                result.params = {};
	                result.params.filters = {};

	                result.gridParams = self.getGridParamsById(config.gridName);
	                result.pagination.start = config.defaultStart ? config.defaultStart : 0;
	                result.pagination.number = config.defaultNumber? config.defaultNumber : 10;
	                result.predicate = config.defaultPredicate ? config.defaultPredicate: "id";
	                result.reverse = config.defaultReverse ? config.defaultReverse : false;

	                var saveGridParams = function() {
	                    self.setGridParams(config.gridName, {
	                        start: result.pagination.start,
	                        number: result.pagination.number,
	                        predicate: result.predicate,
	                        reverse: result.reverse,
	                        filters: result.params.filters
	                    });
	                };

	                result.saveGridParams = saveGridParams;

	                if (result.gridParams != null) {
	                    result.pagination.start = angular.isDefined(result.gridParams.start) ? result.gridParams.start : start;
	                    result.pagination.number = angular.isDefined(result.gridParams.number) ? result.gridParams.number : number;
	                    result.predicate = angular.isDefined(result.gridParams.predicate) ? result.gridParams.predicate : predicate;
	                    result.reverse = angular.isDefined(result.gridParams.reverse) ? result.gridParams.reverse : reverse;

	                    if (angular.isDefined(result.gridParams.filters)) {
	                        angular.forEach(result.gridParams.filters, function(obj, key) {
	                            result.params.filters[key] = obj;
	                        });
	                    }
	                } else {
	                    saveGridParams();
	                }

	                /* save params end */

	                /* Pagination begin */

	                config.tableScope.currentColOfAddedPages = 0;
	                /**
	                 * Подгружает следующую порцию данных в грид на той же странице.
	                 *
	                 * @param stItemsByPage - по сколько данных подгружать
	                 */
	                result.pagination.setColOnPage = function (stItemsByPage) {
	                    config.tableScope.viewRowsOnPage += stItemsByPage;
	                    setAddPageParams();
	                    config.load(
	                        result.pagination.start,
	                        result.pagination.number,
	                        result.predicate,
	                        result.reverse,
	                        result.params
	                    ).then(function (response) {
	                        saveGridParams();
	                        angular.forEach(response.rows, function (value) {
	                            result.rows.push(value);
	                        });
	                    });
	                };

	                config.tableScope.currentPage = 1;
	                config.tableScope.colOfRecords = 0;

	                /**
	                 * Посылает пагинатору актуальную информацию о гриде.
	                 */
	                function sendGridInfoToPaginator() {
	                    config.tableScope.$broadcast('gridInfoForPagination', {
	                        currentColOfAddedPages: config.tableScope.currentColOfAddedPages,
	                        colOfRecords: config.tableScope.colOfRecords,
	                        setColOnPage: result.pagination.setColOnPage,
	                        setCurrentPage: function (page) {
	                            config.tableScope.currentPage = page;
	                        }
	                    });
	                }

	                /**
	                 * Устанавливает параметры пагинации.
	                 */
	                function setAddPageParams() {
	                    config.tableScope.currentColOfAddedPages++;
	                    sendGridInfoToPaginator();
	                    if (config.tableScope.tableState && config.tableScope.tableState != null) {
	                        var pagination = config.tableScope.tableState.pagination;
	                        result.pagination.start = pagination.start + pagination.number*config.tableScope.currentColOfAddedPages;
	                        result.pagination.number = pagination.number;
	                        result.predicate = config.tableScope.tableState.sort.predicate;
	                        result.reverse = config.tableScope.tableState.sort.reverse;
	                    }
	                }

	                result.refreshAction = function () {
	                    if (angular.isDefined(config.tableScope.viewRowsOnPage)) {
	                        if (config.tableScope.colRowsOnPage != config.tableScope.viewRowsOnPage) {
	                            config.tableScope.colRowsOnPage = config.tableScope.viewRowsOnPage;
	                        } else {
	                            getAction(config.tableScope, null);
	                        }
	                    }
	                };

	                /* Pagination end */

	                config.tableScope.$watch(function () {
	                    return config.tableScope.colRowsOnPage;
	                }, function (newColPages, oldColPages) {
	                    if (newColPages != null && newColPages != oldColPages) {
	                        getAction(null, parseInt(newColPages));
	                    }
	                });

	                result.displayRows = [];
	                result.rows = [].concat(result.displayRows);
	                config.tableScope.tableState = null;

	                var getAction = function(tableState, colPages, isFirstPage) {
	                    config.tableScope.currentColOfAddedPages = 0;
	                    if (config.tableScope.tableState == null) {
	                        config.tableScope.tableState = tableState;
	                        if (config.tableScope.tableState.pagination == null)
	                        	config.tableScope.tableState.pagination = {};
	                        config.tableScope.tableState.pagination.start = result.pagination.start;

	                    }
	                    result.isLoading = true;
	                    if (config.tableScope.tableState && config.tableScope.tableState != null) {
	                        self.setGridTableStateParams(config.tableScope.tableState, result.predicate, result.reverse); // установка параметров пагинации по умолчанию
	                        var pagination = config.tableScope.tableState.pagination;
	                        if (!isFirstPage) {
	                            result.pagination.start = typeof  pagination.start == 'number' ? pagination.start : result.pagination.start;
	                        } else {
	                            config.tableScope.tableState.pagination.start = 0;
	                        }
	                        result.pagination.number = typeof  pagination.number == 'number' ? pagination.number : result.pagination.number;
	                        result.predicate = config.tableScope.tableState.sort.predicate;
	                        result.reverse = config.tableScope.tableState.sort.reverse;
	                    }
	                    result.pagination.number = typeof colPages == "number" ? colPages : result.pagination.number;

	                    config.load(result.pagination.start,
	                        result.pagination.number,
	                        result.predicate,
	                        result.reverse, result.params
	                    ).then(function (response) {
	                        saveGridParams();
	                        result.rows = response.rows;
	                        config.tableScope.colOfRecords = response.records;
	                        config.tableScope.tableState.pagination.numberOfPages = response.total;
	                        config.tableScope.viewRowsOnPage = config.tableScope.colRowsOnPage;
	                        result.isLoading = false;
	                        sendGridInfoToPaginator();
	                    }).catch(function() {
	                        result.isLoading = false;
	                    });
	                };

	                result.loadAction = getAction;
	                
	                console.debug(config.gridName + " грид успешно инициализирован");
	                return result;
	            }

	        };
	    }]);
})();