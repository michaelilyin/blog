import {ModuleWithProviders, NgModule} from '@angular/core';
import {ModuleWrapperComponent} from './module-wrapper/module-wrapper.component';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ConfigurationServiceProvider} from './configuration/configuration.service';
import {GQLServiceProvider} from './api/gql.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  declarations: [ModuleWrapperComponent],
  exports: [ModuleWrapperComponent, MatIconModule]
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
