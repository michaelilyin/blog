import {Component} from '@angular/core';
import {LanguageService} from '../common/service/language.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: 'blog.component.html'
})
export class BlogComponent {
    constructor(private translateService: TranslateService,
                private languageService: LanguageService) {
        this.languageService.initStaticTranslator(this.translateService)
    }
}
