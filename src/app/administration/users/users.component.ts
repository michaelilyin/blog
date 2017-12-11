import {Component, OnDestroy, OnInit} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {UserRecord, UsersTableService, UsersTableServiceImpl} from './users.table.service';
import {PageSupportDataSource} from '../../common/service/table/page.support';
import {RowMenuElement} from '../../common/row-menu/row-menu.component';
import {TranslateService} from '@ngx-translate/core';

export class UsersDataSource extends PageSupportDataSource<UserRecord> {
    constructor(usersTableService: UsersTableService) {
        super(usersTableService);
    }
}

@Component({
    templateUrl: 'users.component.html',
    providers: [
        {provide: UsersTableService, useClass: UsersTableServiceImpl}
    ]
})
export class UsersComponent implements OnInit, OnDestroy {

    public displayedColumns = ['name', 'email', 'accepted', 'actions'];

    public rowMenu: RowMenuElement[];

    public source: UsersDataSource;

    constructor(private permissionService: PermissionService,
                private usersTableService: UsersTableService,
                private translateService: TranslateService) {
        if (this.access('view-users')) {
            this.source = new UsersDataSource(this.usersTableService);
            this.source.refresh();
            this.rowMenu = [
                {
                    icon: 'pageview',
                    primary: true,
                    label: this.translateService.instant('ADMIN.USERS.TABLE.ROW.VIEW'),
                    render: () => this.access('view-users')
                },
                {
                    icon: 'edit',
                    primary: true,
                    label: this.translateService.instant('ADMIN.USERS.TABLE.ROW.ROLES'),
                    render: () => this.access('view-user-roles')
                },
                {
                    icon: 'delete',
                    label: this.translateService.instant('ADMIN.USERS.TABLE.ROW.BLOCK'),
                    render: () => this.access('block-users')
                }
            ];
        }
    }

    ngOnInit() {
        this.usersTableService.start();
    }


    ngOnDestroy(): void {
        this.usersTableService.stop();
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
