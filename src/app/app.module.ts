import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {CommonModule} from './common/common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MdCoreModule, MdCommonModule, MdMenuModule, MdButtonModule, MdToolbarModule,
    MdProgressSpinnerModule, MdDialogModule, MdInputModule, MdGridListModule
} from '@angular/material'
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {AuthComponent} from './profile/auth/auth.component';
import {SignInDialogComponent} from './profile/auth/sign-in.dialog.component';
import {UserProfileService, UserProfileServiceImpl} from './profile/userprofile.service';

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
        SlimLoadingBarModule.forRoot()
    ],
    providers: [
        { provide: UserProfileService, useClass: UserProfileServiceImpl }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
