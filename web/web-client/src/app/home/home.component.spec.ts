
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {HomeComponent} from './home.component';

describe('HomeComponent', function () {
    let comp: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            imports: [
                RouterModule.forChild([]),
                MaterialModule
            ],
            declarations: [
                HomeComponent
            ],
            providers: [
                {provide: APP_BASE_HREF, useValue : '/' }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
    });

    it('should be created', () => expect(comp).toBeDefined());

});
