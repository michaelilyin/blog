import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleWrapperComponent} from '@app-components/module-wrapper/module-wrapper.component';
import {
  MatButtonModule, MatCardModule,
  MatExpansionModule, MatIconModule, MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule, MatTableModule,
  MatTreeModule
} from '@angular/material';
import {SideMenuComponent} from '@app-components/side-menu/side-menu.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { SimpleGridComponent } from './grid/simple-grid/simple-grid.component';
import { SimpleGridTableComponent } from './grid/simple-grid/simple-grid-table/simple-grid-table.component';
import { SimpleGridCardsComponent } from './grid/simple-grid/simple-grid-cards/simple-grid-cards.component';

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
    MatIconModule,
    MatTableModule,
    MatCardModule
  ],
  declarations: [
    ModuleWrapperComponent,
    SideMenuComponent,
    SimpleGridComponent,
    SimpleGridTableComponent,
    SimpleGridCardsComponent
  ],
  exports: [
    ModuleWrapperComponent,
    SideMenuComponent,
    SimpleGridComponent
  ]
})
export class ComponentsModule {
}
