import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserInfo, UserInfoService, UserInfoServiceImpl} from './user-info.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {PermissionService} from '../../../common/profile/permission.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [
        {provide: UserInfoService, useClass: UserInfoServiceImpl}
    ]
})
export class UserComponent implements OnInit, OnDestroy {

    private uid: string;
    public user: UserInfo;

    private userSub: Subscription;

    constructor(private route: ActivatedRoute,
                private userInfoService: UserInfoService,
                private permissionService: PermissionService) {
        route.params.take(1).subscribe(params => {
            this.uid = params['id'];
            this.userSub = this.userInfoService.value.subscribe(info => {
                this.user = info;
            });
            this.userInfoService.load(this.uid);
        });
    }

    ngOnInit() {

    }


    ngOnDestroy(): void {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
    }

    access(permission: string): boolean {
        return this.permissionService.has(permission);
    }
}
