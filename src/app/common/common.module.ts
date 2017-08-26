import {NgModule} from '@angular/core';
import {ConfigurationService, ConfigurationServiceImpl} from './service/configuration.service';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {HttpClientModule} from '@angular/common/http';
import {LanguageService, LanguageServiceImpl} from './service/language.service';
import {TranslatedTextComponent} from './translated/text/translated-text.component';
import {PermissionService, PermissionServiceImpl} from './profile/permission.service';
import {UserProfileService, UserProfileServiceImpl} from './profile/userprofile.service';
import {SignInDialogComponent} from './profile/auth/sign-in.dialog.component';
import {CommonModule as NgCommonModule} from '@angular/common';
import {MdButtonModule, MdDialogModule, MdProgressSpinnerModule} from '@angular/material';

@NgModule({
    imports: [
        HttpModule,
        HttpClientModule,
        NgCommonModule,
        MdProgressSpinnerModule,
        MdButtonModule,
        MdDialogModule,
        ToastModule.forRoot()
    ],
    providers: [
        { provide: UserProfileService, useClass: UserProfileServiceImpl },
        { provide: PermissionService, useClass: PermissionServiceImpl },
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
        { provide: LanguageService, useClass: LanguageServiceImpl }
    ],
    declarations: [
        TranslatedTextComponent,
        SignInDialogComponent
    ],
    entryComponents: [
        SignInDialogComponent
    ],
    exports: [
        HttpModule,
        HttpClientModule,
        ToastModule,
        NgCommonModule,
        TranslatedTextComponent,
        SignInDialogComponent
    ]
})
export class CommonModule {

}
