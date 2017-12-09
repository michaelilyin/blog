import {ChangeDetectorRef, Component} from '@angular/core';
import {LanguageService} from '../common/service/language.service';
import {TranslateService} from '@ngx-translate/core';
import {PermissionService} from '../common/profile/permission.service';
import 'rxjs/add/operator/first';

@Component({
    templateUrl: 'administration.component.html'
})
export class AdministrationComponent {

    private ready = false;

    constructor(private translateService: TranslateService,
                private languageService: LanguageService,
                private permissionService: PermissionService    ) {
        this.languageService.initStaticTranslator(this.translateService).first().subscribe(() => {
            this.ready = true;
        });
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
