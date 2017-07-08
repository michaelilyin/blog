import { Component } from '@angular/core';
import {ConfigurationService} from './common/service/configuration.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    name: string;

    constructor(configurationService: ConfigurationService,
                private router: Router) {
        configurationService.configuration.subscribe(config => {
            this.name = config.name;
        });
    }

    onTitleClick() {
        this.router.navigate(['home']);
    }
}
