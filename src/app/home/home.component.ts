import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../common/service/language.service';
import 'rxjs/add/operator/first'

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    public ready = false;

    constructor(private translateService: TranslateService,
                private languageService: LanguageService) {
        this.languageService.initStaticTranslator(this.translateService).first().subscribe(() => {
            this.ready = true;
        });
    }
}
