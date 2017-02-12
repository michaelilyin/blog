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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var administrative_component_1 = require("./administrative.component");
var users_component_1 = require("./users/users.component");
var summary_component_1 = require("./summary/summary.component");
var routes = [
    { path: '', redirectTo: 'category/summary' },
    { path: 'category', component: administrative_component_1.AdministrativeComponent, children: [
            { path: 'users', component: users_component_1.UsersComponent },
            { path: 'summary', component: summary_component_1.SummaryComponent }
        ] }
];
var AdministrativeRoutingModule = (function () {
    function AdministrativeRoutingModule() {
    }
    AdministrativeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AdministrativeRoutingModule);
    return AdministrativeRoutingModule;
}());
exports.AdministrativeRoutingModule = AdministrativeRoutingModule;
//# sourceMappingURL=administrative.routing.module.js.map