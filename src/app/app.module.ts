import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {createTranslationConfig} from './shared/translation/translation.factory';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from './app.routing.module';
import {NgProgressModule} from 'ngx-progressbar';
import {SharedModule} from './shared/shared.module';
import {MatButtonModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgProgressModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    TranslateModule.forRoot(createTranslationConfig('', true))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
