import {NgModule} from '@angular/core';
import {AdministrativeComponent} from './administrative.component';
import {AdministrativeRoutingModule} from './administrative.routing.module';
import {MaterialModule} from '@angular/material';
import {UsersComponent} from './users/users.component';
import {SummaryComponent} from './summary/summary.component';

@NgModule({
    imports: [
        AdministrativeRoutingModule,
        MaterialModule
    ],
    declarations: [
        AdministrativeComponent,
        UsersComponent,
        SummaryComponent
    ]
})
export class AdministrativeModule {

}
