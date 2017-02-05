import '@angular/material/core/theming/prebuilt/deeppurple-amber.css';
import {Component} from '@angular/core';

@Component({
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
    public readonly applicationName = 'Personal blog';
}
