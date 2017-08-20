import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export abstract class LanguageService {
    abstract initStaticTranslator(translateService: TranslateService);

    abstract lang: string;
}

@Injectable()
export class LanguageServiceImpl extends LanguageService {

    constructor(private rootTranslateService: TranslateService) {
        super();
    }

    initStaticTranslator(translateService: TranslateService) {
        translateService.setDefaultLang('en');
        // translateService.use('ru');
    }

    get lang(): string {
        return this.rootTranslateService.currentLang;
    }
}
