import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../common/service/language.service';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent {
    constructor(private translateService: TranslateService,
                private languageService: LanguageService) {
        this.languageService.initStaticTranslator(this.translateService)
    }
}
