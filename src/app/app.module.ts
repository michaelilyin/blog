import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {createTranslationConfig, TRANSLATION_LOCATION} from './shared/translation/translation.factory';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from './app.routing.module';
import {NgProgressModule} from 'ngx-progressbar';
import {SharedModule} from './shared/shared.module';
import {MatButtonModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgProgressModule,
    SharedModule.forRoot(),
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    ApolloModule,
    HttpLinkModule,
    TranslateModule.forRoot(createTranslationConfig(true))
  ],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: ''},
    ...(environment.providers)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: 'graphql'}),
      cache: new InMemoryCache()
    });
  }
}
