import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import AuthProvider = firebase.auth.AuthProvider;

@Component({
    selector: 'app-sign-in-dialog',
    templateUrl: 'sign-in.dialog.component.html',
})
export class SignInDialogComponent {

    inProgress = false;

    constructor(public dialogRef: MdDialogRef<SignInDialogComponent>,
                private auth: AngularFireAuth) {}

    signInWithGoogle() {
        this.signInWithProvider(new GoogleAuthProvider());
    }

    private signInWithProvider(authProvider: AuthProvider) {
        this.inProgress = true;
        this.auth.auth.signInWithPopup(authProvider).then(() => {
            this.inProgress = false;
            this.dialogRef.close();
        }).catch(e => {
            this.inProgress = false;
            throw e;
        });
    }
}
