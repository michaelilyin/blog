import {ModuleWithProviders, NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ConfigurationServiceProvider} from '@app-shared/configuration/configuration.service';
import {GQLServiceProvider} from '@app-shared/api/gql.service';
import {ComponentsModule} from '@app-components/components.module';
import {TitleServiceProvider} from '@app-shared/services/title.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    ComponentsModule
  ],
  exports: [
    MatIconModule,
    ComponentsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        GQLServiceProvider,
        ConfigurationServiceProvider,
        TitleServiceProvider
      ]
    };
  }
}
