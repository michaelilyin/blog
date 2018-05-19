import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleWrapperComponent} from '@app-components/module-wrapper/module-wrapper.component';
import {
  MatButtonModule,
  MatExpansionModule, MatIconModule, MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatTreeModule
} from '@angular/material';
import {SideMenuComponent} from '@app-components/side-menu/side-menu.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonModule,
    MatTreeModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [ModuleWrapperComponent, SideMenuComponent],
  exports: [ModuleWrapperComponent, SideMenuComponent]
})
export class ComponentsModule {
}
