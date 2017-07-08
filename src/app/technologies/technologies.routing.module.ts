import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechnologiesComponent} from './technologies.component';
import {ListComponent} from './list/list.component';
import {TimelineComponent} from './timeline/timeline.component';

const routes: Routes = [
    {path: '', component: TechnologiesComponent, children: [
        {path: 'list', component: ListComponent},
        {path: 'timeline', component: TimelineComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TechnologiesRoutingModule {

}
