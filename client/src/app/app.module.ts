import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';

import {AppComponent}  from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {ENV_PROVIDERS} from './environment';
import {CommonModule} from "./common/common.module";

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        MaterialModule,
        CommonModule
    ],
    declarations: [
        AppComponent,
        ...ENV_PROVIDERS
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
