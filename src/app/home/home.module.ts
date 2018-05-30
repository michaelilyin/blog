import {NgModule} from '@angular/core';
import {HomeComponent} from '@app-home/home.component';
import {HomeRoutingModule} from '@app-home/home.routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {createTranslationConfig, TRANSLATION_LOCATION} from '@app-shared/translation/translation.factory';
import {SharedModule} from '@app-shared/shared.module';
import {TopExpComponent} from '@app-home/top-exp/top-exp.component';
import {MatCardModule, MatGridListModule, MatIconModule, MatListModule, MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule,
    TranslateModule.forChild(createTranslationConfig()),
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatTooltipModule
  ],
  declarations: [
    HomeComponent,
    TopExpComponent
  ],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: 'home'}
  ]
})
export class HomeModule {
}
