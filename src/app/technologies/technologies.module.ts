import {NgModule} from '@angular/core';
import {TechnologiesRoutingModule} from './technologies.routing.module';
import {TechnologiesComponent} from './technologies.component';
import {ListComponent} from './list/list.component';
import {TimelineComponent} from './timeline/timeline.component';
import {TechnologiesDataService, TechnologiesDataServiceImpl} from './common/technologies.data.service';
import {MdTabsModule} from '@angular/material';

@NgModule({
    imports: [
        TechnologiesRoutingModule,
        MdTabsModule
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
