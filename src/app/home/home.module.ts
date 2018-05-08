import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home.routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {createTranslationConfig} from '../shared/translation/translation.factory';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule,
    TranslateModule.forChild(createTranslationConfig('home'))
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
