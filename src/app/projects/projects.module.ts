import {NgModule} from '@angular/core';
import {ProjectsComponent} from './projects.component';
import {ProjectsRoutingModule} from './projects.routing.module';

@NgModule({
    imports: [
        ProjectsRoutingModule
    ],
    declarations: [
        ProjectsComponent
    ]
})
export class ProjectsModule {

}
