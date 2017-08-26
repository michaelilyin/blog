import {Component} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';

@Component({
    templateUrl: 'application-config.component.html'
})
export class ApplicationConfigComponent {
    constructor(private permissionService: PermissionService) {

    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
