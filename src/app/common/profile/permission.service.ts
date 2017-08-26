import {Injectable} from '@angular/core';
import {UserProfileService} from './userprofile.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {subscribeOn} from 'rxjs/operator/subscribeOn';

export abstract class PermissionService {
    abstract has(permission: string): boolean;
}

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
