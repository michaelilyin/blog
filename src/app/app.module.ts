import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from '@app/app.component';
import {createTranslationConfig, TRANSLATION_LOCATION} from '@app-shared/translation/translation.factory';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {AppRoutingModule} from '@app/app.routing.module';
import {NgProgressModule} from 'ngx-progressbar';
import {SharedModule} from '@app-shared/shared.module';
import {MatButtonModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {ApolloLink, NextLink, Operation} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {LoggerModule as NGXLoggerModule, NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {NGXLoggerHttpServiceProvider} from '@app/logging/remote-logger.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '@app-environment/environment';
import {ToastrModule} from 'ngx-toastr';
import {CoreModule} from '@app/core/core.module';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';

export function localeFactory(translationService: TranslateService): string {
  return translationService.getBrowserCultureLang();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgProgressModule,
    SharedModule.forRoot(),
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    ApolloModule,
    HttpLinkModule,
    TranslateModule.forRoot(createTranslationConfig(true)),
    NGXLoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.WARN,
      serverLoggingUrl: 'graphql'
    }),
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'increasing',
      newestOnTop: true
    }),
    ScrollToModule.forRoot(),
    CoreModule
  ],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: ''},
    ...(environment.providers),
    NGXLogger,
    NGXLoggerHttpServiceProvider,
    {
      provide: LOCALE_ID,
      useFactory: localeFactory,
      deps: [
        TranslateService
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo,
              httpLink: HttpLink) {

    const scalarLink = new ApolloLink((operation: Operation, forward?: NextLink) =>
      forward(operation).map((arg) => {
        return arg;
      })
    );

    const link = ApolloLink.from([scalarLink, httpLink.create({uri: 'graphql'})]);
    apollo.create({
      link: link,
      cache: new InMemoryCache()
    });
  }
}
