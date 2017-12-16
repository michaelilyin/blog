import {Component, OnDestroy, OnInit} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {UserRecord, UsersTableService, UsersTableServiceImpl} from './users.table.service';
import {PageSupportDataSource} from '../../common/service/table/page.support';
import {RowMenuElement} from '../../common/row-menu/row-menu.component';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionViewer} from '@angular/cdk/collections';
import {Keyable} from '../../common/keyable';
import {Observable} from 'rxjs/Observable';
import {PageEvent} from '@angular/material';
import {UserProfileService} from '../../common/profile/userprofile.service';

export class UsersDataSource extends PageSupportDataSource<UserRecord> {
    constructor(usersTableService: UsersTableService,
                private permissionService: PermissionService,
                private userProfileService: UserProfileService) {
        super(usersTableService);
    }


    connect(collectionViewer: CollectionViewer): Observable<Keyable<UserRecord>[]> {
        if (this.permissionService.has('view-users')) {
            return super.connect(collectionViewer);
        } else if (this.permissionService.has('view-users-self')) {
            return this.userProfileService.profile.map((profile) => {
                this.length = 1;
                const rec = new UserRecord();
                rec.displayName = profile.displayName;
                rec.email = profile.email;
                rec.accepted = profile.accepted;
                rec.avatarUrl = profile.avatarUrl;
                return [new Keyable(profile.uid, rec)];
            });
        } else {
            return Observable.empty();
        }
    }

    refresh(event?: PageEvent) {
        if (this.permissionService.has('view-users')) {
            super.refresh(event);
        }
    }
}

@Component({
    templateUrl: 'users.component.html',
    providers: [
        {provide: UsersTableService, useClass: UsersTableServiceImpl}
    ],
    styles: [`
        .avatar-image {
            border-radius: 50%;
        }

        .col-avatar {
            max-width: 60px;
        }

        .col-tick {
            max-width: 80px;
        }
    `]
})
export class UsersComponent implements OnInit, OnDestroy {

    public displayedColumns = ['avatar', 'name', 'email', 'accepted', 'actions'];

    public rowMenu: RowMenuElement[];

    public source: UsersDataSource;

    constructor(private permissionService: PermissionService,
                private usersTableService: UsersTableService,
                private translateService: TranslateService,
                private router: Router,
                private route: ActivatedRoute,
                private userProfileService: UserProfileService) {
        if (this.access('view-users') || this.access('view-users-self')) {
            this.source = new UsersDataSource(this.usersTableService, this.permissionService, this.userProfileService);
            this.source.refresh();
            this.rowMenu = [
                {
                    icon: 'pageview',
                    primary: true,
                    label: this.translateService.instant('ADMIN.USERS.TABLE.ROW.VIEW'),
                    callback: (row) => this.view(row),
                    render: () => this.access('view-users') || this.access('view-users-self')
                },
                {
                    icon: 'group',
                    primary: true,
                    label: this.translateService.instant('ADMIN.USERS.TABLE.ROW.ROLES'),
                    callback: (row) => this.viewRoles(row),
                    render: () => this.access('view-user-roles')
                },
                {
                    icon: 'block',
                    label: this.translateService.instant('ADMIN.USERS.TABLE.ROW.BLOCK'),
                    callback: (row) => this.block(row),
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

    private view(row) {
        this.router.navigate( ['profile', row.key, 'info'], { relativeTo: this.route.parent });
    }

    private viewRoles(row) {
        this.router.navigate(['profile', row.key, 'roles'], { relativeTo: this.route.parent });
    }

    private block(row) {

    }
}
