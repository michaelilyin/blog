import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LogService} from 'ngx-log';
import {UserInfoComponent} from '../user-info/user-info.component';
import {UserInfoServiceImpl} from '../user-info.service';
import {PermissionService} from '../../../../common/profile/permission.service';
import {UserRoles, UserRolesService, UserRolesServiceImpl} from './user-roles.service';
import {Subscription} from 'rxjs/Subscription';
import {RoleOption, RolesDictionary, RolesDictionaryImpl} from './roles.dictionary';
import 'rxjs/add/observable/combineLatest';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-user-roles',
    templateUrl: './user-roles.component.html',
    styleUrls: ['./user-roles.component.css'],
    providers: [
        {provide: UserRolesService, useClass: UserRolesServiceImpl},
        {provide: RolesDictionary, useClass: RolesDictionaryImpl}
    ]
})
export class UserRolesComponent implements OnInit, OnDestroy {

    private uid: string;
    private userRolesSub: Subscription;
    private rolesSub: Subscription;

    public ready = false;
    public request = false;

    public userRoles: RoleOption[];
    public rolesOptions: RoleOption[];

    constructor(private route: ActivatedRoute,
                private log: LogService,
                private permissionService: PermissionService,
                private userRolesService: UserRolesService,
                private rolesDictionary: RolesDictionary) {
        route.parent.params.take(1).subscribe(params => {
            this.uid = params['id'];
            log.log('load user roles by uid', this.uid);
            this.rolesSub = Observable.combineLatest(this.userRolesService.value, this.rolesDictionary.all)
                .subscribe(data => {
                    const userRoles = data[0] as UserRoles;
                    const roles = data[1] as RoleOption[];
                    if (userRoles) {
                        this.userRoles = this.rolesDictionary.convert(Object.keys(userRoles));
                    } else {
                        this.userRoles = [];
                    }
                    this.rolesOptions = roles.slice();
                    this.ready = true;
                });
        });
    }

    ngOnInit() {
        this.rolesDictionary.start();
        this.userRolesService.load(this.uid);
    }


    ngOnDestroy(): void {
        this.rolesDictionary.stop();
        if (this.userRolesSub) {
            this.userRolesSub.unsubscribe();
        }
        if (this.rolesSub) {
            this.rolesSub.unsubscribe();
        }
    }

    access(permission: string): boolean {
        return this.permissionService.has(permission);
    }

    update() {

    }

    reset() {
        this.ready = false;
        this.userRolesService.load(this.uid);
    }
}
