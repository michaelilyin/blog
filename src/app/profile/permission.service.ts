import {Injectable} from '@angular/core';
import {UserProfileService} from './userprofile.service';
import {AngularFireDatabase} from 'angularfire2/database';

export abstract class PermissionService {
    abstract has(permission: string): boolean;
}

@Injectable()
export class PermissionServiceImpl extends PermissionService {

    private permissions = new Set<string>();

    constructor(private userProfileService: UserProfileService,
                private database: AngularFireDatabase) {
        super();
        userProfileService.profile.subscribe(profile => {
            if (profile == null) {
                return;
            }
            this.database.object(`/user-perms/${profile.uid}`).first()
                .subscribe((permMap: { [p: string]: boolean }) => {
                    const permissions = new Set();
                    if (permMap) {
                        for (let perm in permMap) {
                            permissions.add(perm);
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
