import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {CommonModule} from './common/common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdCommonModule,
    MdCoreModule,
    MdDialogModule,
    MdGridListModule,
    MdInputModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdToolbarModule
} from '@angular/material'
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthComponent} from './profile/auth/auth.component';
import {SignInDialogComponent} from './profile/auth/sign-in.dialog.component';
import {UserProfileService, UserProfileServiceImpl} from './profile/userprofile.service';
import {NgProgressModule} from 'ngx-progressbar';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        SignInDialogComponent
    ],
    entryComponents: [
        SignInDialogComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AppRoutingModule,
        CommonModule,
        BrowserAnimationsModule,
        MdCoreModule,
        MdCommonModule,
        MdMenuModule,
        MdButtonModule,
        MdToolbarModule,
        MdProgressSpinnerModule,
        MdDialogModule,
        MdInputModule,
        MdGridListModule,
        NgProgressModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: UserProfileService, useClass: UserProfileServiceImpl }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
