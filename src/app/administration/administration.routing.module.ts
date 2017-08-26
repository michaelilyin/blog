import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdministrationComponent} from './administration.component';
import {ApplicationConfigComponent} from './app-conf/application-config.component';
import {UsersComponent} from './users/users.component';
import {DefaultComponent} from './default/default.component';
import {RolesComponent} from './roles/roles.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'menu/default',
        pathMatch: 'full',
    },
    {
        path: 'menu',
        component: AdministrationComponent,
        children: [
            {path: 'default', component: DefaultComponent},
            {path: 'application', component: ApplicationConfigComponent},
            {path: 'users', component: UsersComponent},
            {path: 'roles', component: RolesComponent}
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
