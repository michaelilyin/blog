import {ReplaySubject} from 'rxjs/ReplaySubject';
import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import AuthProvider = firebase.auth.AuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export class UserProfile {

    accepted = false;
    avatarUrl = '';

    constructor(readonly uid: string,
                readonly displayName: string,
                readonly email: string,
                optional: {
                    readonly accepted?: boolean,
                    readonly avatarUrl?: string | undefined
                }) {
        if (optional.accepted !== undefined) {
            this.accepted = optional.accepted;
        }
        if (optional.avatarUrl !== undefined) {
            this.avatarUrl = optional.avatarUrl;
        }
    }
}

export enum AuthProviders {
    GOOGLE
}

export abstract class UserProfileService implements UserProfileService {
    public readonly profile = new ReplaySubject<UserProfile>(1);

    abstract signOut()

    abstract signInWithProvider(provider: AuthProviders): Promise<any>
}
