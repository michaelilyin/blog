import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {getTranslation, TranslatedModel, TranslatedModelImpl} from '../translated-model';
import {LanguageService} from '../../service/language.service';

@Component({
    selector: 'app-translated-input',
    templateUrl: 'translated-input.component.html'
})
export class TranslatedInputComponent implements OnInit, OnChanges {
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
        if (!this.model) {
            return "";
        }
        return this.model[this.selectedLang];
    }

    set translatedValue(value: string) {
        if (!this.model) {
            return;
        }
        this.model[this.selectedLang] = value;
    }
}
