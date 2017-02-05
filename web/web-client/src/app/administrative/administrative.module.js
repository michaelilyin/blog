"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var administrative_component_1 = require("./administrative.component");
var administrative_routing_module_1 = require("./administrative.routing.module");
var material_1 = require("@angular/material");
var users_component_1 = require("./users/users.component");
var summary_component_1 = require("./summary/summary.component");
var AdministrativeModule = (function () {
    function AdministrativeModule() {
    }
    AdministrativeModule = __decorate([
        core_1.NgModule({
            imports: [
                administrative_routing_module_1.AdministrativeRoutingModule,
                material_1.MaterialModule
            ],
            declarations: [
                administrative_component_1.AdministrativeComponent,
                users_component_1.UsersComponent,
                summary_component_1.SummaryComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AdministrativeModule);
    return AdministrativeModule;
}());
exports.AdministrativeModule = AdministrativeModule;
//# sourceMappingURL=administrative.module.js.map