import {Component, ElementRef, Input, ViewContainerRef} from '@angular/core';
import {LogService} from 'ngx-log';

export class RowMenuElement {
    public readonly icon: string;
    public readonly primary?: boolean;
    public readonly label: string;
    public readonly callback: (any) => void;
    public readonly render: () => boolean;
}

@Component({
    selector: 'app-row-menu',
    templateUrl: 'row-menu.component.html',
    providers: [

    ]
})
export class RowMenuComponent {

    @Input()
    public elements: RowMenuElement[];

    @Input()
    public row: any;

    constructor(private viewContainer: ViewContainerRef,
                private elementRef: ElementRef,
                private logger: LogService) {

    }

}
