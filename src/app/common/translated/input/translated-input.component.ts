import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getTranslation, TranslatedModel, TranslatedModelImpl} from '../translated-model';
import {LanguageService} from '../../service/language.service';

@Component({
    selector: 'app-translated-input',
    templateUrl: 'translated-input.component.html'
})
export class TranslatedInputComponent implements OnInit {
    @Input()
    public model = new TranslatedModelImpl();

    @Input()
    public placeholder: string;

    @Input()
    public type: string;

    public selectedLang = '';

    constructor(private languageService: LanguageService) {

    }

    ngOnInit() {
        this.selectedLang = this.languageService.lang;
    }

    get translatedValue(): string {
        return this.model[this.selectedLang];
    }

    set translatedValue(value: string) {
        this.model[this.selectedLang] = value;
    }
}
