import { TestBed, async } from '@angular/core/testing';
import {MdButtonModule, MdDialogModule, MdMenuModule, MdToolbarModule} from '@angular/material';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {ConfigData, Configuration, ConfigurationService} from 'app/common/service/configuration.service';
import {ToastModule} from 'ng2-toastr';
import {AuthComponent} from './common/profile/auth/auth.component';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseApp} from 'angularfire2';
import {AuthProviders, UserProfileService} from './common/profile/userprofile.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgProgressModule} from 'ngx-progressbar';
import {LanguageService} from './common/service/language.service';
import {CommonModule} from './common/common.module';
import {translated, TranslatedModelImpl} from './common/translated/translated-model';
import {TranslatedTextComponent} from './common/translated/text/translated-text.component';
import {PermissionService} from './common/profile/permission.service';
import {LogModule} from 'ngx-log';

class ConfigurationServiceMock extends ConfigurationService {
    loadConfig() {
        const config = {
            name: translated('Test Name'),
            timezone: ""
        };
        this.configuration.next(config as Configuration);
    }

    updateConfig(config: ConfigData): Promise<any> {
        return null;
    }
}

class UserProfileServiceMock extends UserProfileService {
    signInWithProvider(provider: AuthProviders): Promise<any> {
        return undefined;
    }
    signOut() {
    }
}

class PermissionServiceMock extends PermissionService {
    has(permission: string): boolean {
        return true;
    }
}

class LanguageServiceMock extends LanguageService {
    lang = 'en';

    initStaticTranslator(translateService: TranslateService) {    }
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                AuthComponent,
                TranslatedTextComponent
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: ConfigurationService, useClass: ConfigurationServiceMock },
                { provide: UserProfileService, useClass: UserProfileServiceMock },
                { provide: LanguageService, useClass: LanguageServiceMock },
                { provide: PermissionService, useClass: PermissionServiceMock }
            ],
            imports: [
                MdButtonModule,
                MdToolbarModule,
                MdMenuModule,
                MdDialogModule,
                LogModule.forRoot(false),
                RouterModule.forRoot([{path: '', loadChildren: 'app/home/home.module#HomeModule'}]),
                NgProgressModule,
                TranslateModule.forRoot(),
                ToastModule.forRoot()
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should display test title', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('md-toolbar div.header span').textContent).toContain('Test Name');
    }));

});
