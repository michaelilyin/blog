import {Component} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';

@Component({
    templateUrl: 'roles.component.html'
})
export class RolesComponent {
    constructor(private permissionService: PermissionService) {

    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
