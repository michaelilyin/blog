import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from '@app-admin/admin-routing.module';
import {AdminComponent} from '@app-admin/admin.component';
import {TranslateModule} from '@ngx-translate/core';
import {createTranslationConfig, TRANSLATION_LOCATION} from '@app-shared/translation/translation.factory';
import {SharedModule} from '@app-shared/shared.module';
import {DashboardComponent} from '@app-admin/dashboard/dashboard.component';
import {AuthModule} from '@app-auth/auth.module';

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
