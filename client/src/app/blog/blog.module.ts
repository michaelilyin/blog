import {NgModule} from '@angular/core';
import {BlogComponent} from './blog.component';
import {BlogRoutingModule} from './blog.routing.module';

@NgModule({
    imports: [
        BlogRoutingModule
    ],
    declarations: [
        BlogComponent
    ]
})
export class BlogModule {

}
