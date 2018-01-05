import {Component, Inject, OnInit} from '@angular/core';
import {UserProfile} from '../userprofile.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-profile-confirmation',
    templateUrl: './profile-confirmation.component.html',
    styleUrls: ['./profile-confirmation.component.css']
})
export class ProfileConfirmationComponent implements OnInit {

    public email: string;
    public displayName: string;
    public avatarUrl: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: {profile: UserProfile},
                private dialogRef: MatDialogRef<ProfileConfirmationComponent>) {
        this.email = data.profile.email;
        this.displayName = data.profile.displayName;
        this.avatarUrl = data.profile.fullAvatarUrl;
    }

    ngOnInit() {
    }

    confirm() {
        const profile = new UserProfile(
            this.data.profile.uid,
            this.displayName,
            this.data.profile.email,
            {
                accepted: true,
                avatarUrl: this.data.profile.avatarUrl,
                fullAvatarUrl: this.data.profile.fullAvatarUrl
            }
        );
        this.dialogRef.close(profile);
    }
}
