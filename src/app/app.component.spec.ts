import { TestBed, async } from '@angular/core/testing';
import {MdButtonModule, MdDialogModule, MdMenuModule, MdToolbarModule} from '@angular/material';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {Configuration, ConfigurationService} from 'app/common/service/configuration.service';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {ToastModule} from 'ng2-toastr';
import {AuthComponent} from './profile/auth/auth.component';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseApp} from 'angularfire2';
import {AuthProviders, UserProfileService} from './profile/userprofile.service';

class ConfigurationServiceMock extends ConfigurationService {
    loadConfig() {
        const config = new Configuration();
        config.name = 'Test Name';
        this.configuration.next(config);
    }
}

class UserProfileServiceMock extends UserProfileService {
    signInWithProvider(provider: AuthProviders): Promise<any> {
        return undefined;
    }
    signOut() {
    }
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                AuthComponent
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: ConfigurationService, useClass: ConfigurationServiceMock },
                { provide: UserProfileService, useClass: UserProfileServiceMock },
            ],
            imports: [
                MdButtonModule,
                MdToolbarModule,
                MdMenuModule,
                MdDialogModule,
                RouterModule.forRoot([{path: '', loadChildren: 'app/home/home.module#HomeModule'}]),
                SlimLoadingBarModule.forRoot(),
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
        expect(compiled.querySelector('md-toolbar span.header').textContent).toContain('Test Name');
    }));

});
