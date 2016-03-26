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

                var el = angular.element(element);
                el.datetimepicker({
                    format: angular.isDefined(attrs.format) ? attrs.format : 'DD.MM.YYYY',
                    showClear: angular.isDefined(attrs.showClear) ? attrs.showClear == "true" : false,
                    useCurrent: angular.isDefined(attrs.useCurrent) ? attrs.useCurrent == "true" : true

                });
                var dp = el.data("DateTimePicker");
                if (dp.date() != null)
                    el.val(dp.date().valueOf());

                el.on('dp.change', function(e) {
                    $log.debug("Date updated from [", e.oldDate, "] to [", e.date, "]");
                    if (e.date !== false)
                        model.$setViewValue(e.date);
                });

                scope.$watch(function () {
                    return model.$modelValue;
                }, function(newValue) {
                    if (newValue === false)
                        return;
                    if (newValue == null)
                        dp.date(null);
                    else if (moment.isMoment(newValue))
                        dp.date(newValue);
                    else if (moment.isDate(newValue) || angular.isNumber(newValue))
                        dp.date(moment(newValue));
                    else
                        throw "DateTimePicker model must be a Moment, Date or Number! [" + newValue + "] incorrect.";
                });
            },
            templateUrl: resourcesPrefix + '/directives/datetimepicker/dateTimePicker.html'
        }
    }]);

})();
