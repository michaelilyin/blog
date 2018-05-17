import {NgModule} from '@angular/core';
import {HomeComponent} from '@app-home/home.component';
import {HomeRoutingModule} from '@app-home/home.routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {createTranslationConfig, TRANSLATION_LOCATION} from '@app-shared/translation/translation.factory';
import {SharedModule} from '@app-shared/shared.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule,
    TranslateModule.forChild(createTranslationConfig())
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: 'home'}
  ]
})
export class HomeModule {
}
