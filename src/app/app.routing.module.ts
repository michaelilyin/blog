import {Routes, RouterModule, CanActivate} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {PermissionService} from './common/profile/permission.service';
import {PermissionBasedActivator} from './common/service/permissions/activator';

@Injectable()
export class ViewAdminActivator extends PermissionBasedActivator {
    constructor(permissionService: PermissionService) { super(permissionService); }
    permission(): string { return 'view-admin'; }
}

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', loadChildren: 'app/home/home.module#HomeModule'},
    {path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule'},
    {path: 'skills', loadChildren: 'app/skills/skills.module#SkillsModule'},
    {path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule'},
    {
        path: 'admin',
        loadChildren: 'app/administration/administration.module#AdministrationModule',
        canActivate: [ViewAdminActivator]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
