import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {RoleRecord} from '../roles.table.service';
import {
    MAT_DIALOG_DATA, MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger,
    MatDialogRef
} from '@angular/material';
import {Role, RoleEditService, RoleEditServiceImpl} from './role.data.service';
import {Subscription} from 'rxjs/Subscription';
import {getTranslation, TranslatedModel, TranslatedModelImpl} from '../../../common/translated/translated-model';
import {PermissionService} from '../../../common/profile/permission.service';
import {TranslateService} from '@ngx-translate/core';
import {FormControl} from '@angular/forms';
import {LogService} from 'ngx-log';
import {Observable} from 'rxjs/Observable';
import {PermissionOption, PermissionsDictionary} from '../permissions.dictionary';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/timeoutWith';

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

    public perms = new FormControl();

    public permissionOptions: PermissionOption[] = [];
    public filteredOptions: PermissionOption[];

    @ViewChild('matAutocompleteTrigger') autocompleteTrigger: MatAutocompleteTrigger;
    @ViewChild('matAutocomplete') autocomplete: MatAutocomplete;

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

            this.permissionsSubscription = this.permissionDict.all.subscribe(perms => {
                this.permissionOptions = perms.filter(option =>
                    this.role.permissions ? !this.role.permissions.hasOwnProperty(option.key) : true);
                this.filteredOptions = this.permissionOptions.slice();
            });
        });
        this.roleDataService.load(data.key);
    }

    ngOnInit(): void {
        this.perms.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .map(data => data && typeof data === 'object' ? data.value : data)
            .map(name => name ? this.filter(name.trim()) : this.permissionOptions.slice())
            .subscribe((opts) => {
                this.filteredOptions = opts;
            });
    }

    filter(name: string): PermissionOption[] {
        return this.permissionOptions.filter(option =>
            option.label.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    }

    addPerm(event: MatAutocompleteSelectedEvent) {
        this.log.log("Permission selected", event);
        const perm = event.option.value;
        this.permissionOptions = this.permissionOptions.filter(p => p.key != perm.key);
        this.rolePermissions = this.rolePermissions.concat(perm);
        this.filteredOptions = this.permissionOptions.slice();
        this.perms.setValue("", {emitEvent: false});
    }

    removePerm(perm) {
        this.rolePermissions = this.rolePermissions.filter(p => p.key != perm.key);
        this.permissionOptions = this.permissionOptions.concat(perm);
        this.filteredOptions = this.permissionOptions.slice();
    }

    save() {
        if (!this.data.readonly) {
            this.saveRole().subscribe(() => {
                if (this.roleSubscription) {
                    this.roleSubscription.unsubscribe();
                    this.roleSubscription = null;
                }
                this.role = null;
                this.rolePermissions = null;
                this.roleName = null;
                this.roleDescription = null;
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

    open() {
        if (!this.autocomplete.isOpen && typeof this.autocompleteTrigger.openPanel === 'function') {
            this.autocompleteTrigger.openPanel();
        }
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
}
