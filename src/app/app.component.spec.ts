import { TestBed, async } from '@angular/core/testing';
import {MdButtonModule, MdToolbarModule} from '@angular/material';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {Configuration, ConfigurationService} from "app/common/service/configuration.service";

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: ConfigurationService, useClass: ConfigurationServiceMock }
            ],
            imports: [
                MdButtonModule,
                MdToolbarModule,
                RouterModule.forRoot([{path: '', loadChildren: 'app/home/home.module#HomeModule'}])
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

class ConfigurationServiceMock extends ConfigurationService {
    constructor() {
        super();
        const config = new Configuration();
        config.name = "Test Name";
        this.configuration.next(config);
    }
}
