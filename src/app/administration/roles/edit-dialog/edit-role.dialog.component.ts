import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Role, RoleEditService, RoleEditServiceImpl} from './role.data.service';
import {Subscription} from 'rxjs/Subscription';
import {TranslatedModel, TranslatedModelImpl} from '../../../common/translated/translated-model';
import {PermissionService} from '../../../common/profile/permission.service';
import {TranslateService} from '@ngx-translate/core';
import {LogService} from 'ngx-log';
import {Observable} from 'rxjs/Observable';
import {PermissionOption, PermissionsDictionary} from '../permissions.dictionary';

export class EditRoleDialogData {
    public readonly key: string;
    public readonly readonly?: boolean;
}

@Component({
    selector: 'app-edit-role-dialog',
    templateUrl: 'edit-role.dialog.component.html',
    providers: [
        {provide: RoleEditService, useClass: RoleEditServiceImpl}
    ]
})
export class EditRoleDialogComponent implements OnInit {

    public roleName: TranslatedModel;
    public roleDescription: TranslatedModel;
    public rolePermissions: PermissionOption[];

    private role: Role;
    private roleSubscription: Subscription;
    private permissionsSubscription: Subscription;

    private _request = false;

    public permissionOptions: PermissionOption[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: EditRoleDialogData,
                private roleDataService: RoleEditService,
                private dialogRef: MatDialogRef<EditRoleDialogComponent>,
                private permissionService: PermissionService,
                private translateService: TranslateService,
                private log: LogService,
                private permissionDict: PermissionsDictionary) {
        this.roleSubscription = this.roleDataService.value.subscribe(role => {
            this.role = role;
            this.roleName = new TranslatedModelImpl(role.name);
            this.roleDescription = new TranslatedModelImpl(role.description);
            if (role.permissions) {
                this.rolePermissions = this.permissionDict.convert(Object.keys(role.permissions));
            } else {
                this.rolePermissions = [];
            }
        });
        this.permissionsSubscription = this.permissionDict.all.subscribe(perms => {
            this.permissionOptions = perms.slice();
        });
        this.roleDataService.load(data.key);
    }

    ngOnInit(): void {

    }

    save() {
        if (!this.data.readonly) {
            this._request = true;
            this.saveRole().subscribe(() => {
                if (this.roleSubscription) {
                    this.roleSubscription.unsubscribe();
                    this.roleSubscription = null;
                }
                this.role = null;
                this.rolePermissions = null;
                this.roleName = null;
                this.roleDescription = null;
                this._request = false;
                this.dialogRef.close(true);
            });
        }
    }

    cancel() {
        if (this.roleSubscription) {
            this.roleSubscription.unsubscribe();
            this.roleSubscription = null;
        }
        this.role = null;
        this.rolePermissions = null;
        this.roleName = null;
        this.roleDescription = null;
        this.dialogRef.close(false);
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }

    private saveRole(): Observable<any> {
        const role = new Role();
        role.name = this.roleName;
        role.description = this.roleDescription;
        role.permissions = {};
        this.rolePermissions.forEach(perm => {
            role.permissions[perm.key] = true;
        });
        return this.roleDataService.save(this.data.key, role);
    }

    public get loading() {
        return this.role === null || this.role === undefined || this.request;
    }

    public get request() {
        return this._request;
    }
}
