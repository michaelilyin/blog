import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {PermissionService} from '../../profile/permission.service';
import {Injectable} from '@angular/core';
import {LogService} from 'ngx-log';

@Injectable()
export class DelayRouteActivator {

    private route: string;

    constructor(private router: Router,
                private log: LogService) {

    }

    register(route: string) {
        this.log.log('register delayed route', route);
        this.route = route;
    }

    reset() {
        this.log.log('reset delayed route');
        this.route = null;
    }

    navigate() {
        const route = this.route;
        this.log.log('navigate to delayed route', route);
        if (route) {
            setTimeout(() => {
                this.reset();
                this.router.navigateByUrl(route);
            })
        }
    }
}

@Injectable()
export abstract class PermissionBasedActivator implements CanActivate {

    constructor(private permissionService: PermissionService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) {
        const res = this.permissionService.has(this.permission());
        return res;
    }

    abstract permission(): string;
}
