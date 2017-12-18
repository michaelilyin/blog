import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LogService} from 'ngx-log';

@Component({
    selector: 'app-loading-content',
    templateUrl: './loading-content.component.html',
    styleUrls: ['./loading-content.component.css']
})
export class LoadingContentComponent implements OnInit, OnChanges {

    @Input()
    public ready = false;

    @Input()
    public request = false;

    public _ready = false;
    public _request = false;

    constructor(private log: LogService) {
    }

    ngOnInit() {
        this._ready = this.ready;
        this._request = this.request;
        this.log.log('ready', this._ready);
        this.log.log('request', this._request);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['ready']) {
            this._ready = changes['ready'].currentValue;
            this.log.log('ready', this._ready);
        }
        if (changes['request']) {
            this._request = changes['request'].currentValue;
            this.log.log('request', this._request);
        }
    }

}
