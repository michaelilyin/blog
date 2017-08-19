import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', loadChildren: 'app/home/home.module#HomeModule'},
    {path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule'},
    {path: 'skills', loadChildren: 'app/skills/skills.module#SkillsModule'},
    {path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
