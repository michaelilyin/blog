import {Component, OnDestroy} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {User} from 'firebase/app';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {Subscription} from 'rxjs/Subscription';
import AuthCredential = firebase.auth.AuthCredential;
import {MdDialog} from '@angular/material';
import {SignInDialog} from './sign-in.dialog';

@Component({
    selector: 'auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnDestroy {

    user: User = null;

    private authSubscription: Subscription;

    public constructor(private auth: AngularFireAuth,
                       private dialog: MdDialog) {
        this.authSubscription = this.auth.authState.subscribe(user => {
            this.user = user
        })
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    login() {
        this.dialog.open(SignInDialog);
    }

    logout() {
        this.auth.auth.signOut();
    }

    get logged(): boolean {
        return this.user != null;
    }
}
