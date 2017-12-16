import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LogService} from 'ngx-log';
import {UserInfoComponent} from '../user-info/user-info.component';
import {UserInfoServiceImpl} from '../user-info.service';

@Component({
    selector: 'app-user-roles',
    templateUrl: './user-roles.component.html',
    styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

    private uid: string;

    constructor(private route: ActivatedRoute,
                private log: LogService) {
        route.parent.params.take(1).subscribe(params => {
            this.uid = params['id'];
            log.log('load user info by uid', this.uid);
        });
    }

    ngOnInit() {
    }

}
