import {Component} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';

@Component({
    templateUrl: 'users.component.html'
})
export class UsersComponent {
    constructor(private permissionService: PermissionService) {

    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
