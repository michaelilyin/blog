import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ConfigurationService} from './common/service/configuration.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {ToastsManager} from 'ng2-toastr';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
    name: string;
    ready = false;
    broken = false;

    constructor(private configurationService: ConfigurationService,
                private router: Router,
                private titleService: Title,
                private loadingBarService: SlimLoadingBarService,
                private vcr: ViewContainerRef,
                private toastService: ToastsManager) {
        this.toastService.setRootViewContainerRef(vcr);
        this.loadingBarService.interval = 50;
    }


    ngOnInit(): void {
        this.titleService.setTitle(this.name);
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.loadingBarService.start();
            } else if (event instanceof NavigationCancel
                || event instanceof NavigationEnd
                || event instanceof NavigationError) {
                this.loadingBarService.complete();
            }
        });
        this.configurationService.configuration
            .catch((error, caught) => {
                this.ready = true;
                this.broken = true;
                return Observable.throw(caught);
            })
            .subscribe(config => {
                this.name = config.name;
                this.ready = true;
            });
        this.configurationService.loadConfig();
    }

    onTitleClick() {
        this.router.navigate(['home']);
    }
}
