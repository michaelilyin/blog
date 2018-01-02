"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const triggers = functions.database;
const db = admin.database();
class Role {
}
class UserRoles {
}
function addUserPermission(perms, permissionCode, roleId) {
    if (typeof perms[permissionCode] === 'boolean') {
        perms[permissionCode] = {};
        perms[permissionCode][roleId] = true;
        console.log('convert permission', roleId, permissionCode);
    }
    else if (perms[permissionCode]) {
        perms[permissionCode][roleId] = true;
        console.log('extend permission', roleId, permissionCode);
    }
    else {
        const obj = {};
        obj[roleId] = true;
        perms[permissionCode] = obj;
        console.log('add permission', roleId, permissionCode);
    }
}
function removeUserPermission(perms, permissionCode, roleId) {
    if (typeof perms[permissionCode] === 'boolean') {
        delete perms[permissionCode];
        console.log('remove old permission', roleId, permissionCode);
    }
    else if (perms[permissionCode]) {
        delete perms[permissionCode][roleId];
        console.log('remove permission', roleId, permissionCode);
    }
    console.log('after remove: ', perms);
    if (perms[permissionCode] && Object.keys(perms[permissionCode]).length < 1) {
        delete perms[permissionCode];
        console.log('remove permission after check ', permissionCode);
    }
}
function processUserPermissions(perms, added, roleId, removed, notChanged) {
    added.forEach(permissionCode => {
        addUserPermission(perms, permissionCode, roleId);
    });
    removed.forEach(permissionCode => {
        removeUserPermission(perms, permissionCode, roleId);
    });
    notChanged.forEach(permissionCode => {
        if (notChanged.has(permissionCode)) {
            if ((typeof perms[permissionCode] === 'boolean') || !perms[permissionCode]) {
                const obj = {};
                obj[roleId] = true;
                perms[permissionCode] = obj;
                console.log('convert or add permission', permissionCode);
            }
        }
    });
}
exports.onUpdateRole = triggers.ref('/roles/{roleId}').onUpdate(event => {
    const roleId = event.params['roleId'];
    const role = event.data.val();
    const prev = event.data.previous.exists() ? event.data.previous.val() : null;
    console.log('Updated role', roleId, 'from', prev, 'to', role);
    const permissions = role && role.permissions ? role.permissions : {};
    const prevPermissions = prev && prev.permissions ? prev.permissions : {};
    const added = new Set();
    const notChanged = new Set();
    const removed = new Set();
    Object.keys(permissions)
        .filter(p => !prevPermissions.hasOwnProperty(p))
        .forEach(p => added.add(p));
    Object.keys(permissions)
        .filter(p => prevPermissions.hasOwnProperty(p))
        .forEach(p => notChanged.add(p));
    Object.keys(prevPermissions)
        .filter(p => !permissions.hasOwnProperty(p))
        .forEach(p => removed.add(p));
    console.log('added', added);
    console.log('removed', removed);
    console.log('changed', notChanged);
    return new Promise((resolve, reject) => {
        db.ref('/user-roles').once('value').then(rolesData => {
            const usersRoles = rolesData.val();
            const hasRoleKeys = new Set(Object.keys(usersRoles).filter(k => usersRoles[k].hasOwnProperty(roleId)));
            db.ref('/user-perms').once('value', usersData => {
                const users = usersData.val();
                hasRoleKeys.forEach(userId => {
                    console.log('process user', userId);
                    if (!users[userId]) {
                        users[userId] = {};
                    }
                    const perms = users[userId];
                    console.log('known perms', perms);
                    processUserPermissions(perms, added, roleId, removed, notChanged);
                });
                db.ref('/user-perms').set(users).then(() => resolve()).catch(reject);
            }).catch(reject);
        }).catch(reject);
    });
});
function processRoles(userRoles, prev, userId) {
    const roles = Object.keys(userRoles);
    const prevRoles = Object.keys(prev);
    const addedRoles = new Set();
    const removedRoles = new Set();
    roles.filter(p => !prev.hasOwnProperty(p))
        .forEach(p => addedRoles.add(p));
    prevRoles
        .filter(p => !userRoles.hasOwnProperty(p))
        .forEach(p => removedRoles.add(p));
    console.log('added', addedRoles);
    console.log('removed', removedRoles);
    return new Promise((resolve, reject) => {
        console.log('Load user perms by id', userId);
        db.ref(`/user-perms/${userId}`).once('value').then(permsData => {
            const userPerms = permsData.exists() ? permsData.val() : {};
            const promises = [];
            addedRoles.forEach(added => {
                console.log('Load role permissions', added);
                const res = db.ref(`/roles/${added}`).once('value').then(roleData => {
                    const role = roleData.val();
                    const rolePerms = role.permissions ? Object.keys(role.permissions) : [];
                    rolePerms.forEach(rolePerm => {
                        addUserPermission(userPerms, rolePerm, added);
                    });
                });
                promises.push(res);
            });
            removedRoles.forEach(removed => {
                const res = db.ref(`/roles/${removed}`).once('value').then(roleData => {
                    const role = roleData.val();
                    const rolePerms = role.permissions ? Object.keys(role.permissions) : [];
                    rolePerms.forEach(rolePerm => {
                        removeUserPermission(userPerms, rolePerm, removed);
                    });
                });
                promises.push(res);
            });
            Promise.all(promises).then(() => {
                console.log('Save new permissions', userPerms);
                db.ref(`/user-perms/${userId}`).set(userPerms)
                    .then(() => resolve()).catch(reject);
            }).catch(reject);
        }).catch(reject);
    });
}
exports.onCreateUserRoles = triggers.ref('/user-roles/{userId}').onCreate(event => {
    const userId = event.params['userId'];
    const userRoles = event.data.val();
    console.log('Create user roles', userId, userRoles);
    return processRoles(userRoles, {}, userId);
});
exports.onDeleteUserRoles = triggers.ref('/user-roles/{userId}').onDelete(event => {
    const userId = event.params['userId'];
    const prev = event.data.previous.exists() ? event.data.previous.val() : null;
    console.log('Delete user roles', userId, 'from', prev);
    return processRoles({}, prev, userId);
});
exports.onUpdateUserRoles = triggers.ref('/user-roles/{userId}').onUpdate(event => {
    const userId = event.params['userId'];
    const userRoles = event.data.val();
    const prev = event.data.previous.exists() ? event.data.previous.val() : null;
    console.log('Updated user roles', userId, 'from', prev, 'to', userRoles);
    return processRoles(userRoles, prev, userId);
});
//# sourceMappingURL=index.js.map