import {TranslateLoader, TranslateModuleConfig} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {zip} from 'rxjs';
import {map} from 'rxjs/operators';

export const TRANSLATION_LOCATION = new InjectionToken('Translation location');

export class ModuleTranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient,
              private prefix: string,
              private suffix: string) {

  }

  getTranslation(lang: string): Observable<any> {
    const global = this.http.get(`./assets/i18n/${lang}${this.suffix}`);
    const module = this.http.get(`${this.prefix}${lang}${this.suffix}`);
    return zip(global, module)
      .pipe(
        map((val: any[]) => {
          return this.patchObject(val[0], val[1]);
        })
      );
  }

  private patchObject(target: object, patch: object) {
    const res = Object.assign({}, target);
    for (const key of Object.keys(patch)) {
      if (res[key] !== undefined && typeof res[key] === 'object') {
        res[key] = this.patchObject(res[key], patch[key]);
      } else {
        res[key] = patch[key];
      }
    }
    return res;
  }
}

export function translationLoaderFactory(http: HttpClient, location: string) {
  // FIXME: Add culture support
  if (location && location !== '') {
    return new ModuleTranslationLoader(http, `./assets/i18n/${location}/`, '.json');
  } else {
    return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
  }
}

export function createTranslationConfig(root?: boolean): TranslateModuleConfig {
  return {
    loader: {
      provide: TranslateLoader,
      useFactory: translationLoaderFactory,
      deps: [HttpClient, TRANSLATION_LOCATION]
    }
  }
}
