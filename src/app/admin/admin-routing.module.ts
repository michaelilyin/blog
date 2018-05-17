import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UsersComponent} from './auth/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'auth',
        children: [
          {
            path: 'users',
            component: UsersComponent
          }
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
