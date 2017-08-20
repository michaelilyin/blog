import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ConfigurationService} from './common/service/configuration.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastsManager} from 'ng2-toastr';
import {Observable} from 'rxjs/Observable';
import {NgProgressService} from 'ngx-progressbar';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from './common/service/language.service';
import {TranslatedModel} from './common/translated/translated-model';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
    name: TranslatedModel;
    ready = false;
    broken = false;

    constructor(private configurationService: ConfigurationService,
                private router: Router,
                private titleService: Title,
                private progressService: NgProgressService,
                private vcr: ViewContainerRef,
                private toastService: ToastsManager,
                private translateService: TranslateService,
                private langugeService: LanguageService) {
        this.toastService.setRootViewContainerRef(vcr);
        this.langugeService.initStaticTranslator(this.translateService);
    }


    ngOnInit(): void {
        this.initRouter();
        this.initConfigurationService();
    }

    private initConfigurationService() {
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

    private initRouter() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.progressService.start();
            } else if (event instanceof NavigationCancel
                || event instanceof NavigationEnd
                || event instanceof NavigationError) {
                this.progressService.done();
            }
        });
    }

    onTitleClick() {
        this.router.navigate(['home']);
    }
}
