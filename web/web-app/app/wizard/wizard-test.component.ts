import {Component, OnInit} from '@angular/core';

import {Hero} from '../dto/hero';
import {HeroService} from '../services/hero.service';

@Component({
    moduleId: module.id,
    selector: 'wizard-test',
    templateUrl: 'wizard-test.component.html'
})
export class WizardTestComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {

    }

    onCancel(): void {
        console.info("cancelled");
    }

    onComplete(key: string): void {
        console.info("completed", key);
    }

    onCompleteAll(key: string): void {
        console.info("completed wizard");
    }
}