"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const triggers = functions.database;
const db = admin.database();
class Role {
}
const processUserPermissions = function (perms, added, roleId, removed, notChanged) {
    added.forEach(permissionCode => {
        if (typeof perms[permissionCode] === 'boolean') {
            perms[permissionCode] = {};
            perms[permissionCode][roleId] = true;
            console.log('convert permission', permissionCode);
        }
        else if (perms[permissionCode]) {
            perms[permissionCode][roleId] = true;
            console.log('extend permission', permissionCode);
        }
        else {
            const obj = {};
            obj[roleId] = true;
            perms[permissionCode] = obj;
            console.log('add permission', permissionCode);
        }
    });
    removed.forEach(permissionCode => {
        if (typeof perms[permissionCode] === 'boolean') {
            delete perms[permissionCode];
            console.log('remove old permission', permissionCode);
        }
        else if (perms[permissionCode]) {
            delete perms[permissionCode][roleId];
            console.log('remove permission', permissionCode);
        }
        if (perms[permissionCode] && Object.keys(perms[permissionCode]).length < 1) {
            delete perms[permissionCode];
            console.log('remove permission after check  ', permissionCode);
        }
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
};
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
//# sourceMappingURL=index.js.map