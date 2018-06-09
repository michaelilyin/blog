import {NgModule} from '@angular/core';
import {HomeComponent} from '@app-home/home.component';
import {HomeRoutingModule} from '@app-home/home.routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {createTranslationConfig, TRANSLATION_LOCATION} from '@app-shared/translation/translation.factory';
import {SharedModule} from '@app-shared/shared.module';
import {TopExpComponent} from '@app-home/top-exp/top-exp.component';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatTooltipModule
} from '@angular/material';
import {LatestUsagesComponent} from '@app-home/latest-usages/latest-usages.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ScrollbarModule} from 'ngx-scrollbar';

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
    MatTooltipModule,
    MatButtonModule,

    NgxChartsModule,
    ScrollbarModule
  ],
  declarations: [
    HomeComponent,
    TopExpComponent,
    LatestUsagesComponent
  ],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: 'home'}
  ]
})
export class HomeModule {
}
