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
import {DevStubComponent} from '../common/dev-stub/dev-stub.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'menu/default',
        pathMatch: 'full',
        data: {title: 'ADMIN-DEFAULT'}
    },
    {
        path: 'menu',
        component: AdministrationComponent,
        children: [
            {path: 'default', component: DefaultComponent, data: {title: 'ADMIN-DEFAULT'}},
            {path: 'application', component: ApplicationConfigComponent, data: {title: 'APPCONFIG'}},
            {path: 'users', component: UsersComponent, data: {title: 'USERS'}},
            {path: 'roles', component: RolesComponent, data: {title: 'ROLES'}},
            {path: 'permissions', component: PermissionsComponent, data: {title: 'PERMS'}},
            {
                path: 'profile/:id',
                component: UserComponent,
                children: [
                    {path: 'info', component: UserInfoComponent, data: {title: 'USER.INFO'}},
                    {path: 'roles', component: UserRolesComponent, data: {title: 'USER.ROLES'}},
                    {path: 'permissions', component: DevStubComponent, data: {title: 'USER.PERMS'}},
                ]
            },
            {path: 'modules', component: DevStubComponent},
            {path: 'statistic', component: DevStubComponent},
            {path: 'demo-requests', component: DevStubComponent},
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
