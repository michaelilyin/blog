
import {Injectable} from '@angular/core';
import {LanguageService} from '../common/service/language.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';

@Injectable()
export class LanguageServiceImpl extends LanguageService {

    constructor(private rootTranslateService: TranslateService) {
        super();
    }

    initStaticTranslator(translateService: TranslateService) {
        translateService.setDefaultLang(environment.defaultLang);
        translateService.use(translateService.getBrowserLang());
        // translateService.use('ru');
    }

    get lang(): string {
        return this.rootTranslateService.currentLang;
    }
}
