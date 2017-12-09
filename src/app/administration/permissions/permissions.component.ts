import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {Observable} from 'rxjs/Observable';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MatPaginator, PageEvent} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {PageRequest} from '../../common/service/table/page.emulation.service';
import {PermissionRecord, PermissionsTableService, PermissionsTableServiceImpl} from './permissions.table.service';
import {LogService} from 'ngx-log';
import {Keyable} from '../../common/keyable';

export class PermissionsDataSource extends DataSource<Keyable<PermissionRecord>> {

    public length: number;

    constructor(private permissionsTableService: PermissionsTableService,
                private logger: LogService) {
        super();
        this.logger.log('Created permissions data source');
    }

    connect(collectionViewer: CollectionViewer): Observable<Keyable<PermissionRecord>[]> {
        this.logger.log('Connect permissions data source');
        return this.permissionsTableService.values
            .map(page => {
                this.length = page.total;
                return page.values
            });
    }

    disconnect(collectionViewer: CollectionViewer): void {

    }

    refresh(event: PageEvent) {
        this.permissionsTableService.refresh(new PageRequest(event.pageIndex, event.pageSize));
    }
}

@Component({
    templateUrl: 'permissions.component.html',
    providers: [
        {provide: PermissionsTableService, useClass: PermissionsTableServiceImpl}
    ]
})
export class PermissionsComponent implements OnInit {

    public displayedColumns = ['name', 'description'];

    public source: PermissionsDataSource;

    constructor(private permissionService: PermissionService,
                private permissionsTableService: PermissionsTableService,
                private logger: LogService) {
        this.logger.log('Created permissions component');
        if (this.access('view-perms')) {
            this.source = new PermissionsDataSource(this.permissionsTableService, this.logger);
            this.source.refresh({ pageIndex: 0, pageSize: 10, length: 0 });
        }
    }

    ngOnInit() {
        this.logger.log('On init permissions component');
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }

}
