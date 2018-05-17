import {ModuleWithProviders, NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ConfigurationServiceProvider} from './configuration/configuration.service';
import {GQLServiceProvider} from './api/gql.service';
import {ComponentsModule} from './components/components.module';

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
        ConfigurationServiceProvider
      ]
    };
  }
}
