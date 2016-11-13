(function() {
    'use strict';

    angular.module('webmodule')
        .directive('draggableModal', function () {
            return {
                restrict: 'EA',
                link: function (scope, element, attrs) {
                    $(element).closest(".modal-dialog.draggable").draggable({
                        handle: '.modal-header',
                        cursor: 'move'
                    });
                }
            }
        });

})();