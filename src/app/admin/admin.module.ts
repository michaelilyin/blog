import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {TranslateModule} from '@ngx-translate/core';
import {createTranslationConfig, TRANSLATION_LOCATION} from '../shared/translation/translation.factory';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthModule} from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AuthModule,
    TranslateModule.forChild(createTranslationConfig())
  ],
  declarations: [
    AdminComponent,
    DashboardComponent
  ],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: 'admin'}
  ]
})
export class AdminModule { }
