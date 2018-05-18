import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleWrapperComponent} from '@app-components/module-wrapper/module-wrapper.component';
import {MatButtonModule, MatExpansionModule, MatProgressSpinnerModule, MatSidenavModule} from '@angular/material';
import {SideMenuComponent} from '@app-components/side-menu/side-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonModule
  ],
  declarations: [ModuleWrapperComponent, SideMenuComponent],
  exports: [ModuleWrapperComponent, SideMenuComponent]
})
export class ComponentsModule {
}
