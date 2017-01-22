import { Component } from '@angular/core';

import { OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'blog-application',
    styleUrls: [ "app.component.css" ],
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    title = 'Tour of Heroes';

    ngOnInit(): void {
    }
}