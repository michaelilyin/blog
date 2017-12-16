
import {StatefulDataService} from '../../../common/service/statefull.provider.service';
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {PermissionService} from '../../../common/profile/permission.service';

export class UserInfo {
    displayName: string;
    email: string;
    avatarUrl: string;
    accepted: boolean;
}

export abstract class UserInfoService extends StatefulDataService<UserInfo> {

}

@Injectable()
export class UserInfoServiceImpl extends UserInfoService {

    constructor(db: AngularFireDatabase,
                private permissionService: PermissionService) {
        super(db);
    }


    get base() {
        if (this.permissionService.has('view-users')) {
            return '/user-list';
        } else {
            return '/users';
        }
    }
}
