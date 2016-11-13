(function() {
    'use strict';
    angular.module('webmodule').service('UsersService',
        [
            'Restangular', function(Restangular) {

            //function getPageNumber(start, number) {
            // if (!start || !number) {
            //	 return 1;
            // }
            // return Math.round(start / number) + 1;
            //}

            function getUserDTO(obj) {
                return {
                    id: obj.id,
                    name: obj.name,
                    surname: obj.surname,
                    login: obj.login,
                    email: obj.email,
                    birthday: obj.birthday
                };
            }
            return {
                getUsers: function( params) {
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
                    return Restangular.one('users').get(params);
                },
                getUser: function(id) {
                    return Restangular.one('users', id).get();
                },
                createUser: function(demo) {
                    return Restangular.one('users').post("", getUserDTO(demo));
                },
                updateUser: function(demo) {
                    return Restangular.one('users', demo.id).customPUT(getUserDTO(demo));
                },
                deleteUser: function(id) {
                    return Restangular.one('users', id).remove();
                },
            };
        }]);
})();