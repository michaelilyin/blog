import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from '@app-home/home.component';
import {AboutComponent} from '@app-home/about/about.component';
import {ContactsSheetComponent} from '@app-components/contacts/contacts-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contacts',
    outlet: 'bottom-sheet',
    component: ContactsSheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
