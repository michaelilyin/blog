import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {CommonModule} from './common/common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdCoreModule, MdCommonModule, MdMenuModule, MdButtonModule, MdToolbarModule} from '@angular/material'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        BrowserAnimationsModule,
        MdCoreModule,
        MdCommonModule,
        MdMenuModule,
        MdButtonModule,
        MdToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
