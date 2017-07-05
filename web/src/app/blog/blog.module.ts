import {NgModule} from '@angular/core';
import {MdButtonModule, MdCardModule} from '@angular/material';
import {BlogComponent} from './blog.component';
import {BlogRoutingModule} from './blog.routing.module';

@NgModule({
    imports: [
        BlogRoutingModule,
        MdButtonModule,
        MdCardModule
    ],
    declarations: [
        BlogComponent
    ]
})
export class BlogModule {

}
