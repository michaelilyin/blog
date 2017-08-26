import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {MdDialog} from '@angular/material';
import {SignInDialogComponent} from './sign-in.dialog.component';
import {UserProfile, UserProfileService} from '../userprofile.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnDestroy {

    user: UserProfile = null;

    private authSubscription: Subscription;

    public constructor(private userProfileService: UserProfileService,
                       private dialog: MdDialog) {
        this.authSubscription = this.userProfileService.profile.subscribe(user => {
            this.user = user
        })
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    login() {
        this.dialog.open(SignInDialogComponent);
    }

    logout() {
        this.userProfileService.signOut();
    }

    get logged(): boolean {
        return this.user != null;
    }
}
