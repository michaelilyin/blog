import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule, ViewAdminActivator} from './app.routing.module';
import {CommonModule} from './common/common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCommonModule,
    MatDialogModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule, MatPaginatorIntl,
    MatProgressSpinnerModule,
    MatToolbarModule
} from '@angular/material'
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthComponent} from './common/profile/auth/auth.component';
import {UserProfileService} from './common/profile/userprofile.service';
import {NgProgressModule} from 'ngx-progressbar';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PermissionService} from './common/profile/permission.service';
import {ConfigurationServiceImpl} from './service/configuration.service';
import {LanguageServiceImpl} from './service/language.service';
import {ConfigurationService} from './common/service/configuration.service';
import {LanguageService} from './common/service/language.service';
import {LogModule} from 'ngx-log';
import {UserProfileServiceImpl} from './service/userprofile.service';
import {PermissionServiceImpl} from './service/permission.service';
import {OverlayModule} from '@angular/cdk/overlay';
import {PaginatorTranslator} from './common/translated/paginator.translator';
import {FormsModule} from "@angular/forms";

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
        MatCommonModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatInputModule,
        MatGridListModule,
        NgProgressModule,
        OverlayModule,
        LogModule.forRoot(environment.production),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: UserProfileService, useClass: UserProfileServiceImpl },
        { provide: PermissionService, useClass: PermissionServiceImpl },
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
        { provide: LanguageService, useClass: LanguageServiceImpl },

        { provide: ViewAdminActivator, useClass: ViewAdminActivator },

        { provide: MatPaginatorIntl, useClass: PaginatorTranslator }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
