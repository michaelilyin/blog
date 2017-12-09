import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-module-wrapper',
    templateUrl: './app-module-wrapper.component.html',
    styleUrls: ['./app-module-wrapper.component.css']
})
export class AppModuleWrapperComponent implements OnInit {

    @Input()
    public ready = false;

    @Input()
    public broken = false;

    constructor() { }

    ngOnInit() {
    }

}
