import {WizardComponent} from "./wizard.component";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Subject} from "rxjs/Subject";
/**
 * Created by Michael Ilyin on 25.12.2016.
 */
@Component({
    moduleId: module.id,
    selector: 'wizard-step',
    templateUrl: 'wizard-step.component.html',
    host: {
        '[style.display]': 'displayed ? "block" : "none"',
    }
})
export class WizardStepComponent {

    @Input()
    key: string;

    @Input()
    resolveButton: string;

    @Input()
    resolved: boolean = false;

    @Output("completeStep")
    private completeEvent = new EventEmitter();

    complete = new Subject();

    private displayed = false;

    constructor(private wizard: WizardComponent) {
        wizard.stepSelection.subscribe((step: WizardStepComponent) => {
            this.displayed = step === this;
        });
    }

    ngOnInit() {
        console.info("init step", this.key);
        this.wizard.addStep(this)
    }

    completeStep() {
        this.completeEvent.emit();
        this.complete.next();
    }
}