import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from '../common/service/language.service';
import {TranslateService} from '@ngx-translate/core';
import {PermissionService} from '../common/profile/permission.service';
import 'rxjs/add/operator/first';
import {TitleProcessingService} from '../common/service/title.processing.service';

@Component({
    templateUrl: 'administration.component.html',
    providers: [{provide: TitleProcessingService, useClass: TitleProcessingService}]
})
export class AdministrationComponent implements OnInit, OnDestroy {

    public ready = false;

    constructor(private translateService: TranslateService,
                private languageService: LanguageService,
                private permissionService: PermissionService,
                private titleProcessingService: TitleProcessingService) {
        this.languageService.initStaticTranslator(this.translateService).first().subscribe(() => {
            this.ready = true;
        });
    }

    ngOnInit(): void {
        this.titleProcessingService.start();
    }

    ngOnDestroy(): void {
        this.titleProcessingService.stop();
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
