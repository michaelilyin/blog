import {Component, Output, EventEmitter, OnInit, AfterContentInit} from "@angular/core";
import {WizardStepComponent} from "./wizard-step.component";
import {Subject} from "rxjs/Subject";
/**
 * Created by Michael Ilyin on 25.12.2016.
 */

@Component({
    moduleId: module.id,
    selector: 'wizard',
    templateUrl: 'wizard.component.html'
})
export class WizardComponent implements OnInit, AfterContentInit {

    @Output()
    cancel = new EventEmitter();

    @Output()
    complete = new EventEmitter();

    private steps: Array<WizardStepComponent> = [];
    private current: number = 0;
    private currentStep: WizardStepComponent;

    public stepSelection = new Subject<WizardStepComponent>();

    get nextDisabled(): boolean {
        return !this.steps[this.current].resolved;
    }

    get nextTitle(): String {
        if (this.currentStep.resolveButton)
            return this.currentStep.resolveButton;
        return this.isLastStep() ? "Finish" : "Next";
    }

    private isLastStep() {
        return this.current === this.steps.length - 1;
    }

    get backTitle(): String {
        return "Back";
    }

    get cancelTitle(): String {
        return "Cancel";
    }

    resolveStep(): void {
        const step = this.currentStep;
        if (step.resolved) {
            step.completeStep();
        }
    }

    previousStep(): void {

    }

    cancelWizard(): void {
        this.cancel.emit();
    }

    ngOnInit(): void {
        console.info("init wizard");
    }

    ngAfterContentInit(): void {
        console.info("after content init");
        this.selectStep(this.current);
    }

    selectStep(index: number) {
        const step = this.steps[index];
        this.currentStep = step;
        this.stepSelection.next(step);
    }

    addStep(step: WizardStepComponent) {
        console.info("add step", step.key);
        this.steps.push(step);
        step.complete.subscribe(() => {
           if (this.currentStep === step) {
               if (!this.isLastStep()) {
                   this.current += 1;
                   this.selectStep(this.current);
               } else {
                   this.complete.emit();
               }
           }
        });
    }
}
