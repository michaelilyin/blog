import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {TranslateModule} from '@ngx-translate/core';
import {createTranslationConfig, TRANSLATION_LOCATION} from '../shared/translation/translation.factory';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    TranslateModule.forChild(createTranslationConfig())
  ],
  declarations: [AdminComponent],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: 'skills'}
  ]
})
export class AdminModule { }
