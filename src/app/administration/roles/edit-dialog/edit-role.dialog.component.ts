
import {Component, Inject} from '@angular/core';
import {RoleRecord} from '../roles.table.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Role, RoleEditService, RoleEditServiceImpl} from './role.data.service';
import {Subscription} from 'rxjs/Subscription';
import {getTranslation, TranslatedModel, TranslatedModelImpl} from '../../../common/translated/translated-model';
import {PermissionService} from '../../../common/profile/permission.service';
import {TranslateService} from '@ngx-translate/core';
import {FormControl} from '@angular/forms';

export class EditRoleDialogData {
    public readonly key: string;
    public readonly readonly?: boolean;
}

export class PermissionOption {
    constructor(public readonly $key: string, public readonly label: string) {}
}

@Component({
    selector: 'app-edit-role-dialog',
    templateUrl: 'edit-role.dialog.component.html',
    providers: [
        { provide: RoleEditService, useClass: RoleEditServiceImpl }
    ]
})
export class EditRoleDialogComponent {

    public roleName: TranslatedModel;
    public roleDescription: TranslatedModel;
    public rolePermissions: any;

    private role: Role;
    private roleSubscription: Subscription;
    private permissionsSubscription: Subscription;

    public perms = new FormControl();

    public permissionOptions: PermissionOption[];

    constructor(@Inject(MAT_DIALOG_DATA) public data: EditRoleDialogData,
                private roleDataService: RoleEditService,
                private dialogRef: MatDialogRef<EditRoleDialogComponent>,
                private permissionService: PermissionService,
                private translateService: TranslateService) {
        this.roleSubscription = this.roleDataService.value.subscribe(role => {
            this.role = role;
            this.roleName = new TranslatedModelImpl(role.name);
            this.roleDescription = new TranslatedModelImpl(role.description);
            this.rolePermissions = Object.keys(role.permissions);
        });
        this.roleDataService.load(data.key);
        this.permissionsSubscription = this.roleDataService.loadPermissions().subscribe(perms => {
            this.permissionOptions = [];
            perms.forEach(perm => {
                this.permissionOptions.push(new PermissionOption(perm.$key, getTranslation(perm.name, this.translateService.currentLang)))
            })
        });
    }

    addPermission(event) {

    }

    save() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
