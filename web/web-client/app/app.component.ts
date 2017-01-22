import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'blog-application',
    templateUrl: 'app.component.html',
    styles: [`
        nav {
            padding-left: 16px;
            padding-right: 16px;
        }
    `]
})
export class AppComponent {
    public readonly applicationName: string = 'Personal blog';
}
