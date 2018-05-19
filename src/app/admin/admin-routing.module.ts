import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '@app-admin/admin.component';
import {DashboardComponent} from '@app-admin/dashboard/dashboard.component';
import {UsersComponent} from '@app-auth/users/users.component';
import {RolesComponent} from '@app-auth/roles/roles.component';

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
          },
          {
            path: 'roles',
            component: RolesComponent
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
