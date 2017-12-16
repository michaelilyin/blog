import {Injectable} from '@angular/core';
import {PermissionService} from '../common/profile/permission.service';
import {Subscription} from 'rxjs/Subscription';
import {UserProfileService} from '../common/profile/userprofile.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {GuardsCheckEnd, Router} from '@angular/router';
import {LogService} from 'ngx-log';
import {DelayRouteActivator} from '../common/service/permissions/activator';

@Injectable()
export class PermissionServiceImpl extends PermissionService {

    private permissions = new Set<string>();
    private subscription: Subscription = null;

    constructor(private userProfileService: UserProfileService,
                private database: AngularFireDatabase,
                private delayedRouteActivator: DelayRouteActivator,
                private router: Router,
                private log: LogService) {
        super();
        userProfileService.profile.subscribe(profile => {
            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = null;
            }
            if (profile == null) {
                this.permissions.clear();
                return;
            }
            this.subscription = this.database.object(`/user-perms/${profile.uid}`)
                .valueChanges()
                .subscribe((permMap: { [p: string]: any }) => {
                    const permissions = new Set();
                    if (permMap) {
                        Object.keys(permMap).forEach(perm => {
                            permissions.add(perm);
                        });
                    }
                    this.permissions = permissions;

                    this.delayedRouteActivator.navigate();
                });
        });
        this.router.events.subscribe(event => {
            if (event instanceof GuardsCheckEnd) {
                const checked = event as GuardsCheckEnd;
                if (!checked.shouldActivate && this.permissions.size === 0) {
                    this.delayedRouteActivator.register(checked.url);
                }
            }
        });
    }


    has(permission: string): boolean {
        return this.permissions.has(permission);
    }
}
