import {ReplaySubject} from 'rxjs/ReplaySubject';
import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import AuthProvider = firebase.auth.AuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export class UserProfile {

    constructor(readonly displayName: string,
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

@Injectable()
export class UserProfileServiceImpl extends UserProfileService {

    constructor(private auth: AngularFireAuth) {
        super();
        this.auth.authState.subscribe(user => {
           const profile = this.convertUserToProfile(user);
           this.profile.next(profile);
        });
    }

    signInWithProvider(provider: AuthProviders): Promise<any> {
        let providerInstance = null;
        switch (provider) {
            case AuthProviders.GOOGLE:
                providerInstance = new GoogleAuthProvider();
                break;
        }
        return this.signInWithProviderInternal(providerInstance);
    }

    private signInWithProviderInternal(authProvider: AuthProvider): Promise<any> {
        return new Promise((resolve, reject) => {
            this.auth.auth.signInWithPopup(authProvider).then(resolve).catch(reject);
        });
    }

    signOut() {
        this.auth.auth.signOut();
    }

    private convertUserToProfile(user: firebase.User) {
        if (!user) {
            return null;
        }
        const profile = new UserProfile(
            user.displayName,
            user.providerData[0].photoURL + '?size=40'
        );
        return profile;
    }
}
