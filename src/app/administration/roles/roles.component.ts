import {Component, OnInit, ViewChild} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {RoleRecord, RolesTableService, RolesTableServiceImpl} from './roles.table.service';
import {Observable} from 'rxjs/Observable';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MdDialog, MdPaginator, PageEvent} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {PageRequest} from '../../common/service/table/page.emulation.service';
import {EditRoleDialogComponent} from './edit-dialog/edit-role.dialog.component';

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
        { provide: RolesTableService, useClass: RolesTableServiceImpl }
    ]
})
export class RolesComponent implements OnInit {

    public displayedColumns = ['name', 'description', 'actions'];

    public source: RolesDataSource;

    constructor(private permissionService: PermissionService,
                private rolesTableService: RolesTableService,
                private dialogService: MdDialog) {
        if (this.access('view-roles')) {
            this.source = new RolesDataSource(this.rolesTableService);
            this.source.refresh();
        }
    }

    ngOnInit() {

    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }

    edit(record: RoleRecord) {
        this.dialogService.open(EditRoleDialogComponent, {
            data: record.$key,
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
