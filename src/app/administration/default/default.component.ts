import {Component} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';

@Component({
    templateUrl: 'default.component.html'
})
export class DefaultComponent {
    constructor(private permissionService: PermissionService) {

    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
