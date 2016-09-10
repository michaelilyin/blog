(function() {
	'use strict';
	angular.module('webmodule').service('ModalService', 
			[
			 '$wmModal',
			 'resourcesPrefix',
			 function($wmModal, rp) {

				 var EDIT_MODAL_TEMPLATE = rp + "/" + "/directives/modal/editModalTemplate.html";

				 return {
					 open: function(conf) {
						 return $wmModal.open({
							 templateUrl: rp + '/' + conf.template,
							 controller: conf.controller,
							 //windowTemplateUrl: rp + '/directives/modal/draggableTemplate.html',
							 size: conf.size,
							 classes: conf.classes,
							 resolve: {
								 data: typeof conf.data === 'function' ? conf.data : function () {
									 return conf.data
								 }
							 }
						 });
					 },

					 openEdit: function(conf) {

						 var userData = typeof conf.data === 'function' ? conf.data() : conf.data;

						 return $wmModal.open({
							 templateUrl: EDIT_MODAL_TEMPLATE,
							 controller: 'EditModalCtrl',
							 size: conf.size,
							 resolve: {
								 data: function() {
									 return {
										 actions: conf.actions,
										 userData: conf.data,
										 templateUrl: rp + "/" + conf.template
									 }
								 }
							 }
						 });
					 }
				 };
			 }]);
})();