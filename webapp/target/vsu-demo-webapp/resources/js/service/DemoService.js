(function() {
	'use strict';
	angular.module('webmodule').service('DemoService', 
			[
			 'Restangular', 'apiPrefix',
			 function(Restangular, apiPrefix) {
				 
				 function getPageNumber(start, number) {
					 if (!start || !number) {
						 return 1;
					 }
					 return Math.round(start / number) + 1;
				 }
				 
				 function getDemoDTO(obj) {
					 return {
						id: obj.id,
						name: obj.name,
						flag: obj.flag,
						duration: obj.duration,
						cost: obj.cost
					 };
				 }
				 return {
					 getDemos: function(params) {
//						 var sord = params.reverse ? "asc" : "desc";
//						 var getParams = {
//								 rows: params.number, 
//								 page: getPageNumber(params.start, params.number), 
//								 sord: sord, 
//								 sidx: params.sort.predicate
//						 };
//						 if (params.query && params.query != null) {
//							 angular.forEach(params.query, function (value, name) {
//								 getParams[name] = value;
//							 });
//						 }
						 return Restangular.one('demos').get(params);
					 },
					 getDemo: function(id) {
						 return Restangular.one('demos', id).get();
					 },
					 createDemo: function(demo) {
						 return Restangular.one('demos').post("", getDemoDTO(demo));
					 },
					 updateDemo: function(demo) {
						 return Restangular.one('demos', demo.id).customPUT(getDemoDTO(demo));
					 },
					 deleteDemo: function(id) {
						 return Restangular.one('demos', id).remove();
					 },
				 };
			 }]);
})();