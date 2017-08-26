import {Injectable} from '@angular/core';
import {AuthProviders, UserProfile, UserProfileService} from '../common/profile/userprofile.service';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class UserProfileServiceImpl extends UserProfileService {

    constructor(private auth: AngularFireAuth) {
        super();
        this.auth.authState.subscribe(user => {
            if (user == null) {
                this.profile.next(null);
                return;
            }
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
            user.uid,
            user.providerData[0].displayName,
            user.providerData[0].photoURL + '?size=40'
        );
        return profile;
    }
}
