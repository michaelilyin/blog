import {AppComponent} from './app.component';

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', function () {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                MaterialModule.forRoot()
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                {provide: APP_BASE_HREF, useValue : '/' }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
    });

    it('should be created', () => expect(comp).toBeDefined());

    it('should have expected title text', () => {
        const de: DebugElement = fixture.debugElement.query(By.css('md-toolbar span'));
        fixture.detectChanges();
        const span = de.nativeElement;
        expect(span.innerText).toMatch(/Michael Ilyin/i, 'title should contains application name');
    });
});
