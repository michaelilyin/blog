import {TranslateLoader, TranslateModuleConfig} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslationConfig(path: string, root?: boolean): TranslateModuleConfig {
  return {
    loader: {
      provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, `./assets/i18n/${path}/`, '.json');
        },
        deps: [HttpClient]
    },
    isolate: !root
  }
}
