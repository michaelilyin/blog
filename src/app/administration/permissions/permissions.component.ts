import {Component, OnInit, ViewChild} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {Observable} from 'rxjs/Observable';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MdPaginator, PageEvent} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {PageRequest} from '../../common/service/table/page.emulation.service';
import {PermissionRecord, PermissionsTableService, PermissionsTableServiceImpl} from './permissions.table.service';

export class PermissionsDataSource extends DataSource<PermissionRecord> {

    private pageSubscription: Subscription;

    constructor(private permissionsTableService: PermissionsTableService, private paginator: MdPaginator) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<PermissionRecord[]> {
        this.pageSubscription = this.paginator.page.subscribe((event: PageEvent) => {
            this.permissionsTableService.refresh(new PageRequest(event.pageIndex, event.pageSize));
        });
        this.permissionsTableService.refresh(new PageRequest(0, this.paginator.pageSize));
        return this.permissionsTableService.values
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
    templateUrl: 'permissions.component.html',
    providers: [
        { provide: PermissionsTableService, useClass: PermissionsTableServiceImpl }
    ]
})
export class PermissionsComponent implements OnInit {

    public displayedColumns = ['name', 'description'];

    public source: PermissionsDataSource;

    @ViewChild(MdPaginator)
    paginator: MdPaginator;

    constructor(private permissionService: PermissionService,
                private permissionsTableService: PermissionsTableService) {

    }

    ngOnInit() {
        this.source = new PermissionsDataSource(this.permissionsTableService, this.paginator);
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }

}
