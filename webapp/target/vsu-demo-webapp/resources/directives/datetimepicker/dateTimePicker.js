(function() {
    'use strict';

    angular.module('webmodule').
    directive('wmDateTimePicker', ['resourcesPrefix', '$log', function(resourcesPrefix, $log) {
        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            link: function(scope, element, attrs, model) {
                $log.debug("Link date time picker", element);

                scope.size = attrs.size;
                scope.placeholder = attrs.placeholder;

                var el = angular.element(element).find("input");
                var data = el.datepicker({
                    dateFormat: angular.isDefined(attrs.format) ? attrs.format : 'dd.MM.yyyy',
                    language: 'en',
                    autoClose: true,
                    clearButton: angular.isDefined(attrs.showClear) ? attrs.showClear == "true" : false,/*
                    useCurrent: angular.isDefined(attrs.useCurrent) ? attrs.useCurrent == "true" : true*/
                    todayButton: true,
                    onSelect: function(formatted, date, data) {
                        $log.debug("Date updated to [", date, "]");
                        model.$setViewValue(date);
                    }
                }).data('datepicker');
            },
            templateUrl: resourcesPrefix + '/directives/datetimepicker/dateTimePicker.html'
        }
    }]);

})();
