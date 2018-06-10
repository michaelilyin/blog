import {ModuleWithProviders, NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ConfigurationServiceProvider} from '@app-shared/configuration/configuration.service';
import {GQLServiceProvider} from '@app-shared/api/gql.service';
import {ComponentsModule} from '@app-components/components.module';
import {TitleServiceProvider} from '@app-shared/services/title.service';
import {PipesModule} from '@app-shared/pipes/pipes.module';
import {NumeralsTranslateServiceProvider} from '@app-shared/services/numerals-translate.service';
import {ErrorServiceProvider} from '@app-shared/services/error.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    ComponentsModule,
    PipesModule
  ],
  exports: [
    MatIconModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        GQLServiceProvider,
        ConfigurationServiceProvider,
        TitleServiceProvider,
        NumeralsTranslateServiceProvider,
        ErrorServiceProvider
      ]
    };
  }
}
