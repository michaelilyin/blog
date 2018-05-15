import {TranslateLoader, TranslateModuleConfig} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Inject, InjectionToken} from '@angular/core';

export const TRANSLATION_LOCATION = new InjectionToken('Translation location');

export function translationLoaderFactory(http: HttpClient, location: string) {
  if (location && location !== '') {
    return new TranslateHttpLoader(http, `./assets/i18n/${location}/`, '.json');
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
    },
    isolate: !root
  }
}
