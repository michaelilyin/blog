import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/timeoutWith';
import {LogService} from 'ngx-log';


export class Option {
    constructor(public readonly key: string, public readonly label: string) {
    }
}

@Component({
    selector: 'app-multicomplete',
    templateUrl: './multicomplete.component.html',
    styleUrls: ['./multicomplete.component.css']
})
export class MulticompleteComponent implements OnInit {

    @Input()
    public value: Option[];

    @Input()
    public options: Option[];

    @Output()
    public valueChange = new EventEmitter<Option[]>();

    public input = new FormControl();
    public filtered: Option[];

    public _options: Option[];
    public _value: Option[];

    @ViewChild('matAutocompleteTrigger') autocompleteTrigger: MatAutocompleteTrigger;
    @ViewChild('matAutocomplete') autocomplete: MatAutocomplete;

    constructor(private log: LogService) {
    }

    ngOnInit() {
        this._options = this.options.filter(option => this.value.indexOf(option) === -1);
        this._value = this.value.slice();

        this.input.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .map(data => data && typeof data === 'object' ? data.value : data)
            .map(name => name ? this.filter(name.trim()) : this.options.slice())
            .subscribe((opts) => {
                this.filtered = opts;
            });
    }

    filter(name: string): Option[] {
        return this._options.filter(option =>
            option.label.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    }

    add(event: MatAutocompleteSelectedEvent) {
        this.log.log('Selected', event);
        const element = event.option.value;
        this._options = this._options.filter(p => p.key !== element.key);
        this.value = this.value.concat(element);
        this.filtered = this._options.slice();
        this.input.setValue('', {emitEvent: false});
        this.valueChange.next(this._options);
    }

    remove(perm) {
        this._value = this._value.filter(p => p.key !== perm.key);
        this._options = this._options.concat(perm);
        this._options = this._options.slice();
        this.valueChange.next(this._options);
    }

    open() {
        if (!this.autocomplete.isOpen && typeof this.autocompleteTrigger.openPanel === 'function') {
            this.autocompleteTrigger.openPanel();
        }
    }
}
