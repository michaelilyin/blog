import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {HeroesComponent}      from './heroes/heroes.component';
import {HeroDetailComponent}  from './heroes/hero-detail.component';
import {WizardTestComponent} from "./wizard/wizard-test.component";

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'heroes/:id', component: HeroDetailComponent},
    {path: 'heroes', component: HeroesComponent},
    {path: 'wizard', component: WizardTestComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
