import {TranslateModule} from '@ngx-translate/core';
import {NgModule} from '@angular/core';
import {LoggerModule as NGXLoggerModule} from 'ngx-logger';
import {ToastrModule} from 'ngx-toastr';
import {createTranslationConfig, TRANSLATION_LOCATION} from '@app-shared/translation/translation.factory';
import {FeedbackComponent} from '@app/core/feedback/feedback.component';
import {SharedModule} from '@app-shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MainComponent} from '@app-core/main/main.component';
import {MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    TranslateModule.forRoot(createTranslationConfig()),
    NGXLoggerModule.forChild(),
    ToastrModule,
    MatToolbarModule,
    RouterModule,

    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    FeedbackComponent,
    MainComponent
  ],
  exports: [
    FeedbackComponent,
    MainComponent
  ],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: 'core'}
  ]
})
export class CoreModule {

}
