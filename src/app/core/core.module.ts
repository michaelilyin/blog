import {TranslateModule} from '@ngx-translate/core';
import {NgModule} from '@angular/core';
import {LoggerModule as NGXLoggerModule} from 'ngx-logger';
import {ToastrModule} from 'ngx-toastr';
import {createTranslationConfig, TRANSLATION_LOCATION} from '@app-shared/translation/translation.factory';
import {FeedbackComponent} from '@app/core/feedback/feedback.component';
import {SharedModule} from '@app-shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    TranslateModule.forRoot(createTranslationConfig()),
    NGXLoggerModule.forChild(),
    ToastrModule,

    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    FeedbackComponent
  ],
  exports: [
    FeedbackComponent
  ],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: 'core'}
  ]
})
export class CoreModule {

}
