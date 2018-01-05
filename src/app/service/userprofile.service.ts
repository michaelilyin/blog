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
import {MatDialog} from '@angular/material';
import {ProfileConfirmationComponent} from '../common/profile/profile-confirmation/profile-confirmation.component';

@Injectable()
export class UserProfileServiceImpl extends UserProfileService {

    private profileSub: Subscription;

    constructor(private auth: AngularFireAuth,
                private db: AngularFireDatabase,
                private delayRouteActivator: DelayRouteActivator,
                private log: LogService,
                private dialog: MatDialog) {
        super();
        this.auth.authState.subscribe(user => {
            log.info('loaded user data', user);
            if (user == null) {
                if (this.profileSub) {
                    this.profileSub.unsubscribe();
                    this.profileSub = null;
                }
                this.profile.next(null);
                return;
            }
            this.processAuth(user);

            if (this.profileSub) {
                this.profileSub.unsubscribe();
                this.profileSub = null;
            }
            this.profileSub = db.object<UserProfile>(`/users/${user.uid}`).valueChanges()
                .subscribe(profile => {
                    if (profile && profile.accepted) {
                        this.profile.next(profile);
                    }
                });
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
                if (existingProfile && existingProfile.accepted) {
                    return;
                }
                const profile = new UserProfile(
                    user.uid,
                    existingProfile ? existingProfile.displayName : user.providerData[0].displayName,
                    existingProfile ? existingProfile.email : user.providerData[0].email,
                    {
                        avatarUrl: existingProfile ? existingProfile.avatarUrl : user.providerData[0].photoURL + '?size=40',
                        fullAvatarUrl: existingProfile ? existingProfile.fullAvatarUrl : user.providerData[0].photoURL + '?size=512'
                    }
                );
                if (!profile.accepted) {
                    this.dialog.open(ProfileConfirmationComponent, {
                        data: { profile: profile },
                        disableClose: true
                    }).afterClosed().take(1).subscribe((updatedProfile: UserProfile) => {
                        this.db.object(`/user-list/${user.uid}`).set(updatedProfile);
                        this.db.object(`/users/${user.uid}`).set(updatedProfile);
                    });
                }
            });
    }
}
