import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import {Component} from '@angular/core';
import {ConfigurationService} from './common/service/configuration.service';
import {Router} from '@angular/router';

@Component({
    selector: 'blog-application',
    templateUrl: 'app.component.html',
    styles: [`
        nav {
            padding-left: 16px;
            padding-right: 16px;
        }
        .header {
            cursor: pointer;
        }
    `]
})
export class AppComponent {
    private name: string;

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
