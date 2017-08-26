import {ReplaySubject} from 'rxjs/ReplaySubject';
import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import AuthProvider = firebase.auth.AuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export class UserProfile {

    constructor(readonly uid: string,
                readonly displayName: string,
                readonly avatarUrl: string = '') {
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
