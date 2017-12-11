import {Component, OnDestroy, OnInit} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {PermissionRecord, PermissionsTableService, PermissionsTableServiceImpl} from './permissions.table.service';
import {LogService} from 'ngx-log';
import {PageSupportDataSource} from '../../common/service/table/page.support';

export class PermissionsDataSource extends PageSupportDataSource<PermissionRecord> {

    constructor(permissionsTableService: PermissionsTableService) {
        super(permissionsTableService);
    }
}

@Component({
    templateUrl: 'permissions.component.html',
    providers: [
        {provide: PermissionsTableService, useClass: PermissionsTableServiceImpl}
    ]
})
export class PermissionsComponent implements OnInit, OnDestroy {

    public displayedColumns = ['name', 'description'];

    public source: PermissionsDataSource;

    constructor(private permissionService: PermissionService,
                private permissionsTableService: PermissionsTableService,
                private logger: LogService) {
        this.logger.log('Created permissions component');
        if (this.access('view-perms')) {
            this.source = new PermissionsDataSource(this.permissionsTableService);
            this.source.refresh({ pageIndex: 0, pageSize: 10, length: 0 });
        }
    }

    ngOnInit() {
        this.logger.log('On init permissions component');
        this.permissionsTableService.start();
    }


    ngOnDestroy(): void {
        this.permissionsTableService.stop();
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }

}
