import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import AuthProvider = firebase.auth.AuthProvider;

@Component({
    selector: 'sign-in-dialog',
    templateUrl: 'sign-in.dialog.html',
})
export class SignInDialog {

    inProgress = false;

    constructor(public dialogRef: MdDialogRef<SignInDialog>,
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
