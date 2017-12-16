import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LogService} from 'ngx-log';
import {UserInfo, UserInfoService} from '../user-info.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {

    private uid: string;
    public user: UserInfo;

    private userSub: Subscription;

    constructor(private route: ActivatedRoute,
                private log: LogService,
                private userInfoService: UserInfoService) {
        this.userSub = this.userInfoService.value.subscribe(info => {
            this.user = info;
        });
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
    }
}
