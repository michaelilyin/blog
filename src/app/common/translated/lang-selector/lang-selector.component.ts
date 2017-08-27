import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../service/language.service';

@Component({
    selector: 'app-lang-selector',
    templateUrl: 'lang-selector.component.html'
})
export class LangSelectorComponent implements OnInit {

    public selectedLang = '';

    constructor(private languageService: LanguageService) {

    }

    ngOnInit() {
        this.selectedLang = this.languageService.lang;
    }

}
