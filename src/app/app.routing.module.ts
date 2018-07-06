import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FeedbackComponent} from '@app-core/feedback/feedback.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: 'app/home/home.module#HomeModule', data: {title: 'HOME'}},
  // {path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule', data: {title: 'BLOG'}},
  {path: 'skills', loadChildren: 'app/skills/skills.module#SkillsModule', data: {title: 'SKILLS'}},
  // {path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule', data: {title: 'PROJECTS'}},
  {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', data: {title: 'ADMIN'}},
  {path: 'feedback', component: FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
