import {ChangeDetectorRef, Component} from '@angular/core';
import {LanguageService} from '../common/service/language.service';
import {TranslateService} from '@ngx-translate/core';
import {PermissionService} from '../common/profile/permission.service';

@Component({
    templateUrl: 'administration.component.html'
})
export class AdministrationComponent {
    constructor(private translateService: TranslateService,
                private languageService: LanguageService,
                private permissionService: PermissionService    ) {
        this.languageService.initStaticTranslator(this.translateService);
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
