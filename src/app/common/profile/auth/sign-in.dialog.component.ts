import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AuthProviders, UserProfileService} from '../userprofile.service';

@Component({
    selector: 'app-sign-in-dialog',
    templateUrl: 'sign-in.dialog.component.html',
})
export class SignInDialogComponent {

    inProgress = false;

    constructor(public dialogRef: MatDialogRef<SignInDialogComponent>,
                private userProfileService: UserProfileService) {}

    signInWithGoogle() {
        this.signInWithProvider(AuthProviders.GOOGLE);
    }

    private signInWithProvider(provider: AuthProviders) {
        this.inProgress = true;
        this.userProfileService.signInWithProvider(provider).then(() => {
            this.inProgress = false;
            this.dialogRef.close();
        }).catch(e => {
            this.inProgress = false;
            throw e;
        });
    }
}
