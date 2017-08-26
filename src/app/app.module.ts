import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule, ViewAdminActivator} from './app.routing.module';
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
import {AuthComponent} from './common/profile/auth/auth.component';
import {SignInDialogComponent} from './common/profile/auth/sign-in.dialog.component';
import {UserProfileService, UserProfileServiceImpl} from './common/profile/userprofile.service';
import {NgProgressModule} from 'ngx-progressbar';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PermissionService, PermissionServiceImpl} from './common/profile/permission.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent
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
        { provide: ViewAdminActivator, useClass: ViewAdminActivator }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
