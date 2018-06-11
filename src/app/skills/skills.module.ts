import {NgModule} from '@angular/core';
import {SkillsComponent} from './skills.component';
import {SkillsRoutingModule} from './skills.routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {createTranslationConfig, TRANSLATION_LOCATION} from '../shared/translation/translation.factory';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatGridListModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    SkillsRoutingModule,
    CommonModule,
    SharedModule,
    TranslateModule.forChild(createTranslationConfig()),

    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule
  ],
  declarations: [
    SkillsComponent
  ],
  providers: [
    {provide: TRANSLATION_LOCATION, useValue: 'skills'}
  ]
})
export class SkillsModule {
}
