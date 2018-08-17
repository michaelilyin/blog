import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleWrapperComponent} from '@app-components/module-wrapper/module-wrapper.component';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule,
  MatExpansionModule, MatIconModule, MatListModule, MatMenuModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatTableModule, MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import {SideMenuComponent} from '@app-components/side-menu/side-menu.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SimpleGridComponent} from './grid/simple-grid/simple-grid.component';
import {SimpleGridTableComponent} from './grid/simple-grid/simple-grid-table/simple-grid-table.component';
import {SimpleGridCardsComponent} from './grid/simple-grid/simple-grid-cards/simple-grid-cards.component';
import {DialogColumnEditorComponent} from './grid/dialog-column-editor/dialog-column-editor.component';
import {LoadingShadeComponent} from './loading-shade/loading-shade.component';
import {ListChartCardComponent} from './list-chart-card/list-chart-card.component';
import {ContactsComponent} from '@app-components/contacts/contacts.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StoryComponent} from './story/story.component';
import {StoryElementDefDirective} from './story/story-element/story-element-def.directive';
import {StoryElementComponent} from '@app-components/story/story-element/story-element.component';

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
    MatCardModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDividerModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  declarations: [
    ModuleWrapperComponent,
    SideMenuComponent,
    SimpleGridComponent,
    SimpleGridTableComponent,
    SimpleGridCardsComponent,
    DialogColumnEditorComponent,
    LoadingShadeComponent,
    ListChartCardComponent,
    ContactsComponent,
    StoryComponent,
    StoryElementComponent,
    StoryElementDefDirective
  ],
  exports: [
    CommonModule,
    ModuleWrapperComponent,
    SideMenuComponent,
    SimpleGridComponent,
    LoadingShadeComponent,
    ListChartCardComponent,
    ContactsComponent,
    StoryComponent,
    StoryElementComponent,
    StoryElementDefDirective
  ],
  entryComponents: [
    DialogColumnEditorComponent,
    ContactsComponent
  ]
})
export class ComponentsModule {
}
