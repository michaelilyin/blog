import {Component, OnInit, ViewChild} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {RoleRecord, RolesTableService, RolesTableServiceImpl} from './roles.table.service';
import {Observable} from 'rxjs/Observable';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MatDialog, MatPaginator, PageEvent} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {PageRequest} from '../../common/service/table/page.emulation.service';
import {EditRoleDialogComponent} from './edit-dialog/edit-role.dialog.component';
import {RowMenuElement} from '../../common/row-menu/row-menu.component';
import {TranslateService} from '@ngx-translate/core';

export class RolesDataSource extends DataSource<RoleRecord> {

    public length = 0;
    public event = new PageRequest(0, 10);

    constructor(private rolesTableService: RolesTableService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<RoleRecord[]> {
        return this.rolesTableService.values
            .map(page => {
                this.length = page.total;
                return page.values
            });
    }

    disconnect(collectionViewer: CollectionViewer): void {

    }

    refresh(event?: PageEvent) {
        if (event) {
            this.event = new PageRequest(event.pageIndex, event.pageSize);
        }
        this.rolesTableService.refresh(this.event);
    }
}

@Component({
    templateUrl: 'roles.component.html',
    providers: [
        {provide: RolesTableService, useClass: RolesTableServiceImpl}
    ]
})
export class RolesComponent implements OnInit {

    public displayedColumns = ['name', 'description', 'actions'];

    public rowMenu: RowMenuElement[];

    public source: RolesDataSource;

    constructor(private permissionService: PermissionService,
                private rolesTableService: RolesTableService,
                private dialogService: MatDialog,
                private translateService: TranslateService) {
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

    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }

    edit(record: RoleRecord, readonly?: boolean) {
        this.dialogService.open(EditRoleDialogComponent, {
            data: { key: record.$key, readonly: readonly },
            disableClose: true
        }).afterClosed().subscribe(res => {
            if (res) {
                this.source.refresh();
            }
        });
    }

    remove(record: RoleRecord) {

    }

}
