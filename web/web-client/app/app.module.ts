import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';

import {AppComponent}  from './app.component';
import {AppRoutingModule} from "./app.routing.module";

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
