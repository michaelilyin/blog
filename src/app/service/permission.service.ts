import {Injectable} from '@angular/core';
import {PermissionService} from '../common/profile/permission.service';
import {Subscription} from 'rxjs/Subscription';
import {UserProfileService} from '../common/profile/userprofile.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from '@angular/router';
import {LogService} from 'ngx-log';

@Injectable()
export class PermissionServiceImpl extends PermissionService {

    private permissions = new Set<string>();
    private subscription: Subscription = null;

    constructor(private userProfileService: UserProfileService,
                private database: AngularFireDatabase) {
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
                .subscribe((permMap: { [p: string]: boolean }) => {
                    const permissions = new Set();
                    if (permMap) {
                        for (const perm in permMap) {
                            if (permMap.hasOwnProperty(perm)) {
                                permissions.add(perm);
                            }
                        }
                    }
                    this.permissions = permissions;
                });
        });
    }


    has(permission: string): boolean {
        return this.permissions.has(permission);
    }
}
