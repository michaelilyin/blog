import { Component } from '@angular/core';

import { OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    styleUrls: [ "app.component.css" ],
    template: `
   <h1>{{title}}</h1>
  <nav>
    <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    <a routerLink="/wizard" routerLinkActive="active">Wizard</a>
  </nav>
  <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
    title = 'Tour of Heroes';

    ngOnInit(): void {
    }
}