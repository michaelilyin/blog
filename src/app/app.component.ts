import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ConfigurationService} from './common/service/configuration.service';
import {
    GuardsCheckEnd, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd,
    Router
} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastsManager} from 'ng2-toastr';
import {Observable} from 'rxjs/Observable';
import {NgProgressService} from 'ngx-progressbar';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from './common/service/language.service';
import {TranslatedModel} from './common/translated/translated-model';
import {PermissionService} from './common/profile/permission.service';
import {LogService} from 'ngx-log';
import 'rxjs/add/operator/catch';
import {TitleProcessingService} from './common/service/title.processing.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [{provide: TitleProcessingService, useClass: TitleProcessingService}]
})
export class AppComponent implements OnInit, OnDestroy {
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
                private langugeService: LanguageService,
                private permissionService: PermissionService,
                private logger: LogService,
                private titleProcessingService: TitleProcessingService) {
        this.toastService.setRootViewContainerRef(vcr);
        this.langugeService.initStaticTranslator(this.translateService);
    }


    ngOnInit(): void {
        this.initRouter();
        this.initConfigurationService();
        this.titleProcessingService.start();
    }

    ngOnDestroy(): void {
        this.titleProcessingService.stop();
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

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
