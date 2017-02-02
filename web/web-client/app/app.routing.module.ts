import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {BlogComponent} from "./blog/blog.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', loadChildren: 'app/home/home.module#HomeModule'},
    {path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule'},
    {path: 'administrative', loadChildren: 'app/administrative/administrative.module#AdministrativeModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
