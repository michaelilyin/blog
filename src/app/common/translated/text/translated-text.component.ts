import {Component, Input, OnInit} from '@angular/core';
import {getTranslation, TranslatedModel} from '../translated-model';
import {LanguageService} from '../../service/language.service';

@Component({
    selector: 'app-translated-text',
    templateUrl: 'translated-text.component.html'
})
export class TranslatedTextComponent implements OnInit {
    @Input()
    public model: TranslatedModel;

    public translatedValue = '';

    constructor(private languageService: LanguageService) {

    }

    ngOnInit() {
        this.translatedValue = getTranslation(this.model, this.languageService.lang);
    }
}
