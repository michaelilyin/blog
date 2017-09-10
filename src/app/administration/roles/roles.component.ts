import {Component, OnInit, ViewChild} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {RoleRecord, RolesTableService, RolesTableServiceImpl} from './roles.table.service';
import {Observable} from 'rxjs/Observable';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MdPaginator, PageEvent} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {PageRequest} from '../../common/service/table/page.emulation.service';

export class RolesDataSource extends DataSource<RoleRecord> {

    private pageSubscription: Subscription;

    constructor(private rolesTableService: RolesTableService, private paginator: MdPaginator) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<RoleRecord[]> {
        this.pageSubscription = this.paginator.page.subscribe((event: PageEvent) => {
            this.rolesTableService.refresh(new PageRequest(event.pageIndex, event.pageSize));
        });
        this.rolesTableService.refresh(new PageRequest(0, this.paginator.pageSize));
        return this.rolesTableService.values
            .map(page => {
               this.paginator.length = page.total;
               return page.values
            });
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.pageSubscription.unsubscribe();
    }
}

@Component({
    templateUrl: 'roles.component.html',
    providers: [
        { provide: RolesTableService, useClass: RolesTableServiceImpl }
    ]
})
export class RolesComponent implements OnInit {

    public displayedColumns = ['name', 'description'];

    public source: RolesDataSource;

    @ViewChild(MdPaginator)
    paginator: MdPaginator;

    constructor(private permissionService: PermissionService,
                private rolesTableService: RolesTableService) {

    }

    ngOnInit() {
        this.source = new RolesDataSource(this.rolesTableService, this.paginator);
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }

}
