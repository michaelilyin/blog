import {AppComponent} from './app.component';

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MaterialModule} from "@angular/material";

describe('AppComponent', function () {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [
                MaterialModule.forRoot()
            ],
            declarations: [
                AppComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
    });

    it('should create component', () => expect(comp).toBeDefined());

    it('should have expected title text', () => {
        const de: DebugElement = fixture.debugElement.query(By.css('md-toolbar span'));
        fixture.detectChanges();
        const span = de.nativeElement;
        expect(span.innerText).toMatch(/Michael Ilyin/i, 'title should contains application name');
    });
});
