import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';

import {AppComponent}  from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {ENV_PROVIDERS} from './environment';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        MaterialModule.forRoot()
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
