import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdministrationComponent} from './administration.component';
import {ApplicationConfigComponent} from './app-conf/application-config.component';
import {UsersComponent} from './users/users.component';
import {DefaultComponent} from './default/default.component';
import {RolesComponent} from './roles/roles.component';
import {PermissionsComponent} from './permissions/permissions.component';
import {UserInfo} from 'firebase/app';
import {UserInfoComponent} from './users/user/user-info/user-info.component';
import {UserRolesComponent} from './users/user/user-roles/user-roles.component';
import {UserComponent} from './users/user/user.component';

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
            {path: 'roles', component: RolesComponent},
            {path: 'permissions', component: PermissionsComponent},
            {
                path: 'profile/:id',
                component: UserComponent,
                children: [
                    {path: 'info', component: UserInfoComponent},
                    {path: 'roles', component: UserRolesComponent},
                ]
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
