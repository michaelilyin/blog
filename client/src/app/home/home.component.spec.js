"use strict";
var testing_1 = require('@angular/core/testing');
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var home_component_1 = require("./home.component");
describe('HomeComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        return testing_1.TestBed.configureTestingModule({
            imports: [
                router_1.RouterModule.forChild([]),
                material_1.MaterialModule
            ],
            declarations: [
                home_component_1.HomeComponent
            ],
            providers: [
                { provide: common_1.APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(home_component_1.HomeComponent);
        comp = fixture.componentInstance;
    });
    it('should be created', function () { return expect(comp).toBeDefined(); });
});
//# sourceMappingURL=home.component.spec.js.map