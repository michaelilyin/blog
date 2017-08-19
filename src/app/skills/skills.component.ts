import {Component} from '@angular/core';
import {LanguageService} from '../common/service/language.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: 'skills.component.html',
    styles: [`
        nav {
            display: flex;
            justify-content: center;
        }
        nav a {
            display: inline-flex;
        }
    `]
})
export class SkillsComponent {
    constructor(private translateService: TranslateService,
                private languageService: LanguageService) {
        this.languageService.initStaticTranslator(this.translateService)
    }
}
