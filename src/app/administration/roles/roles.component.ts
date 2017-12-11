import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {RoleRecord, RolesTableService, RolesTableServiceImpl} from './roles.table.service';
import {MatDialog} from '@angular/material';
import {EditRoleDialogComponent} from './edit-dialog/edit-role.dialog.component';
import {RowMenuElement} from '../../common/row-menu/row-menu.component';
import {TranslateService} from '@ngx-translate/core';
import {PermissionsDictionary, PermissionsDictionaryImpl} from './permissions.dictionary';
import {Keyable} from '../../common/keyable';
import {PageSupportDataSource} from '../../common/service/table/page.support';

export class RolesDataSource extends PageSupportDataSource<RoleRecord> {
    constructor(rolesTableService: RolesTableService) {
        super(rolesTableService);
    }
}

@Component({
    templateUrl: 'roles.component.html',
    providers: [
        {provide: RolesTableService, useClass: RolesTableServiceImpl},
        {provide: PermissionsDictionary, useClass: PermissionsDictionaryImpl}
    ]
})
export class RolesComponent implements OnInit, OnDestroy {

    public displayedColumns = ['name', 'description', 'actions'];

    public rowMenu: RowMenuElement[];

    public source: RolesDataSource;

    constructor(private permissionService: PermissionService,
                private rolesTableService: RolesTableService,
                private dialogService: MatDialog,
                private translateService: TranslateService,
                private permissionsDictionary: PermissionsDictionary,
                private viewContainerRef: ViewContainerRef) {
        if (this.access('view-roles')) {
            this.source = new RolesDataSource(this.rolesTableService);
            this.source.refresh();
            this.rowMenu = [
                {
                    icon: 'pageview',
                    primary: true,
                    label: this.translateService.instant('ADMIN.ROLES.TABLE.ROW.VIEW'),
                    callback: (row) => this.edit(row, true),
                    render: () => !this.access('edit-roles')
                },
                {
                    icon: 'edit',
                    primary: true,
                    label: this.translateService.instant('ADMIN.ROLES.TABLE.ROW.EDIT'),
                    callback: (row) => this.edit(row),
                    render: () => this.access('edit-roles')
                },
                {
                    icon: 'delete',
                    label: this.translateService.instant('ADMIN.ROLES.TABLE.ROW.REMOVE'),
                    callback: (row) => this.remove(row),
                    render: () => this.access('edit-roles')
                }
            ];
        }
    }

    ngOnInit() {
        this.rolesTableService.start();
        this.permissionsDictionary.start();
    }


    ngOnDestroy(): void {
        this.rolesTableService.stop();
        this.permissionsDictionary.stop();
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }

    edit(record: Keyable<RoleRecord>, readonly?: boolean) {
        this.dialogService.open(EditRoleDialogComponent, {
            viewContainerRef: this.viewContainerRef,
            data: { key: record.key, readonly: readonly },
            disableClose: true,
            width: '100%'
        }).afterClosed().subscribe(res => {
            if (res) {
                this.source.refresh();
            }
        });
    }

    remove(record: RoleRecord) {

    }

}
