"use strict";
var app_component_1 = require('./app.component');
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
describe('AppComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        return testing_1.TestBed.configureTestingModule({
            imports: [
                router_1.RouterModule.forRoot([]),
                material_1.MaterialModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [
                { provide: common_1.APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        comp = fixture.componentInstance;
    });
    it('should be created', function () { return expect(comp).toBeDefined(); });
    it('should have expected title text', function () {
        var de = fixture.debugElement.query(platform_browser_1.By.css('md-toolbar span'));
        fixture.detectChanges();
        var span = de.nativeElement;
        expect(span.innerText).toMatch(/Michael Ilyin/i, 'title should contains application name');
    });
});
//# sourceMappingURL=app.component.spec.js.map