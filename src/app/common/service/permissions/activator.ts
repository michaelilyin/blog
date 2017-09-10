import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {PermissionService} from '../../profile/permission.service';

export abstract class PermissionBasedActivator implements CanActivate {

    constructor(private permissionService: PermissionService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) {
        const res = this.permissionService.has(this.permission());
        return res;
    }

    abstract permission(): string;
}
