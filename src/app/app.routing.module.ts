import {Routes, RouterModule, CanActivate, Router} from '@angular/router';
import {Injectable, NgModule} from '@angular/core';
import {PermissionService} from './common/profile/permission.service';
import {DelayRouteActivator, PermissionBasedActivator} from './common/service/permissions/activator';

// @Injectable()
export class ViewAdminActivator extends PermissionBasedActivator {
    // constructor(permissionService: PermissionService,
    //             router: Router,
    //             delayActivator: DelayRouteActivator) {
    //     super(permissionService, delayActivator, router);
    // }
    permission(): string {
        return 'view-admin';
    }
}

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', loadChildren: 'app/home/home.module#HomeModule', data: {title: 'HOME'}},
    {path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule', data: {title: 'BLOG'}},
    {path: 'skills', loadChildren: 'app/skills/skills.module#SkillsModule', data: {title: 'SKILLS'}},
    {path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule', data: {title: 'PROJECTS'}},
    {
        path: 'admin',
        loadChildren: 'app/administration/administration.module#AdministrationModule',
        canActivate: [ViewAdminActivator],
        data: {title: 'ADMIN'}
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
