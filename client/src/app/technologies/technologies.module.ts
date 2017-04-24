import {NgModule} from '@angular/core';
import {TechnologiesRoutingModule} from './technologies.routing.module';
import {TechnologiesComponent} from './technologies.component';
import {MaterialModule} from '@angular/material';
import {ListComponent} from './list/list.component';
import {TimelineComponent} from './timeline/timeline.component';
import {TechnologiesDataService, TechnologiesDataServiceImpl} from './common/technologies.data.service';

@NgModule({
    imports: [
        TechnologiesRoutingModule,
        MaterialModule
    ],
    declarations: [
        TechnologiesComponent,
        ListComponent,
        TimelineComponent
    ],
    providers: [
        { provide: TechnologiesDataService, useClass: TechnologiesDataServiceImpl }
    ]
})
export class TechnologiesModule {

}
