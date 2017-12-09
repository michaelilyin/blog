import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

export abstract class LanguageService {
    abstract lang: string;

    abstract initStaticTranslator(translateService: TranslateService): Observable<any>;
}
