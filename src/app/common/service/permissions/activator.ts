import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {PermissionService} from '../../profile/permission.service';

export abstract class PermissionBasedActivator implements CanActivate {

    constructor(private permissionService: PermissionService) {}

    canActivate() {
        return this.permissionService.has(this.permission());
    }

    abstract permission(): string;
}
