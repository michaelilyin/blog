import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {AppRoutingModule} from "./app-routing.module";

import {HeroService} from "./services/hero.service";

import {AppComponent} from "./app.component"
import {HeroDetailComponent} from './heroes/hero-detail.component';
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService}  from './in-memory-data.service';

import './rxjs-extensions';
import {HeroSearchComponent} from "./heroes/hero-search.component";
import {WizardTestComponent} from "./wizard/wizard-test.component";
import {WizardComponent} from "./wizard/wizard.component";
import {WizardStepComponent} from "./wizard/wizard-step.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
    ],
    providers: [
        HeroService
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroesComponent,
        HeroDetailComponent,
        HeroSearchComponent,
        WizardTestComponent,
        WizardComponent,
        WizardStepComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}