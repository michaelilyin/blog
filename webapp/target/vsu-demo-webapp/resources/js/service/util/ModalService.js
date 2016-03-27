(function() {
	'use strict';
	angular.module('webmodule').service('ModalService', 
			[
			 //'$uibModal',
			 'resourcesPrefix',
			 function(/*$uibModal,*/ rp) {
				 return {
					 open: function(conf) {
						 return $uibModal.open({
							 templateUrl: rp + '/' + conf.template,
							 controller: conf.controller,
							 windowTemplateUrl: rp + '/directives/modal/draggableTemplate.html',
							 size: conf.size,
							 resolve: {
								 data: typeof conf.data === 'function' ? 
										 conf.data : 
										 function () {
											 return conf.data
										 }
							 }
						 });
					 }
				 };
			 }]);
})();