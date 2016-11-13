(function() {
    'use strict';
    var module = angular.module('webmodule');
    module.controller('UsersCtrl',
        [ '$scope', 'UsersService', '$state', 'GridService', 'ModalService', '$log',
            function($scope, UsersService, $state, GridService, ModalService, $log) {

                function loadUser(data) {
                    if (angular.isDefined(data.id)) {
                        return UsersService.getUser(data.id);
                    } else
                        return false;
                }

                function saveUser(model, data, scope) {
                    if (angular.isDefined(data.id)) {
                        return UsersService.updateUser(model);
                    } else {
                        return UsersService.createUser(model);
                    }
                }

                function openEditDialog(data) {
                    ModalService.openEdit({
                        template: 'content/administrative/users/editUser.html',
                        size: 'small',
                        data: data,
                        actions: {
                            load: loadUser,
                            save: saveUser
                        }
                    }).result.then(function() {
                        refresh();
                    });
                }

                function createUser() {
                    openEditDialog({
                        title: "Create user"
                    });
                }

                function editUser(id) {
                    openEditDialog({
                        title: "Edit user",
                        id: id
                    });
                }

                function removeUser(id) {
                    UsersService.deleteUser(id).then(function() {
                        refresh();
                    });
                }

                function refresh() {
                    $scope.tableConfig.refresh();
                }

                $scope.tableConfig = {
                    getData: UsersService.getUsers,
                    actions: {
                        createUser: createUser,
                        editUser: editUser,
                        removeUser: removeUser
                    }
                };

            } ]);
})();