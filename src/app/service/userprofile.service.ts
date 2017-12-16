import {Injectable} from '@angular/core';
import {AuthProviders, UserProfile, UserProfileService} from '../common/profile/userprofile.service';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import AuthProvider = firebase.auth.AuthProvider;
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take'
import {LogService} from 'ngx-log';
import {DelayRouteActivator} from '../common/service/permissions/activator';

@Injectable()
export class UserProfileServiceImpl extends UserProfileService {

    private profileSub: Subscription;

    constructor(private auth: AngularFireAuth,
                private db: AngularFireDatabase,
                private delayRouteActivator: DelayRouteActivator,
                private log: LogService) {
        super();
        this.auth.authState.subscribe(user => {
            if (user == null) {
                this.profile.next(null);
                return;
            }
            this.processAuth(user);

            if (this.profileSub) {
                this.profileSub.unsubscribe();
            }
            this.profileSub = db.object(`/users/${user.uid}`).valueChanges().subscribe(this.profile);
        });
    }

    signInWithProvider(provider: AuthProviders): Promise<any> {
        this.delayRouteActivator.reset();
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

    private processAuth(user: firebase.User) {
        if (!user) {
            return;
        }
        this.db.object<UserProfile>(`/users/${user.uid}`).valueChanges().take(1)
            .subscribe((existingProfile: UserProfile) => {
                this.log.log('Loaded profile', existingProfile);
                if (existingProfile.accepted) {
                    return;
                }
                const profile = new UserProfile(
                    user.uid,
                    user.providerData[0].displayName,
                    user.providerData[0].email,
                    {
                        avatarUrl: user.providerData[0].photoURL + '?size=40'
                    }
                );
                this.db.object(`/user-list/${user.uid}`).set(profile);
                this.db.object(`/users/${user.uid}`).set(profile);
            });
    }
}
