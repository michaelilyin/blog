import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdministrativeComponent} from "./administrative.component";
import {UsersComponent} from "./users/users.component";
import {SummaryComponent} from "./summary/summary.component";

const routes: Routes = [
    {path: '', redirectTo: 'category/summary'},
    {path: 'category', component: AdministrativeComponent, children: [
        {path: 'users', component: UsersComponent},
        {path: 'summary', component: SummaryComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrativeRoutingModule {
}
