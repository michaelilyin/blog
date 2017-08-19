import {TranslateService} from '@ngx-translate/core';

export abstract class LanguageService {
    abstract initStaticTranslator(translateService: TranslateService);
}

export class LanguageServiceImpl extends LanguageService {

    initStaticTranslator(translateService: TranslateService) {
        translateService.setDefaultLang('en');
        // translateService.use('ru');
    }

}
