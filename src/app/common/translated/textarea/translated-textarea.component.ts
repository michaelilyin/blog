import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {getTranslation, TranslatedModel, TranslatedModelImpl} from '../translated-model';
import {LanguageService} from '../../service/language.service';

@Component({
    selector: 'app-translated-textarea',
    templateUrl: 'translated-textarea.component.html'
})
export class TranslatedTextareaComponent implements OnInit, OnChanges {
    @Input()
    public model = new TranslatedModelImpl();

    @Input()
    public placeholder: string;

    @Input()
    public type: string;

    @Input()
    public lang: string;

    @Input()
    public containerClass: string;

    @Input()
    public rows: number;

    @Input()
    public cols: number;

    @Input()
    public disabled: boolean;

    public selectedLang = '';

    constructor(private languageService: LanguageService) {

    }

    ngOnInit() {
        if (this.lang) {
            this.selectedLang = this.lang;
        } else {
            this.selectedLang = this.languageService.lang;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.lang) {
            this.selectedLang = changes.lang.currentValue;
        }
    }

    get translatedValue(): string {
        return this.model[this.selectedLang];
    }

    set translatedValue(value: string) {
        this.model[this.selectedLang] = value;
    }
}
