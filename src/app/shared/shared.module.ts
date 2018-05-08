import {NgModule} from '@angular/core';
import {ModuleWrapperComponent} from './module-wrapper/module-wrapper.component';
import {MatProgressSpinnerModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  declarations: [ModuleWrapperComponent],
  exports: [ModuleWrapperComponent]
})
export class SharedModule {

}
